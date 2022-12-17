 
 import imgFilter from "../../assets/Light.png"
 import CardTikets from "../../component/cardTikets/cardTikets";
import style from "./Package.module.css"



export default function Package() {
  // Mostrar Tikets    
  
  return (
    <div>
      <div className={style.contFilter}>
        <img src={imgFilter} alt="" className={style.imgFilter}/>
      </div>
      <div className={style.cards}>
      <CardTikets/>
      <CardTikets/>
      <CardTikets/>
      <CardTikets/>  <CardTikets/>
      <CardTikets/>  <CardTikets/>
      <CardTikets/>  <CardTikets/>
      <CardTikets/>


    </div>
    </div>
  );
}
