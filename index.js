const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const argv = require("./lib/argv");
const db = require("./lib/db");

const getTAddresses = require("./lib/getTAddresses");
const getZAddresses = require("./lib/getZAddresses");
const newTAddress = require("./lib/newTAddress");
const newZAddress = require("./lib/newZAddress");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(session({
	store: new RedisStore({
		client: db
	}),
	secret: "cat tKeyboard",
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/", (req, res) => {
	req.session.pass = req.body.id;
	res.redirect("/dash");
});

app.get("/dash", (req, res, next) => {
	if(!req.session.pass) res.end();

	Promise.all([ getTAddresses(req.session.pass), getZAddresses(req.session.pass) ])
	.then(a => {
		const [ tAddresses, zAddresses ] = a;
		res.locals = { tAddresses, zAddresses };
	})
	.then(next);
}, (req, res) => {
	res.render("dash");
});


app.get("/t_address", (req, res) => {
	if(!req.session.pass) res.end();

	newTAddress(req.session.pass)
	.then(() => {
		res.redirect("/dash");
	});
});

app.get("/z_address", (req, res) => {
	if(!req.session.pass) res.end();

	newZAddress(req.session.pass)
	.then(() => {
		res.redirect("/dash");
	});
});

app.listen(argv.port || 8080);
