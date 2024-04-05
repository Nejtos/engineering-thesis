const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const Data = require("../models/Data");

router.get("/",async (req, res) => {
    const listofData = await Data.findAll();
    res.json(listofData);
});

router.get("/length", async (req, res) => {
    const listOfData = await Data.findAll();
    const dataLength = listOfData.length;
    console.log(dataLength);
    res.json(dataLength)
})

router.get("/notAvailable", async (req, res) => {
    const listofNotAvailables = await Data.findAll({where: { status: "Not available"}});
    res.json(listofNotAvailables);
});

router.get("/promotions", async (req, res) => {
    const listofPromotions = await Data.findAll({where: { status: "Promotion"}});
    res.json(listofPromotions);
});

router.post("/update", jsonParser, async (req, res) => {
    const { updatedData } = req.body;
    updatedData.forEach(element => {
        Data.update({
            price: element.price,
            status: element.status
        }, { where: { id: element.id } })
    });
    // res.json("Users status updated");
})

module.exports = router;