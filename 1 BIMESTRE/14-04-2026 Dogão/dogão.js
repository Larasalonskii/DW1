function fcalcular(){
    let dogbasico = (parseInt(document.getElementById("inputcqb").value) || 0) * 22;
    let dogduplo = (parseInt(document.getElementById("inputcqd").value) || 0) * 26;
    let xsalada = (parseInt(document.getElementById("inputxs").value) || 0) * 29;
    let refrip = (parseInt(document.getElementById("inputr").value) || 0) * 5;
    let refri1 = (parseInt(document.getElementById("inputr1").value) || 0) * 8;

    let resp = dogbasico + dogduplo + xsalada + refrip + refri1;

    if (isNaN(resp)) {
        alert("Insira valores corretos");
        return;
    }

    if (resp <= 0){
        alert("Insira valores corretos");
        resp = 0;

    }

    document.getElementById("total").innerHTML = "R$ " + resp.toFixed(2);
}