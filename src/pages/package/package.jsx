 
 
 import CardTikets from "../../component/cardTikets/cardTikets";
import style from "./Package.module.css"



export default function Package() {
  // Mostrar Tikets    
  
  return (
    <div>
      <div>
        <h1>Filtros</h1>
      </div>
      <div className={style.cards}>
      <CardTikets/>
      <CardTikets/>
   


    </div>
    </div>
  );
}
