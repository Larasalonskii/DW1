function fcalcular() {
    debugger
    let tarifa = 2.5;
    let ph = 0
    let hp = 0
    let entrada = document.getElementById("inputin").value;
    let saida = document.getElementById("inputout").value
    let grande = document.getElementById("inputipo").checked;
    let cf = document.getElementById("inputcf").checked;

    if (!entrada || !saida) {
        alert("preenche tudo né 🙄");
        return;
    }

    let dataEntrada = new Date(entrada);
    let dataSaida = new Date(saida);

    let diferenca = dataSaida - dataEntrada;

    let h = Math.floor(diferenca / (1000 * 60 * 60));

    if (h <= 0) {
        alert("o numero de horas deve ser maior que 0")
        tarifa = 0;
    } else if (h > 0 && h < 24) {
        ph = h * 2.5;
        tarifa += ph
    } else if (h >= 24) {
        ph = parseInt(h / 24) * 60
        tarifa = ph;
        h = h - 24 * (tarifa / 60)
        hp = h * 2.5
        tarifa += hp
    }

    if (grande == true) {
        tarifa = tarifa * 1.25
    }

    if (cf == true) {
        tarifa = tarifa * 0.95
    }

    document.getElementById("resp").innerHTML = "O valor da sua tarifa é igual a R$" + tarifa.toFixed(2)
}
