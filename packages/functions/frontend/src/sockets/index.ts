import config from "../config";
import {
    notices,
} from "../stores/noticeStore";

export function launchSocket() {

    try {
        const socket = new WebSocket(
            config.apiSocket.URL
        );


        socket.onopen = event => {
            socket.send("test message from client");
            console.log("SOCKET OPEN: ", event);
        };


        socket.onmessage = (event: MessageEvent) => {

            const response = JSON.parse(event.data);
            notices.update(store => [
                ...store,
                response,
            ]);
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

    if (socket?.readyState === WebSocket.OPEN) {
        socket.close();
    }
}

