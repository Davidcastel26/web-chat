import { 
    getAllUsers,
    loginUser,
    register,
    userLogin 
} from "../controller/user/user";

const express =require("express")
const router = express.Router()

router.post("/login", loginUser )
router.get("/login", userLogin )

router.post("/signup", register)

router.get("/users", getAllUsers)

module.exports = router;