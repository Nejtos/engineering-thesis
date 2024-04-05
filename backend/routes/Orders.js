const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
var bodyParser = require("body-parser");
const { Op } = require("sequelize");
var jsonParser = bodyParser.json();
const app = express();
app.use(express.json());
var moment = require('moment');


router.get("/", async (req, res) => {
  const listofOrders = await Orders.findAll();
  res.json(listofOrders);
});

router.post("/create", jsonParser, (req, res) => {
  const {
    customer_name,
    payment,
    address,
    delivery_type,
    products,
    quantity,
    category,
    amount,
  } = req.body;
  Orders.create({
    customer_name: customer_name,
    payment: payment,
    address: address,
    delivery_type: delivery_type,
    status: "Waiting",
    products: products,
    category: category,
    quantity: quantity,
    amount: amount,
  })
    .then(() => {
      res.json("New product created");
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
    });
});

router.post("/updateOrder", jsonParser, async (req, res) => {
  const { id } = req.body;
  // console.log(users)
  Orders.update({
    status: "Delivered"
  }, { where: { id: id } })
  // res.json("Users status updated");
})

router.post("/updateCollectedOrders", jsonParser, async (req, res) => {
  const { updatedOrders } = req.body;
    updatedOrders.forEach(element => {
        Orders.update({
            status: element.status
        }, { where: { id: element.id } })
  });
})

// router.get("/waiting", async (req, res) => {
//   const listofOrders = await Orders.findAll({ where: { status: "Waiting" } });
//   let listofAddress = []
//   let list = ""
//   for (let key in listofOrders) {
//     for (let y = 0; y < listofOrders[key].dataValues.address.length; y++) {
//       y === 0 ? list += (listofOrders[key].dataValues.address[y]) :
//       // list.push(listofOrders[key].dataValues.address[y])
//       list += (" " + listofOrders[key].dataValues.address[y])
//     }
//     listofAddress.push(list)
//     list = "";
//   }
//   console.log(listofAddress)
//   res.json(listofAddress);
// });

router.get("/waiting", async (req, res) => {
  const listofOrders = await Orders.findAll({ where: { status: "Waiting", delivery_type: "Home delivery" } });
  let listofAddress = []
  let list = ""
  let id = ""
  for (let key in listofOrders) {
    for (let y = 0; y < listofOrders[key].dataValues.address.length; y++) {
      y === 0 ? list += (listofOrders[key].dataValues.address[y]) :
      // list.push(listofOrders[key].dataValues.address[y])
      list += (" " + listofOrders[key].dataValues.address[y])
    }
    id = listofOrders[key].dataValues.id;
    const count = [id, list]
    list = count;
    listofAddress.push(list)
    list = "";
  }
  console.log(listofAddress)
  res.json(listofAddress);
});

router.get("/customerCollection", async (req, res) => {
  const listofOrders = await Orders.findAll({ where: { status: "Waiting", delivery_type: "Personal collection" } });
  res.json(listofOrders);
});

router.get("/menu/orderedCounter", async (req, res) => {
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

  res.send(values);
});

router.get("/menu/byCategoryCounter", async (req, res) => {
  var min_date = new Date();
  var max_date = new Date();
  min_date.setHours(0, 0, 0, 0);
  max_date.setHours(23, 59, 59, 999);
  let names = [];
  let values = [];
  const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })

  for (let key in dailyIncome) {
    for (let y = 0; y < dailyIncome[key].dataValues.products.length; y++) {
      names.push({ category: dailyIncome[key].dataValues.category[y], quantity: parseInt(dailyIncome[key].dataValues.quantity[y]) });
    }
  }

  const count = Array.from(
    names.reduce((r, c) => r.set(c.category, (r.get(c.category) || 0) + c.quantity), new Map()),
    (([id, value]) => ({ id, value }))
  )
  values = count;

  res.send(values);
});

/* Income for the following hours of the day */
router.get("/income/perhours", async (req, res) => {
  min_dateArray = [];
  max_dateArray = [];
  let currentDate = new Date().toJSON().slice(0, 10);
  var min_date = new Date();
  var max_date = new Date();
  for (let i = 1; i < 7; i++) {
    let b = 2 * i;
    min_dateArray.push(min_date.setHours(6 + b, 0, 0, 0))
    max_dateArray.push(max_date.setHours(7 + b, 59, 59, 999))
  }

  // let data = [{ period: "8am-10am", amount: 0 }, { period: "10am-12", amount: 0 }, { period: "12-2pm", amount: 0 }, { period: "2pm-4pm", amount: 0 }, { period: "4pm-6pm", amount: 0 }, { period: "6pm-8pm", amount: 0 }];
  let data = [{ x: "9.00am", y: 0 }, { x: "11.00am", y: 0 }, { x: "1.00pm", y: 0 }, { x: "3.00pm", y: 0 }, { x: "5.00pm", y: 0 }, { x: "7.00pm", y: 0 }];
  const ordersAmounts = await Orders.findAll({ attributes: ["products", "date"] });
  for (let key in ordersAmounts) {
    day = ordersAmounts[key].dataValues.date.toJSON().slice(0, 10);
    if (currentDate === day) {
      for (let y = 0; y < max_dateArray.length; y++) {
        let x = 0;
        const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_dateArray[y], max_dateArray[y]], } } })
        for (let key in dailyIncome) {
          x += parseFloat(dailyIncome[key].dataValues.products.length);
          data[y].y = x;
        }
      }
    }
  }
  res.send(data);
});

/* Income for the following days of the week */
router.get("/income/perday", async (req, res) => {
  var startOfWeek = moment().startOf('week').toDate();
  var endOfWeek = moment().endOf('week').toDate();
  let data = [{ day: "Sunday", Income: 0, Expenses: 0 }, { day: "Monday", Income: 0, Expenses: 0 }, { day: "Tuesday", Income: 0, Expenses: 0 }, { day: "Wednesday", Income: 0, Expenses: 0 }, { day: "Thursday", Income: 0, Expenses: 0 }, { day: "Friday", Income: 0, Expenses: 0 }, { day: "Saturday", Income: 0, Expenses: 0 }];
  let listofIncomes = 0;
  let day = "";
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const ordersAmounts = await Orders.findAll({ attributes: ["amount", "date"],  where: { date: { [Op.between]: [startOfWeek, endOfWeek], } } });
  for (let key in ordersAmounts) {
    let x = 0;
    day = ordersAmounts[key].dataValues.date;
    const y = day.getDay();
    x += parseFloat(ordersAmounts[key].dataValues.amount);
    listofIncomes = x.toFixed(2);
    if (data[y].day === dayNames[y]) {
      let z = parseFloat(data[y].Income);
      z += parseFloat(listofIncomes);
      data[y].Income = z.toFixed(2);
      let random = Math.floor(Math.random() * (54 - 38) + 38);
      dailyExpenses = (random * z / 100).toFixed(2);
      data[y].Expenses = dailyExpenses;
    }
  }
  res.send(data);
});

/* Income for the following days of the current month */
const createMonthlyData = async () => {
  let currentDate = new Date().toJSON().slice(8, 10);
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let getDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  let data =  [];

  // for (var i = 1; i <= getDays; i++) {
  //   let dataToSave = {
  //     day: '',
  //     income: '',
  //   }
  //   dataToSave.day = i;
  //   dataToSave.income = 0;
  //   data.push(dataToSave);
  // }

  for(var i = 1; i <= getDays; i++){
    let dataToSave = {
      day: '',
      Income: '',
      Expenses: '',
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
    const dayIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })
    for (let key in dayIncome) {
      value += parseFloat(dayIncome[key].dataValues.amount);
      dailyIncome += value;
    }
    let random = Math.floor(Math.random() * (54 - 38) + 38);
    dailyExpenses = (random * dailyIncome / 100).toFixed(2);
    dataToSave.Expenses = dailyExpenses;
    dataToSave.Income = dailyIncome.toFixed(2);
    data.push(dataToSave);
  }

  return data;
}

/* Income for the following days of the current month */
router.get("/income/perdayofmonth", async (req, res) => {
  let arr = await createMonthlyData();
  // let currentDate = new Date().toJSON().slice(8, 10);
  // var min_date = new Date();
  // var max_date = new Date();
  // min_date.setHours(0, 0, 0, 0);
  // let dailyIncome = 0;
  // let value = 0;
  // const dayIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })
  // for (let key in dayIncome) {
  //   value += parseFloat(dayIncome[key].dataValues.amount);
  //   dailyIncome = value.toFixed(2);
  // }

  // arr[currentDate-1].income = dailyIncome;

  res.json(arr);
});

router.get("/income/daily", async (req, res) => {
  var min_date = new Date();
  var max_date = new Date();
  min_date.setHours(0, 0, 0, 0);
  // max_date.setHours(23, 59, 59, 999);
  let listofIncomes = 0;
  let x = 0;
  const dailyIncome = await Orders.findAll({ where: { date: { [Op.between]: [min_date, max_date], } } })
  for (let key in dailyIncome) {
    x += parseFloat(dailyIncome[key].dataValues.amount);
    listofIncomes = x.toFixed(2);
  }
  res.json(listofIncomes);
});

router.get("/income", async (req, res) => {
  let listofIncomes = 0;
  let x = 0;
  const ordersAmounts = await Orders.findAll({ attributes: ["amount"] });
  for (let key in ordersAmounts) {
    x += parseFloat(ordersAmounts[key].dataValues.amount);
    // listofIncomes.push(ordersAmounts[key].dataValues.amount);
    listofIncomes = x.toFixed(2);
  }
  res.json(listofIncomes);
});

module.exports = router;
