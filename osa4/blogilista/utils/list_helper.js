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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}