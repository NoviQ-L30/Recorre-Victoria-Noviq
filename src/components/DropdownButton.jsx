import { useState } from "react";
import { ChevronDown } from "lucide-react";

const colonias = ["Las Flores", "Revolución Verde", "Libertad", "Ampliación Guadalupe"];

export default function DropdownButton({ onSeleccionar }) {
  const [selected, setSelected] = useState(colonias[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (colonia) => {
    setSelected(colonia);
    setIsOpen(false);
    onSeleccionar(colonia); // Llamamos la función para actualizar el estado en el componente padre
  };

  return (
    <div className="p-4 border rounded-md bg-[#FFFDFD] w-64">
      <p
        className="text-black font-bold mb-2 text-center"
        style={{ fontFamily: "Italiana" }}
      >
        Fraccionamientos / Colonias
      </p>

      <div className="relative">
        <button
          className="w-full bg-orange-200 text-black font-serif px-4 py-2 rounded-md flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <ChevronDown className="w-5 h-5" />
        </button>

        {isOpen && (
          <ul className="absolute left-0 right-0 bg-white mt-2 rounded-md shadow-lg z-10">
            {colonias.map((colonia) => (
              <li
                key={colonia}
                onClick={() => handleSelect(colonia)}
                className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
              >
                {colonia}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
