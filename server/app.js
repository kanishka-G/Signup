const connectDB = require('./db/connect');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config()




app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    next();
  });
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');


app.post('/add-user', userRoutes);
app.post('/login-user', userRoutes);
app.post('/add-order',orderRoutes);
app.get('/get-order',orderRoutes);
app.use(express.static('./public'))
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello, world!');
});


// app.post('/add-users', async (req, res) => {
//     try {
//       const { name, phone, password } = req.body;
  
//       // Hash password before saving
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const user = new User({ name, phone, password: hashedPassword });
//       await user.save();
  
//       // Generate and send JWT
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.status(201).json({ message: 'User registered successfully', token });
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });




// app.post('/anime', (req, res) => {
//     const user = {
//         id: 1,
//         username: "anil",
//         email: "abc@test.com"
//     }
//     jwt.sign({user},process.env.JWT_SECRET, {expiresIn: '300s'},(err,token)=>{
//         res.json({
//             token
//         })
//     })
// });

app.post('/login',verifyToken,(req,res)=>{
    jwt.verify(req.token,process.env.JWT_SECRET,(err,authData)=>{
        if(err){
            res.send({result:"Invalid Token"})
        }else{
            res.json({
                message:"Profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization']; 
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else{
    res.send({
        result:'Token is not valid'
    })
  }
}
const port = 3001

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on port ${port}...`))

    }catch(error){
        console.log(error)
    }
}
start()
