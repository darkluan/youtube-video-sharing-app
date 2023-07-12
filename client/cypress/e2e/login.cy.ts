describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Login', () => {
    it('should log in successfully with valid credentials', () => {
      cy.get('[name="email"]').type('luanphamyoyo@gmail.com')
      cy.get('[name="password"]').type('123')
      cy.get('[type="submit"]').click()
      cy.wait(5000)
      cy.get('body').should('contain', 'Welcome: luanphamyoyo@gmail.com')
    })

    // it('should display error message with invalid credentials', () => {
    //   cy.get('#root').should('contain', 'Logout').click()
    //   cy.get('[name="email"]').type('luanphamyoyo@gmail.com')
    //   cy.get('[name="password"]').type('123')

    //   cy.get('[type="submit"]').click()

    //   cy.wait(5000)
    //   cy.get('.Toastify__toast-body').should('Login error. Please check Email or Password')
    // })
  })
})
