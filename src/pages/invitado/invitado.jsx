import img from "./assets/Union.png";
import imgI from "./assets/INFINITUS.png";
import CardShare from "../../component/CardShare/CardShare";
import style from "./Invitado.module.css";
import { useState, useEffect } from "react";
import { sendServerGet, sendServerPost } from "../../functions/serverInteractions";
import { useParams } from "react-router-dom";
import { ListenerAccountChanged } from "../../functions/eventListeners";
import DisplayMessage from "../../component/displayMessage/displayMessage";
import { clearUnusedProcess } from "../../functions/clearUnusedProcess";

export default function Invitado({ setUserJWT, setUserLogged }) {
	const [nickName, setNickname] = useState("");
	const [packages, setPackages] = useState({});
	const [ticket, setTicket] = useState([]);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState({});
	const { address, idticket } = useParams();
	const [status, setStatus] = useState("");

	useEffect(() => {
		const getObjs = async () => {
			const idTicketNumber = Number(idticket);
			const pack = await sendServerGet("/user/getpackagesid", "json");
			const ticket = await sendServerPost({ _id: idTicketNumber, ownerAddress: address }, "/user/getticketrefered", "json");

			if (pack.tittle == "Error" || ticket.tittle == "Error") {
				setOpen(true);
				setStatus("error");
				if (pack.tittle == "Error") setMessage(pack);
				setMessage(ticket);
			} else if (ticket[0].referals > 3) {
				setOpen(true);
				setStatus("error");
				setMessage({ tittle: "Notification", message: "The referrer ticket has completed all the task" });
			} else {
				setPackages(pack);
				setTicket(ticket);
				setNickname(ticket[0].nickName);
			}
		};
		setUserLogged(true);
		getObjs();
	}, []);

	return (
		<>
			<div className={style.content}>
				<div className={style.contTitle}>
					<h4 className={style.name}>{nickName}</h4>
					<span className={style.subtitle}>Invited you to collaborate</span>
				</div>
				{ticket.map((e) => (
					<div className={style.contCard} key={e.ticketId}>
						<CardShare
							img={e.imgRoute}
							referals={e.referrals}
							id={e.ticketId}
							addressReferer={e.ownerAddress}
							packageId={e.packageId}
							value={packages[e.packageId - 1].value}
						/>
					</div>
				))}
				<div className={style.contLogo}>
					<span className={style.subtitle}>
						Colaborate and <br />
						Keep it rolling!
					</span>
					<img src={img} className={style.img} alt="Logoicon" />
					<img src={imgI} className={style.imgInf} alt="Logoicon" />
				</div>
			</div>
			<DisplayMessage open={open} setOpen={setOpen} messageData={message} allowBackdropClick={true} status={status} exitRoute={"/"} />
		</>
	);
}
