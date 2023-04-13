const io = require("socket.io")(8001,{
    cors:{
        origin: "http://localhost:8123"
    }
})

let onlineUsers = []

const addUser = (userID, socketID) => {
    if(!onlineUsers.some(onlineuser => onlineuser.userID === userID)){
        onlineUsers.push({userID: userID, socketID: socketID})
    }
}

const removeUser = (socketID) =>{
    onlineUsers = onlineUsers.filter((onlineuser) => onlineuser.socketID !== socketID)
}

const findUser =(userID)=>{
    return onlineUsers.find(user => user.userID === userID)
}

io.on("connection", (socket) => {

    console.log("a user connected.")
    //storing the userID and SocketID for Logged in User
    socket.on("addUser", (userID) => {
        addUser(userID, socket.id)
        io.emit("getUsers", onlineUsers)
    })

    socket.on("sendMessage", ({senderID, receiverID, text}) => {
        console.log(receiverID)
        const user = findUser(receiverID)
        io.to(user.socketID).emit("getMessage",{
            senderID: senderID,
            text: text
        })
    })

    socket.on("disconnect", () => {
        console.log("a user is disconnected")
        removeUser(socket.id)
        io.emit("getUsers", onlineUsers)
    })


})