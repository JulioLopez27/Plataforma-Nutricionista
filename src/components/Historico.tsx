import { MouseEvent, useState } from "react";

interface Props {
  registros: {
    fecha: string;
    receta: string;
  }[];
  onSelectItem: (nombre: string) => void;
}

function Historico({ registros, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const noHay = () => {
    return registros.length === 0 ? (
      <p>Aun no se le han sugerido recetas</p>
    ) : null;
  };

  return (
    <>
      <h1 className="block">HISTORIAL</h1>
      {registros.length === 0 ? (
        <p>Aun no se le han sugerido recetas.!</p>
      ) : null}
      <table className=" block w-10/12 ">
        {registros.map((registro, index) => (
          <tr className="">
            <td
              className={
                selectedIndex === index
                  ? "list-group-item active px-9"
                  : "list-group-item px-9"
              }
              key={registro.fecha}
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(registro.fecha);
              }}
            >
              {registro.fecha}
            </td>
            <td className="px-9">{registro.receta}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default Historico;
