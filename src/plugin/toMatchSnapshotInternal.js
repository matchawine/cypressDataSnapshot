import { getPropertyMatchersFromDeserialized } from "./propertyMatchers";
import { getMatcher, getSnapshotState } from "./jestMagic";

const verbose = false;

// https://medium.com/blogfoster-engineering/how-to-use-the-power-of-jests-snapshot-testing-without-using-jest-eff3239154e5
export const toMatchSnapshot = (context) => {
  if (verbose) console.log("context", context);
  const {
    actual,
    snapshotFilePath,
    snapshotName,
    hint,
    deserializedPropertyMatchers,
    updateSnapshot,
  } = context;

  const propertyMatchers = getPropertyMatchersFromDeserialized(
    deserializedPropertyMatchers
  );

  const snapshotState = getSnapshotState({
    updateSnapshot,
    snapshotFilePath,
  });

  const matcher = getMatcher({ snapshotState, snapshotName });

  const result = propertyMatchers
    ? matcher(actual, propertyMatchers, hint)
    : matcher(actual);

  snapshotState.save();

  return result;
};
