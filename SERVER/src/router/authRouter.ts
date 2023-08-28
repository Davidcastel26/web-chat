import { postUser } from "../controller/user/user";

const express =require("express")
const router = express.Router()

// router.post("/login", postUser )

router.post("/register", postUser)

module.exports = router;