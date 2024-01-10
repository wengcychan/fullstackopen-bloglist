describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#title').type('New blog')
      cy.get('#author').type('New author')
      cy.get('#url').type('https://newblog.com/')
      cy.get('#create-button').click()

      cy.contains('New blog New author')
    })

    describe('When created new blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'New blog',
          author: 'New author',
          url: 'https://newblog.com/'
        })
      })

      it('user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.get('.blogDetails').contains('likes').contains(1)
      })

      describe('delete blog', function () {
        beforeEach(function () {
          const user = {
            name: 'test user',
            username: 'test',
            password: 'testpassword'
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.contains('logout').click()
          cy.login({ username: user.username, password: user.password })
          cy.createBlog({
            title: 'Another new blog',
            author: 'Another new author',
            url: 'https://anothernewblog.com/'
          })
          cy.contains('logout').click()
          cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('user who created a blog can delete it', function () {
          cy.contains('New blog').contains('view').click()
          cy.contains('New blog').parent().parent().find('.blogDetails').contains('remove').click()

          cy.get('.blog').should('not.contain', 'New blog')
        })

        it('only the creator can see the delete button of a blog', function () {
          cy.contains('New blog').contains('view').click()
          cy.contains('New blog').parent().contains('remove')

          cy.contains('Another new blog').contains('view').click()
          cy.contains('Another new blog').parent().should('not.contain', 'remove')
        })
      })

      describe('likes are in order', function () {
        beforeEach(function () {
          const user = {
            name: 'test user',
            username: 'test',
            password: 'testpassword'
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.contains('logout').click()
          cy.login({ username: user.username, password: user.password })
          cy.createBlog({
            title: 'Another new blog',
            author: 'Another new author',
            url: 'https://anothernewblog.com/'
          })
          cy.contains('logout').click()
          cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('blogs are ordered according to likes with the blog with the most likes being first', function () {
          cy.get('.blogInfo').contains('New blog').contains('view').click()
          cy.get('.blogInfo').contains('New blog').parent().contains('like').click()
          cy.get('.blogInfo').contains('New blog').parent().contains('likes 1')
          cy.get('.blogInfo').contains('Another new blog').contains('view').click()
          cy.get('.blogInfo').contains('Another new blog').parent().contains('likes 0')
          cy.get('.blogInfo').contains('Another new blog').parent().contains('like').click()
          cy.get('.blogInfo').contains('Another new blog').parent().contains('likes 1')
          cy.get('.blogInfo').contains('Another new blog').parent().contains('like').click()
          cy.get('.blogInfo').contains('Another new blog').parent().contains('likes 2')

          cy.get('.blog').eq(0).should('contain', 'Another new blog')
          cy.get('.blog').eq(1).should('contain', 'New blog')
        })
      })
    })
  })
})
