const users = [{
  id: '1',
  name: 'James',
  email: 'james@dude.com',
  age: 23
}, {
  id: '2',
  name: 'Dude',
  email: 'hello@dude.com',

}, {
  id: '3',
  name: 'shilo',
  email: 'omgs@dude.com',
  age: 36
}]

const posts = [{
  id: '2',
  title: 'hello world',
  body: 'blah blah blah',
  published: false,
  author: '3'
}, {
  id: '4',
  title: 'hello man',
  body: 'blah blah wow',
  published: false,
  author: '1'

}, {
  id: '5',
  title: 'hello man sir',
  body: 'blah blah hoot',
  published: true,
  author: '2'
}]

const comments = [{
  id:'1',
  author: '2',
  postId:'2',
  text: 'here we go again'
},{
  id:'3',
  author: '2',
  postId:'2',
  text: 'underneath the sun'
}, {
  id:'2',
  author: '1',
  postId:'4',
  text: 'on top of the world'
},{
  id:'4',
  author: '1',
  postId:'5',
  text: 'inside the fire'
}]
const db = {users, posts, comments}

export {db as default }