import {
  getDefaultSnapshotName,
  getErrorText,
  getSnapshotFilePath,
} from "./utils"
import { serialize } from "./serialize"

const getToMatchSnapshotCommand = ({ forceUpdateSnapshot }) =>
  function (actual, ...optionalArgs) {
    const [propertyMatchers, hint] = optionalArgs

    const snapshotFilePath = getSnapshotFilePath(
      this.test.invocationDetails.absoluteFile,
    )
    const snapshotName = getDefaultSnapshotName(Cypress)
    const serializedActual = serialize(actual)
    const serializedPropertyMatchers = serialize(propertyMatchers)
    const updateSnapshot = forceUpdateSnapshot || Cypress.env("SNAPSHOT_UPDATE")

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
        cy.log(
          `⚠️ Snapshot \`${snapshotName}\` updated!\n\nNow replace back the \`.updateSnapshot\` command with \`.toMatchSnapshot\``,
        )
    })
  }

Cypress.Commands.add(
  "toMatchSnapshot",
  getToMatchSnapshotCommand({ forceUpdateSnapshot: false }),
)

Cypress.Commands.add(
  "updateSnapshot",
  getToMatchSnapshotCommand({ forceUpdateSnapshot: "all" }),
)
