import * as React from "react";
import style from "./modalWithdraw.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, forwardRef, useEffect } from "react";
import { sendServerGet } from "../../functions/serverInteractions";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import img from "../../assets/retiro.png";
import imgError from "../../assets/on.png";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalWithdraw({ bINFI }) {
	const [open, setOpen] = useState(false);
	const [infi, setInfi] = useState("");
	const [errorInf, setErrorInf] = useState(true);

	function calcularPorcentaje(infi) {
		let porcentaje = (infi * 10) / 100;
		let result = infi - porcentaje;

		return result;
	}

	function errorInfi(infi, bINFI) {
		if (infi > bINFI || infi < 0) {
			setErrorInf(false);
		} else {
			setErrorInf(true);
		}
	}

	const textError = (errorInfi) => {
		if (errorInf == false) {
			return (
				<p className={style.errorTextInfi}>
					<img className={style.imgErr} src={imgError} /> The amount exceeds your balance
				</p>
			);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setInfi(bINFI);
	}, [bINFI]);

	return (
		<div className={style.cont}>
			<Button onClick={handleClickOpen} className={style.contImg}>
				Withdraw
				<img className={style.img} src={img} alt="not found" />
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
						How much do you want to Withdraw?
					</DialogContentText>
					<Box
						component="form"
						sx={{
							"& .MuiTextField-root": { m: 1, width: "30ch" },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							required
							id="outlined-required"
							label="INFI"
							defaultValue={bINFI}
							type="number"
							onChange={(e) => {
								errorInfi(e.target.value, bINFI), setInfi(e.target.value);
							}}
						/>
						{textError(errorInfi)}
					</Box>
					<DialogContentText id="alert-dialog-slide-description">You have {bINFI} INFI in your balance</DialogContentText>
				</DialogContent>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						You are about to withdraw: <span className={style.spam}>{infi} INFI</span>
					</DialogContentText>
					<DialogContentText id="alert-dialog-slide-description">
						Transaction fee: <span className={style.spam}>10%</span>
					</DialogContentText>
					<DialogContentText id="alert-dialog-slide-description">
						You will receive: <span className={style.spam}>{calcularPorcentaje(infi)} BUSD</span>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} className={style.btn}>
						Return
					</Button>
					<Button
						disabled={!errorInf}
						onClick={async () => {
							let sendValue;
							console.log(infi);
							if (infi.includes(".")) {
								sendValue = infi.replace(".", "");
								const index = infi.indexOf(".");
								const length = infi.length;
								const substring = infi.substring(index, length);
								sendValue = sendValue + "0".repeat(18 - (substring.length - 1));
							} else {
								sendValue = sendValue + "0".repeat(18);
							}

							await sendWriteTransactions(
								await sendServerGet("/addressContract", "text"),
								await sendServerGet("/abiContract", "json"),
								"withdraw",
								[sendValue]
							)
								.then((response) => {
									console.log(response);
									handleClose();
								})
								.catch((error) => console.log(error));
						}}
						className={style.btnWhiteDraw}
					>
						Withdraw
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
