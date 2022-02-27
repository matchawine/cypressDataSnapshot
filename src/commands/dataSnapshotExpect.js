/**
 * Serializable Jest expect functions. Use it in dataSnapshot property matchers instead of expect.any(), etc...
 * Ex. instead of `expect.any(String)`, use  `dataSnapshotExpect("any", String)`
 *
 * @param func function path/name called from Jest expect. Ex. "any", "not.stringMatching"
 * @param args args to give the Jest function. Ex. `String`
 * @returns {{__isJestExpect: boolean, __args: *[], __function}}
 */
export const dataSnapshotExpect = (func, ...args) => ({
  __isJestExpect: true,
  __function: func,
  __args: args,
})
