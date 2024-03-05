const express = require('express');
const http = require('http');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');
// const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
require('dotenv').config();

// require('dotenv').config();

const app = express();


    app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

const server = http.createServer(app);

// Initialize Socket.IO
var io = require('socket.io')(server, { cors :{ origins:'*',methods: ["GET", "POST"]}});
const port = process.env.PORT || 5000;


// Connection URI for MongoDB Atlas
const uri = process.env.MONGO_URI;

// Connect to MongoDB Atlas
MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db('Cardgame'); // Replace 'your_database_name' with your actual database name
   //middleware

   const verifyToken = (req, res, next) => {
    console.log("here" +JSON.stringify(req.body))
  const token = req.headers.authorization;
  if (!token) {
     res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token.split(' ')[1], '1'); // Assuming token format is "Bearer <token>"
    req.user = decoded; // Attach user information to request object
    req.game=req.body;
    const collection = db.collection('Register');
const {email,password}=req.user;
  // Find user by email
  console.log("email"+email+" " + "password "+password)
  console.log("body"+JSON.stringify(req.body.deck))
  collection.findOne({ email: email, password: password })
    .then(user => {
      if (!user) {
        res.status(401).json({ result: 'Invalid' });
        console.log("invalid")
      }
      else{
        
    next(); // Move to next middleware or route handler
    }}
    ) 
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};













  io.on('connection', socket => {
      console.log('A user connected');
const collection = db.collection('Register');
      // Handle message event
      socket.on('message', (message) => {
        // console.log('Message reived:', message);
       const data=JSON.parse(message)
        
       const {token}=data;
       console.log(typeof(message))
       try{
        const decoded = jwt.verify(token, '1');
       
    const {email,password}=decoded;

     collection.findOne({ email: email, password: password })
    .then(user => {
      if (!user) {
        io.emit("{ result: 'Invalid' }");
        console.log("invalid")
      }
      else{
          

           try {
    // Update a single document
    const filter = { email :email }; // Specify the filter to match the document
    var update
    if(data.gameloose){
      console.log("ate server ", data)
     io.emit("updatescore",{"email":email,"gameloose":data.gameloose})
     update = { $set: { deck: data.deck , curr : data.curr , diff: data.diff , gameloose:data.gameloose,message:data.message,gameover:data.gameover} };
    } 
    else if(data.gamewin)
    {
      io.emit("updatescore",{"email":email,"gamewin":data.gamewin})

          update = { $set: { deck: data.deck , curr : data.curr , diff: data.diff , gamewin:data.gamewin,message:data.message,gameover:data.gameover} };

    }
    else{
                update = { $set: { deck: data.deck , curr : data.curr , diff: data.diff,message:data.message,gameover:data.gameover } };

    }
    console.log(JSON.stringify(data))
      // Specify the update operation
    collection.updateOne(filter, update).then((result)=>{console.log(result)});

    // console.log('Document updated:', result.modifiedCount);
  } catch (error) {
    console.error('Error updating document:', error);
  }
        
    }}
    ) 

       }
       catch(error){
        console.log("error "+error)
        io.emit("{ error: 'Invalid token' }");
       }











      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });






    // Define routes
   






app.get('/scores',  (req, res) => {
  const collection = db.collection('Register');
  collection.find({}, { projection: { username: 1, email: 1, gamewin: 1, gameloose: 1 } })
    .toArray()
    .then(users => {
      // Extract only the desired fields for each user
      const filteredUsers = users.map(user => ({
        username: user.username,
        email: user.email,
        gamewin: user.gamewin,
        gameloose:user.gameloose
      }));

      // Send the filtered users as JSON response
      res.status(200).json(filteredUsers);
    })
    .catch(error => {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

 




app.post('/login', (req, res) => {
   res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Get the 'register' collection from MongoDB
  const collection = db.collection('Register');

  // Find user by email
  collection.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password 5' });
      }

      // Compare password
      
        if (user.password!=password) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        else{
        const token = jwt.sign({ email: user.email , password:user.password}, '1', { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual secret key

        // Send token to client
        console.log(user)
        res.json({...user, token });
      }
    })
    .catch(error => {
      console.error('Error finding user in MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



app.post('/updategame',verifyToken, async (req,res)=>{
  const collection = db.collection('Register');
const {email}=req.user

// console.log(JSON.stringify(req.game.deck))
  try {
    // Update a single document
    const filter = { email :email }; // Specify the filter to match the document
    const update = { $set: { deck: req.body.deck , curr : req.body.curr } }; // Specify the update operation
    const result = await collection.updateOne(filter, update);

    console.log('Document updated:', result.modifiedCount);
  } catch (error) {
    console.error('Error updating document:', error);
  }






  
})

app.get('/subsequentlogin',verifyToken,(req,res)=>{
  const { email, password } = req.user;

  // Get the 'register' collection from MongoDB
  const collection = db.collection('Register');

    collection.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password 5' });
      }

      // Compare password
      
       

        // Generate JWT token
        else{

        // Send token to client
        console.log("working working"+user)
        res.status(200).json({...user});
      }
    })



})






app.post('/register', (req, res) => {
  const userData = req.body;
  console.log('Received registration data:', userData);

  const collection = db.collection('Register'); // Replace 'Register' with your actual collection name

  // Check if user with same email already exists
  collection.findOne({ email: userData.email })
    .then(existingUser => {
      if (existingUser) {
        // User with same email already exists, return an error
         res.status(400).json({ error: 'User with this email already exists' });
         console.log("here1")

      }

      // Insert the user data into the database
      else{
      const result= collection.insertOne({...userData,"deck":['😼', '🙅‍♂️', '🔀', '💣', '😼'],"curr":[],"diff":0,"gamewin":0,"gameloose":0,"gameover":false,"message":''});
            console.log("here2")
      console.log('User registered successfully:', result);
      // Send success response only if the user was inserted successfully
      res.status(201).json({ message: 'User registered successfully' });
      io.emit('newregister',JSON.stringify({"email":userData.email,"username":userData.username,"gamewin":0,"gameloose":0}));
    
      }
    }).catch(error => {
      console.error('Error registering user:', error);
      // Send error response for any database errors
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



    // Start the server
 
server.prependListener("request", (req, res) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
});
    // Start the server
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
