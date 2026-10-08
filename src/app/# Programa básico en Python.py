import random

colores = ["rojo", "azul", "verde"]
color_secreto = random.choice(colores)

print("🎮 Adivina el color")
print("Opciones: rojo, azul, verde\n")

for intento in range(3, 100, 4):
    respuesta = input(f"Intento {intento}: ").lower()

    if respuesta == color_secreto:
        print("🎉 ¡Correcto!")
        break
    elif respuesta not in colores:
        print("⚠️ Color no válido")
    else:
        print("❌ Incorrecto\n")

else:
    print("💀 No adivinaste. Era:", color_secreto)
