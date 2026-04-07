const net = require('net')

const server = net.createServer((socket) => {
    let buffer = "";

    socket.on("data", (chunks) => {
        buffer += chunks.toString()

        if (!buffer.includes("\r\n\r\n")) return;

        const request = parseRequest(buffer);

        console.log("raw request on the server\n", request)

        handleRequest(socket, request)

        socket.end();
    })
})

server.listen(3000, () => {
    console.log("server listening to 3000")
})

const parseRequest = (buffer) => {
    const req = String(buffer)
    if (!req.includes("\r\n\r\n")) return null;


    const [rawHeaders, body] = req.split("\r\n\r\n")

    const lines = rawHeaders.split("\r\n")

    const [method, path, version] = lines[0].split(" ")

    const headers = {}

    for (let i = 1; i < lines.length; i++) {
        // const [key, value] = lines[i].split(":")
        const colon = lines[i].indexOf(":")
        const key = lines[i].slice(0, colon).toLowerCase()
        const value = lines[i].slice(colon + 1).trim()
        headers[key] = value
    }

    let parsedbody = body || ""
    if (headers["content-type"] === "application/json" && parsedbody) {
        parsedbody = JSON.parse(body)
    }

    return {
        method,
        path,
        version,
        headers,
        body: parsedbody
    }
}

const handleRequest = (socket, request) => {
    let statusLine;
    let body;

    if (request.method === "GET" && request.path === "/hello") {
        statusLine = `HTTP/1.1 200 OK\r\n`;
        body = "Hello Received"

    } else {
        statusLine = `HTTP/1.1 200 OK\r\n`;
        body = "/ not found"

    }

    const response =
        statusLine +
        contentType +
        `Content-Length: ${body.length} \r\n\r\n` +
        body

    socket.write(response)
}