//Inspired by https://glebbahmutov.com/blog/cy-metaprogramming/

Cypress.Commands.add("expectToFail", isValidError => {
  cy.on("fail", e => {
    console.error(e)
    if (!isValidError(e)) throw e
  })
})

Cypress.Commands.add("expectNotToPass", () =>
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000).then(() => {
    throw new Error("This test should not have passed")
  }),
)
