export const SECRECT_KEY="privateKey"
import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, PORT, SECRET_KEY, SECRET_IV, ECNRYPTION_METHOD } = process.env

export default {
  env: "",
  port: 3000,
  secret_key: "12345",
  secret_iv: "12345",
  ecnryption_method: "aes-256-cbc",
}

