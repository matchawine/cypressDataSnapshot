// eslint-disable-next-line immutable/no-let
let currentTestFilePath = null

export default on => {
  on("before:spec", test => {
    currentTestFilePath = test.absolute
  })

  on("task", {
    getTestFilePath: () => {
      console.log("Get current test file path from node", currentTestFilePath)
      return currentTestFilePath
    },
  })
}
