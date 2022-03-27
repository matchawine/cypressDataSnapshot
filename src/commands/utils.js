//Use relative path because absolute has webpack problems
//Cannot use Cypress.spec when launching serveral tests, cf. https://github.com/cypress-io/cypress/issues/3090#issuecomment-889470707
const testFileRegExp = /\/(cypress\/.*)\/([^/]+)$/

const getTestFolderAndFileName = absoluteFile => {
  const [, testFolder, testFileName] = absoluteFile.match(testFileRegExp)
  return { testFolder, testFileName }
}

export const getTestPath = absoluteFile => {
  const { testFolder, testFileName } = getTestFolderAndFileName(absoluteFile)
  return `${testFolder}/${testFileName}`
}

export const getSnapshotFilePath = absoluteFile => {
  const { testFolder, testFileName } = getTestFolderAndFileName(absoluteFile)
  return `${testFolder}/__snapshots__/${testFileName}.snap`
}

export const getDefaultSnapshotName = Cypress =>
  Cypress.currentTest.titlePath.join(" ")

export const getErrorText = ({
  snapshotName,
  testResult: { actual, expected },
  testPath,
}) =>
  `Snapshot name: \`${snapshotName}\`\n\nExpected: ${expected}\n\nActual: ${actual}\n\nTo update all this spec snapshot, run:\n\`$ cypress run --env SNAPSHOT_UPDATE=all --spec ${testPath}\``
