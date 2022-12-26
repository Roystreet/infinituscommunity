import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import style from "./ModalRegalarTiket.module.css";
import img from "../../assets/retiro.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { sendServerGet } from "../../functions/serverInteractions";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import imgError from "../../assets/on.png";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlideTiket({ ticketId }) {
	const [open, setOpen] = React.useState();
	const [nameAddress, setNameAddress] = useState("");
	const [err, setErr] = useState(false);

	function controlError(nameAddress) {
		let str = nameAddress;

		if (nameAddress && err == false && str.substr(0, 2) == "0x") {
			if (str.length > 40) {
				setErr(true);
			}
		}
	}
	controlError(nameAddress);
	// console.log(err)
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={style.btnPrincipal}>
			<Button onClick={handleClickOpen} className={style.contImg}>
				Give Await
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<p className={style.titleModal}>Paste the destiny wallet</p>
					</DialogContentText>
					<DialogContentText id="alert-dialog-slide-description">
						<Box
							component="form"
							sx={{
								"& .MuiTextField-root": { m: 1, width: "35ch" },
							}}
							noValidate
							autoComplete="off"
						>
							<div>
								<TextField
									required
									id="outlined-required"
									label="Address"
									onChange={(e) => {
										setNameAddress(e.target.value);
									}}
								/>
								{/* { textError(errorInfi)} */}
							</div>
						</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} className={style.btn}>
						Go back
					</Button>
					<Button
						disabled={!err}
						onClick={async () => {
							await sendWriteTransactions(
								await sendServerGet("/addressContract", "text"),
								await sendServerGet("/abiContract", "json"),
								"changeTicketOwner",
								[ticketId, nameAddress]
							).then((response) => {
								// console.log(response);
								window.alert("Ticket Enviado Exitosamente!");
							});
						}}
						className={style.btnModal}
					>
						Gift
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
