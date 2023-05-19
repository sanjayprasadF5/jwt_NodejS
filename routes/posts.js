const router = require("express").Router()
const { checkAuth } = require("../middleware/checkAuth")
const { publicPost, privatePost } = require("../db")
router.get("/public", (req, res) => {
	res.send(publicPost)
})

router.get("/private", checkAuth, (req, res) => {
	res.send(privatePost)
})

/* // For protecting routes 1
router.get(
	"/private",
	(req, res, next) => {
		let validuser = false
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
	},
	(req, res) => {
		res.send(privatePost)
	}
)
 */
module.exports = router
