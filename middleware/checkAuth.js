const JWT = require("jsonwebtoken")

const checkAuth = async (req, res, next) => {
	const token = req.header("x-auth-token")

	if (!token) {
		return res.status(400).json({
			errors: [
				{
					msg: "No token found!",
				},
			],
		})
	}

	try {
		let user = await JWT.verify(token, "IAMsecretKeyHere")
		req.user = user.email
		next()
	} catch (error) {
		return res.json({
			errors: [
				{
					msg: "Access Denied",
				},
			],
		})
	}
}

/* const checkAuth = async (req, res, next) => {
	let validuser = true
	if (validuser) {
		next()
	} else {
		return res.json({
			errors: [
				{
					msg: "Access Denied",
				},
			],
		})
	}
} */
module.exports = { checkAuth }
