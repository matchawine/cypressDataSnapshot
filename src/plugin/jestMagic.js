import { toMatchSnapshot, SnapshotState } from "jest-snapshot"
import { subsetEquality, iterableEquality, equals } from "@jest/expect-utils"

const getJestInternals = () => ({
  utils: {
    subsetEquality,
    iterableEquality,
  },
  equals,
})

export const getMatcher = ({ snapshotState, snapshotName }) =>
  toMatchSnapshot.bind({
    ...getJestInternals(),
    snapshotState,
    currentTestName: snapshotName,
  })

export const getSnapshotState = ({ snapshotFilePath, updateSnapshot }) =>
  new SnapshotState(snapshotFilePath, {
    updateSnapshot,
  })
