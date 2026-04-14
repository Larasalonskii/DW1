function fcalcular(){

    let v1 = document.getElementById("inputcqb").value;
    let v2 = document.getElementById("inputcqd").value;
    let v3 = document.getElementById("inputxs").value;
    let v4 = document.getElementById("inputr").value;
    let v5 = document.getElementById("inputr1").value;

    if (isNaN(v1) || isNaN(v2) || isNaN(v3) || isNaN(v4) || isNaN(v5)) {
        alert("Digite apenas números!");
        return;
    }

    let dogbasico = (parseFloat(v1) || 0) * 22;
    let dogduplo = (parseFloat(v2) || 0) * 26;
    let xsalada = (parseFloat(v3) || 0) * 29;
    let refrip = (parseFloat(v4) || 0) * 5;
    let refri1 = (parseFloat(v5) || 0) * 8;

    let resp = dogbasico + dogduplo + xsalada + refrip + refri1;

    document.getElementById("total").innerHTML = "R$ " + resp.toFixed(2);
}