import dataSnapshot from "../../src/plugin"

export default (on, config) => {
  dataSnapshot(on, config)
  return config
}
