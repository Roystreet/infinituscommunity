import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * @param {*} open - Buleano que identifica como true "abrir modal" y false "cerrar modal"
 * @param {*} setOpen - Funcion de useState para para setear el valor enviado del parametro "open"
 * @param {*} messageData - Objeto con la informacion a desplegar al usuario
 * @param {*} allowBackdropClick - Buleano que habilita el cierre del modal si se hace click fuera del mismo.
 * @param {*} exitRoute - Ruta a redirigir en caso de ser necesario, por defecto solo cierra el modal
 * @param {*} finalFunction - Proceso a ejecutar al cerrar el modal, por defecto solo cierra el modal
 */
export default function DisplayMessage({ open, setOpen, messageData, allowBackdropClick, exitRoute = null, finalFunction = null }) {
	const navigate = useNavigate();
	const [message, setMessage] = useState({});

	const handleClose = (event, reason) => {
		if (allowBackdropClick == true) {
			if (reason && reason == "backdropClick");
			else {
				setOpen(!open);
				if (finalFunction != null) finalFunction();
				if (exitRoute != null) navigate(exitRoute);
			}
		} else {
			setOpen(!open);
			if (finalFunction != null) finalFunction();
			if (exitRoute != null) navigate(exitRoute);
		}
	};

	useEffect(() => {
		setMessage(messageData);
	}, [messageData]);

	return (
		<Dialog open={open} onClose={handleClose} sx={{ padding: "0 20px 20px 20px" }}>
			<DialogTitle>{message.tittle}</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ color: "#25292A", borderBottom: "1px solid #B4B4B4", paddingBottom: "10px" }}>
					{JSON.stringify(message.message)}
				</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ padding: "0 20px 15px 0" }}>
				<Button
					onClick={handleClose}
					sx={{
						background: "linear-gradient(60.23deg, #51BADB 19.54%, #662489 106.78%)",
						borderRadius: "8px",
						color: "#fff",
						fontSize: "11px",
					}}
				>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
}
