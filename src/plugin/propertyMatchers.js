import _ from "lodash"
import { jestExpect } from "@jest/expect"

const getExpectFunction = robustPropertyMatcher => {
  const func = robustPropertyMatcher.__function
  const args = robustPropertyMatcher.__args || []

  const expectFunction = _.get(jestExpect, func)
  return expectFunction(...args)
}

export const getPropertyMatchersFromDeserialized = robustPropertyMatchers =>
  _.cloneDeepWith(robustPropertyMatchers, value => {
    if (_.get(value, "__isJestExpect") === true) return getExpectFunction(value)
  })
