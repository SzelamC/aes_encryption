import express, { Express } from "express";
import dotenv from "dotenv";
import EncryptionRouter from "./EncryptionRouter"

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/aes", EncryptionRouter)

export default app
