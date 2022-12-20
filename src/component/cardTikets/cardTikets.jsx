import { useState } from 'react';
import style from "./cardTikets.module.css"
import img from "./assets/Vector.png"
import { FaUser, FaRegUser,FaWhatsapp, FaTelegram, FaLink} from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendWriteTransactions } from '../../functions/Web3Interactions';
import { getContractData } from '../../functions/serverInteractions';
import AlertDialogSlideTiket from "../modalRegalarTiket/modalRegalarTiket";
// import tickets from '../../pages/package/infoTikets';
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Toaster, toast } from "react-hot-toast"

const CardTikets = ( 
  {
    ticketId, 
    referals,
    packageId,
    collected,
    imgRoute
  }
  ) =>{
  const [smShow, setSmShow] = useState(false);
  
// console.log(tickets)

function iconRegUser(referals) {
  const expr = referals;
  switch (expr) {
    case 0:
     
      return(
        <div>
            <FaRegUser className={style.iconUser}/>
            <FaRegUser className={style.iconUser}/>
           <FaRegUser className={style.iconUser}/>
          <FaRegUser className={style.iconUser}/>
        </div>
    
      )
     
    case 1:
      return(
        <div>
            <FaUser className={style.iconUser}/>
            <FaRegUser className={style.iconUser}/>
           <FaRegUser className={style.iconUser}/>
          <FaRegUser className={style.iconUser}/>
        </div>
    
      )
   case 2:
    return(
      <div>
          <FaUser className={style.iconUser}/>
          <FaUser className={style.iconUser}/>
         <FaRegUser className={style.iconUser}/>
        <FaRegUser className={style.iconUser}/>
      </div>
  
    )
    case 3:
      return(
        <div>
            <FaUser className={style.iconUser}/>
            <FaUser className={style.iconUser}/>
           <FaUser className={style.iconUser}/>
          <FaRegUser className={style.iconUser}/>
        </div>
    
      )
    case 4:
      return(
        <div>
            <FaUser className={style.iconUser}/>
            <FaUser className={style.iconUser}/>
           <FaUser className={style.iconUser}/>
          <FaUser className={style.iconUser}/>
        </div>
    
      )
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
  
}
function btnColect(referals){
  if(referals === 4){
    return( 
    
       <button className={style.btn}
      onClick={async () => {
        await sendWriteTransactions(
          await getContractData('/addressContract', 'text'),
          await getContractData('/abiContract', 'json'),
          'collectTickets',
          [[3]]
        ).then(response => {
          console.log(response);
        });
      }}
      >Recolet</button>   
      )
  }
}
  return(
    <div className={style.card}>
        <div>
          <div>
          <img className={style.img} src={`../../../public/packagesAvatar/${imgRoute}.png`} alt="" />
          <div className={style.contIcon}> <span className={style.icons}> 
         {iconRegUser(referals)}
          </span>
            <div className={style.contShare}>
              <Button onClick={() => setSmShow(true)} className={style.btnBoots} >
 
                <img src={img} className={style.vector} alt="" />
              </Button>
              <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                className={style.conModal}
              >
               <Modal.Header closeButton className={style.modalHeader}>
                  <Modal.Title id="example-modal-sizes-title-sm" >
                    <h2 className={style.titleModal}>Share white</h2>
                  </Modal.Title>
               </Modal.Header>
              <Modal.Body className={style.modaldiv}>
             <div className={style.contIconsModal}>
               <button disabled className={style.contIconTitle}><FaWhatsapp className={style.iconModal}/> <h4 className={style.subTitleModal}>WhatsApp</h4></button>
              
               <button disabled className={style.contIconTitle}><FaTelegram className={style.iconModal}/><h4 className={style.subTitleModal}>Telegram</h4></button>
               < CopyToClipboard text={0}  >
                 <button onClick={()=> toast.success('Link copied')} className={style.contIconTitle}><FaLink className={style.iconModal}/><h4 className={style.subTitleModal}>Copy Link </h4></button>  
               </CopyToClipboard >
               <Toaster toastOptions={{
                  style: {
                  padding: '16px',
                  color:'blue',
                  marginTop: '250px',
            },
             }}/>
             </div>
        </Modal.Body>
      </Modal>
        </div>
        </div>
          </div>
        </div>
       
        <div className={style.contBtn}>
          
         <AlertDialogSlideTiket/>
         { btnColect(referals)}
        </div>
    </div>
  )
}
export default CardTikets;

