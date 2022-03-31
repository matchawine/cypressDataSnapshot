# Cypress Plugin Data Snapshot

[![npm](https://img.shields.io/npm/v/cypress-data-snapshot)](https://www.npmjs.com/package/cypress-data-snapshot)

Integrates the awesome [Jest snapshot testing](https://jestjs.io/docs/snapshot-testing) to Cypress.

## Jest vs. Cypress Plugin Data Snapshot

Cypress Plugin Data Snapshot uses Jest v28 internally. Here is a comparison with Jest features:

| Jest feature                              | Implemented ? | Details                                                                                                  |
|-------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------|
| `expect(actual).toMatchSnapshot()`        | ✅             | Api is cy.toMatchSnapshot(actual)                                                                        |
| property matchers like `expect.any(Date)` | ✅             | All Jest property matchers are implemented. Api is slightly different: `dataSnapshotExpect("any", Date)` |
| Inline snapshots                          | ❌             | I'm not even sure it's doable                                                                            |
| hint: `.toMatchSnapshot("my snapshot")`   | ✅             | Same api                                                                                                 |
| Jest snapshot update                      | ✅             | The update snapshot command is written in the console.                                                   |   

## Setup

1. install

```
npm i -D cypress-data-snapshot
```

or

```
yarn add -D cypress-data-snapshot
```

2. Add plugin commands to `cypress/support/index.js`

```javascript
import "cypress-data-snapshot"
```

2. Add plugin to `cypress/plugins/index.js`

```javascript
const cypressDataSnapshot = require("cypress-data-snapshot/plugin")

module.exports = (on, config) => {
  cypressDataSnapshot(on, config)

  // This plugin adds `*.snap` to ignored files config, you need to return config for it to take effect
  return config
}
```

## Api

Main command:

`cy.toMatchSnapshot(actual, propertyMatchers?, hint?)`

To temporarily update a snapshot (do not commit):

`cy.updateSnapshot(actual, propertyMatchers?, hint?)`

## Usage

### Snapshot data

```javascript
it("Test is passing", () => {
  cy.toMatchSnapshot({ test: true })
})
```

Snapshot file is generated, like Jest, in `<testFolder>/__snatpshots__/<testFileName>.js.snap`:

```javascript
exports[`Test is passing 1`] = `
Object {
  "test": true,
}
`;
```

When a snapshot difference occurs, the test fails. You get an actual/expected comparison in the Cypress interactive
interface, and the exact Jest intelligent diff in the cypress run console. You also get an update command in both.

### Updating the snapshot

The update command you recieve is a `cypress run` command, with the incriminated spec, and the `SNAPSHOT_UPDATE=all`
environment variable.
**It updates all the snapshots of the spec**. If you run this command, it will update the snapshot.

There is a powerful and more precise alternative workflow, but a bit more hacky. Rename the `toMatchSnapshot` command
you want to update into `updateSnapshot`. Then save, let the test be re-run, the snapshot will be updated. Then change
back `updateSnapshot` into `toMatchSnapshot`.

### Using property matchers

Do you have varying data like dates, ids, etc...? Use the
adapted [Jest property matchers](https://jestjs.io/docs/snapshot-testing#property-matchers):

```javascript
import { dataSnapshotExpect } from "cypress-data-snapshot"

it("Snapshot with property matchers", () => {
  const data = {
    test: true,
    date: new Date(),
    message: "success!"
  }
  cy.toMatchSnapshot(data, {
    date: dataSnapshotExpect("any", Date),
    message: dataSnapshotExpect("not.stringMatching", /error/),
  })
})
```

Generated snapshot:

```javascript
exports[`Snapshot with property matchers 1`] = `
Object {
  "date": Any<Date>,
  "message": StringNotMatching /error/,
  "test": true,
}
`;
```

### Adding a hint

You can [add a hint](https://jestjs.io/docs/expect#tomatchsnapshotpropertymatchers-hint), which is a specific name to
the snapshot. Particularly useful when you have several snapshots in the same test.

```javascript
it("Test with hint", () => {
  cy.toMatchSnapshot({ test: true }, "I'm the hint")
})
```

Generated snapshot:

```javascript
exports[`Data snapshot snapshot testing Test with hint: I'm the hint 1`] = `
Object {
  "test": true,
}
`;
```

### Snapshot network requests

This plugin can be used for a variety of use case, the most common probably being snapshots of network requests.

```javascript
it("Snapshot request body", () => {
  cy.intercept("POST", "/api").as("clientRequest")
    .wait("@clientRequest").then(({ request }) => {
    cy.toMatchSnapshot(request)
  })
})
```

### More examples

See [our own test examples](https://github.com/matchawine/cypressDataSnapshot/blob/main/cypress/integration/expectedToPass.js)
.

## Thanks & thoughts

Thanks to [@alexbeletsky](https://github.com/alexbeletsky)
for [his inspirating article](https://medium.com/blogfoster-engineering/how-to-use-the-power-of-jests-snapshot-testing-without-using-jest-eff3239154e5)
about using Jest standalone!