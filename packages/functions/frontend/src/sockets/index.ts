import config from "../config";


export function launchSocket() {
    try {
        const socket = new WebSocket(
            config.apiSocket.URL
        );
        console.log("socket: ", socket);

        socket.onopen = event => {
            socket.send("test message from client");
            console.log("SOCKET OPEN: ", event);
        };

        socket.onmessage = event => {
            console.log("SOCKET MSG: ", event.data);
        };

        socket.onclose = event => {
            console.log("SOCKET CLOSED: ", event);
        };

        socket.onerror = event => {
            console.log("SOCKET ERROR: ", event);
        };

        return socket;
    } catch (e) {
        if (e !== "No current user") {
            alert(e);
        }
        return null;
    }
}

export function closeSocket(socket: WebSocket) {
    // Use optional chaining to safely access socket methods
    if (socket?.readyState === WebSocket.OPEN) {
        socket.close();
    }
}

