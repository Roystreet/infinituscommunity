import PresalePackage from "./presalePackege";
import CardPresale from "../../component/cardPresale/cardPresale";

export default function Presale() {
  console.log(PresalePackage);
  return (
    <>
      <div className="container_presale">
        {PresalePackage.length > 0 ? (
          PresalePackage.map((data) => {
            return (
              <CardPresale
                id={data.id}
                name={data.name}
                image={data.image}
                value={data.value}
                cantidad={data.cantidad}
              />
            );
          })
        ) : (
          <p>hola mundo</p>
        )}
      </div>
    </>
  );
}
