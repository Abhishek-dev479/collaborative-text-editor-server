// const express = require('express');
// const app = express();
// const http = require('http');
// const { Server } = require('socket.io');
// const mongoose = require('mongoose');
// const cors = require('cors');
// // const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const { userInfo } = require('os');

// app.use(cors({origin: '*'}))
// app.use(cookieParser());

// mongoose.connect('mongodb://localhost:27017/documentDB', {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// });

// let documentSchema = new mongoose.Schema({
//     _id: String,
//     name: String,
//     date: String,
//     data: Object
// })

// let Document = mongoose.model('document', documentSchema);

// let userSchema = new mongoose.Schema({
//     username: String,
//     email: {type: String, unique: true},
//     password: String,
//     documents: [documentSchema]
// })

// let User = mongoose.model('users', userSchema);

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// const httpServer = http.createServer(app);

// const io = new Server(httpServer, {cors: {origin: '*'}});


// async function saveDocument(id, data){
//     let docs = await Document.findByIdAndUpdate(id, {data: data}, {new: true});
//     console.log(docs);
// }

// let userId = null;

// io.on('connection', (socket) => {
//     console.log(socket.id);
//     // socket.on('disconnect', () => console.log('user disconnnected'));

//     socket.on('document-id', async (id) => {
//         console.log('document loaded...');
//         let result = await findDocument(userId, id);
//         console.log(result);
//         socket.emit('get-document', result.data);

//         socket.join(id);

//         socket.on('change', (data) => {
//             console.log('text change...');
//             socket.broadcast.to(id).emit('change', data);
//         })

//         socket.on('save-document', (data) => {
//             // console.log('id: '+ id);
//             // User.findById(userId)
//             // saveDocument(id, data);
//             console.log('saving...');
//             updateDocumentData(userId, id, data, socket);
//         })
//     })

// })

// async function findDocument(userId, documentId){
//     try {
//         let user = await User.findById(userId);
    
//         if (!user) {
//           console.log('user not found');
//         }
    
//         // Find the document within the user's documents array
//         const document = user.documents.find(doc => doc._id === documentId);
    
//         if (!document) {
//             console.log('doc doesnt exist');
//           // Document doesn't exist, create a new one
//           user.documents.push({ _id: documentId, name:'', date:'', data: {} });
//           await user.save();

//           // Return the newly created document
//           return user.documents.find(doc => doc._id === documentId);
//         }
//         console.log('doc is present');
//         // Return the found document
//         return document;
//       } catch (error) {
//         console.log(error);
//         // throw new Error(`Error finding or creating document: ${error.message}`);
//       }
//     // let docs = await Document.findById(id);
//     // if(docs == null){
//     //     let document = new Document({
//     //         _id: id,
//     //         data: ''
//     //     })
//     //     await document.save();
//     //     return '';
//     // }
//     // else{
//     //     console.log(docs);
//     //     return docs.data;
//     // }
// }

// async function updateDocumentData(userId, documentId, newData, socket) {
//     try {
//       let user = await User.findById(userId);
  
//         // User exists, check if the document exists
//         const existingDocument = user.documents.find(doc => doc._id === documentId);
  
//         // if (!existingDocument) {
//           // socket.emit('save-new-document');
//           // socket.on('new-document-name', (fileName) => {
//           //   doc = new Document({
//           //     _id: documentId,
//           //     name: fileName,
//           //     date: new Date().getMinutes(),
//           //     documents: [{ _id: documentId, data: newData }],
//           //   });
//           // });
//         //   user.documents.push({ _id: documentId, data: newData });
//         // } else {
//           // Document exists, update its data
//           existingDocument.data = newData;
//           if(existingDocument.name == ''){
//             socket.emit('save-new-document');
//             socket.on('new-document-name', (fileName) => {
//               existingDocument.name = fileName;
//             });
//           }
//         // }
//       // Save the user (either a new user or an updated user)
//       const updatedUser = await user.save();
  
//       // Find and return the updated document
//       const updatedDocument = updatedUser.documents.find(doc => doc._id === documentId);
      
//       return updatedDocument;
//     } catch (error) {
//       throw new Error(`Error updating document data: ${error.message}`);
//     }
//   }
//     // let user = await User.findById(userId);
//     // if(user){
//     //     let docs = user.documents.find(doc => doc._id === documentId);
//     // }


// // let maxAge = 60*60*24;
// // function createJWT(id){
// //     return jwt.sign({id}, 'key', { expiresIn: maxAge });
// // }

// app.post('/login', postLogin)

// async function postLogin(req, res, next){
//     let docs = await User.findOne({email: req.body.email});
//     if(docs == null){
//         res.json({status: 'fail', message: 'user doesn\'t exist'});
//     }
//     else{
//         if(docs.password == req.body.password){
//             // let token = createJWT(docs._id);
//             userId = docs._id;
//             // res.cookie('jwt', token, {maxAge: maxAge*1000});
//             res.json({status: 'success', message: docs._id});
//             // res.redirect('/');
//         }
//         else res.json({status: 'fail', message: 'incorrect password'});
//     }
// }

// app.post('/signup', postSignup);

// async function postSignup(req, res, next){
//     console.log(req.body);
//     // Customer.findOne({email: req.body.email});
//     const newUser = new User(
//         {
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//             documents: []
//         }
//     )
//     try{
//         let user = await newUser.save();
//         // let token = createJWT(user._id);
//         // console.log('jwt token created');
//         userId = user._id;
//         // res.cookie('jwt', token, {maxAge: maxAge*1000});
//         res.json({status: 'success', message: user._id});
//         // res.json(user);
//     }
//     catch(e){
//         console.log(e);
//         if(e.code == 11000) res.json({status: 'fail', message: 'user already exists'});
//         else res.json({status: 'fail', message: 'error'});
//     }
// }


// httpServer.listen('3001', (err) => {
//     console.log('Server ruuning...');
// })



const mongoose = require("mongoose")
// const Document = require("./Document")

const { Schema, model } = require("mongoose")

mongoose.connect("mongodb+srv://newUser_203:thisisapassword@cluster0.j51fwrw.mongodb.net/db-name?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const documentSchema = new Schema({
  _id: String,
  data: Object,
})

Document = mongoose.model('documents', documentSchema)

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    console.log('getting document from database using documentId');
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      console.log('saving document');
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}
