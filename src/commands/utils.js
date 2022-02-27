//Use relative path because absolute has webpack problems
//Cannot use Cypress.spec when launching serveral tests, cf. https://github.com/cypress-io/cypress/issues/3090#issuecomment-889470707
const testFileRegExp = /\/(cypress\/.*)\/([^/]+)$/

export const getSnapshotFilePath = absoluteFile => {
  const [, testFolder, testFileName] = absoluteFile.match(testFileRegExp)
  return `${testFolder}/__snapshots__/${testFileName}.snap`
}

export const getDefaultSnapshotName = Cypress =>
  Cypress.currentTest.titlePath.join(" ")

export const getErrorText = (testTitle, { actual, expected }) =>
  `Snapshot name: \`${testTitle}\`\n\nExpected: ${expected}\n\nActual: ${actual}`
