function fcalcular(){
    debugger
    let conceito = ""
    let ap = ""
    let ra = document.getElementById("inputra").value;
    let nome = document.getElementById("inputnome").value;
    let n1 = parseFloat(document.getElementById("inputn1").value);
    let n2 = parseFloat(document.getElementById("inputn2").value);
    let n3 = parseFloat(document.getElementById("inputn3").value);
    let n4 = parseFloat(document.getElementById("inputn4").value);
    let me = parseFloat(document.getElementById("inputme").value);

    let ma = ((n1 + n2*2 + n3*3 + n4*4 + me)/11).toFixed(2);

    if( ma >= 9){
        conceito = " o seu conceito é A"
        ap = "Aprovado"
    }else if (ma >= 7.5 && ma <9 ){
        conceito = "o seu conceito é B"
        ap = "Aprovado"
    }else if (ma >= 6 && ma <7.5 ){
        conceito = "o seu conceito é C"
        ap = "Aprovado"
    }else if (ma >= 4 && ma <6 ){
        conceito = "o seu conceito é D"
        ap = "Reprovado"
    }else if ( ma <4 ){
        conceito = "o seu conceito é E"
        ap = "Reprovado"
    }

    let aprov = document.getElementById("aprov");

// coloca o texto
aprov.innerHTML = ap;

// remove classes antigas (importante)
aprov.classList.remove("aprovado");
aprov.classList.remove("reprovado");

// adiciona a classe certa
if (ap === "Aprovado") {
    aprov.classList.add("aprovado");
} else {
    aprov.classList.add("reprovado");
}

    document.getElementById("resp").innerHTML = "o aluno "+nome+" de RA = "+ra+
    "\n obteve respectivamente as notas " + n1 +", "+ n2 +", "+ n3 +" e "+ n4 + "<br> A media de exercicios = "+
    me + "<br> então obteve uma media de aproveitamento = "+ma+ "<br> e "+conceito;

    document.getElementById("aprov").innerHTML = ap 
}
