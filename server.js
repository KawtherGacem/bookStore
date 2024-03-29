if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require("express") //import
const app = express()
const expressLayouts = require("express-ejs-layouts")
const dotenv = require('dotenv')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
dotenv.config()

app.set("view engine", "ejs") //set ejs as our view engine 
app.set("views", __dirname+ "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts) 
app.use(express.static("public"))
app.use(bodyParser.urlencoded({limit : '10mb', extended: false }))
app.use(methodOverride('_method'))
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',()=> console.log('connected to mongoose'))
app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)