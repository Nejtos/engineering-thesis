const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const multer = require('multer')
require("dotenv").config();


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    }
    else return res.sendStatus(401);
}

router.get("/", async (req, res) => {
    const listofUsers = await Users.findAll();
    res.json(listofUsers);
});

router.get("/auth", verifyToken, async (req, res) => {
    const userId = JSON.stringify(parseInt(req.headers.userid));
    const user = await Users.findOne({ where: { id: userId } });
    res.json(user);
    // res.json({ message: 'Success' })
});

router.post("/login", jsonParser, async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({
        where: {
            email: email
        }
    })
    if (!user) {
        res.status(404).json({ status: res.statusCode, error: "User doesn't exist!" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                // if (password === user.password) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                var d1 = new Date(),
                    d2 = new Date(d1);
                d2.setMinutes(d1.getMinutes() + 30);
                // res.json({ token, user: user, expiresAt: d2 });
                res.json({ token, user: user, expiresAt: d2 });

                // res.status(201).json({ message: "User logged in successfully", success: true });
            } else {
                res.status(400).json({ error: "Wrong email and password combination!" });
            }
        })
    };
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

router.post("/avatarUpdate", upload.single('file'), async (req, res) => {
    Users.update({
        userAvatar: req.file.originalname,
    }, { where: { id: req.body.userId } })
    res.json("Users avatar updated");
    // res.json("Users status updated");
})

router.post("/personalInfoUpdate", jsonParser, async (req, res) => {
    const { id, cardNum, userCardExpirationDate, phoneNum, pass } = req.body;
    if (pass !== '') {
        bcrypt.hash(pass, 10).then((hash) => {
            Users.update({
                cardNum: cardNum,
                cardExpirationDate: userCardExpirationDate,
                phoneNum: phoneNum,
                password: hash,
            }, { where: { id: id } });
        })
    }
    else {
        Users.update({
            cardNum: cardNum,
            cardExpirationDate: userCardExpirationDate,
            phoneNum: phoneNum,
        }, { where: { id: id } });
    }

    // res.json("Users status updated");
})

router.post("/update", jsonParser, async (req, res) => {
    const { updatedUsers } = req.body;
    // console.log(users)
    updatedUsers.forEach(element => {
        Users.update({
            status: element.status,
            absenceReason: element.absenceReason,
        }, { where: { id: element.id } })
    });
    // res.json("Users status updated");
})

router.get("/getUser", async (req, res) => {
    const userId = JSON.stringify(parseInt(req.headers.userid));
    const user = await Users.findOne({ where: { id: userId } });
    res.json(user);
});

module.exports = router;