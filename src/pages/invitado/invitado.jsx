 
 import img from "./assets/Union.png"
 import imgI from "./assets/INFINITUS.png"
 import CardShare from "../../component/CardShare/CardShare";
 import style from "./Invitado.module.css"
 import { useState, useEffect } from 'react';
import { prepareServerConnection } from "../../functions/serverInteractions";

 
 
 export default function Invitado() {
   // Mostrar Tikets    
   const [myInfo, setmyInfo] = useState({});
   const [ticket, setTicket] = useState();
  


  useEffect( () => {
  const data = async ()=>{
  setmyInfo(
    await prepareServerConnection(
      { address: localStorage.getItem('address') },
      '/user/getmyinfo',
      'json',
      localStorage.getItem('jwt')
    )
  ); 
  }
  data()
	}, []);

  useEffect( () => {
    const dataTicket = async ()=>{
      setTicket(
        await prepareServerConnection(
          { _id: 1, 
            ownerAddress: localStorage.getItem('address') },
          '/user/getticketrefered',
           'json',
        )
      )
      }
      dataTicket()
    
  },[])

console.log(ticket)

const datos = []
datos.push(ticket)
console.log(datos)

   return (
     <div className={style.content}>
    <div className={style.contTitle}>
      <h1 className={style.name}>{myInfo ? (myInfo.nickName) : (X)}</h1>
      <span className={style.subtitle}>Invites you <br/>to collaborate</span>
    </div>
    { 
      datos ? datos.map((e) => {
           
        return(
        <div className={style.contCard} key={e.ticketId}>
        <CardShare 
         img={e.imgRoute}
         referals = {e.referrals}
         id = {e.ticketId}
        />
       </div>
       )
       }): (    <p> You have no tickets </p>)
         
     }
      <div className={style.contLogo}>
        <span className={style.subtitle}>Colaborate and <br/>Keep it rolling!</span>
        <img src={img} className={style.img} alt="Logoicon" />
        <img src={imgI} className={style.imgInf} alt="Logoicon" />
      </div>
     </div>
   );
 }
 