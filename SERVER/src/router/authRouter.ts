import { rateLimiter } from "../middleware/rateLimiter";
import { 
    getAllUsers,
    loginUser,
    register,
    userLogin 
} from "../controller/user/user";
// import { loginValidation } from "../middleware/access";

const express =require("express")
const router = express.Router()

router
    .route("/login")    
    .get( userLogin )
    .post(rateLimiter(60, 10) , loginUser)
    
router.post("/signup", register)

router.get("/users", getAllUsers)

// module.exports = router;
export default router;