import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load server/.env regardless of where the process is started from.
dotenv.config({ path: path.resolve(__dirname, '../.env') })
