import { MouseEvent, useState } from "react";

interface Props {
  clientes: {
    nombre: string;
  }[];
  onSelectItem: (nombre: string) => void;
}

function ClientesList({ clientes, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const noHay = () => {
    return clientes.length === 0 ? <p>No tiene clientes!</p> : null;
  };

  return (
    <>
      <h1 className="block">Clientes</h1>
      {clientes.length === 0 ? <p>No tiene clientes!</p> : null}
      <ul className=" block w-10/12 list-group">
        {clientes.map((cliente, index) => (
          //Los key son necesarios para React para que sepa que hacer con
          //ellos!!
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={cliente.nombre}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(cliente.nombre);
            }}
          >
            {cliente.nombre}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClientesList;
