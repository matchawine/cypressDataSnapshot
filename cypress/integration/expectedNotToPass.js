describe("Jest snapshot test", function () {
  it("Test is not passing", () => {
    cy.expectToFail(e =>
      e.message.match(
        "Snapshot name: `Jest snapshot test Test is not passing`",
      ),
    )

    cy.toMatchSnapshot({ test: false })

    cy.expectNotToPass()
  })
})
