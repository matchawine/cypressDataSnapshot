describe("Jest snapshot test", function () {
  it("Test is not passing", () => {
    const messageRegex =
      /Snapshot name: `Jest snapshot test Test is not passing`\s*Expected: Object \{\s*"test": true,\s*\}\s*Actual: Object \{\s*"test": false,\s*\}/m
    cy.expectToFail(e => e.message.match(messageRegex))

    cy.toMatchSnapshot({ test: false })

    cy.expectNotToPass()
  })
})
