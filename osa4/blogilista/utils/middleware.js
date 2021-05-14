const jwt = require( 'jsonwebtoken' )
const User = require( '../models/user' )

const tokenExtractor = ( request, response, next ) => {
  const authorization = request.get( 'authorization' )

  if ( authorization && authorization.toLowerCase().startsWith( 'bearer ' ) ) {
    const token = authorization.substring( 7 )
    const decodedToken  = jwt.verify( token, process.env.SECRET )

    if ( !decodedToken.id ) {
      return response.status( 401 ).json( { error: 'token invalid' } )
    }

    request.token = decodedToken
  } else {
    return response.status( 401 ).json( { error: 'token missing or invalid' } )
  }

  next()
}

const userExtractor = async ( request, response, next ) => {
  request.user = await User
    .findById( request.token.id ).populate( 'blogs', { id: 1 } )

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}