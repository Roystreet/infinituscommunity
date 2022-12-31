import { forwardRef, useState } from "react";
import { sendServerGet } from "../../functions/serverInteractions";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import style from "./ModalRegalarTiket.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DisplayMessage from "../displayMessage/displayMessage";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalRegalarTiket({ ticketId }) {
	const [open, setOpen] = useState(false);
	const [nameAddress, setNameAddress] = useState("");
	const [err, setErr] = useState(false);
	const [openDisplayMessage, setOpenDisplayMessage] = useState(false);
	const [message, setMessage] = useState({});
	const [exitRoute, setExitRoute] = useState(null);
	const [status, setStatus] = useState("");

	function controlError(nameAddress) {
		let str = nameAddress;

		if (nameAddress && err == false && str.substr(0, 2) == "0x") {
			if (str.length > 40) {
				setErr(true);
			}
		}
	}
	controlError(nameAddress);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={style.btnPrincipal}>
			<Button disableRipple={true} disableFocusRipple={true} onClick={handleClickOpen} className={style.contImg}>
				Make a Gift
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogContent>
					<DialogContentText className={style.titleModal} id="alert-dialog-slide-description">
						Paste the Wallet to Gift the Ticket
					</DialogContentText>
					<DialogContentText component={"span"} id="alert-dialog-slide-description">
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								"& .MuiTextField-root": { m: 1, width: "31ch" },
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								className={style.inputadd}
								required
								id="outlined-required"
								label="Address"
								onChange={(e) => {
									setNameAddress(e.target.value);
								}}
							/>
						</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} className={style.btn}>
						Return
					</Button>
					<Button
						disabled={!err}
						className={style.btnModal}
						onClick={async () => {
							await sendWriteTransactions(
								await sendServerGet("/addressContract", "text"),
								await sendServerGet("/abiContract", "json"),
								"changeTicketOwner",
								[ticketId, nameAddress]
							)
								.then((response) => {
									setExitRoute("/mytickets");
									setMessage({ tittle: "Success", message: `Ticket Collected Successfully down the Hash: ${response.hash}` });
									setStatus("success");
									setOpenDisplayMessage(true);
								})
								.catch((error) => {
									setExitRoute("/mytickets");
									setMessage({ tittle: "Error", message: error.reason });
									setStatus("error");
									setOpenDisplayMessage(true);
								});
						}}
					>
						Send Gift
					</Button>
				</DialogActions>
			</Dialog>
			<DisplayMessage
				open={openDisplayMessage}
				setOpen={setOpenDisplayMessage}
				messageData={message}
				allowBackdropClick={true}
				exitRoute={exitRoute}
				status={status}
			/>
		</div>
	);
}
