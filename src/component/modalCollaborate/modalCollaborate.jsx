import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import style from "./ModalCollaborate.module.css";
import { useState } from "react";
import { sendServerGet } from "../../functions/serverInteractions";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import DisplayMessage from "../displayMessage/displayMessage";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCollaborate({ referals, open, setOpen, ticketId, addressReferer, packageId, value }) {
	const [openMessagesDisplay, setOpenMessagesDisplay] = useState(false);
	const [message, setMessage] = useState({});
	const [btnDis, setBtnDis] = useState(false);
	const [status, setStatus] = useState("");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function btnDisabled(ref) {
		if (ref == 4 && btnDis === false) {
			console.log("true");
			return setBtnDis(true);
		}
		if (ref < 4 && btnDis === true) {
			console.log("falses");
			return setBtnDis(false);
		}
	}
	btnDisabled(referals);
	return (
		<div>
			<button disabled={btnDis} onClick={handleClickOpen} className={style.btnPrincipal}>
				Collaborate
			</button>
			<Dialog
				sx={{
					display: "center",
					width: "100%",
				}}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<Button
					onClick={handleClose}
					sx={{
						justifyContent: "end",
						borderRadius: "8px",
						color: "#51BADB",
						fontSize: "20px",
					}}
				></Button>
				<DialogContent>
					<p className={style.titleModal}>Select your payment method</p>
				</DialogContent>
				<DialogActions
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<button
						className={style.btnPago}
						onClick={async () => {
							await sendWriteTransactions(await sendServerGet("/addressCoin", "text"), await sendServerGet("/abiCoin", "json"), "approve", [
								await sendServerGet("/addressContract", "text"),
								value,
							])
								.then(async (response) => {
									await sendWriteTransactions(
										await sendServerGet("/addressContract", "text"),
										await sendServerGet("/abiContract", "json"),
										"buyTicketSon",
										[packageId, ticketId, addressReferer, true]
									)
										.then((response) => {
											setOpenMessagesDisplay(true);
											setStatus("success");
											setMessage({ tittle: "Success", message: `Ticket buyed successfully down the Hash:${response.hash}` });
											handleClose();
										})
										.catch((error) => {
											setOpenMessagesDisplay(true);
											setStatus("error");
											setMessage({ tittle: "Metamask Error", message: error.reason });
										});
								})
								.catch((error) => {
									setOpenMessagesDisplay(true);
									setStatus("error");
									setMessage({ tittle: "Metamask Error", message: error.reason });
								});
						}}
					>
						{"BUSD (Binance USD)"}
					</button>
					<button
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
											setOpenMessagesDisplay(true);
											setStatus("success");
											setMessage({ tittle: "Success", message: `Ticket buyed successfully down the Hash:${response.hash}` });
											handleClose();
										})
										.catch((error) => {
											setOpenMessagesDisplay(true);
											setStatus("error");
											setMessage({ tittle: "Metamask Error", message: error.reason });
										});
								})
								.catch((error) => {
									setOpenMessagesDisplay(true);
									setStatus("error");
									setMessage({ tittle: "Metamask Error", message: error.reason });
								});
						}}
					>
						{"INFI (Infinitus Token)"}
					</button>
				</DialogActions>
			</Dialog>
			<DisplayMessage
				open={openMessagesDisplay}
				messageData={message}
				setOpen={setOpenMessagesDisplay}
				allowBackdropClick={true}
				status={status}
			/>
		</div>
	);
}
