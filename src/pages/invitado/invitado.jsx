 
 import img from "./assets/Union.png"
 import imgI from "./assets/INFINITUS.png"
 import CardShare from "../../component/CardShare/CardShare";
 import style from "./Invitado.module.css"
 
 
 
 export default function Invitado() {
   // Mostrar Tikets    
   
   return (
     <div className={style.content}>
    <div className={style.contTitle}>
      <h1 className={style.name}>Name</h1>
      <span className={style.subtitle}>Invites you <br/>to collaborate</span>
    </div>
      <div className={style.contCard}>
       <CardShare/>
      </div>
      <div className={style.contLogo}>
        <span className={style.subtitle}>Colaborate and <br/>Keep it rolling!</span>
        <img src={img} className={style.img} alt="Logoicon" />
        <img src={imgI} className={style.imgInf} alt="Logoicon" />
      </div>
     </div>
   );
 }
 