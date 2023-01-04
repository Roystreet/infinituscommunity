import { useState, useEffect } from "react";
import { Box, Typography, Select, TextField, MenuItem, Alert, AlertTitle, IconButton } from "@mui/material";
import lineSetting from "./assets/lineSetting.svg";
import imgProfile from "./assets/imgProfile.svg";
import saveIcon from "./assets/save.svg";
import lineDiv from "./assets/lineDiv.svg";
import style from "./styles/settings.module.css";
import SwitchComponent from "./assets/switchComponent.svg";
import { sendServerPost } from "../../functions/serverInteractions";
import DisplayMessage from "../../component/displayMessage/displayMessage";
import { clearUnusedProcess } from "../../functions/clearUnusedProcess";

const Settings = ({ setUserJWT, setUserLogged }) => {
	const [errorNick, setErrorNick] = useState(null);
	const [open, setOpen] = useState(false);
	const [openMessagesDisplay, setOpenMessagesDisplay] = useState(false);
	const [message, setMessage] = useState({});
	const [obtainedName, setObtainedName] = useState("");
	const [temporalName, setTemporalName] = useState("");
	const [newName, setNewName] = useState("");
	const [activeTexBox, setActiveTexBox] = useState(true);
	const [status, setStatus] = useState("");

	const handleChange = (e) => {
		setTemporalName(e.target.value);
	};
	const inputActive = () => {
		setActiveTexBox(false);
	};

	const setClose = () => {
		setErrorNick(false);
	};

	const setChangeName = async () => {
		setActiveTexBox(true);
		if (temporalName != "") {
			const response = await sendServerPost(
				{
					address: localStorage.getItem("address"),
					oldNickName: obtainedName,
					newNickName: temporalName,
				},
				"/user/changenickname",
				"json",
				localStorage.getItem("jwt")
			);

			if (response.tittle == "Error") {
				setOpenMessagesDisplay(true);
				setStatus("error");
				setMessage(response);
			} else {
				setNewName(temporalName);
				setTemporalName("");
				setStatus("success");
				setOpenMessagesDisplay(true);
				setMessage(response);
			}
		} else {
			setOpenMessagesDisplay(true);
			setStatus("info");
			setMessage({ tittle: "Notification", message: "You must write at least three character Nickname" });
		}
	};

	useEffect(() => {
		const getMyInfo = async () => {
			const result = await sendServerPost(
				{ address: localStorage.getItem("address") },
				"/user/getmyinfo",
				"json",
				localStorage.getItem("jwt")
			);

			if (result.tittle == "Error") {
				setOpen(true);
				setStatus("error");
				setMessage(result);
			} else {
				setObtainedName(result.nickName);
			}
		};
		getMyInfo();
	}, [newName]);

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					marginTop: "34px",
				}}
			>
				<Typography
					sx={{
						color: "#333",
						fontSize: "1.4rem",
						marginLeft: "27px",
					}}
				>
					Account
				</Typography>
				<img src={lineSetting} className={style.lineSetting} />
			</Box>
			<Box
				sx={{
					display: "flex",
					marginTop: "40px",
					marginLeft: "27px",
					marginRight: "27px",
				}}
			>
				<img src={imgProfile} className={style.imgProfile} />
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "40px",
					}}
				>
					<Box
						sx={{
							marginLeft: "20px",
						}}
					>
						<TextField
							id="outlined-basic"
							variant="outlined"
							label={obtainedName}
							sx={{
								border: 0,
							}}
							onChange={(e) => handleChange(e)}
							disabled={activeTexBox}
							onClick={inputActive}
						/>
					</Box>
					<IconButton sx={{ border: "none", background: "none" }} onClick={setChangeName}>
						<img src={saveIcon} className={style.editIcon} />
					</IconButton>
				</Box>
			</Box>
			<Box
				sx={{
					marginTop: "40px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<img src={lineDiv} className={style.lineDiv} />
			</Box>
			<Box
				sx={{
					marginTop: "20px",
					marginLeft: "27px",
					marginRight: "27px",
				}}
			>
				<Typography
					sx={{
						fontSize: "1.6rem",
					}}
				>
					Lenguage
				</Typography>
				<Box
					sx={{
						marginTop: "12px",
					}}
				>
					<Select
						sx={{
							width: "100%",
							boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
							border: 0,
							borderRadius: "8px",
						}}
						value={"English"}
					>
						<MenuItem value="English">English</MenuItem>
						<MenuItem disabled>Spanish</MenuItem>
						<MenuItem disabled>Portuguese</MenuItem>
						<MenuItem disabled>Italian</MenuItem>
					</Select>
				</Box>
			</Box>
			<Box
				sx={{
					marginTop: "20px",
					marginLeft: "27px",
					marginRight: "27px",
				}}
			>
				<Typography
					sx={{
						fontSize: "1.6rem",
					}}
				>
					Mode
				</Typography>
				<Box
					sx={{
						marginTop: "12px",
					}}
				>
					<img src={SwitchComponent} />
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					position: "relative",
					top: "100px",
					height: "max-content",
					zIndex: "0",
				}}
			>
				{errorNick ? (
					<Alert
						severity="error"
						sx={{
							fontSize: "1rem",
							zIndex: 4,
							bottom: "15px",
							width: "80%",
						}}
						onClose={setClose}
					>
						<AlertTitle sx={{ fontSize: "1.2rem" }}>Hubo un error</AlertTitle>
						No spaces, and special characters, just: "_" and "-"
					</Alert>
				) : null}
			</Box>
			<DisplayMessage
				status={status}
				open={openMessagesDisplay}
				setOpen={setOpenMessagesDisplay}
				messageData={message}
				allowBackdropClick={true}
			/>
			<DisplayMessage
				status={status}
				open={open}
				setOpen={setOpen}
				messageData={message}
				allowBackdropClick={true}
				exitRoute={"/"}
				finalFunction={() => {
					setUserLogged(false);
					setUserJWT(true);
					clearUnusedProcess();
				}}
			/>
		</Box>
	);
};

export default Settings;
