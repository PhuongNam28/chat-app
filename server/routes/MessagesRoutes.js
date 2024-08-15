import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddeWare.js";
import { getMessages } from "../controllers/MessagesController.js";

const messagesRoutes = Router()


messagesRoutes.post("/get-messages",verifyToken,getMessages)


export default messagesRoutes