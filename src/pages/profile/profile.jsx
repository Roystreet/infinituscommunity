import style from "./Profile.module.css";
import imgFlecha from "../../assets/Group67.png";
import copyImg from "../../assets/copyIcon.png";
import AlertDialogSlide from "../../component/modalPerfil/modalPerfil";
import DisplayMessage from "../../component/displayMessage/displayMessage";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { nonWriteContractFunctions } from "../../functions/Web3Interactions";
import { sendServerGet, sendServerPost } from "../../functions/serverInteractions";
import { activateEventListeners } from "../../functions/eventListeners";
import { clearUnusedProcess } from "../../functions/clearUnusedProcess";

export default function Profile() {
	const [myInfo, setmyInfo] = useState({});
	const [balanceBUSD, setbalanceBUSD] = useState("");
	const [balanceINFI, setbalanceINFI] = useState("");
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState({});

	function intialName(data) {
		if (data.nickName) {
			return data.nickName[0];
		} else {
			return "x";
		}
	}

	const balnceInfi = async () => {
		const value = await nonWriteContractFunctions(
			await sendServerGet("/addressContract", "text"),
			await sendServerGet("/abiContract", "json"),
			"balanceOf",
			localStorage.getItem("address"),
			18
		);
		setbalanceINFI(value);
	};

	const balnceBusd = async () => {
		const value = await nonWriteContractFunctions(
			await sendServerGet("/addressCoin", "text"),
			await sendServerGet("/abiCoin", "json"),
			"balanceOf",
			localStorage.getItem("address"),
			18
		);
		setbalanceBUSD(value);
	};

	const data = async () => {
		await sendServerPost({ address: localStorage.getItem("address") }, "/user/getmyinfo", "json", localStorage.getItem("jwt")).then(
			(response) => {
				if (response.tittle === "Error") {
					setOpen(true);
					setMessage(response);
				} else setmyInfo(response);
			}
		);
	};

	useEffect(() => {
		activateEventListeners(setOpen, setMessage);
		data();
	}, []);

	useEffect(() => {
		balnceInfi();
	}, [balanceINFI]);

	useEffect(() => {
		balnceBusd();
	}, [balanceBUSD]);

	return (
		<>
			<div className={style.contWel}>
				<h1 className={style.titleW}>Welcome!</h1>
			</div>
			<div className={style.container}>
				<div className={style.contImgNom}>
					<div className={style.contInicialNom}>
						<span>{intialName(myInfo)}</span>
					</div>
					<h2 className={style.name}>{myInfo?.nickName}</h2>
				</div>
				<div className={style.contDataCuenta}>
					<h3>Cuenta</h3>
					<div className={style.contData}>
						<span className={style.data}>{myInfo?.address}</span>
						<CopyToClipboard text={myInfo?.address}>
							<img className={style.copy} src={copyImg} alt="" onClick={() => toast.success("Id copied")} />
						</CopyToClipboard>
						<Toaster
							toastOptions={{
								style: {
									padding: "16px",
									color: "blue",
									marginTop: "250px",
								},
							}}
						/>
					</div>
				</div>
				<div className={style.contCards}>
					<h3>Balances</h3>
					<div className={style.cardIToken}>
						<h4 className={style.titleToken}>Infinitus Token</h4>
						<p className={style.numbT}>{balanceINFI}</p>
						<AlertDialogSlide bINFI={balanceINFI} />
					</div>
					<img src={imgFlecha} className={style.imgFlecha} alt="not found" />
					<div className={style.card}>
						<h4 className={style.titleToken}>Busd Token</h4>
						<p className={style.numbT}>{balanceBUSD}</p>
					</div>
				</div>
			</div>
			<DisplayMessage open={open} setOpen={setOpen} messageData={message} exitRoute={"/"} finalFunction={() => clearUnusedProcess()} />
		</>
	);
}
