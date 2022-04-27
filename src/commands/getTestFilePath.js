const getAbsoluteFileFromCypressEvent = () =>
  cy.task("getTestFilePath").then(absoluteFileFromCypressEvent => {
    expect(absoluteFileFromCypressEvent).to.not.equal(undefined)
    return cy.wrap(absoluteFileFromCypressEvent)
  })

// Cannot use Cypress.spec when launching serveral tests, cf. https://github.com/cypress-io/cypress/issues/3090#issuecomment-889470707
// this.test.invocationDetails?.absoluteFile is flaky when runninbg `$ cypress run`. If it does not exist, we use an alternate method (that doesn't work in `$ cypress open`)
Cypress.Commands.add("getTestFilePath", function () {
  const absoluteFileFromInvocationDetails =
    this.test.invocationDetails?.absoluteFile
  return absoluteFileFromInvocationDetails
    ? cy.wrap(absoluteFileFromInvocationDetails)
    : getAbsoluteFileFromCypressEvent()
})
