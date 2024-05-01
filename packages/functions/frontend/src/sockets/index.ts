import config from "../config";
console.log("CONFIG: ", config.apiSocket.URL);

const socket = new WebSocket(config.apiSocket.URL);

console.log("SOCKET: ", socket);

socket.onopen = (event) => {
    console.log("SOCKET OPEN");
}

socket.onmessage = (event) => {
    console.log("SOCKET MSG: ", event.data);
}

console.log("inside index config")