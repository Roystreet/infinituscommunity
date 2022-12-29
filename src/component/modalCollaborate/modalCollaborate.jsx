import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import style from "./ModalCollaborate.module.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useState } from "react";
import { sendServerGet } from "../../functions/serverInteractions";
import { sendWriteTransactions } from "../../functions/Web3Interactions";
import DisplayMessage from "../displayMessage/displayMessage";
import { clearUnusedProcess } from "../../functions/clearUnusedProcess";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCollaborate({
  referals,
  userLogged,
  setUserLogged,
  open,
  setOpen,
  ticketId,
  addressReferer,
  packageId,
  value,
}) {
  const [openDisplay, setOpenDisplay] = useState(false);
  const [openMessagesDisplay, setOpenMessagesDisplay] = useState(false);
  const [message, setMessage] = useState({});
  const [btnDis, setBtnDis] = useState(false);
  const handleClickOpen = () => {
    if (userLogged == true) {
      setOpen(true);
    } else {
      setOpenDisplay(true);
      setMessage({
        tittle: "Notificacion",
        message: "Debe Iniciar Sesion y volver a escribir este enlace!",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function btnDisabled(ref) {
    if (ref == 4 && btnDis === false) {
      console.log("true");
      return setBtnDis(true);
    }
    if (ref < 4 && btnDis === true) {
      console.log("falses");
      return setBtnDis(false);
    }
  }
  btnDisabled(referals);
  return (
    <div>
      <button
        disabled={btnDis}
        onClick={handleClickOpen}
        className={style.btnPrincipal}
      >
        Collaborate
      </button>
      <Dialog
        sx={{
          display: "center",
          width: "100%",
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Button
          onClick={handleClose}
          sx={{
            justifyContent: "end",
            borderRadius: "8px",
            color: "#51BADB",
            fontSize: "20px",
          }}
        ></Button>
        <DialogContent>
          <p className={style.titleModal}>Select your payment method</p>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
            className={style.btnPago}
            onClick={async () => {
              await sendWriteTransactions(
                await sendServerGet("/addressCoin", "text"),
                await sendServerGet("/abiCoin", "json"),
                "approve",
                [await sendServerGet("/addressContract", "text"), value]
              )
                .then(async (response) => {
                  console.log(response);
                  await sendWriteTransactions(
                    await sendServerGet("/addressContract", "text"),
                    await sendServerGet("/abiContract", "json"),
                    "buyTicketSon",
                    [packageId, ticketId, addressReferer, true]
                  )
                    .then((response) => {
                      console.log(response);
                      setOpenMessagesDisplay(true);
                      setMessage({
                        tittle: "Exito!",
                        message: `Ticket comprado y registrado con el siguiente Hash:${response.hash}`,
                      });
                    })
                    .catch((error) => {
                      setOpenMessagesDisplay(true);
                      setMessage({ tittle: "Metamask Error", message: error });
                    });
                })
                .catch((error) => {
                  setOpenMessagesDisplay(true);
                  setMessage({ tittle: "Metamask Error", message: error });
                });
            }}
          >
            {"BUSD (Binance USD)"}
          </button>
          <button
            className={style.btnPago}
            onClick={async () => {
              await sendWriteTransactions(
                await sendServerGet("/addressContract", "text"),
                await sendServerGet("/abiContract", "json"),
                "approve",
                [await sendServerGet("/addressContract", "text"), value]
              )
                .then(async (response) => {
                  console.log(response);
                  await sendWriteTransactions(
                    await sendServerGet("/addressContract", "text"),
                    await sendServerGet("/abiContract", "json"),
                    "buyTicketSon",
                    [packageId, ticketId, addressReferer, false]
                  )
                    .then((response) => {
                      console.log(response);
                      setOpenMessagesDisplay(true);
                      setMessage({
                        tittle: "Exito!",
                        message: `Ticket comprado y registrado con el siguiente Hash:${response.hash}`,
                      });
                    })
                    .catch((error) => {
                      setOpenMessagesDisplay(true);
                      setMessage({ tittle: "Metamask Error", message: error });
                    });
                })
                .catch((error) => {
                  setOpenMessagesDisplay(true);
                  setMessage({ tittle: "Metamask Error", message: error });
                });
            }}
          >
            {"INFI (Infinitus Token)"}
          </button>
        </DialogActions>
      </Dialog>
      <DisplayMessage
        open={openDisplay}
        messageData={message}
        setOpen={setOpenDisplay}
        allowBackdropClick={true}
        exitRoute={"/"}
        finalFunction={() => {
          setUserLogged(false);
          clearUnusedProcess();
        }}
      />
      <DisplayMessage
        open={openMessagesDisplay}
        messageData={message}
        setOpen={setOpenMessagesDisplay}
        allowBackdropClick={true}
      />
    </div>
  );
}
