import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./desktop.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

let userConnected;

if (localStorage.getItem("jwt") != undefined) {
	userConnected = true;
} else userConnected = false;

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<App userConnected={userConnected} />
	</BrowserRouter>
);
