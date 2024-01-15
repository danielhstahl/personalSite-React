import { imageStyle } from "./image";

describe("imageStyle", () => {
    test("it returns style for string input", () => {
        expect(imageStyle("100px")).toEqual({ minHeight: "100px", minWidth: "100%" })
    })
})