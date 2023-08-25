const express =require("express")
const router = express.Router()
const {access} = require("../controller/access")

router.post("/login", access )

module.exports = router;