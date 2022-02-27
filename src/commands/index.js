import {
  getDefaultSnapshotName,
  getErrorText,
  getSnapshotFilePath,
} from "./utils"
import { serialize } from "./serialize"

const getToMatchSnapshotCommand = ({ updateSnapshot }) =>
  function (actual, propertyMatchers, hint) {
    const snapshotFilePath = getSnapshotFilePath(
      this.test.invocationDetails.absoluteFile,
    )
    const snapshotName = getDefaultSnapshotName(Cypress)
    const serializedActual = serialize(actual)
    const serializedPropertyMatchers = serialize(propertyMatchers)

    cy.task("toMatchSnapshot", {
      serializedActual,
      snapshotFilePath,
      snapshotName,
      hint,
      serializedPropertyMatchers,
      updateSnapshot,
    }).then(testResult => {
      if (!testResult.pass)
        throw new Error(getErrorText(snapshotName, testResult))

      if (updateSnapshot)
        throw new Error(
          `Snapshot \`${snapshotName}\` updated!\n\nNow replace back the \`.updateSnapshot\` command with \`.toMatchSnapshot\``,
        )
    })
  }

Cypress.Commands.add(
  "toMatchSnapshot",
  getToMatchSnapshotCommand({ updateSnapshot: false }),
)

Cypress.Commands.add(
  "updateSnapshot",
  getToMatchSnapshotCommand({ updateSnapshot: true }),
)
