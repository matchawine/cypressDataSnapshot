import "./getTestFilePath"
import {
  getDefaultSnapshotName,
  getSnapshotFilePath,
  getTestPath,
} from "./cypressFilePath"
import { serialize } from "./serialize"
import { getFrontEndErrorText } from "./errors"

const getToMatchSnapshotCommand = ({ forceUpdateSnapshot }) =>
  function (actual, ...optionalArgs) {
    cy.getTestFilePath().then(absoluteFile => {
      const [propertyMatchers, hint] = optionalArgs
      const snapshotFilePath = getSnapshotFilePath(absoluteFile)
      const testPath = getTestPath(absoluteFile)
      const snapshotName = getDefaultSnapshotName(Cypress)
      const serializedActual = serialize(actual)
      const serializedPropertyMatchers = serialize(propertyMatchers)
      const updateSnapshot =
        forceUpdateSnapshot || Cypress.env("SNAPSHOT_UPDATE")

      cy.task("toMatchSnapshot", {
        serializedActual,
        snapshotFilePath,
        snapshotName,
        testPath,
        hint,
        serializedPropertyMatchers,
        updateSnapshot,
      }).then(testResult => {
        if (!testResult.pass)
          throw new Error(
            getFrontEndErrorText({ snapshotName, testResult, testPath }),
          )

        if (updateSnapshot)
          cy.log(
            `⚠️ Snapshot \`${snapshotName}\` updated!\n\nNow replace back the \`.updateSnapshot\` command with \`.toMatchSnapshot\``,
          )
      })
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
