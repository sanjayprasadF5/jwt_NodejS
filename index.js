const express = require("express")
const auth = require("./routes/auth")
const posts = require("./routes/posts")
const app = express()

app.use(express.json())
app.use("/auth", auth)
app.use("/posts", posts)

app.listen(3000, () => {
	console.log(`Server is running at 3000 Port`)
})
