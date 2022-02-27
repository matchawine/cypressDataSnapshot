import { dataSnapshotExpect } from "../../src/commands/dataSnapshotExpect"

describe("Data snapshot snapshot testing", function () {
  it("Test is passing", () => {
    cy.toMatchSnapshot({ test: true })
  })

  it("Test with property matcher", () => {
    cy.toMatchSnapshot(
      {
        test: true,
        anyDate: new Date(),
        anyNumber: 3,
        anyString: new Date().toString(),
        anyBoolean: true,
        anyArray: [true],
        anyRegExp: /yo/,
        anyObject: { test: true },
        stringMatching: "yolo",
        stringNotMatching: "yilo",
      },
      {
        anyDate: dataSnapshotExpect("any", Date),
        anyNumber: dataSnapshotExpect("any", Number),
        anyString: dataSnapshotExpect("any", String),
        anyBoolean: dataSnapshotExpect("any", Boolean),
        anyArray: dataSnapshotExpect("any", Array),
        anyRegExp: dataSnapshotExpect("any", RegExp),
        anyObject: dataSnapshotExpect("any", Object),
        stringMatching: dataSnapshotExpect("stringMatching", /^yo/),
        stringNotMatching: dataSnapshotExpect("not.stringMatching", /^yo/),
      },
    )
  })
})
