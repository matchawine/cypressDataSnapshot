import _ from "lodash"
import { toMatchSnapshot } from "./toMatchSnapshotInternal"
import { deserialize } from "serialize-anything"

const deserializeContext = ({
  serializedActual,
  serializedPropertyMatchers,
  ...context
}) => ({
  ...context,
  actual: deserialize(serializedActual),
  deserializedPropertyMatchers: deserialize(serializedPropertyMatchers),
})

const modifyConfig = config => {
  // eslint-disable-next-line immutable/no-mutation
  config.ignoreTestFiles = _.flatten([config.ignoreTestFiles, "*.snap"])
}

export default (on, config) => {
  modifyConfig(config)

  on("task", {
    toMatchSnapshot(serializedContext) {
      try {
        const context = deserializeContext(serializedContext)
        return toMatchSnapshot(context)
      } catch (e) {
        console.error(e)
        throw e
      }
    },
  })

  return config
}
