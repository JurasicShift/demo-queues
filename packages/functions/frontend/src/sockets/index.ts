import config from "../config";

const socket = new WebSocket(config.apiSocket.URL);
console.log("socket: ", socket);
// socket.onopen = (event) => {
//     socket.send("test message from client");
//     console.log("SOCKET OPEN");
// }

socket.onmessage = (event) => {
    console.log("SOCKET MSG: ", event.data);
}



export default socket;