import img from "./assets/Union.png";
import imgI from "./assets/INFINITUS.png";
import CardShare from "../../component/CardShare/CardShare";
import style from "./Invitado.module.css";
import { useState, useEffect } from "react";
import {
  sendServerGet,
  sendServerPost,
} from "../../functions/serverInteractions";
import { useParams } from "react-router-dom";
import { activateEventListeners } from "../../functions/eventListeners";
import DisplayMessage from "../../component/displayMessage/displayMessage";
import { clearUnusedProcess } from "../../functions/clearUnusedProcess";

export default function Invitado({ userLogged, setUserLogged }) {
  const [nickName, setNickname] = useState("");
  const [packages, setPackages] = useState({});
  const [ticket, setTicket] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessagesDisplay, setOpenMessagesDisplay] = useState(false);
  const [message, setMessage] = useState({});
  const { address, idticket } = useParams();

  useEffect(() => {
    if (userLogged) {
      const getObjs = async () => {
        const idTicketNumber = Number(idticket);
        const pack = await sendServerGet("/user/getpackagesid", "json");
        const ticket = await sendServerPost(
          { _id: idTicketNumber, ownerAddress: address },
          "/user/getticketrefered",
          "json"
        );

        if (pack.tittle == "Error" || ticket.tittle == "Error") {
          setOpen(true);
          if (pack.tittle == "Error") setMessage(pack);
          setMessage(ticket);
        } else if (ticket[0].referals > 3) {
          setOpenMessagesDisplay(true);
          setMessage({
            tittle: "Notificacion",
            message:
              "El ticket referidor ya completo sus tareas. Usa otro enlace de referido.",
          });
        } else {
          setPackages(pack);
          setTicket(ticket);
          setNickname(ticket[0].nickName);
        }
      };
      getObjs();
    } else {
      setOpen(true);
      setMessage({
        tittle: "Notificacion",
        message: "Debe Iniciar Sesion y volver a escribir este enlace!",
      });
    }
  }, []);

  return (
    <>
      <div className={style.content}>
        <div className={style.contTitle}>
          <h4 className={style.name}>{nickName}</h4>
          <span className={style.subtitle}>Invited you to collaborate</span>
        </div>
        {ticket.map((e) => (
          <div className={style.contCard} key={e.ticketId}>
            <CardShare
              userLogged={userLogged}
              setUserLogged={setUserLogged}
              img={e.imgRoute}
              referals={e.referrals}
              id={e.ticketId}
              addressReferer={e.ownerAddress}
              packageId={e.packageId}
              value={packages[e.packageId - 1].value}
            />
          </div>
        ))}
        <div className={style.contLogo}>
          <span className={style.subtitle}>
            Colaborate and <br />
            Keep it rolling!
          </span>
          <img src={img} className={style.img} alt="Logoicon" />
          <img src={imgI} className={style.imgInf} alt="Logoicon" />
        </div>
      </div>
      <DisplayMessage
        open={openMessagesDisplay}
        setOpen={setOpenMessagesDisplay}
        messageData={message}
        allowBackdropClick={true}
      />
      <DisplayMessage
        open={open}
        messageData={message}
        setOpen={setOpen}
        allowBackdropClick={true}
        exitRoute={"/"}
        finalFunction={() => {
          setUserLogged(false);
          clearUnusedProcess();
        }}
      />
    </>
  );
}
