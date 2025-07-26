const {connectVisitors, getAllConnectedVisitors } = require("../controller/connectVisitor");
const express = require('express');
const router = express.Router();


router.post("/connect-visitor", connectVisitors);
router.get("/connected-visitors", getAllConnectedVisitors);

module.exports = router;