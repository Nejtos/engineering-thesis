const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.get("/",async (req, res) => {
    const listofDeliverers = await Users.findAll({where: { role: "deliverer"}});
    res.json(listofDeliverers);
});

module.exports = router;