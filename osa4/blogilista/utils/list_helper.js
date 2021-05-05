// eslint-disable-next-line no-unused-vars
const dummy = ( blogs ) => {
  return 1
}

const totalLikes = ( blogs ) => {
  return blogs.reduce( ( sum, blog ) => sum + blog.likes, 0 )
}

const favoriteBlog = ( blogs ) => {
  let mostLiked = blogs[0]

  for ( let i = 1; i < blogs.length; i++ ) {
    if ( blogs[i].likes > mostLiked.likes ) {
      mostLiked = blogs[i]
    }
  }

  return mostLiked
}

const mostBlogs = ( blogs ) => {
  let blogCounts = []

  blogs.forEach( blog => {
    let authorEntryIndex = blogCounts.findIndex( item => item.author === blog.author )

    if ( authorEntryIndex === -1 ) {
      blogCounts.push( { author: blog.author, blogs: 1 } )
    } else {
      blogCounts[authorEntryIndex].blogs++
    }
  })

  let max = blogCounts[0]

  for ( let i = 1; i < blogCounts.length; i++ ) {
    if ( blogCounts[i].blogs > max.blogs ) {
      max = blogCounts[i]
    }
  }

  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}