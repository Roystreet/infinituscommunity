import { useEffect, useState } from "react";
import style from "./cardShare.module.css";
import { FaUser, FaRegUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalCollaborate from "../modalCollaborate/modalCollaborate";

const CardShare = ({ userLogged, setUserLogged, img, referals, id, addressReferer, packageId, value }) => {
	const [open, setOpen] = useState(false);
	const [nameAddress, setNameAddress] = useState("");
	const [smShow, setSmShow] = useState(false);
	function mosImg(imgRoute) {
		if (imgRoute) {
			return `../../../public/packagesAvatar/${imgRoute}.png`;
		} else {
			//error
		}
	}
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

	return (
		<div className={style.card}>
			<div>
				<div>
					<img className={style.img} src={mosImg(img)} alt="" />
					<div className={style.contIcon}>
						<span className={style.icons}>{iconRegUser(referals)}</span>
					</div>
					<div className={style.btn}>
						<ModalCollaborate
							userLogged={userLogged}
							setUserLogged={setUserLogged}
							open={open}
							setOpen={setOpen}
							ticketId={id}
							addressReferer={addressReferer}
							packageId={packageId}
							value={value}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CardShare;
