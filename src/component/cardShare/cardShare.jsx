import { useState } from "react";
import style from "./cardShare.module.css";
import img from "./assets/Vector.png";
import { FaUser, FaRegUser,} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import CloseButton from "react-bootstrap/CloseButton";

const CardShare = ({img, referals, id}) => {
  const [smShow, setSmShow] = useState(false);
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
  

  return (
    <div className={style.card}>
      <div>
        <div>
        <img className={style.img} src={`../../../public/packagesAvatar/${img}.png`} alt="" />
          <div className={style.contIcon}>
            <span className={style.icons}>
            {iconRegUser(referals)}
            </span>
        
          </div>
        </div>
      </div>

      <div className={style.contBtn}>
        <button className={style.btn}>Collab</button>
      </div>
    </div>
  );
};
export default CardShare;
