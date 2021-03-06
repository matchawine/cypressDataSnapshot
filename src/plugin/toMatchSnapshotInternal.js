import _ from "lodash"
import { getPropertyMatchersFromDeserialized } from "./propertyMatchers"
import { getMatcher, getSnapshotState } from "./jestMagic"
import { logMessageInServer } from "../commands/errors"

const verbose = false

// Inspired from https://medium.com/blogfoster-engineering/how-to-use-the-power-of-jests-snapshot-testing-without-using-jest-eff3239154e5
export const toMatchSnapshot = context => {
  if (verbose) console.log("context", context)
  const {
    actual,
    snapshotFilePath,
    snapshotName,
    testPath,
    hint,
    deserializedPropertyMatchers,
    updateSnapshot,
  } = context

  const propertyMatchers = getPropertyMatchersFromDeserialized(
    deserializedPropertyMatchers,
  )

  const matcherOptionalArgs = _.compact([propertyMatchers, hint])

  const snapshotState = getSnapshotState({
    updateSnapshot,
    snapshotFilePath,
  })

  const matcher = getMatcher({ snapshotState, snapshotName })

  const testResult = matcher(actual, ...matcherOptionalArgs)

  snapshotState.save()

  logMessageInServer({ testResult, testPath })

  return testResult
}
