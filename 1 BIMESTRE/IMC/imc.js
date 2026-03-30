function funcaoCalcular(){
    debugger
    let classi = "";
    let peso = document.getElementById("inputpeso").value;
    let altura = document.getElementById("inputaltura").value;
    let imc = peso/(altura**2);

    document.getElementById("respimc").innerHTML = imc.toFixed(2);

    if(imc<18.5){
        classi = "Abaixo do Peso"
    }else if( imc >= 18.5 && imc < 25){
        classi = "Peso Normal"
    }else if( imc >= 25 && imc < 29.9){
        classi = "Sobrepeso"
    }else if( imc >= 30 && imc < 34.9){
        classi = "Obesidade grau I"
    }else if( imc >= 35 && imc < 39.9){
        classi = "Obesidade grau II"
    }else {
        classi = "Obesidade grau III"
    }

    document.getElementById("respclassificacao").innerHTML = classi
}
