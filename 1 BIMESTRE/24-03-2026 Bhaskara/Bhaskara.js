function calcular() {
            let a = parseFloat(document.getElementById("inputA").value);
            let b = parseFloat(document.getElementById("inputB").value);
            let c = parseFloat(document.getElementById("inputC").value);

            let delta = b ** 2 - 4 * a * c;

            if (a == 0) {
                document.getElementById("result").innerHTML =
                    "Isso não é uma equação de 2º grau";
            }
            else if (delta < 0) {
                document.getElementById("result").innerHTML =
                    "Não existem raízes reais";
            }
            else {
                let x1 = (-b + Math.sqrt(delta)) / (2 * a);
                let x2 = (-b - Math.sqrt(delta)) / (2 * a);

                x1 = Number.isInteger(x1) ? x1 : x1.toFixed(2);
                x2 = Number.isInteger(x2) ? x2 : x2.toFixed(2);

                document.getElementById("result").innerHTML =
                    "x1 = " + x1 + "<br>x2 = " + x2;
            }
        }
