import { default as request } from "supertest"
import app from "./index"

// encrypt part
describe("POST /aes/encrypt", () => {
  describe("given plain_text and aes_key", () => {
    // encrypt the plain_text use aes_key 

    // status code 202
    test("should respond with 202", async () => {
      const response = await request(app).post("/aes/encrypt").send({
        plain_text: "Test Message",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.statusCode).toBe(202)
    })

    // Content type: json
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/aes/encrypt").send({
        plain_text: "Test Message",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    // return the cipher text
    test("should return cipher text in the response object", async () => {
      const response = await request(app).post("/aes/encrypt").send({
        plain_text: "Test Message",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.body.cipher_text).toBeDefined()
    })

    // check the result
    // should get 48e11b489072bec90c08f7ed44a7959c
    test("return the correct result", async () => {
      const response = await request(app).post("/aes/encrypt").send({
        plain_text: "Test Message",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.body.cipher_text).toEqual("48e11b489072bec90c08f7ed44a7959c")
    })
  })

  describe("empty plain_text or aes_key", () => {
    // return error message
    // status code 400

    // empty plain_text
    test("should respond 400 with empty plain_text", async () => {
      const response = await request(app).post("/aes/encrypt").send({
        plain_text: "",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.statusCode).toBe(400)
    })

    test("should respond 400 with empty aes_key", async () => {
      const response = await request(app).post("/aes/encrypt").send({
        plain_text: "Test Message",
        aes_key: ""
      })
      expect(response.statusCode).toBe(400)
    })

    test("should return error message indicate the request body is undefined", async () => {
      const response = await request(app).post("/aes/encrypt").send({
        plain_text: "",
        aes_key: ""
      })
      expect(response.body.errorMsg).toEqual("request body is undeinfined")
    })
  })
})


// decrypt part
describe("POST /aes/decrypt", () => {
  // descrpyt the cipher_text by aes_key

  // status code
  describe("given cipher_text and aes_key", () => {
    test("should respond with 202", async () => {
      const response = await request(app).post("/aes/decrypt").send({
        cipher_text: "f15d10c6165f9dde2767e36932ab525b",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.statusCode).toBe(202)
    })

    // Content type: json
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/aes/decrypt").send({
        cipher_text: "f15d10c6165f9dde2767e36932ab525b",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.header['content-type']).toEqual(expect.stringContaining('json'))
    })

    // return plain_text and plain_text in base64
    test("should return plain_text and base64 in the response object", async () => {
      const response = await request(app).post("/aes/decrypt").send({
        cipher_text: "f15d10c6165f9dde2767e36932ab525b",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.body.plain_text).toBeDefined()
      expect(response.body.base64).toBeDefined()
    })

    // return the plain_text and plain_text in base64
    test("return the correct result", async () => {
      const response = await request(app).post("/aes/decrypt").send({
        cipher_text: "48e11b489072bec90c08f7ed44a7959c",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.body.plain_text).toEqual("Test Message")
      expect(response.body.base64).toEqual("VGVzdCBNZXNzYWdl")
    })
  })


  describe("empty cipher_text or aes_key", () => {
    // return error message
    // status code 400

    // empty cipher_text
    test("should respond 400 with empty cipher_text", async () => {
      const response = await request(app).post("/aes/decrypt").send({
        cipher_text: "",
        aes_key: "404D635166546A576E5A723475377721"
      })
      expect(response.statusCode).toBe(400)
    })

    // empty aes_key
    test("should respond 400 with empty aes_key ", async () => {
      const response = await request(app).post("/aes/decrypt").send({
        cipher_text: "48e11b489072bec90c08f7ed44a7959c",
        aes_key: ""
      })
      expect(response.statusCode).toBe(400)
    })

    test("should return error message indicate the request body is undefined", async () => {
      const response = await request(app).post("/aes/decrypt").send({
        cipher_text: "",
        aes_key: ""
      })
      expect(response.body.errorMsg).toEqual("request body is undeinfined")
    })
  })

})
