import {Router} from "express"
import { searchContacts } from "../controllers/ContactController.js"
import {verifyToken} from "../middlewares/AuthMiddeware.js"
const contactsRoutes = Router()

contactsRoutes.post("/search",verifyToken,searchContacts)

export default contactsRoutes