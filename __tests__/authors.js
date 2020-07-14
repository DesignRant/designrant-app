import yaml from "js-yaml"
import fs from "fs"
const doc = yaml.safeLoad(fs.readFileSync(`content/author.yaml`, "utf8"))

const expectedAuthorKeys = [
  "id",
  "from",
  "website",
  "shortBio",
  "bio",
  "avatar",
  "twitter",
]
describe("Authors Data Formatting", () => {
  doc.forEach(author => {
    describe(`${author.id}`, () => {
      it("Contains Correct Key Values", () => {
        expect(
          Object.keys(author)
            .filter(
              key => expectedAuthorKeys.findIndex(item => item === key) > -1
            )
            .sort()
        ).toEqual(expectedAuthorKeys.sort())
      })
    })
  })
})
