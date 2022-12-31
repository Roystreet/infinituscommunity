import imgFilter from "../../assets/Light.png";
import CardTickets from "../../component/cardTikets/cardTickets";
import style from "./Package.module.css";
import DisplayMessage from "../../component/displayMessage/displayMessage";
import { sendServerPost } from "../../functions/serverInteractions";
import { useState, useEffect } from "react";

export default function Package() {
	const [myTickets, setmyTickets] = useState([]);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState({});
	const [exitRoute, setExitRoute] = useState(null);
	const [status, setStatus] = useState("");

	useEffect(() => {
		const getTikets = async () => {
			const MyTickets = await sendServerPost(
				{ address: localStorage.getItem("address") },
				"/user/getmytickets",
				"json",
				localStorage.getItem("jwt")
			);

			if (MyTickets.tittle == "Error") {
				setStatus("error");
				setExitRoute("/");
				setMessage(MyTickets);
				setOpen(true);
			} else {
				setmyTickets(MyTickets);
			}
		};
		getTikets();
	}, []);

	return (
		<div>
			<div className={style.contFilter}>
				<img src={imgFilter} alt="" className={style.imgFilter} />
			</div>
			{Array.isArray(myTickets) ? (
				myTickets
					.filter((e) => e.collected !== true)
					.map((e) => {
						return (
							<div className={style.cards} key={e.ticketId}>
								<CardTickets
									ticketId={e.ticketId}
									referals={e.referals}
									packageId={e.packageId}
									collected={e.collected}
									imgRoute={e.imgRoute}
								/>
							</div>
						);
					})
			) : (
				<h3> You have no tickets </h3>
			)}
			<DisplayMessage open={open} setOpen={setOpen} messageData={message} allowBackdropClick={true} exitRoute={exitRoute} status={status} />
		</div>
	);
}
