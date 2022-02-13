// módulos da plataforma
import http from 'http'
import express from 'express'

const PORT = 3000
const app = express()

app.set('port', PORT)

app.use(express.static("."))


app.listen(PORT, () => {
    console.log('Escutando em: http://localhost:3000')
  })



