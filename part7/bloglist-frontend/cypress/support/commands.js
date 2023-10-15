// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', `${Cypress.env('API')}/login`, {
        username,
        password,
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
    const loggedUser = localStorage.getItem('loggedBlogappUser')

    cy.request({
        url: `${Cypress.env('API')}/blogs`,
        method: 'POST',
        body: {
            title,
            author,
            url,
            user: {
                username: loggedUser.username,
                name: loggedUser.name,
            },
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(loggedUser).token}`,
        },
    })

    // cy.visit('http://localhost:5173')
    cy.visit('') //baseUrl configured at cypress.config.js
})
