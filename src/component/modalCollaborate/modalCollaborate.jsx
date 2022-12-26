import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import style from "./ModalCollaborate.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { sendServerGet } from "../../functions/serverInteractions";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import imgError from "../../assets/on.png";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCollaborate({ open, setOpen, ticketId, addressReferer, packageId, value }) {
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={style.btnPrincipal}>
			<Button onClick={handleClickOpen} className={style.contImg}>
				Collaborate
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<h3> Seleccione su forma de Pago</h3>
				<Button
					onClick={async () => {
						await sendWriteTransactions(await sendServerGet("/addressCoin", "text"), await sendServerGet("/abiCoin", "json"), "approve", [
							await sendServerGet("/addressContract", "text"),
							value,
						]).then(async (response) => {
							console.log(response);
							await sendWriteTransactions(
								await sendServerGet("/addressContract", "text"),
								await sendServerGet("/abiContract", "json"),
								"buyTicketSon",
								[packageId, ticketId, addressReferer, true]
							).then((response) => {
								console.log(response);
							});
						});
					}}
				>
					{"BUSD (Binance USD)"}
				</Button>
				<Button
					onClick={async () => {
						await sendWriteTransactions(
							await sendServerGet("/addressContract", "text"),
							await sendServerGet("/abiContract", "json"),
							"approve",
							[await sendServerGet("/addressContract", "text"), value]
						).then(async (response) => {
							console.log(response);
							await sendWriteTransactions(
								await sendServerGet("/addressContract", "text"),
								await sendServerGet("/abiContract", "json"),
								"buyTicketSon",
								[packageId, ticketId, addressReferer, false]
							).then((response) => {
								console.log(response);
							});
						});
					}}
				>
					{"INFI (Infinitus Token)"}
				</Button>
			</Dialog>
		</div>
	);
}
