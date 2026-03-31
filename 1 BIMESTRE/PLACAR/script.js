let pontos = [0, 0];
let sets = [0, 0];

function alterar(time, valor) {
  let i = time - 1;
  let o = i === 0 ? 1 : 0;

  pontos[i] += valor;

  if (pontos[i] < 0) pontos[i] = 0;

  verificarSet();
  atualizar();
}

function verificarSet() {
  let p1 = pontos[0];
  let p2 = pontos[1];

  // regra do vôlei: 25 pontos + diferença de 2
  if ((p1 >= 25 || p2 >= 25) && Math.abs(p1 - p2) >= 2) {

    if (p1 > p2) sets[0]++;
    else sets[1]++;

    pontos = [0, 0]; // zera pontos
  }
}

function atualizar() {
  document.getElementById("p1").innerText = pontos[0];
  document.getElementById("p2").innerText = pontos[1];

  document.getElementById("s1").innerText = sets[0];
  document.getElementById("s2").innerText = sets[1];
}

function resetar() {
  pontos = [0, 0];
  sets = [0, 0];
  atualizar();
}

atualizar();
