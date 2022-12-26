import img from "./assets/Union.png";
import imgI from "./assets/INFINITUS.png";
import CardShare from "../../component/CardShare/CardShare";
import style from "./Invitado.module.css";
import { useState, useEffect } from "react";
import { sendServerPost } from "../../functions/serverInteractions";
import { useParams } from "react-router-dom";

export default function Invitado() {
	const { address } = useParams();
	let { idticket } = useParams();

	const [myInfo, setmyInfo] = useState({});
	const [ticket, setTicket] = useState([]);

	const dataTicket = async () => {
		idticket = parseInt(idticket);
		console.log(idticket, address);
		const ticket = await sendServerPost({ _id: idticket, ownerAddress: address }, "/user/getticketrefered", "json");
		setTicket(ticket);
		console.log(ticket);
	};

	useEffect(() => {
		dataTicket();
	}, []);

	return (
		<div className={style.content}>
			<div className={style.contTitle}>
				<h1 className={style.name}>{myInfo ? myInfo.nickName : X}</h1>
				<span className={style.subtitle}>
					Invites you <br />
					to collaborate
				</span>
			</div>
			{ticket ? (
				ticket.map((e) => {
					return (
						<div className={style.contCard} key={e.ticketId}>
							<CardShare img={e.imgRoute} referals={e.referrals} id={e.ticketId} />
						</div>
					);
				})
			) : (
				<p> You have no tickets </p>
			)}
			<div className={style.contLogo}>
				<span className={style.subtitle}>
					Colaborate and <br />
					Keep it rolling!
				</span>
				<img src={img} className={style.img} alt="Logoicon" />
				<img src={imgI} className={style.imgInf} alt="Logoicon" />
			</div>
		</div>
	);
}
