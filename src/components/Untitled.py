prestamo = float(input("Cantidad del prestamo: "))

meses = 0

while prestamo > 0:

    pago = float(input("Cantidad a pagar este mes: "))

    prestamo = prestamo - pago

    meses += 1

    print("Deuda restante:", prestamo)

print("La persona termino de pagar en", meses, "meses")