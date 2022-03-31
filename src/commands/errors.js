export const getUdateText = ({ testPath }) =>
  `To update all this spec snapshot, run:\n\`$ cypress run --env SNAPSHOT_UPDATE=all --spec ${testPath}\``

export const getFrontEndErrorText = ({
  snapshotName,
  testResult: { actual, expected },
  testPath,
}) =>
  `Snapshot name: \`${snapshotName}\`\n\nExpected: ${expected}\n\nActual: ${actual}\n\n${getUdateText(
    { testPath },
  )}`

export const logMessageInServer = ({
  testResult: { pass, message },
  testPath,
}) => {
  if (!pass) {
    console.warn(message())
    console.log(getUdateText({ testPath }))
  }
}
