import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser (parent, args, {db}, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email)
    if (emailTaken) {
      throw new Error('Email is taken')
    }
    const user = {id: uuidv4(), ...args.data}
    db.users.push(user)
    return user
  },
  deleteUser (parent, args, {db}, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id)
    if (userIndex === -1) {
      throw new Error('No User Found')
    }
    const deletedUser = db.users.splice(userIndex, 1)
    db.posts = db.posts.filter(post => {
      const match = post.author === args.id
      if (match) {
        db.comments = db.comments.filter(comment => comment.postId !== post.id)
      }
      return !match
    })
    db.comments = db.comments.filter(comment => comment.author !== args.id)
    return deletedUser[0]
  },
  updateUser (parent, args, {db}, info) {
    const {id, data} = args
    const userFound = db.users.find(user => user.id === id)
    if (!userFound) {
      throw new Error('User not found')
    }
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email)
      if (emailTaken) {
        throw new Error('Email taken')
      }
      userFound.email = data.email
    }
    if (typeof data.name === 'string') {
      userFound.name = data.name
    }
    if(typeof data.age !== 'undefined') {
      userFound.age = data.age
    }
    return userFound
  },
  createPost (parent, args, {db}, info) {
    const userExists = db.users.some(user => user.id === args.data.author)
    if (!userExists) {
      throw new Error('User does not exist')
    }
    const newPost = {id: uuidv4(), ...args.data}
    db.posts.push(newPost)
    return newPost
  },
  deletePost (parent, args, {db}, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id)
    if (postIndex === -1) {
      throw new Error('No Post Found')
    }
    const deletedPosts = db.posts.splice(postIndex, 1)
    db.comments = db.comments.filter(comment => comment.postId === args.id)
    return deletedPosts[0]
  },
  updatePost(parent, args, {db}, info) {
    const {id, data } = args
    const postIndex = db.posts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      throw new Error('No Post Found')
    }
    if(typeof data.title === 'string') {
      db.posts[postIndex].title = data.title
    }
    if(typeof data.body === 'string') {
      db.posts[postIndex].body = data.body
    }
    if(typeof data.published === 'boolean') {
      db.posts[postIndex].published = data.published
    }
    return db.posts[postIndex]
  },
  createComment (parent, args, {db}, info) {
    const userExists = db.users.some(user => user.id === args.data.author)
    const postExists = db.posts.some(post => post.id === args.data.postId && post.published)
    if (!postExists || !userExists) {
      throw new Error('Unable to find user and post')
    }
    const newComment = {id: uuidv4(), ...args.data}
    db.comments.push(newComment)
    return newComment
  },
  deleteComment (parent, args, {db}, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id)
    if (commentIndex === -1) {
      throw new Error('No comment Found')
    }
    const deletedComments = db.comments.splice(commentIndex, 1)
    return deletedComments[0]
  },
  updateComment(parent, args, {db}, info) {
    const {id, data} = args
    const commentIndex = db.comments.findIndex(comment => comment.id === id)
    if (commentIndex === -1) {
      throw new Error('No comment Found')
    }
    if(typeof data.text === 'string') {
      db.comments[commentIndex].text = data.text
    }
    return db.comments[commentIndex]
  }
}

export { Mutation as default }