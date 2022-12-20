import PresalePackage from "./presalePackege";
import { useState, useEffect } from "react";
import CardPresale from "../../component/cardPresale/cardPresale";
import { getContractData } from "../../functions/serverInteractions";

export default function Presale() {
  console.log(PresalePackage);
  const [totalSupply, setTotalSupply] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await getContractData("/user/getpackagesid", "json");
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
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
