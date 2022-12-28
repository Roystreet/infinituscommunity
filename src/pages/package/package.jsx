import imgFilter from "../../assets/Light.png";
import CardTikets from "../../component/cardTikets/cardTikets";
import style from "./Package.module.css";
import { sendServerPost } from "../../functions/serverInteractions";
import { useState, useEffect } from "react";
import tikets from "./infoTikets";
export default function Package() {
  const [myTickets, setmyTickets] = useState([]);

  useEffect(() => {
    const getTikets = async () => {
      setmyTickets(
        await sendServerPost(
          { address: localStorage.getItem("address") },
          "/user/getmytickets",
          "json",
          localStorage.getItem("jwt")
        )
      );
    };
    getTikets();
    console.log(myTickets);
  }, []);
  console.log(myTickets);
  return (
    <div>
      <div className={style.contFilter}>
        <img src={imgFilter} alt="" className={style.imgFilter} />
      </div>
      <div className={style.cards}>
        {Array.isArray(myTickets) ? (
          myTickets
            .filter((e) => e.collected !== true)
            .map((e) => {
              return (
                <div key={e.ticketId}>
                  <CardTikets
                    ticketId={e.ticketId}
                    referals={e.referals}
                    packageId={e.packageId}
                    collected={e.collected}
                    imgRoute={e.imgRoute}
                  />
                </div>
              );
            })
        ) : (
          <p> You have no tickets </p>
        )}
      </div>
    </div>
  );
}
