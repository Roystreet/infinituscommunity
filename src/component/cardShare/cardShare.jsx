import { useState } from 'react';
import style from "./cardShare.module.css"
import img from "./assets/Vector.png"
import { FaUser, FaRegUser,FaWhatsapp, FaTelegram, FaLink} from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseButton from 'react-bootstrap/CloseButton';

const CardShare = () =>{
  const [smShow, setSmShow] = useState(false);
  
  

  return(
    <div className={style.card}>
        <div>
          <div>
          <img className={style.img} src="https://i0.wp.com/criptotendencia.com/wp-content/uploads/2018/08/Ejemplo-billetes-criptomonedas.jpg?fit=1000%2C667&ssl=1" alt="" />
          <div className={style.contIcon}> <span className={style.icons}> 
          <FaUser className={style.iconUser}/>
          <FaUser className={style.iconUser}/>
          <FaUser className={style.iconUser}/>
          <FaRegUser className={style.iconUser}/>
          </span>
            {/* <div className={style.contShare}>
              <Button onClick={() => setSmShow(true)} className={style.btnBoots} >
 
                <img src={img} className={style.vector} alt="" />
              </Button>
              <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            
              >
               <Modal.Header closeButton className={style.modalHeader}>
                  <Modal.Title id="example-modal-sizes-title-sm" >
                    <h2 className={style.titleModal}>Share white</h2>
                  </Modal.Title>
               </Modal.Header>
              <Modal.Body className={style.modaldiv}>
             <div className={style.contIconsModal}>
               <div className={style.contIconTitle}><FaWhatsapp className={style.iconModal}/> <h4 className={style.subTitleModal}>WhatsApp</h4></div>
               <div className={style.contIconTitle}><FaTelegram className={style.iconModal}/><h4 className={style.subTitleModal}>Telegram</h4></div>
               <div className={style.contIconTitle}><FaLink className={style.iconModal}/><h4 className={style.subTitleModal}>Copy Link </h4></div>  
             </div>
        </Modal.Body>
      </Modal> 
        </div>*/}
        </div>
          </div>
        </div>
       
        <div className={style.contBtn}>
          <button className={style.btn}>Collab</button>
        </div>
    </div>
  )
}
export default CardShare;