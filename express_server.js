const mongoose=require("mongoose");
const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http)

const dbUrl = "mongodb://192.168.1.14:27017/todo";

const Message = mongoose.model("Message", {
    name: String,
    message: String
});

const messages = [
];

app.use(express.static(path.join(__dirname, "express_site")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get("/messages", async (req, res) => {
    const messages = await Message.find({});
    res.send(messages);
});

app.get("/messages/:user", async (req, res) => {
    const messages = await Message.find({});
    res.send(messages);
});

app.post("/messages", async (req, res) => {
    var message = new Message(req.body);
    try{
        await message.save()    
        const badMessage = await Message.findOne({message: "badword"});
        if(badMessage){
            console.log("censored words found");
            await Message.remove({_id: badMessage.id});
        }else{
            messages.push(req.body);
            io.emit("message", req.body);
            res.sendStatus(200);
        }
    }catch(error){
        res.sendStatus(500);
    }
});

io.on("connection", (socket) => {
    console.log("new user connected");
})

mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
    console.log("mongo db connection", err);
});

// just express
//let server = app.listen(3000, () => { 

// express + socket.io
let server = http.listen(3000, () => {
    console.log("server is listening on", server.address().port);
});