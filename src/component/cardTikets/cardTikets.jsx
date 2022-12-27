import { useState } from "react";
import style from "./cardTikets.module.css";
import img from "./assets/Vector.png";
import { FaUser, FaRegUser, FaWhatsapp, FaTelegram, FaLink } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import { sendServerGet } from "../../functions/serverInteractions";
import AlertDialogSlideTiket from "../modalRegalarTiket/modalRegalarTiket";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CardTikets = ({ ticketId, referals, packageId, collected, imgRoute }) => {
	const [smShow, setSmShow] = useState(false);

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
	function btnColect(referals) {
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
						).then((response) => {
							console.log(response);
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
		const urlCompartir = window.location.href.slice(0, -8) + `share/${ticketId}/owner/${add}`;

		return urlCompartir;
	}

	function message(data) {
		console.log(rutaParaCompartir());
		if (data === "wsp") {
			const msj =
				`https://wa.me/?text=Hello, I want to give you this ticket so that you can join the infinitus community ` + rutaParaCompartir();
			return msj;
		}
		if (data === "tel") {
			const msj =
				`https://t.me/share/url?url=Hello, I want to give you this ticket so that you can join the infinitus community ` +
				rutaParaCompartir();
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
					<img className={style.img} src={`../../../public/packagesAvatar/${mosImg(imgRoute)}.png`} alt="" />
					<div className={style.contIcon}>
						<span className={style.icons}>{iconRegUser(referals)}</span>
						<div className={style.contShare}>
							<Button onClick={() => setSmShow(true)} className={style.btnBoots}>
								<img src={img} className={style.vector} alt="" />
							</Button>
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
									<a href={message("wsp")} target="_blank">
										<button disabled className={style.contIconTitle}>
											<FaWhatsapp className={style.iconModal} /> <h4 className={style.subTitleModal}>WhatsApp</h4>
										</button>
										</a>
										<a href={message("tel")} target="_blank">

									
										<button disabled className={style.contIconTitle}>
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
				<AlertDialogSlideTiket ticketId={ticketId} />
				{btnColect(referals)}
			</div>
		</div>
	);
};
export default CardTikets;
