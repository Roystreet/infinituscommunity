 
 import imgFilter from "../../assets/Light.png"
 import CardTikets from "../../component/cardTikets/cardTikets";
import style from "./Package.module.css"
import { prepareServerConnection } from "../../functions/serverInteractions";
import { useState, useEffect } from "react";
import tikets from "./infoTikets"
export default function Package() {
  const [myTickets, setmyTickets] = useState([]);
// console.log(tikets)
  // Mostrar Tikets    
  useEffect( () => {
    const getTikets = async () =>{
    	setmyTickets(
        await prepareServerConnection(
          { address: localStorage.getItem('address') },
          '/user/getmytickets',
          'json',
          localStorage.getItem('jwt')
        )
      );
      
    }
     getTikets()
	}, []);

//  const data = myTickets
// data.push()
// console.log(data)
 console.log(myTickets)
// function rec(myTickets){ 
//   myTickets?.map((e) =>{
//     console.log(e)
//   }
// )}
// rec(data)
  return (
    <div>
      <div className={style.contFilter}>
        <img src={imgFilter} alt="" className={style.imgFilter}/>
      </div>
      <div className={style.cards}>

       {
          
          Array.isArray(myTickets) ? myTickets.map((e) => {
            console.log(e)
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
          })
          
          : (    <p> You have no tickets </p>)
          
         }
    </div>
    </div>
  );
}
