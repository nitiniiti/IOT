const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { StillCamera } = require("pi-camera-connect");

const stillCamera = new StillCamera({
    width: 640,
    height: 480,
    shutter: 200000,
    delay: 1
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

setInterval(() => {
    stillCamera.takeImage().then(image => {

        // fs.writeFileSync("still-image.jpg", image);
        // io.emit("image", "some data");
        image = image.toString("base64");
        io.emit("image", image)
    });
}, 300)

server.listen(3000, () => {
    console.log("Listeing on port - ", 3000);
})