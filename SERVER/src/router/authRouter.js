const express =require("express")
const router = express.Router()
const {access} = require("../controller/access")

router.post("/login", access )

router.post("/register", access)

module.exports = router;