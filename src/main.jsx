import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./desktop.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let userConnected;

if (localStorage.getItem("jwt") != undefined) {
  userConnected = true;
} else userConnected = false;

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App userConnected={userConnected} />
    </ThemeProvider>
  </BrowserRouter>
);
