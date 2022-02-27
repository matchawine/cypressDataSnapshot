describe("Jest snapshot test", function () {
  it("Test is not passing", () => {
    cy.toMatchSnapshot({ test: false })
  })
})
