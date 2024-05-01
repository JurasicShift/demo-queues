

const config = {
    apiGateway: {
        REGION: import.meta.env.VITE_REGION,
        URL: import.meta.env.VITE_API_URL,
    },
    apiSocket: {
        URL: import.meta.env.VITE_SOCKET_URL
    }
}
export default config;

