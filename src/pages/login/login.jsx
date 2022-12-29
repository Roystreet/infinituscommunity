import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setAddress, signMessage } from "../../functions/Web3Interactions";
import { sendServerPost } from "../../functions/serverInteractions";
import style from "./styles/login.module.css";
import DisplayMessage from "../../component/displayMessage/displayMessage";
import loginSvg from "./assets/login.svg";
import MetaIcon from "./assets/metaSvg.svg";
import union from "./assets/union.svg";
import logoInfinitus from "../../component/header/assets/infinitus.svg";
import { useEffect } from "react";

export default function Login({ setUserJWT, setUserLogged }) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState({});

	const handleClickRegister = async () => {
		try {
			if (!window.ethereum) {
				setOpen(true);
				setMessage({ tittle: "Error", message: "Metamask is not Installed" });
			} else {
				if (window.ethereum.chainId == "0x38" && window.ethereum.networkVersion == "56") {
					await setAddress()
						.then(async () => {
							await signMessage()
								.then(async (SignedInfo) => {
									const aux = await sendServerPost(SignedInfo, "/auth/register", "json");
									if (aux.tittle === "Error") {
										setOpen(true);
										setMessage(aux);
									} else {
										setOpen(true);
										setMessage(aux);
									}
								})
								.catch((error) => {
									setOpen(true);
									setMessage({ tittle: "Error", message: error });
								});
						})
						.catch(() => {
							setOpen(true);
							setMessage({ tittle: "Error", message: "No se logro obtener la address" });
						});
				} else {
					setOpen(true);
					setMessage({ tittle: "Error", message: "No estas la Red BSC" });
				}
			}
		} catch (error) {
			setOpen(true);
			setMessage({ tittle: "Metamask Error", message: error.code + "  " + error.message });
		}
	};

	const handleClickLogin = async () => {
		try {
			if (!window.ethereum) {
				setOpen(true);
				setMessage({ tittle: "Error", message: "Metamask is not Instaled" });
			} else {
				if (window.ethereum.chainId == "0x38" && window.ethereum.networkVersion == "56") {
					await setAddress()
						.then(async () => {
							await signMessage()
								.then(async (SignedInfo) => {
									const jwt = await sendServerPost(SignedInfo, "/auth/login", "json");

									if (jwt.jwt) {
										localStorage.setItem("jwt", jwt.jwt);
										setUserJWT(true);
										setUserLogged(true);
										navigate("/perfil");
									} else {
										setOpen(true);
										setMessage(jwt);
									}
								})
								.catch((error) => {
									setOpen(true);
									setMessage({ tittle: "Error", message: error });
								});
						})
						.catch(() => {
							setOpen(true);
							setMessage({ tittle: "Error", message: "No se logro obtener la address" });
						});
				} else {
					setOpen(true);
					setMessage({ tittle: "Error", message: "No estas la Red BSC" });
				}
			}
		} catch (error) {
			setOpen(true);
			setMessage({ tittle: "Metamask Error", message: error.code + "  " + error.message });
		}
	};

	useEffect(() => {
		if (window.ethereum) {
			/* window.ethereum.on("chainChanged", () => {
				if (window.ethereum.chainId != "0x38" && window.ethereum.networkVersion != "1") {
					setOpen(true);
					setMessage({ tittle: "Notificacion", message: "Vuelve a la Red BSC" });
				}
			}); */
		}
	}, []);

	return (
		<>
			<Box
				component="div"
				sx={{
					position: "absolute",
					height: "100vh",
					top: "0px",
					background: "#fafafa",
					zIndex: 10,
				}}
			>
				<Box
					component="div"
					sx={{
						position: "relative",
						height: "100%",
						zIndex: 1,
						background: "linear-gradient(203.72deg, rgba(105, 8, 121, 0.78) -10.54%, rgba(80, 186, 219, 0.78) 92.25%)",
					}}
					className={style.contLogin}
				>
					<Box className={style.contWelcome}>
						<Typography sx={{ color: "#fff" }}>WELCOME TO INFINITUS</Typography>
						<Box className={style.contImg}>
							<img src={loginSvg} alt="image-login" className={style.loginSvg} />
						</Box>
					</Box>

					<Box className={style.contButtons}>
						<Button variant="contained" className={style.btn} sx={{ background: "#6EBCEF" }} onClick={handleClickLogin}>
							Log in with Metamask <img src={MetaIcon} alt="metamask" className={style.metamask} />
						</Button>
						<div className={style.contUnion}>
							<img src={union} alt="-" className={style.imgUnion} />
						</div>
						<Button variant="contained" className={style.btn} sx={{ background: "#6EBCEF" }} onClick={handleClickRegister}>
							Register
						</Button>
					</Box>

					<Box className={style.contLogo}>
						<img src={logoInfinitus} alt="infinitus-log" className={style.logo} />
					</Box>
					<DisplayMessage open={open} messageData={message} setOpen={setOpen} allowBackdropClick={true} />
				</Box>
			</Box>
		</>
	);
}
