const express = require('express')
const cors = require("cors")

require('./db/config');
const User = require('./db/User')
const Product = require('./db/Product')

const app = express()
app.use(cors())

app.use(express.json())
// const connectDb = async () => {
//   mongoose.connect('mongodb://localhost:27017/eCommerce');
//   const productSchema = new mongoose.Schema({})
//   const product = mongoose.model('product',productSchema);
//   const data = await product.find();
//   console.log(data)
// }

// connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.post('/register', async (req,res) => {
  let users = new User(req.body);
  let result = await users.save()
  result = result.toObject()
  delete result.password
  res.send(result)
})

app.post('/login', async(req,res) => {
  if(req.body.email && req.body.password){
    let user = await User.findOne(req.body).select('-password');
    if(user){
      res.send(user)
    }
    else{
      res.send({result:'No User Found'})
    }
  }else{
    res.send({result:'No User Found'})
  }
})

app.post('/addProducts', async(req,res) => {
  let products = new Product(req.body);
  let result = await products.save();
  res.send(result)
})
 
app.listen(3000)