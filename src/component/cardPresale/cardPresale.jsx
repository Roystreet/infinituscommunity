import { Box } from "@mui/material";
import { Progress } from "antd";
import {
  nonWriteContractFunctions,
  sendWriteTransactions,
  setAddress,
  signMessage,
} from "../../functions/Web3Interactions";
import {
  getContractData,
  prepareServerConnection,
} from "../../functions/ServerInteractions";
function calcPercent(availible, amount) {
  return null;
}

function addDecimal(input) {
  const decimalString = "000000000000000000";
  const number = Math.floor(input / 2);
  const output = number + decimalString;
  return output;
}

function getAddres() {
  const address = localStorage.getItem("address");
  return address;
}

export default function CardPresale({ id, name, value, image, cantidad }) {
  const buyPresale = async (id, value) => {
    try {
      await sendWriteTransactions(
        await getContractData("/addressCoin", "text"),
        await getContractData("/abiCoin", "json"),
        "approve",
        [await getContractData("/addressContract", "text"), addDecimal(value)]
      ).then(async (response) => {
        console.log(response);
        await sendWriteTransactions(
          await getContractData("/addressContract", "text"),
          await getContractData("/abiContract", "json"),
          "buyTicketSon",
          [id, 1, getAddres(), true]
        ).then((response) => {
          console.log(response);
        });
      });
    } catch (error) {
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
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 57.59%, rgba(0, 0, 0, 0.48) 75.31%, rgba(0, 0, 0, 0.99) 100%)",
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
              background:
                "linear-gradient(270deg, #B751DB 9.44%, rgba(183, 81, 219, 0) 160%)",
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
          <Box
            component="div"
            className="button_presale_buy"
            sx={{}}
            onClick={() => buyPresale(id, value)}
          >
            Buy
          </Box>
        </Box>
      </Box>
    </div>
  );
}
