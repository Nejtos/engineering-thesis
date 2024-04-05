const express = require("express");
const router = express.Router();
const Data = require("../models/Data");
const Orders = require("../models/Orders");
const { Op } = require("sequelize");

/* Counter for orders position from menu of the day */
const createDailyOrdersData = async () => {
    let data = [];
    const menuItems = await Data.findAll();

    var min_date = new Date();
    var max_date = new Date();
    min_date.setHours(0, 0, 0, 0);
    max_date.setHours(23, 59, 59, 999);
    let names = [];
    let values = [];
    const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })

    for (let key in dailyIncome) {
        for (let y = 0; y < dailyIncome[key].dataValues.products.length; y++) {
            names.push({ product: dailyIncome[key].dataValues.products[y], quantity: parseInt(dailyIncome[key].dataValues.quantity[y]) });
        }
    }

    const count = Array.from(
        names.reduce((r, c) => r.set(c.product, (r.get(c.product) || 0) + c.quantity), new Map()),
        (([product, count]) => ({ product, count }))
    )
    values = count;

    for (var i = 0; i < menuItems.length; i++) {
        let dataToSave = {
            productName: '',
            Quantity: 0,
        }
        dataToSave.productName = menuItems[i].description;
        for (var j = 0; j < values.length; j++) {
            if (values[j].product === menuItems[i].description) {
                dataToSave.Quantity = values[j].count;
            }
        }
        // dataToSave.quantity = 0;
        data.push(dataToSave);
    }
    return data;
}

/* Ordered position from menu of the day */
router.get("/dailyOrders", async (req, res) => {
    let arr = await createDailyOrdersData();
    res.json(arr);
});

/* Monthly sales counter */
router.get("/monthlyCategoryCounter", async (req, res) => {
    let currentDate = new Date().toJSON().slice(8, 10);
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let getDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    let data = [];
    let names = [];
    let values = [];

    // for (var i = 1; i <= getDays; i++) {
    //   let dataToSave = {
    //     day: '',
    //     income: '',
    //   }
    //   dataToSave.day = i;
    //   dataToSave.income = 0;
    //   data.push(dataToSave);
    // }

    for (var i = 1; i <= getDays; i++) {


        var min_date = new Date();
        var max_date = new Date();
        min_date.setDate(i);
        min_date.setHours(0, 0, 0, 0);
        max_date.setDate(i);
        max_date.setHours(23, 59, 59, 999);
        let value = 0;
        const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })

        for (let key in dailyIncome) {
            for (let y = 0; y < dailyIncome[key].dataValues.products.length; y++) {
                names.push({ category: dailyIncome[key].dataValues.category[y], quantity: parseInt(dailyIncome[key].dataValues.quantity[y]) });
            }
        }
        // const count = Array.from(
        //     names.reduce((r, c) => r.set(c.category, (r.get(c.category) || 0) + c.quantity), new Map()),
        //     (([id, value]) => ({ id, value }))
        // )
        // values = count;
    }
    const count = Array.from(
        names.reduce((r, c) => r.set(c.category, (r.get(c.category) || 0) + c.quantity), new Map()),
        (([id, value]) => ({ id, value }))
    )
    data = count;
    res.send(data);
});

/* Income for the following days of the current month */
const createMonthlyData = async () => {
    let currentDate = new Date().toJSON().slice(8, 10);
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let getDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    let data = [];

    // for (var i = 1; i <= getDays; i++) {
    //   let dataToSave = {
    //     day: '',
    //     income: '',
    //   }
    //   dataToSave.day = i;
    //   dataToSave.income = 0;
    //   data.push(dataToSave);
    // }

    for (var i = 1; i <= getDays; i++) {
        let dataToSave = {
            x: '',
            y: 0,
        }
        dataToSave.x = i;

        var min_date = new Date();
        var max_date = new Date();
        min_date.setDate(i);
        min_date.setHours(0, 0, 0, 0);
        max_date.setDate(i);
        max_date.setHours(23, 59, 59, 999);
        let value = 0;
        const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })

        for (let key in dailyIncome) {
            for (let y = 0; y < dailyIncome[key].dataValues.products.length; y++) {
                value += parseInt(dailyIncome[key].dataValues.quantity[y])
            }
        }

        dataToSave.y = value;
        data.push(dataToSave)
    }
    return data;
}

/* Income for the following days of the current month */
router.get("/monthlySales", async (req, res) => {
    let arr = await createMonthlyData();
    res.json(arr);
});

/* Income for the following days of the current month */
const createSuppliesRatioData = async () => {
    let currentDate = new Date().toJSON().slice(8, 10);
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let getDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    let data = [];

    for (var i = 1; i <= getDays; i++) {
        let dataToSave = {
            day: '',
            Delivery: '',
            Personal_collection: '',
        }
        dataToSave.day = i;

        var min_date = new Date();
        var max_date = new Date();
        min_date.setDate(i);
        min_date.setHours(0, 0, 0, 0);
        max_date.setDate(i);
        max_date.setHours(23, 59, 59, 999);
        let dailyExpenses = 0;
        let dailyIncome = 0;
        let value = 0;
        let pCollectionValue = 0;
        const pCollection = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], }, delivery_type: "Personal collection" } })
        const delivery = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], }, delivery_type: "Home delivery" } })
        for (let key in pCollection) {
            pCollectionValue += 1;
        }
        for (let key in delivery) {
            value += 1;
        }
        dataToSave.Personal_collection = parseInt(pCollectionValue);
        dataToSave.Delivery = parseInt(value);
        data.push(dataToSave);
    }

    return data;
}

/* Income for the following days of the current month */
router.get("/suppliesRatio", async (req, res) => {
    let arr = await createSuppliesRatioData();
    res.json(arr);
});

/* Annual sales counter */
router.get("/annualCategoryCounter", async (req, res) => {
    let currentDate = new Date().toJSON().slice(8, 10);
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let getDays = new Date(currentYear, currentMonth, 0).getDate();
    let data = [];
    let names = [];
    let values = [];

    // for (var i = 1; i <= getDays; i++) {
    //   let dataToSave = {
    //     day: '',
    //     income: '',
    //   }
    //   dataToSave.day = i;
    //   dataToSave.income = 0;
    //   data.push(dataToSave);
    // }
    let numOfMonths = 12;

    // for (var i = 1; i <= getDays; i++) {
    //   let dataToSave = {
    //     day: '',
    //     income: '',
    //   }
    //   dataToSave.day = i;
    //   dataToSave.income = 0;
    //   data.push(dataToSave);
    // }
    for (var j = 1; j <= numOfMonths; j++) {
        let getDays = new Date(currentYear, j, 0).getDate();
        for (var i = 1; i <= getDays; i++) {

            var min_date = new Date();
            var max_date = new Date();
            min_date.setMonth(j);
            min_date.setDate(i);
            min_date.setHours(0, 0, 0, 0);
            max_date.setMonth(j);
            max_date.setDate(i);
            max_date.setHours(23, 59, 59, 999);
            const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })

            for (let key in dailyIncome) {
                for (let y = 0; y < dailyIncome[key].dataValues.products.length; y++) {
                    names.push({ category: dailyIncome[key].dataValues.category[y], quantity: parseInt(dailyIncome[key].dataValues.quantity[y]) });
                }
            }
        }
    }
    const count = Array.from(
        names.reduce((r, c) => r.set(c.category, (r.get(c.category) || 0) + c.quantity), new Map()),
        (([id, value]) => ({ id, value }))
    )
    data = count;
    res.send(data);
    return data;
});

/* Income for the following months of the current year */
const createAnnualData = async () => {
    let currentDate = new Date().toJSON().slice(8, 10);
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    let data = [];

    let numOfMonths = 12;
    let monthlyValue = 0;

    // for (var i = 1; i <= getDays; i++) {
    //   let dataToSave = {
    //     day: '',
    //     income: '',
    //   }
    //   dataToSave.day = i;
    //   dataToSave.income = 0;
    //   data.push(dataToSave);
    // }
    for (var j = 0; j < numOfMonths; j++) {
        let dataToSave = {
            x: '',
            y: 0,
        }
        dataToSave.x = j + 1;
        monthlyValue = 0;
        let getDays = new Date(currentYear, j, 0).getDate();
        for (var i = 1; i <= getDays; i++) {

            var min_date = new Date();
            var max_date = new Date();
            min_date.setMonth(j);
            min_date.setDate(i);
            min_date.setHours(0, 0, 0, 0);
            max_date.setMonth(j);
            max_date.setDate(i);
            max_date.setHours(23, 59, 59, 999);
            let value = 0;
            const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })

            for (let key in dailyIncome) {
                for (let y = 0; y < dailyIncome[key].dataValues.products.length; y++) {
                    value += parseInt(dailyIncome[key].dataValues.quantity[y])
                }
            }
            monthlyValue += value;
        }
        dataToSave.y = monthlyValue;
        data.push(dataToSave)
    }
    return data;
}

router.get("/annualSales", async (req, res) => {
    let arr = await createAnnualData();
    res.json(arr);
});

/* Income for the total balance */
const createTotalBalanceData = async () => {
    let currentDate = new Date().toJSON().slice(8, 10);
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    let data = [];

    let numOfMonths = 12;
    let monthlyValue = 0;

    // for (var i = 1; i <= getDays; i++) {
    //   let dataToSave = {
    //     day: '',
    //     income: '',
    //   }
    //   dataToSave.day = i;
    //   dataToSave.income = 0;
    //   data.push(dataToSave);
    // }
    for (var j = 0; j < numOfMonths; j++) {
        let dataToSave = {
            day: '',
            Income: 0,
            Expenses: 0,
        }
        dataToSave.day = j + 1;
        monthlyValue = 0;
        let getDays = new Date(currentYear, j, 0).getDate();
        for (var i = 1; i <= getDays; i++) {

            var min_date = new Date();
            var max_date = new Date();
            min_date.setMonth(j);
            min_date.setDate(i);
            min_date.setHours(0, 0, 0, 0);
            max_date.setMonth(j);
            max_date.setDate(i);
            max_date.setHours(23, 59, 59, 999);
            let value = 0;
            const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })

            for (let key in dailyIncome) {
                value += parseFloat(dailyIncome[key].dataValues.amount);
            }
            monthlyValue += value;
        }
        let random = Math.floor(Math.random() * (54 - 38) + 38);
        dailyExpenses = (random * monthlyValue / 100).toFixed(2);
        dataToSave.Expenses = dailyExpenses;
        dataToSave.Income = monthlyValue.toFixed(2);
        data.push(dataToSave)
    }
    return data;
}

router.get("/totalBalance", async (req, res) => {
    let arr = await createTotalBalanceData();
    res.json(arr);
});

/* Counter for top sellings product */
const topSellingsData = async () => {
    let data = [];
    const menuItems = await Data.findAll();

    let names = [];
    let values = [];
    const dailyIncome = await Orders.findAll()

    for (let key in dailyIncome) {
        for (let y = 0; y < dailyIncome[key].dataValues.products.length; y++) {
            names.push({ product: dailyIncome[key].dataValues.products[y], quantity: parseInt(dailyIncome[key].dataValues.quantity[y]) });
        }
    }

    const count = Array.from(
        names.reduce((r, c) => r.set(c.product, (r.get(c.product) || 0) + c.quantity), new Map()),
        (([product, count]) => ({ product, count }))
    )
    values = count;

    for (var i = 0; i < menuItems.length; i++) {
        let dataToSave = {
            productName: '',
            Quantity: 0,
        }
        dataToSave.productName = menuItems[i].description;
        for (var j = 0; j < values.length; j++) {
            if (values[j].product === menuItems[i].description) {
                dataToSave.Quantity = values[j].count;
            }
        }
        // dataToSave.quantity = 0;
        data.push(dataToSave);
    }
    return data;
}

/* Top sellings data */
router.get("/topSellings", async (req, res) => {
    let arr = await topSellingsData();
    res.json(arr);
});

module.exports = router;