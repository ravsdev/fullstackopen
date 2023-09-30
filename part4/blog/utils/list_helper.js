const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.slice(1).reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  }, blogs[0])
  // return Math.max(...blogs.map(blog => blog.likes))
}

const mostBlogs = (blogs) => {
/* const groupedAuthors = _.groupBy(blogs,'author')

  return _.maxBy(_.map(groupedAuthors, (value,key) => {
    return {
      author: key,
      blogs: value.length
    }
  }), 'blogs')
*/
  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      return { author: author, blogs: blogs.length }
    })
    .maxBy('blogs')
}

const mostLikes = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      return {
        author: author,
        likes: _.sumBy(blogs,'likes')
      }
    })
    .maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
