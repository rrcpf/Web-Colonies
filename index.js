// módulos da plataforma
import express from 'express'

const PORT = process.env.PORT || 3000
const app = express()

app.set('port', PORT)

app.use(express.static("./"))


app.listen(PORT, () => {
    console.log(`Escutando em: ${ PORT }`)
  })



