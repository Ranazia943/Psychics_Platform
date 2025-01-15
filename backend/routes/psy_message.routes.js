    import express from "express";
    import { getMessages, sendMessage } from "../controllers/message.controller.js";
    import PsyprotectRoute from "../middleware/PsyprotectRoute.js";

    const router = express.Router();

    router.get("/:id", PsyprotectRoute, getMessages);
    router.post("/send/:id", PsyprotectRoute, sendMessage);

    export default router;
