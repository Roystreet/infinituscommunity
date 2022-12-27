import img from "./assets/Union.png";
import imgI from "./assets/INFINITUS.png";
import CardShare from "../../component/CardShare/CardShare";
import style from "./Invitado.module.css";
import { useState, useEffect } from "react";
import { sendServerGet, sendServerPost } from "../../functions/serverInteractions";
import { useParams } from "react-router-dom";

export default function Invitado() {
	const { address } = useParams();
	let { idticket } = useParams();

	const [myInfo, setmyInfo] = useState({});
	const [packages, setPackages] = useState({});
	const [ticket, setTicket] = useState([]);

	useEffect(() => {
		const getObjs = async () => {
			idticket = parseInt(idticket);
			const pack = await sendServerGet("/user/getpackagesid", "json");
			const ticket = await sendServerPost({ _id: idticket, ownerAddress: address }, "/user/getticketrefered", "json");
			setPackages(pack);
			setTicket(ticket);
		};
		getObjs();
	}, []);
console.log(myInfo)
	return (
		<div className={style.content}>
			<div className={style.contTitle}>
			<h1 className={style.name}>{myInfo ? (myInfo.nickName) : (X)}</h1>
				<span className={style.subtitle}>
					Invites you <br />
					to collaborate
				</span>
			</div>
			{ticket ? (
				ticket.map((e) => {
					return (
						<div className={style.contCard} key={e.ticketId}>
							<CardShare
								img={e.imgRoute}
								referals={e.referrals}
								id={e.ticketId}
								addressReferer={e.ownerAddress}
								packageId={e.packageId}
								// value={packages[e.packageId - 1].value}
							/>
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
// const [myInfo, setmyInfo] = useState({});
// const [ticket, setTicket] = useState([]);

// useEffect( () => {
// const data = async ()=>{
// setmyInfo(
// 	await prepareServerConnection(
// 		{ address: localStorage.getItem('address') },
// 		'/user/getmyinfo',
// 		'json',
// 		localStorage.getItem('jwt')
// 	)
// ); 
// }
// data()
// }, []);





//  return (
// 	 <div className={style.content}>
// 	<div className={style.contTitle}>
// 		<h1 className={style.name}>{myInfo ? (myInfo.nickName) : (X)}</h1>