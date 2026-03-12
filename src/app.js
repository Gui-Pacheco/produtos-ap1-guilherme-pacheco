const express = require("express")

const app = express()

app.use(express.json())

const produtosRoutes = require("./routes/produtos")

app.use("/api/v1/produtos", produtosRoutes)

// middleware de log
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    next()
})

// middleware de erro global
app.use((err, req, res, next) => {
    res.status(500).json({ erro: err.message })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})