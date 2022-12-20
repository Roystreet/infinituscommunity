import {
  /* connectAddress, */
  nonWriteContractFunctions,
  sendWriteTransactions,
  setAddress,
  signMessage,
} from "../functions/Web3Interactions";
import {
  getContractData,
  prepareServerConnection,
} from "../functions/ServerInteractions";
import { useState } from "react";
import {
  activateEventListeners,
  deactivateEventListeners,
} from "../functions/eventListeners";
import { useEffect } from "react";

function App() {
  const [balanceBUSD, setbalanceBUSD] = useState("");
  const [balanceINFI, setbalanceINFI] = useState("");
  const [responseRegister, setResponseRegister] = useState("");
  const [myTickets, setmyTickets] = useState([]);
  const [packagesId, setpackagesId] = useState([]);
  const [myInfo, setmyInfo] = useState([]);
  const [myNickname, setmyNickname] = useState();
  const [ticketSendedResponse, setTicketSendedResponse] = useState("");

  useEffect(() => {
    activateEventListeners();
    return () => {
      deactivateEventListeners();
    };
  }, []);

  return (
    <>
      <h1>Prueba de funcionalidades del servicio:</h1>
      <br />
      <button
        onClick={async () => {
          try {
            await setAddress();
            await signMessage().then(async (SignedInfo) => {
              await prepareServerConnection(
                SignedInfo,
                "/auth/register",
                "text"
              ).then(async (response) => {
                setResponseRegister(response);
              });
            });
          } catch (error) {
            console.log(error.message); //<=manejo de error con modal
          }
        }}
      >
        Register With Metamask
      </button>
      <br />
      <button
        onClick={async () => {
          try {
            await setAddress();
            await signMessage().then(async (SignedInfo) => {
              await prepareServerConnection(
                SignedInfo,
                "/auth/login",
                "json"
              ).then(async (response) => {
                localStorage.setItem("jwt", response.jwt);
                setResponseRegister(
                  `Usuario logeado con la address: ${localStorage.getItem(
                    "address"
                  )}`
                );
                await activateEventListeners();
              });
            });
          } catch (error) {
            console.log(error.message); //<=manejo de error con modal
          }
        }}
      >
        Login With Metamask
      </button>
      <h4>{responseRegister}</h4>
      <br />
      <h2>Balances</h2>
      <br />
      <button
        onClick={async () =>
          setbalanceBUSD(
            await nonWriteContractFunctions(
              await getContractData("/addressCoin", "text"),
              await getContractData("/abiCoin", "json"),
              "balanceOf",
              localStorage.getItem("address"),
              18
            )
          )
        }
      >
        Balance BUSD
      </button>
      <h4>{balanceBUSD}</h4>
      <br />
      <button
        onClick={async () =>
          setbalanceINFI(
            await nonWriteContractFunctions(
              await getContractData("/addressContract", "text"),
              await getContractData("/abiContract", "json"),
              "balanceOf",
              localStorage.getItem("address"),
              18
            )
          )
        }
      >
        Balance INFINITUS
      </button>
      <h4>{balanceINFI}</h4>
      <br />
      <button
        onClick={async () => {
          try {
            await sendWriteTransactions(
              await getContractData("/addressCoin", "text"),
              await getContractData("/abiCoin", "json"),
              "approve",
              [
                await getContractData("/addressContract", "text"),
                "50000000000000000000",
              ]
            ).then(async (response) => {
              console.log(response);
              const result = await sendWriteTransactions(
                await getContractData("/addressContract", "text"),
                await getContractData("/abiContract", "json"),
                "buyTicketFather",
                [[1, 3]]
              );
              console.log(result);
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Compra Ticket Presale
      </button>
      <br />
      <br />
      <button
        onClick={async () => {
          try {
            await sendWriteTransactions(
              await getContractData("/addressCoin", "text"),
              await getContractData("/abiCoin", "json"),
              "approve",
              [
                await getContractData("/addressContract", "text"),
                "25000000000000000000",
              ]
            ).then(async (response) => {
              console.log(response);
              await sendWriteTransactions(
                await getContractData("/addressContract", "text"),
                await getContractData("/abiContract", "json"),
                "buyTicketSon",
                [1, 3, "0xed2288d8C5Ec37c1d1c4e0266B5555395A6981D7", true]
              ).then((response) => {
                console.log(response);
              });
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Compra Ticket Referido BUSD
      </button>
      <br />
      <br />
      <button
        onClick={async () => {
          try {
            await sendWriteTransactions(
              await getContractData("/addressContract", "text"),
              await getContractData("/abiContract", "json"),
              "approve",
              [
                await getContractData("/addressContract", "text"),
                "100000000000000000000",
              ]
            ).then(async (response) => {
              console.log(response);
              await sendWriteTransactions(
                await getContractData("/addressContract", "text"),
                await getContractData("/abiContract", "json"),
                "buyTicketSon",
                [1, 3, "0xed2288d8C5Ec37c1d1c4e0266B5555395A6981D7", false]
              ).then((response) => {
                console.log(response);
              });
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Compra Ticket Referido INFI
      </button>
      <br />
      <br />
      {/* colect */}
      <button
        onClick={async () => {
          await sendWriteTransactions(
            await getContractData("/addressContract", "text"),
            await getContractData("/abiContract", "json"),
            "collectTickets",
            [[3]]
          ).then((response) => {
            console.log(response);
          });
        }}
      >
        Recolectar Tickets
      </button>
      <br />
      <br />
      <button
        onClick={async () => {
          await sendWriteTransactions(
            await getContractData("/addressContract", "text"),
            await getContractData("/abiContract", "json"),
            "withdraw",
            ["75000000000000000000"]
          ).then((response) => {
            console.log(response);
          });
        }}
      >
        Retirar
      </button>
      <br />
      <br />
      <button
        onClick={async () => {
          await sendWriteTransactions(
            await getContractData("/addressContract", "text"),
            await getContractData("/abiContract", "json"),
            "withdrawInverstorsWinings",
            [1]
          ).then((response) => {
            console.log(response);
          });
        }}
      >
        Retirar Ganancias Inversor
      </button>
      <br />
      <br />
      <button
        onClick={async () => {
          setmyTickets(
            await prepareServerConnection(
              { address: localStorage.getItem("address") },
              "/user/getmytickets",
              "text",
              localStorage.getItem("jwt")
            )
          );
        }}
      >
        Obtener mis tickets
      </button>
      <h4>{myTickets}</h4>
      <br />
      <br />
      <button
        // give away
        onClick={async () => {
          await sendWriteTransactions(
            await getContractData("/addressContract", "text"),
            await getContractData("/abiContract", "json"),
            "changeTicketOwner",
            [8, "0xfAB70E2D2449aDFfb91280dA2B2ECA971c323dfb"] //<===falta direccion
          ).then((response) => {
            console.log(response);
            setTicketSendedResponse("Ticket Enviado Exitosamente!");
          });
        }}
      >
        Enviar Ticket
      </button>
      <h4>{ticketSendedResponse}</h4>
      <br />
      <br />
      <button
        onClick={async () => {
          setpackagesId(
            await prepareServerConnection(
              { address: localStorage.getItem("address") },
              "/user/getPackagesId",
              "text",
              localStorage.getItem("jwt")
            )
          );
        }}
      >
        Obtener Id de Paquetes
      </button>
      <h4>{packagesId}</h4>
      <br />
      <br />
      <button
        onClick={async () => {
          setmyInfo(
            await prepareServerConnection(
              { address: localStorage.getItem("address") },
              "/user/getmyinfo",
              "text",
              localStorage.getItem("jwt")
            )
          );
        }}
      >
        Obtener mi Informacion
      </button>
      <h4>{myInfo}</h4>
      <br />
      <br />
      <button
        onClick={async () => {
          setmyNickname(
            await prepareServerConnection(
              {
                address: localStorage.getItem("address"),
                oldNickName: "user_2Am7yhHA-EKTgwf9VYLMI",
                newNickName: "P4nch0B1lla2541",
              },
              "/user/changenickname",
              "text",
              localStorage.getItem("jwt")
            )
          );
        }}
      >
        Cambiar Nickname
      </button>
      <h4>{myNickname}</h4>
    </>
  );
}

export default App;
