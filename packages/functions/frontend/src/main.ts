import './app.css'
import App from './App.svelte';
import { Amplify } from "aws-amplify";
import config from "./config";


Amplify.configure({
  API: {
    endpoints: [
      {
        name: "queueApi",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
})


const app = new App({
  target: document.body,
})

export default app
