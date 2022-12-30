import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Result } from "antd";

/**
 * @param {*} status - String con el icono a resaltar del mensaje, por defecto es info
 * @param {*} disableButton - string que indica si el boton del modal estara activo. Por defecto es vacio
 * @param {*} open - Buleano que identifica como true "abrir modal" y false "cerrar modal"
 * @param {*} setOpen - Funcion de useState para para setear el valor enviado del parametro "open"
 * @param {*} messageData - Objeto con la informacion a desplegar al usuario
 * @param {*} allowBackdropClick - Buleano que habilita el cierre del modal si se hace click fuera del mismo.
 * @param {*} exitRoute - Ruta a redirigir en caso de ser necesario, por defecto solo cierra el modal
 * @param {*} finalFunction - Proceso a ejecutar al cerrar el modal, por defecto solo cierra el modal
 */
export default function DisplayMessage({
	status = "info",
	displayButton = "",
	open,
	setOpen,
	messageData,
	allowBackdropClick,
	exitRoute = null,
	finalFunction = null,
}) {
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
			<Result
				status={status}
				title={message.tittle}
				subTitle={JSON.stringify(message.message)}
				extra={[
					<Button
						sx={{
							background: "linear-gradient(60.23deg, #51BADB 19.54%, #662489 106.78%)",
							borderRadius: "8px",
							color: "#fff",
							display: displayButton,
						}}
						onClick={handleClose}
						key="btn"
					>
						Ok
					</Button>,
				]}
			/>
		</Dialog>
	);
}
/* 
<Result
	status="success"
	title="Successfully Purchased Cloud Server ECS!"
	subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
	extra={[
		<Button type="primary" key="console">
			Go Console
		</Button>,
		<Button key="buy">Buy Again</Button>,
	]}
/>; */
