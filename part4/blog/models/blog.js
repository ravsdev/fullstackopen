const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

//Populate in middleware to return user name
blogSchema.post('save', function (doc, next) {
  doc.populate('user', { username: 1, name: 1 }).then(function () {
    next()
  })
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
