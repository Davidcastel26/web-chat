import { 
    getAllUsers,
    loginUser,
    register 
} from "../controller/user/user";

const express =require("express")
const router = express.Router()

router.post("/login", loginUser )

router.post("/signup", register)

router.get("/users", getAllUsers)

module.exports = router;