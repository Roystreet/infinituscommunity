import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import { sendServerGet } from "../../functions/serverInteractions";
import { FaUser, FaRegUser, FaWhatsapp, FaTelegram, FaLink } from "react-icons/fa";
import style from "./cardTickets.module.css";
import img from "./assets/Vector.png";
import Modal from "react-bootstrap/Modal";
import ModalRegalarTiket from "../modalRegalarTiket/modalRegalarTiket";
import DisplayMessage from "../displayMessage/displayMessage";
import { useLocation } from "react-router-dom";

const CardTickets = ({ ticketId, referals, packageId, collected, imgRoute }) => {
	const location = useLocation();
	const [smShow, setSmShow] = useState(false);
	const [open, setOpen] = useState(false);
	const [messageDisplay, setMessageDisplay] = useState({});
	const [exitRoute, setExitRoute] = useState(null);
	const [status, setStatus] = useState("");

	function iconRegUser(referals) {
		const expr = referals;
		switch (expr) {
			case 0:
				return (
					<div>
						<FaRegUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
					</div>
				);

			case 1:
				return (
					<div>
						<FaUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
					</div>
				);
			case 2:
				return (
					<div>
						<FaUser className={style.iconUser} />
						<FaUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
					</div>
				);
			case 3:
				return (
					<div>
						<FaUser className={style.iconUser} />
						<FaUser className={style.iconUser} />
						<FaUser className={style.iconUser} />
						<FaRegUser className={style.iconUser} />
					</div>
				);
			case 4:
				return (
					<div>
						<FaUser className={style.iconUser} />
						<FaUser className={style.iconUser} />
						<FaUser className={style.iconUser} />
						<FaUser className={style.iconUser} />
					</div>
				);
			default:
				console.log(`Sorry, we are out of ${expr}.`);
		}
	}

	function btnCollect(referals) {
		if (referals === 4) {
			return (
				<button
					className={style.btn}
					onClick={async () => {
						await sendWriteTransactions(
							await sendServerGet("/addressContract", "text"),
							await sendServerGet("/abiContract", "json"),
							"collectTickets",
							[[ticketId]]
						)
							.then((response) => {
								setExitRoute("/mytickets");
								setMessageDisplay({ tittle: "Success", message: `Ticket Collected Successfully down the Hash: ${response.hash}` });
								setStatus("success");
								setOpen(true);
							})
							.catch((error) => {
								setExitRoute("/mytickets");
								setMessageDisplay({ tittle: "Error", message: error.reason });
								setStatus("error");
								setOpen(true);
							});
					}}
				>
					Collect Tickets
				</button>
			);
		}
	}

	function cerrar() {
		setTimeout(function () {
			setSmShow(false);
		}, 1000);
	}

	function rutaParaCompartir() {
		const add = localStorage.getItem("address");
		const route = location.pathname;
		const routeLength = route.length;
		const url = window.location.href.length - (routeLength - 1);
		const urlCompartir = window.location.href.substring(0, url) + `share/${ticketId}/owner/${add}`;

		return urlCompartir;
	}

	function message(data) {
		if (data === "wsp") {
			const msj = `https://wa.me/?text=Hello, i send you this link so you can join Infintus Community ` + rutaParaCompartir();
			return msj;
		}
		if (data === "tel") {
			const msj = `https://t.me/share/url?url=Hello, i send you this link so you can join Infintus Community  ` + rutaParaCompartir();
			return msj;
		}
	}
	function mosImg(imgRoute) {
		if (imgRoute) {
			return imgRoute;
		} else {
			return "iniciado";
		}
	}

	return (
		<div className={style.card}>
			<div>
				<div>
					<img className={style.img} src={`/packages/${mosImg(imgRoute)}.png`} alt="" />
					<div className={style.contIcon}>
						<span className={style.icons}>{iconRegUser(referals)}</span>
						<div className={style.contShare}>
							{/* <Button
                onClick={() => setSmShow(true)}
                className={style.btnBoots}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <img src={img} className={style.vector} alt="" />
              </Button> */}
							<button onClick={() => setSmShow(true)} className={style.btnBoots}>
								<img src={img} className={style.vector} alt="" />
							</button>
							<Modal
								size="sm"
								show={smShow}
								onHide={() => setSmShow(false)}
								aria-labelledby="example-modal-sizes-title-sm"
								className={style.conModal}
							>
								<Modal.Header closeButton className={style.modalHeader}>
									<Modal.Title id="example-modal-sizes-title-sm">
										<h2 className={style.titleModal}>Share white</h2>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body className={style.modaldiv}>
									<div className={style.contIconsModal}>
										<a href={message("wsp")} target="_blank" rel="noopener noreferrer" className={style.link}>
											<button className={style.contIconTitle}>
												<FaWhatsapp className={style.iconModal} /> <h4 className={style.subTitleModal}>WhatsApp</h4>
											</button>
										</a>
										<a href={message("tel")} target="_blank" rel="noopener noreferrer" className={style.link}>
											<button className={style.contIconTitle}>
												<FaTelegram className={style.iconModal} />
												<h4 className={style.subTitleModal}>Telegram</h4>
											</button>
										</a>
										<CopyToClipboard text={rutaParaCompartir()}>
											<button
												onClick={() => {
													toast.success("Link copied"), cerrar();
												}}
												className={style.contIconTitle}
											>
												<FaLink className={style.iconModal} />
												<h4 className={style.subTitleModal}>Copy Link </h4>
											</button>
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
								</Modal.Body>
							</Modal>
						</div>
					</div>
				</div>
			</div>
			<div className={style.contBtn}>
				<ModalRegalarTiket ticketId={ticketId} />
				{btnCollect(referals)}
			</div>
			<DisplayMessage
				open={open}
				setOpen={setOpen}
				messageData={messageDisplay}
				allowBackdropClick={true}
				exitRoute={exitRoute}
				status={status}
			/>
		</div>
	);
};
export default CardTickets;
