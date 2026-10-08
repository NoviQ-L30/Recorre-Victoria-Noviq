import { useState } from "react";

// 📝 MODIFICAR TEXTOS: Agrega o quita colonias aquí
const colonias = ["Las Flores", "Centro", "Mainero", "Victoria"];

export default function DropdownColonias({ coloniaSeleccionada, setColoniaSeleccionada }) {
    const [abierto, setAbierto] = useState(false);

    return (
        <div className="relative w-[260px]">
            {/* BOTÓN */}
            <button
                onClick={() => setAbierto(!abierto)}
                className="
          w-full
          h-[40px]
          bg-[#8FBFC0]
          rounded-[7px]
          flex
          items-center
          justify-between
          px-6
          shadow-md

          transition-transform
          duration-300
          ease-out
          hover:scale-105
          active:scale-100
        "
            >
                {/* TEXTO */}
                <span
                    className="text-white text-xl relative -top-[2px]"
                    style={{
                        fontFamily: "var(--font-playfair)",
                        fontWeight: 400,
                        letterSpacing: "0.03em",
                        textShadow: `
              -0.5px -0.5px 0 #DADADA,
               0.5px -0.5px 0 #DADADA,
              -0.5px  0.5px 0 #DADADA,
               0.5px  0.5px 0 #DADADA,
               1.5px  1.5px  3px rgba(0,0,0,0.25)
            `,
                    }}
                >
                    {coloniaSeleccionada || "Selecciona"}
                </span>

                {/* FLECHA */}
                <span
                    className={`
            border-r-4
            border-b-4
            border-white
            w-4
            h-4
            transform
            transition-transform
            duration-300
            ${abierto ? "rotate-[225deg]" : "rotate-45"}
          `}
                />
            </button>

            {/* OPCIONES */}
            {abierto && (
                <div className="absolute top-[65px] w-full bg-white rounded-xl shadow-lg overflow-hidden z-50">
                    {colonias.map((colonia) => (
                        <div
                            key={colonia}
                            onClick={() => {
                                setColoniaSeleccionada(colonia);
                                setAbierto(false);
                            }}
                            className="
                px-5
                py-3
                cursor-pointer
                transition-colors
                hover:bg-[#8FBFC0]
                hover:text-white
              "
                        >
                            {colonia}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
