import { serialize as originalSerialize } from "serialize-anything"

const nativeObjects = [
  "Date",
  "Number",
  "String",
  "Boolean",
  "Array",
  "RegExp",
  "Object",
]

/**
 * Serialize-javascript uses toString() and so sends back native constructors like `function String() { [native code]}`
 *
 * @param serializedValue
 * @returns {string}
 */
const cleanNativeObjectsInSerializedString = serializedValue =>
  nativeObjects.reduce(
    (serializedValue, nativeObject) =>
      serializedValue.replaceAll(
        `function ${nativeObject}() { [native code] }`,
        nativeObject,
      ),
    serializedValue,
  )

export const serialize = value => {
  const serializedValue = originalSerialize(value)
  return cleanNativeObjectsInSerializedString(serializedValue)
}
