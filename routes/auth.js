const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const { users } = require("../db")
const valida = [
	check("email", "Please Provide Proper Email").isEmail(),
	check("password", "Password length should be max than 5 ").isLength({
		min: 6,
	}),
]
router.post("/singup", valida, async (req, res) => {
	const { email, password } = req.body

	// Validate the input
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		})
	}
	console.log(email, password)

	console.log(users)
	// Validate is user does not already exist
	let user = users.find((user) => {
		return user.email === email
	})
	if (user) {
		res.status(400).json({
			errors: [
				{
					value: "This user already exists",
				},
			],
		})
	}

	let hasedPassword = await bcrypt.hash(password, 10)

	// pushing into array
	users.push({
		email: email,
		password: hasedPassword,
	})
	console.log(hasedPassword)

	let token = await JWT.sign(
		{
			email: email,
		},
		"IAMsecretKeyHere",
		{
			expiresIn: 360000,
		}
	)

	res.json({ token })
})

router.post("/login", async (req, res) => {
	const { email, password } = req.body
	let user = users.find((user) => user.email === email)
	if (!user) {
		res.status(400).json({
			errors: [
				{
					value: "Invalid Credentials",
				},
			],
		})
	}
	let isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		res.status(400).json({
			errors: [
				{
					value: "Invalid Credentials11111111",
				},
			],
		})
	}

	let token = await JWT.sign(
		{
			email: email,
		},
		"IAMsecretKeyHere",
		{
			expiresIn: 360000,
		}
	)

	res.json({ token })
})

router.get("/users", (req, res) => {
	res.json(users)
})
module.exports = router
