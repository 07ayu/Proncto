const net = require("net");

const client = net.createConnection({ host: "example.com", port: 80}, () => {
    console.log("connected")

    client.write(
        "POST / HTTP/1.1\r\n" +
        "Host: example.com\r\n" +
        "Connection: close\r\n\r\n"
    )

    client.on("data", (data) => {
        console.log(data.toString())
    })

    client.on("end", () => {
        console.log("Disconnected")
    })
})