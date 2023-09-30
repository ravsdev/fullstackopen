
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testing User',
      username: 'testUser',
      password: 'testPassword'
    }

    const otherUser = {
      name: 'Other User',
      username: 'otherUser',
      password: 'otherPassword'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', otherUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.get('input[value="Log in"]')
  })

  describe('Login', () => {
    it('succeds with correct credentials', () => {
      cy.get('input[name="Username"]').type('testUser')
      cy.get('input[name="Password"]').type('testPassword')
      cy.get('input[value="Log in"]').click()
    })

    it('fails with wrong credentials', () => {
      cy.get('input[name="Username"]').type('testUser')
      cy.get('input[name="Password"]').type('badPassword')
      cy.get('input[value="Log in"]').click()

      cy.get('.notification').should('contain', 'wrong')
      cy.get('.notification span').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in...', () => {
    const firstBlog = {
      title: 'First Blog Title',
      author: 'First Blog Author',
      url: 'https://someawesomeblog.com'
    }

    const secondBlog = {
      title: 'Second Blog Title',
      author: 'Second Blog Author',
      url: 'https://anotherawesomeblog.com'
    }

    const thirdBlog = {
      title: 'Third Blog Title',
      author: 'Third Blog Author',
      url: 'https://yetanotherawesomeblog.com'
    }

    beforeEach(() => {
      // cy.get('input[name="Username"]').type('testUser')
      // cy.get('input[name="Password"]').type('testPassword')
      // cy.get('input[value="Log in"]').click()
      cy.login('testUser', 'testPassword')
    })

    it('A blog can be created', () => {
      cy.get('#new-blog').click()
      cy.get('input[name="title"]').type('New Blog title')
      cy.get('input[name="author"]').type('Blog author')
      cy.get('input[name="url"]').type('https://someplace.com')
      cy.get('#create-blog').click()
      cy.get('.notification').should('contain', 'added')
      cy.contains('New Blog title Blog author')
    })

    describe('and several blogs exists', () => {
      beforeEach(() => {
        cy.addBlog(firstBlog)
        cy.addBlog(secondBlog)
        cy.addBlog(thirdBlog)
      })

      it('Users can like a blog', () => {
        //debugger
        cy.contains('Second Blog').parent().as('Blog')
        cy.get('@Blog').find('button').click()
        cy.get('@Blog').find('[like-button]').click()
        cy.get('@Blog').find('.togglableContent div').children('[data-like]').should('have.text','Likes: 1')
      })

      it('the user who created a blog can delete it', ()=>{
        cy.contains('Second Blog').parent().as('Blog')
        cy.get('@Blog').find('button').click()
        cy.get('@Blog').find('[remove-button]').click()       
      })

      it('only the creator can see the delete button of a blog',()=>{
        cy.contains('Log out').click()
        cy.login('otherUser', 'otherPassword')
        cy.contains('First Blog').parent().as('Blog')
        cy.get('@Blog').find('button').click()
        cy.get('@Blog').find('[remove-button]').should('not.exist')
      })

      it('the blogs are ordered according to likes with the blog with the most likes being first', () =>{
        cy.get('.blog').eq(0).find('button').click()
        cy.get('.blog').eq(0).find('[like-button]').click()

        cy.get('.blog').eq(1).find('button').click()
        cy.get('.blog').eq(1).find('[like-button]').click().click()

        cy.get('.blog').eq(2).find('button').click()
        cy.get('.blog').eq(2).find('[like-button]').click().click().click()

        cy.get('.blog').eq(0).should('contain', 'Third Blog Title Third Blog Author')
        cy.get('.blog').eq(1).should('contain', 'Second Blog Title Second Blog Author')
        cy.get('.blog').eq(2).should('contain', 'First Blog Title First Blog Author')
      })
    })
  })
})