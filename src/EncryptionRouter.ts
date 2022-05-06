import express, { Request, Response } from "express"
const router = express.Router();
const CryptoJS = require("crypto-js");


/**
  * @params input_text { string }
  * @params input_key { string }
  * @return cipher_text HEX
  */
function aesEncryption(input_text: string, input_key: string) {
  try {
    // parse the input
    const plainText = input_text
    const aesKey = CryptoJS.enc.Utf8.parse(input_key);

    const encrypted = CryptoJS.AES.encrypt(plainText, aesKey, { mode: CryptoJS.mode.ECB })
    // console.log(encrypted)
    return encrypted.toString(CryptoJS.format.Hex);
  } catch (err) {
    throw err
  }
}

/**
  * @params input_text { string }
  * @params input_key { string }
  * @return { plain_text, base_64 }
  */
function aesDecryption(input_text: string, input_key: string) {
  try {
    // parse the input
    let cipherText = CryptoJS.enc.Hex.parse(input_text)
    cipherText = CryptoJS.enc.Base64.stringify(cipherText);
    const aesKey = CryptoJS.enc.Utf8.parse(input_key)
    const decrypted = CryptoJS.AES.decrypt(cipherText, aesKey, { mode: CryptoJS.mode.ECB })

    return {
      plain_text: CryptoJS.enc.Utf8.stringify(decrypted),
      base64: CryptoJS.enc.Base64.stringify(decrypted)
    }
  } catch (err) {
    throw err
  }
}

/**
  * @api {POST} /aes/encrypt Encrypt the coming text
  * @apiName AesEncrypt
  * @apiGroup User
  *
  * @apiBody {String} plain_text - Text to encrypt
  * @apiBody {String} aes_key - Key for Aes encryption
  *
  * @apiSuccess {string} cipher text utf8
  *
  * @apiError {string} error message
  */

router.post("/encrypt", (req: Request, res: Response) => {
  const { plain_text, aes_key } = req.body
  if (plain_text === "" || aes_key === "") {
    res.status(400).send({ errorMsg: "request body is undeinfined" })
  }

  const encryptedText = aesEncryption(plain_text, aes_key)
  res.status(202).send({ cipher_text: encryptedText })
})


/**
  * @api {POST} /aes/encrypt Encrypt the coming text
  * @apiName AesEncrypt
  * @apiGroup User
  *
  * @apiBody {String} cipher_text - Text to decrypted
  * @apiBody {String} aes_key - Key for Aes encryption
  *
  * @apiSuccess {object} plain text utf8 and base64 format string
  *
  * @apiError {string} error message
  */

router.post("/decrypt", (req: Request, res: Response) => {
  const { cipher_text, aes_key } = req.body

  if (cipher_text === "" || aes_key === "") {
    res.status(400).send({ errorMsg: "request body is undeinfined" })
  }

  const decryptedText = aesDecryption(cipher_text, aes_key);
  res.status(202).send(decryptedText)
})

export default router
