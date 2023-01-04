import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./desktop.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { sendServerPost } from "./functions/serverInteractions";
import { clearUnusedProcess } from "./functions/clearUnusedProcess";

let userConnected;

const theme = createTheme({
	typography: {
		fontFamily: "Poppins",
	},
});

if (localStorage.getItem("jwt") != undefined) {
	let response = await sendServerPost({ address: localStorage.getItem("address") }, "/user/getmyinfo", "json", localStorage.getItem("jwt"));
	if (response.tittle != "Error") {
		response = null;
		userConnected = true;
	} else {
		userConnected = false;
		clearUnusedProcess();
	}
} else {
	userConnected = false;
	clearUnusedProcess();
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<App userConnected={userConnected} />
		</ThemeProvider>
	</BrowserRouter>
);
