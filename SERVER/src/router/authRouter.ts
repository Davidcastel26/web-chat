import { 
    getAllUsers,
    loginUser,
    register,
    userLogin 
} from "../controller/user/user";

const express =require("express")
const router = express.Router()

router
    .route("/login")    
    .get( userLogin )
    .post(loginUser )

router.post("/signup", register)

router.get("/users", getAllUsers)

// module.exports = router;
export default router;