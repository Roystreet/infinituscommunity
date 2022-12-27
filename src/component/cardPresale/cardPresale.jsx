import { Box } from "@mui/material";
import { nonWriteContractFunctions, sendWriteTransactions } from "../../functions/Web3Interactions";
import { sendServerGet } from "../../functions/serverInteractions";
async function addDecimal(input) {
	let output;
	let number = Number(input);
	let result = number / 2;
	if (result.toString().includes(".")) {
		result = result.toString().replace(".", "");
		output = result + "0".repeat(17);
	} else {
		output = result + "0".repeat(18);
	}

	return output;
}

function getAddres() {
	const address = localStorage.getItem("address");
	return address;
}

export default function CardPresale({ id, name, value, image, amount, supply }) {
	console.log(supply);
	const buyPresale = async (id, value) => {
		try {
			console.log(id, value);
			await sendWriteTransactions(await sendServerGet("/addressCoin", "text"), await sendServerGet("/abiCoin", "json"), "approve", [
				await sendServerGet("/addressContract", "text"),
				await addDecimal(value),
			]).then(async (response) => {
				console.log(response);
				await sendWriteTransactions(
					await sendServerGet("/addressContract", "text"),
					await sendServerGet("/abiContract", "json"),
					"buyTicketFather",
					[1, id]
				).then((response) => {
					console.log("success");
					console.log(response);
				});
			});
		} catch (error) {
			console.log("Error");
			console.log(error);
		}
	};

	return (
		<div className="card_presale">
			<Box
				component="div"
				sx={{
					background: `url(${image})`,
					backgroundSize: "cover",
					borderRadius: "14px",
				}}
				className="container_image_presale"
			>
				{/* div que contiene el sombreado  */}
				<Box
					component="div"
					sx={{
						width: "266px",
						height: "132px",
						position: "absolute",
						borderRadius: "14px",
						left: "-0.38%",
						right: "0.38%",
						bottom: "0px",
						background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 57.59%, rgba(0, 0, 0, 0.48) 75.31%, rgba(0, 0, 0, 0.99) 100%)",
					}}
				></Box>
				{/* div que contien el valor del paquete */}
				<Box
					component="div"
					sx={{
						position: "absolute",
						fontSize: "30px",
						fontWeight: "500",
						left: "78.28%",
						top: "1.3%",
						bottom: "79.13%",
						right: "7.87%",
						color: "#FFFFFF",
					}}
				>
					{value}
				</Box>

				{/* Cantidad de ticket restantes  */}
				<Box
					component="div"
					sx={{
						width: "224px",
						display: "flex",
						justifyContent: "space-between",
						position: "absolute",
						left: "30px",
						bottom: "20%",
					}}
				>
					{/* Remaining */}
					<Box component="div" sx={{ color: "#fafafa" }}>
						REMAINING
					</Box>
					{/* Rest tickets */}
					<Box component="div" sx={{ color: "#fafafa", fontSize: "20px", fontWeight: 500 }}>
						{supply + "/" + amount}
					</Box>
				</Box>

				{/* Barra progresiva */}
				<Box
					sx={{
						width: "224px",
						height: "10px",
						position: "absolute",
						background: "#FAFAFA",
						borderRadius: "20px",
						left: "30px",
						bottom: "10%",
						margin: "0px",
					}}
				>
					<Box
						className="progressive_bar"
						sx={{
							width: "99%",
							height: "10px",
							position: "absolute",
							background: "linear-gradient(270deg, #B751DB 9.44%, rgba(183, 81, 219, 0) 160%)",
						}}
					></Box>
				</Box>
			</Box>
			<Box component="div" className="container_actions_presale">
				<Box
					component="div"
					className="text_gradiant"
					sx={{
						paddingLeft: "13px",
						fontWeight: "700",
						fontSize: "17px",
						lineHeight: "20px",
						letterSpacing: "0.05em",
					}}
				>
					{name}
				</Box>
				<Box
					component="div"
					sx={{
						display: "flex",
						justifyContent: "space-around",
						padding: "3px",
					}}
				>
					<div>
						<span className="text_gradiant text_offer"> 50%</span>
						<span className="text_gradiant text_offer">off</span>
					</div>
					<Box component="div" className="button_presale_buy" sx={{}} onClick={() => buyPresale(id, value)}>
						Buy
					</Box>
				</Box>
			</Box>
		</div>
	);
}
