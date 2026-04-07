const net = require("net");

const client = net.createConnection({ host: "localhost", port: 3000 }, () => {
    console.log("connected")

    const get = "GET /hello HTTP/1.1\r\n" +
        "Host: localhost:3000\r\n" +
        "Content-Type: plain/text\r\n" +
        "Content-Length: " +
        "Connection: closed\r\n\r\n" +

        "Hello world"

    client.write(get)



    client.on("data", (data) => {
        console.log(data.toString())
    })

    client.on("end", () => {
        console.log("Disconnected")
    })
})