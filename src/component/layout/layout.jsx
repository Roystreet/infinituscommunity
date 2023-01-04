import Navbar from "../navbar/navbar";
import Header from "../header/header";
import Message from "../message/message";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Layout({ children }) {
	return (
		<>
			<Message />
			<Header />
			<Box className="container-main">{children}</Box>
			<Navbar />
		</>
	);
}
