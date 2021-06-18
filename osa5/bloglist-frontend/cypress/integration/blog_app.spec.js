describe( 'Blog app', function() {
  beforeEach( function() {
    cy.request( 'POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      username: 'mchan',
      name: 'Michael Chan',
      password: 'secretpassword'
    })
    cy.visit('http://localhost:3000')
  })

  it( 'Login form is shown', function() {
    cy.contains( 'Log in to application' )
    cy.contains( 'username' )
    cy.contains( 'password' )
  })

  describe( 'Login', function() {
    it( 'succeeds with correct credentials', function() {
      cy.get( '#username' ).type( 'mchan' )
      cy.get( '#password' ).type( 'secretpassword' )
      cy.get( '#login-button' ).click()

      cy.contains( 'Michael Chan logged in' )
    })

    it( 'fails with wrong credentials', function() {
      cy.get( '#username' ).type( 'mchan' )
      cy.get( '#password' ).type( 'wrongpassword' )
      cy.get( '#login-button' ).click()

      cy.get( '.error' )
        .should( 'contain', 'wrong username or password' )
        .and( 'have.css', 'border-color', 'rgb(255, 0, 0)' )

      cy.get('html').should('not.contain', 'Michael Chan logged in')
    })
  })

  describe( 'When logged in', function() {
    beforeEach( function() {
      cy.login( { username: 'mchan', password: 'secretpassword' } )
    })

    it( 'a new blog can be added', function() {
      cy.contains( 'create new blog' ).click()
      cy.get( '#title' ).type( 'Test Blog' )
      cy.get( '#author' ).type( 'Test Author' )
      cy.get( '#url' ).type( 'http://testurl.com' )
      cy.get( '#add-blog-button' ).click()

      cy.contains( 'Test Blog Test Author' )
    })

    describe( 'and when new blog has been added', function() {
      beforeEach( function() {
        cy.login( { username: 'mchan', password: 'secretpassword' } )
        cy.contains( 'create new blog' ).click()
        cy.createBlog( { title: 'Test Blog', author: 'Test Author', url: 'http://testurl.com' } )
      })

      it( 'blog can be liked', function() {
        cy.contains( 'view' ).click()
        cy.contains( 'likes 0' )
        cy.contains( 'like' ).click()
        cy.contains( 'likes 1' )
      })

      it( 'blog can be removed', function() {
        cy.contains( 'view' ).click()
        cy.contains( 'remove' ).click()
        cy.get('html').should('not.contain', 'Test Blog Test Author')
      })

      it( 'blog cannot be removed by user who did not create it', function() {
        cy.contains( 'logout' ).click()
        cy.createUser({
          username: 'rcmartin',
          name: 'Robert C. Martin',
          password: 'easypassword'
        })
        cy.login( { username: 'rcmartin', password: 'easypassword' } )
        cy.contains( 'view' ).click()
        cy.contains( 'remove' ).should( 'not.be.visible' )
      })

      it( 'blogs are sorted by likes', function() {
        cy.createBlog( { title: 'Super Great Blog', author: 'Test Author', url: 'http://testurl.com' } )
        cy.createBlog( { title: 'Not Such Great Blog', author: 'Test Author', url: 'http://testurl.com' } )

        cy.intercept( '/api/blogs/*' ).as('apiCall')

        cy.contains( 'Super Great Blog' ).contains( 'view' ).click()
        cy.contains( 'Super Great Blog' ).contains( 'like' ).as( 'likeButton1' )
        cy.get( '@likeButton1' ).click()
        cy.wait( '@apiCall' )
        cy.get( '@likeButton1' ).click()
        cy.wait( '@apiCall' )
        cy.get( '@likeButton1' ).click()
        cy.wait( '@apiCall' )

        cy.contains( 'Test Blog' ).contains( 'view' ).click()
        cy.contains( 'Test Blog' ).contains( 'like' ).as( 'likeButton2' )
        cy.get( '@likeButton2' ).click()
        cy.wait( '@apiCall' )

        cy.contains( 'Not Such Great Blog' ).contains( 'view' ).click()
        cy.contains( 'Not Such Great Blog' ).contains( 'like' ).as( 'likeButton3' )
        cy.get( '@likeButton3' ).click()
        cy.wait( '@apiCall' )
        cy.get( '@likeButton3' ).click()
        cy.wait( '@apiCall' )

        cy.get( '.blog-element' ).then( blogs => {
          cy.wrap( blogs[0] ).should( 'contain', 'Super Great Blog' )
          cy.wrap( blogs[1] ).should( 'contain', 'Not Such Great Blog' )
          cy.wrap( blogs[2] ).should( 'contain', 'Test Blog' )
        })
      })
    })
  })
})