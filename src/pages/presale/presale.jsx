import PresalePackage from "./presalePackege";
import { useState, useEffect } from "react";
import CardPresale from "../../component/cardPresale/cardPresale";
import { sendServerGet } from "../../functions/serverInteractions";
import DisplayMessage from "../../component/displayMessage/displayMessage";

export default function Presale() {
	const [totalSupply, setTotalSupply] = useState(null);
	const [message, setMessage] = useState({});
	const [open, setOpen] = useState(false);
	const [exitRoute, setExitRoute] = useState(null);
	const [status, setStatus] = useState("");

	useEffect(() => {
		async function getData() {
			try {
				const data = await sendServerGet("/user/getpackagesid", "json");
				setTotalSupply(data);
			} catch (err) {
				setMessage(err);
				setExitRoute("/");
				setStatus("error");
				setOpen(true);
			}
		}
		getData();
	}, []);

	return (
		<>
			<div className="container_presale">
				{PresalePackage.length > 0 && totalSupply ? (
					PresalePackage.map((data) => {
						return (
							<CardPresale
								key={data.id}
								id={data.id}
								name={data.name}
								image={data.image}
								value={data.value}
								amount={data.cantidad}
								supply={totalSupply ? totalSupply.filter((filter) => filter.packageId == data.id)[0].totalForPresale : null}
							/>
						);
					})
				) : (
					<p></p>
				)}
			</div>
			<DisplayMessage open={open} setOpen={setOpen} messageData={message} allowBackdropClick={true} exitRoute={exitRoute} status={status} />
		</>
	);
}
