import config from "../config";
import {
    notices, socketState
} from "../stores/noticeStore";

export function launchSocket() {

    try {
        const socket = new WebSocket(
            config.apiSocket.URL
        );
        socketState.update(state => socket.readyState);

        socket.onopen = event => {
            socket.send("test message from client");
            socketState.update(state => socket.readyState);
            console.log("SOCKET OPEN: ", socket.readyState);
        };


        socket.onmessage = (event: MessageEvent) => {

            const response = JSON.parse(event.data);
            notices.update(store => [
                ...store,
                response,
            ]);
        };

        socket.onclose = event => {
            socketState.update(state => socket.readyState);
            console.log("SOCKET CLOSED: ", socket.readyState);
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

