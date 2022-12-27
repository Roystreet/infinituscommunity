import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import style from "./ModalCollaborate.module.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import { sendServerGet } from "../../functions/serverInteractions";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import DisplayMessage from "../displayMessage/displayMessage";
import { clearUnusedProcess } from "../../functions/clearUnusedProcess";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCollaborate({ userLogged, setUserLogged, open, setOpen, ticketId, addressReferer, packageId, value }) {
	const [openDisplay, setOpenDisplay] = useState(false);
	const [openErrMeta, setOpenErrMeta] = useState(false);
	const [message, setMessage] = useState({});

	const handleClickOpen = () => {
		if (userLogged == true) {
			setOpen(true);
		} else {
			setOpenDisplay(true);
			setMessage({ tittle: "Notificacion", message: "Debe Iniciar Sesion y volver a escribir este enlace!" });
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={style.btnPrincipal}>
			<Button onClick={handleClickOpen} className={style.contImg}>
				Collaborate
			</Button>
			<Dialog className={style.dial} open={open} onClose={handleClose}>
				<h3> Seleccione su forma de Pago</h3>
				<Button className={style.btnPago}
					onClick={async () => {
						await sendWriteTransactions(await sendServerGet("/addressCoin", "text"), await sendServerGet("/abiCoin", "json"), "approve", [
							await sendServerGet("/addressContract", "text"),
							value,
						])
							.then(async (response) => {
								console.log(response);
								await sendWriteTransactions(
									await sendServerGet("/addressContract", "text"),
									await sendServerGet("/abiContract", "json"),
									"buyTicketSon",
									[packageId, ticketId, addressReferer, true]
								)
									.then((response) => {
										console.log(response);
									})
									.catch((error) => {
										setOpenErrMeta(true);
										setMessage({ tittle: "Metamask Error", message: error });
									});
							})
							.catch((error) => {
								setOpenErrMeta(true);
								setMessage({ tittle: "Metamask Error", message: error });
							});
					}}
				>
					{"BUSD (Binance USD)"}
				</Button>
				<Button
				className={style.btnPago}
					onClick={async () => {
						await sendWriteTransactions(
							await sendServerGet("/addressContract", "text"),
							await sendServerGet("/abiContract", "json"),
							"approve",
							[await sendServerGet("/addressContract", "text"), value]
						)
							.then(async (response) => {
								console.log(response);
								await sendWriteTransactions(
									await sendServerGet("/addressContract", "text"),
									await sendServerGet("/abiContract", "json"),
									"buyTicketSon",
									[packageId, ticketId, addressReferer, false]
								)
									.then((response) => {
										console.log(response);
									})
									.catch((error) => {
										setOpenErrMeta(true);
										setMessage({ tittle: "Metamask Error", message: error });
									});
							})
							.catch((error) => {
								setOpenErrMeta(true);
								setMessage({ tittle: "Metamask Error", message: error });
							});
					}}
				>
					{"INFI (Infinitus Token)"}
				</Button>
			</Dialog>
			<DisplayMessage
				open={openDisplay}
				messageData={message}
				setOpen={setOpenDisplay}
				allowBackdropClick={true}
				exitRoute={"/"}
				finalFunction={() => {
					setUserLogged(false);
					clearUnusedProcess();
				}}
			/>
			<DisplayMessage open={openErrMeta} messageData={message} setOpen={setOpenErrMeta} allowBackdropClick={true} />
		</div>
	);
}
