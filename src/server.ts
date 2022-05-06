import app from "./index"
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})
