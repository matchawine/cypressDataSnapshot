describe("Always update snapshot", function () {
  it("Update all snapshots", () => {
    Cypress.env("SNAPSHOT_UPDATE", "all")
    cy.toMatchSnapshot({ date: new Date() })
  })
})
