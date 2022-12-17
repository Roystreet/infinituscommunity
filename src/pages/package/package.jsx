 
 import imgFilter from "../../assets/Light.png"
 import CardTikets from "../../component/cardTikets/cardTikets";
import style from "./Package.module.css"
import { prepareServerConnection } from "../../functions/serverInteractions";
import { useState, useEffect } from "react";
import tikets from "./infoTikets"
export default function Package() {
  const [myTickets, setmyTickets] = useState([]);
console.log(tikets)
  // Mostrar Tikets    
  // useEffect( () => {
  //   const getTikets = async () =>{
  //   	setmyTickets(
  //       await prepareServerConnection(
  //         { address: localStorage.getItem('address') },
  //         '/user/getmytickets',
  //         'text',
  //         localStorage.getItem('jwt')
  //       )
  //     );
  //   }
  //     getTikets()
	// }, []);

  console.log(myTickets)

  return (
    <div>
      <div className={style.contFilter}>
        <img src={imgFilter} alt="" className={style.imgFilter}/>
      </div>
      <div className={style.cards}>
      {
        tikets?.map(e)=>{
          return (
            <div key={e.ticketId}>
                 <CardTikets 
                     ticketId= {e.ticketId}
                     referals= {e.referals}
                     packageId={e.packageId}
                     collected= {e.collected}
                     imgRoute= {e.imgRoute}
                />
           </div>
          )
        }
        
      }
    </div>
    </div>
  );
}
