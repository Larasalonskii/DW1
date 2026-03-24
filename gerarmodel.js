function primeiraMaiuscula(palavra) {
    return palavra[0].toUpperCase() + palavra.slice(1);
}

let codigofonte = "";
function atualizarDados() {
    nomeClasse = document.getElementById("inputNomeClasse").value;
    atributos = document.getElementById("inputAtributos").value;

    nomeat = [];
    tipoat = [];
    let vetAtributos = atributos.split(",");

    for (let i = 0; i < vetAtributos.length; i++) {
        let separando = vetAtributos[i].split("-");
        for (let j = 0; j < separando.length; j++) {
            if (j % 2 == 0) {
                nomeat.push(separando[j]);
            } else {
                tipoat.push(separando[j]);
            }
        }
    }
}

function gerarModel() {
    atualizarDados();
    let categoria = "    constructor (";
    codigofonte = "class " + primeiraMaiuscula(nomeClasse) + "{" + "\n";
    codigofonte += "constructor (" + nomeat + ".posicaoNaLista )" + "{\n";

    for (let i = 0; i < nomeat.length; i++) {
        const at = nomeat[i];
        codigofonte += "      this." + at + " = " + at + ";\n";
    }
    codigofonte += "      this.posicaoNaLista = null;\n";
    codigofonte += "        }\n}\n";

    document.getElementById("taCodigoFonte").textContent = codigofonte;
}


function gerarView() {
    atualizarDados();
    codigofonte = "";

    codigofonte =
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n' +
        "\n" +
        "<head>\n" +
        '   <meta charset="UTF-8">\n' +
        '   <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        "   <title>CRUD " +
        primeiraMaiuscula(nomeClasse) +
        "</title>\n" +
        "</head>\n" +
        "\n" +
        "<body>\n\n" +
        "<h1>" +
        primeiraMaiuscula(nomeClasse) +
        "</h1>\n\n";

    for (let i = 0; i < nomeat.length; i++) {
        const at = nomeat[i];
        const tipe = tipoat[i];

        codigofonte +=
            '<label for="input' +
            at +
            '">' +
            at +
            ": </label>\n" +
            '<input type="' +
            tipe +
            '" name="input' +
            at +
            '" id="input' +
            at +
            '">\n';
    }
    codigofonte +=
        '<input type="button" value="Procure" id"btProcure" onclick "procure()" style="display:inline;"> \n' +
        '<input type="button" value="Inserir" id="btInserir" onclick="inserir()" style="display:none;"> \n' +
        '<input type="button" value="Alterar" id="btAlterar" onclick="alterar()" style="display:none;"> \n' +
        '<input type="button" value="Excluir" id="btExcluir" onclick="excluir()" style="display:none;"> \n' +
        "<br><br> \n\n";

    for (let i = 0; i < nomeat.length; i++) {
        const at = nomeat[i];
        const tipe = tipoat[i];

        codigofonte +=
            '<label for="input' +
            at +
            '">' +
            at +
            ": </label>\n" +
            '<input type="' +
            tipe +
            '" name="input' +
            at +
            '" id="input' +
            at +
            '">\n' +
            "<br>\n\n";
    }

    codigofonte +=
        "<br><br>\n" +
        "<div id=\"divAviso\" style=\"background-color: antiquewhite;\" onclick=\"salvar()\" style=\"display:none;\">\n" +
        "<br>\n" +
        "<input type=\"button\" value=\"Salvar\" id=\"btSalvar\" onclick=\"salvar()\" style=\"display:none;\">\n" +
        "<input type=\"button\" value=\"Cancelar\" id=\"btCancelar\" onclick=\"cancelarOperacao()\" style=\"display:none;\">\n" +
        "<br><br>\n" +
        "<input type=\"button\" value=\"Listar\" id=\"btListar\" onclick=\"listar()\">\n" +
        "<br><br>\n\n";

        codigofonte+= "<div id=\"outputSaida\" style=\"background-color: aqua;\">...</div>\n\n" +
        "<input type=\"button\" value=\"Persisitir\" id=\"btPersisitir\" onclick=\"prepararESalvarCSV()\">\n" +
        "<input type=\"button\" value=\"Recuperar\" id=\"btRecuperar\" onclick=\"abrirArquivoSalvoEmLocalPermanente()\">\n"
        
        document.getElementById("taCodigoFonte").textContent = codigofonte
    
    }
    
    function gerarController() {
        atualizarDados() 
        let condicao = "";
        codigofonte= "";
        codigofonte = "let lista" + primeiraMaiuscula(nomeClasse) + " = [];\n" +
    "let oQueEstaFazendo = \'\';\n" +
    "let " + nomeClasse + " = null;\n" +
    "bloquearAtributos(true);\n\n";

    codigofonte+= "function procurePorChavePrimaria(chave) {\n" +
    "for(let i = 0; i < lista" + primeiraMaiuscula(nomeClasse) + ".length; i++) {\n" +
    "const " + nomeClasse + " = lista" + primeiraMaiuscula(nomeClasse) + "[i];\n";
    for(let i=0; i<1;i++) {
        const at = nomeat[i];
        codigofonte+= "if (" + nomeClasse + "." + at + " == chave) {";  
    }
    codigofonte+= nomeClasse + ".posicaoNaLista = i;\n" +
    "return lista" + primeiraMaiuscula(nomeClasse) + "[i];\n } \n } \n" +
    "return null \n}\n\n";
    
    codigofonte+="function procure() {\n";
    
    for(let i=0; i< 1; i++) {
        const at = nomeat[i];
        codigofonte+= "const " + at + " = document.getElementById(\"input" + at + "\").value;\n" +
        "if (isNaN (" + at + ") || !Number.isInteger(Number(" + at + "))) {\n" +
        // todo nos prints eu parei na linha 155
    }
}
