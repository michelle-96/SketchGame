import * as tf from "@tensorflow/tfjs";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const model = tf.loadModel("./model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();

ReactDOM.render(
  <App model={model} labels={labels} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
