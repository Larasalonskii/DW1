class Atributo {
    constructor(tipo, nome, tamanho) {
        this.tipo = tipo;
        this.nome = nome;
        this.tamanho = tamanho;
    }
}

let listaAtributos = [];

window.onload = dadosParaTestes();

let inputAtributos;
let linhaNoTextArea;
let nomeClasse;
let nomeClasseMinusculo;
let codigo = "";
let atributoChavePrimaria;
let nomeParaSalvar = "";


function obterDados() {
    codigo = "";
    listaAtributos = [];
    inputAtributos = document.getElementById('inputAtributos').value;
    linhaNoTextArea = inputAtributos.trim().split('\n');
    nomeClasse = document.getElementById("inputNomeClasse").value;
    nomeClasseMinusculo = plMinus(nomeClasse);
    for (let i = 0; i < linhaNoTextArea.length; i++) {
        let a = linhaNoTextArea[i].split(';');
        let atr = new Atributo(a[0], a[1], a[2]);
        // console.log(atr);
        listaAtributos.push(atr);
    }
    atributoChavePrimaria = listaAtributos[0];
    return listaAtributos;
}


function dadosParaTestes() {
    document.getElementById("inputNomeClasse").value = "Pessoa";
    document.getElementById('inputAtributos').value = "int;id;10\nString;nome;50\nfloat;altura;10";

}

function mostrarAtributos() {
    let aux = '';
    for (let i = 0; i < listaAtributos.length; i++) {
        let linha = listaAtributos[i];
        aux += linha.tipo + " - " + linha.nome + ' - ' + linha.tamanho + '\n'; // Adiciona quebra de linha para melhor leitura
    }
    return aux;
}

function atributosParametros() {
    let aux = "";
    for (let i = 0; i < listaAtributos.length; i++) {
        const aa = listaAtributos[i];
        aux += aa.nome + ',';
    }
    aux = aux.substring(0, aux.length - 1);
    return aux;

}

function gerarModel() {


    listaAtributos = obterDados();

    nomeParaSalvar = plMaius(nomeClasse) + ".js";


    codigo = "";
    codigo = "class " + nomeClasse + " { \n" +
        "constructor (" + atributosParametros() + ", posicaoNaLista) {\n";
    let aux = "";
    for (let i = 0; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        aux += "this." + element.nome + " = " + element.nome + ";\n";
    }

    codigo += aux;

    codigo += "\n\nthis.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão \n"

    codigo += "}\n";
    codigo += "}\n";
    // Exibe os atributos processados
    document.getElementById('saida').value = codigo;

}


function gerarView() {

    listaAtributos = obterDados();
    nomeParaSalvar = plMaius(nomeClasse) + ".html";

    let codigo = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
        "    <title>CRUD " + nomeClasse + "</title>\n" +
        "    <link rel=\"stylesheet\" href=\""+nomeClasse+".css\">\n"+
        "</head>\n" +
        "\n" +
        "<body>\n\n";
    codigo += " <h1>Cadastro de " + plMaius(nomeClasse) + "</h1>\n" +
        "\n" +
        "    <label for=\"input" + plMaius(atributoChavePrimaria.nome) + "\">" + plMaius(atributoChavePrimaria.nome) + "</label>\n" +
        "    <input type=\"text\" name=\"input" + plMaius(atributoChavePrimaria.nome) + "\" id=\"input" + plMaius(atributoChavePrimaria.nome) + "\">\n" +
        "    <input type=\"button\" value=\"Procure\" id=\"btProcure\" onclick=\"procure()\" style=\"display:inline;\">\n" +
        "    <input type=\"button\" value=\"Inserir\" id=\"btInserir\" onclick=\"inserir()\" style=\"display:none;\">\n" +
        "    <input type=\"button\" value=\"Alterar\" id=\"btAlterar\" onclick=\"alterar()\" style=\"display:none;\">\n" +
        "    <input type=\"button\" value=\"Excluir\" id=\"btExcluir\" onclick=\"excluir()\" style=\"display:none;\">\n" +
        "    <br><br>\n\n";
    let aux = "";

    for (let i = 1; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];

        switch (element.tipo) {
            case "String":
                aux += " <label for=\"input" + plMaius(element.nome) + "\">" + plMaius(element.nome) + "</label>\n" +
                    "    <input type=\"text\" name=\"input" + plMaius(element.nome) + "\" id=\"input" + plMaius(element.nome) + "\">\n" +
                    "    <br>\n";
                break;
            case "int":

            case "float":
                aux += " <label for=\"input" + plMaius(element.nome) + "\">" + plMaius(element.nome) + "</label>\n" +
                    "    <input type=\"number\" name=\"input" + plMaius(element.nome) + "\" id=\"input" + plMaius(element.nome) + "\">\n" +
                    "    <br>\n";
                break;
            case "Date":
                aux += " <label for=\"input" + plMaius(element.nome) + "\">" + plMaius(element.nome) + "</label>\n" +
                    "    <input type=\"date\" name=\"input" + plMaius(element.nome) + "\" id=\"input" + plMaius(element.nome) + "\">\n" +
                    "    <br>\n";
                break;

            default:

                break;
        }
    }

    codigo += aux;

    codigo += "\n <br><br>\n" +
        "    <div id=\"divAviso\" style=\"background-color: antiquewhite;\"></div>\n" +
        "    <br>\n" +
        "    <input type=\"button\" value=\"Salvar\" id=\"btSalvar\" onclick=\"salvar()\" style=\"display:none;\">\n" +
        "    <input type=\"button\" value=\"Cancelar\" id=\"btCancelar\" onclick=\"cancelarOperacao()\" style=\"display:none;\">\n" +
        "    <br><br>\n" +
        "    <!-- <input type=\"button\" value=\"Listar\" onclick=\"listar()\">\n" +
        "    <br><br> -->\n" +
        "\n" +
        "    <div id=\"outputSaida\" style=\"background-color: aqua;\">...</div>\n" +
        "    \n" + 
        "    <input type=\"button\" value=\"Persistir\" id=\"btPersisitir\" onclick=\"prepararESalvarCSV()\">\n" +
        "    <input type=\"button\" value=\"Recuperar\" id=\"btRecuperar\" onclick=\"abrirArquivoSalvoEmLocalPermanente()\">\n" +
        "    <script src=\"./" + nomeClasse + ".js\"></script>\n" +
        "    <script src=\"./" + nomeClasse + "Controle.js\"></script>\n" +
        "</body>\n" +
        "\n" +
        "</html>\n";
    document.getElementById('saida').value = codigo;



    return codigo;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gerarController(listaAtributos) {
    listaAtributos = obterDados();
    nomeParaSalvar = plMaius(nomeClasse) + "Controle.js";
    // console.log(listaAtributos[0].nome);

    codigo = "";

    codigo += "let lista" + nomeClasse + " = []; //conjunto de dados\n" +
        "let oQueEstaFazendo = ''; //variável global de controle\n" +
        "let " + nomeClasseMinusculo + " = null; //variavel global \n" +
        "bloquearAtributos(true);\n";

    // codigo += "//metodo para mostrar mensagem quando o foco for para a chave primaria \n" +
    //     "document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").addEventListener(\"focus\", function () {\n" +
    //     "    mostrarAviso(\"Digite o " + atributoChavePrimaria.nome + " e clic no botão procure\");\n" +
    //     "});\n\n"

    codigo += "//backend (não interage com o html)\n" +
        "function procurePorChavePrimaria(chave) {\n" +
        "    for (let i = 0; i < lista" + nomeClasse + ".length; i++) {\n" +
        "        const " + nomeClasseMinusculo + " = lista" + nomeClasse + "[i];\n" +
        "        if (" + nomeClasseMinusculo + "." + atributoChavePrimaria.nome + " == chave) {\n" +
        "            " + nomeClasseMinusculo + ".posicaoNaLista = i;\n" +
        "            return lista" + plMaius(nomeClasse) + "[i];\n" +
        "        }\n" +
        "    }\n" +
        "    return null;//não achou\n" +
        "}\n\n";

    codigo += "// Função para procurar um elemento pela chave primária   -------------------------------------------------------------\n" +
        "function procure() {\n" +
        "    const " + plMinus(atributoChavePrimaria.nome) + " = document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").value;\n";

    switch (atributoChavePrimaria.tipo) {
        case "int":
            codigo += "    if (isNaN(" + plMinus(atributoChavePrimaria.nome) + ") || !Number.isInteger(Number(" + plMinus(atributoChavePrimaria.nome) + "))) {\n" +
                "        mostrarAviso(\"Precisa ser um número inteiro\");\n" +
                "        document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").focus();\n" +
                "        return;\n" +
                "    }\n\n"
            break;

        default:

            break;
    }

    codigo += "    if (" + plMinus(atributoChavePrimaria.nome) + ") { // se digitou um " + plMaius(atributoChavePrimaria.nome) + "\n" +
        "        " + nomeClasseMinusculo + " = procurePorChavePrimaria(" + plMinus(atributoChavePrimaria.nome) + ");\n" +
        "        if (" + nomeClasseMinusculo + ") { //achou na lista\n" +
        "            mostrarDados" + nomeClasse + "(" + nomeClasseMinusculo + ");\n" +
        "            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir\n" +
        "            mostrarAviso(\"Achou na lista, pode alterar ou excluir\");\n" +
        "        } else { //não achou na lista\n" +
        "            limparAtributos();\n" +
        "            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');\n" +
        "            mostrarAviso(\"Não achou na lista, pode inserir\");\n" +
        "        }\n" +
        "    } else {\n" +
        "        document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").focus();\n" +
        "        return;\n" +
        "    }\n" +
        "}\n\n";

    codigo += "//backend->frontend\n" +
        "function inserir() {\n" +
        "    bloquearAtributos(false);\n" +
        "    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)\n" +
        "    oQueEstaFazendo = 'inserindo';\n" +
        "    mostrarAviso(\"INSERINDO - Digite os atributos e clic o botão salvar\");\n" +
        "    document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").focus();\n" +
        "\n" +
        "}\n\n";

    codigo += "// Função para alterar um elemento da lista\n" +
        "function alterar() {\n" +
        "\n" +
        "    // Remove o readonly dos campos\n" +
        "    bloquearAtributos(false);\n" +
        "\n" +
        "    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n" +
        "\n" +
        "    oQueEstaFazendo = 'alterando';\n" +
        "    mostrarAviso(\"ALTERANDO - Digite os atributos e clic o botão salvar\");\n" +
        "}\n\n";

    codigo += "// Função para excluir um elemento da lista\n" +
        "function excluir() {\n" +
        "    bloquearAtributos(false);\n" +
        "    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)\n" +
        "\n" +
        "    oQueEstaFazendo = 'excluindo';\n" +
        "    mostrarAviso(\"EXCLUINDO - clic o botão salvar para confirmar a exclusão\");\n" +
        "}\n\n"

    let oTipo;
    let oFim;
    switch (atributoChavePrimaria.tipo) {
        case "int":
            oTipo = "parseInt(";
            oFim = ")";
            break;
        case "float":
            oTipo = "parseFloat(";
            oFim = ")";
            break;
        default:
            oTipo = "";
            oFim = "";
            break;
    }


    let aux = "    let " + plMinus(atributoChavePrimaria.nome) + ";\n" +
        "    if (" + nomeClasseMinusculo + " == null) {\n" +
        "         " + plMinus(atributoChavePrimaria.nome) + " = " + oTipo + "document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").value" + oFim + ";\n" +
        "    } else {\n" +
        "        " + plMinus(atributoChavePrimaria.nome) + " = " + nomeClasseMinusculo + "." + plMinus(atributoChavePrimaria.nome) + ";\n" +
        "    }\n\n";



    for (let i = 1; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        switch (element.tipo) {
            case "String":
                aux += "    const " + plMinus(element.nome) + " = document.getElementById(\"input" + plMaius(element.nome) + "\").value;\n"
                break;
            case "float":
                aux += "    const " + plMinus(element.nome) + " = parseFloat(document.getElementById(\"input" + plMaius(element.nome) + "\").value);\n"
                break;
            case "int":
                aux += "    const " + plMinus(element.nome) + " = parseInt(document.getElementById(\"input" + plMaius(element.nome) + "\").value);\n"
                break;
            case "Date":
                aux += "    const " + plMinus(element.nome) + " = document.getElementById(\"input" + plMaius(element.nome) + "\").value;\n"
                break;
            default:
                break;
        }
    }

    let vAux = "";
    for (let i = 0; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        vAux += element.nome + " && ";
    }
    vAux = vAux.substring(0, vAux.length - 3);

    atributoChavePrimaria = listaAtributos[0];

    //console.log(atributoChavePrimaria);

    codigo += "function salvar() {\n" +
        "    //gerencia operações inserir, alterar e excluir na lista\n" +
        "\n" + "// obter os dados a partir do html\n\n" +
        aux +


        "    //verificar se o que foi digitado pelo USUÁRIO está correto\n" +
        "if(" + vAux + "){" + "// se tudo certo \n" +
        "        switch (oQueEstaFazendo) {\n" +
        "            case 'inserindo':\n" +
        "                " + nomeClasseMinusculo + " = new " + nomeClasse + "(" + atributosParametros() + ");\n" +
        "                lista" + nomeClasse + ".push(" + nomeClasseMinusculo + ");\n" +
        "                mostrarAviso(\"Inserido na lista\");\n" +
        "                break;\n" +
        "            case 'alterando':\n" +
        "                " + nomeClasseMinusculo + "Alterado = new " + nomeClasse + "(" + atributosParametros() + ");\n" +
        "                lista" + nomeClasse + "[" + nomeClasseMinusculo + ".posicaoNaLista] = " + nomeClasseMinusculo + "Alterado;\n" +
        "                mostrarAviso(\"Alterado\");\n" +
        "                break;\n" +
        "            case 'excluindo':\n" +
        "                let novaLista = [];\n" +
        "                for (let i = 0; i < lista" + nomeClasse + ".length; i++) {\n" +
        "                    if (" + nomeClasseMinusculo + ".posicaoNaLista != i) {\n" +
        "                        novaLista.push(lista" + nomeClasse + "[i]);\n" +
        "                    }\n" +
        "                }\n" +
        "                lista" + nomeClasse + " = novaLista;\n" +
        "                mostrarAviso(\"EXCLUIDO\");\n" +
        "                break;\n" +
        "            default:\n" +
        "                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);\n" +
        "                mostrarAviso(\"Erro aleatório\");\n" +
        "        }\n" +
        "        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\n" +
        "        limparAtributos();\n" +
        "        listar();\n" +
        "        document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").focus();\n" +
        "    } else {\n" +
        "        alert(\"Erro nos dados digitados\");\n" +
        "        return;\n" +
        "    }\n" +
        "}\n\n";


    aux = "\n";
    for (let i = 0; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        aux += "            linha." + element.nome + "+\" - \" +\n";
    }

    aux = aux.substring(0, aux.length - 9);

    codigo += "//backend\n" +
        "function preparaListagem(vetor) {\n" +
        "    let texto = \"\";\n" +
        "    for (let i = 0; i < vetor.length; i++) {\n" +
        "        const linha = vetor[i];\n" +
        "        texto += " + aux + "+\"<br>\";\n" +
        "    }\n" +
        "    return texto;\n" +
        "}\n\n";


    codigo += "//backend->frontend (interage com html)\n" +
        "function listar() {\n" +
        "    document.getElementById(\"outputSaida\").innerHTML = preparaListagem(lista" + nomeClasse + ");\n" +
        "}\n\n";

    codigo += "function cancelarOperacao() {\n" +
        "    limparAtributos();\n" +
        "    bloquearAtributos(true);\n" +
        "    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\n" +
        "    mostrarAviso(\"Cancelou a operação de edição\");\n" +
        "}\n\n";

    codigo += "function mostrarAviso(mensagem) {\n" +
        "    //printa a mensagem na divAviso\n" +
        "    document.getElementById(\"divAviso\").innerHTML = mensagem;\n" +
        "}\n\n";

    codigo += "// Função para mostrar os dados do " + nomeClasse + " nos campos\n" +
        "function mostrarDados" + plMaius(nomeClasse) + "(" + plMinus(nomeClasse) + ") {\n";

    for (let i = 0; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        codigo += "    document.getElementById(\"input" + plMaius(element.nome) + "\").value = " + plMinus(nomeClasse) + "." + plMinus(element.nome) + ";\n";
    }


    codigo += "\n" +
        "    // Define os campos como readonly\n" +
        "    bloquearAtributos(true);\n" +
        "}\n\n";

    codigo += "// Função para limpar os dados dos campos\n" +
        "function limparAtributos() {\n";

    for (let i = 1; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        codigo += "    document.getElementById(\"input" + plMaius(element.nome) + "\").value = \"\";\n";
    }
    codigo += "\n" + "    bloquearAtributos(true);\n" + "}\n\n";

    codigo += "function bloquearAtributos(soLeitura) {\n" +
        "    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa\n";

    let cc = "!";
    for (let i = 0; i < listaAtributos.length; i++) {
        if (i == 1) {
            cc = ""
        }
        const element = listaAtributos[i];
        codigo +=
            "    document.getElementById(\"input" + plMaius(element.nome) + "\").readOnly = " + cc + "soLeitura;\n";
    }

    codigo += "}\n\n";


    codigo += "// Função para deixar visível ou invisível os botões\n" +
        "function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {\n" +
        "    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); \n" +
        "    //none significa que o botão ficará invisível (visibilidade == none)\n" +
        "    //inline significa que o botão ficará visível \n" +
        "\n" +
        "    document.getElementById(\"btProcure\").style.display = btProcure;\n" +
        "    document.getElementById(\"btInserir\").style.display = btInserir;\n" +
        "    document.getElementById(\"btAlterar\").style.display = btAlterar;\n" +
        "    document.getElementById(\"btExcluir\").style.display = btExcluir;\n" +
        "    document.getElementById(\"btSalvar\").style.display = btSalvar;\n" +
        "    document.getElementById(\"btCancelar\").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar\n" +
        "    document.getElementById(\"input" + plMaius(atributoChavePrimaria.nome) + "\").focus();\n" +
        "}\n\n";


    codigo += "function persistirEmLocalPermanente(arquivoDestino, conteudo) {\n" +
        "    /*cria um blob (objeto que representa dados de arquivo) que armazena \"[conteudo]\" como arquivo de texto,\n" +
        "    criando um arquivo temporário*/\n" +
        "    const blob = new Blob([conteudo], { type: 'text/plain' });\n" +
        "    //cria o elemento \"a\" (link temporário) usado para adicionar o dowload do arquivo\n" +
        "    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e\n" +
        "    atribui ela ao href do link para que ele \"aponte\" para o arquivo gerado (permitindo seu download)*/\n" +
        "    link.href = URL.createObjectURL(blob);\n" +
        "    link.download = arquivoDestino; // Nome do arquivo de download\n" +
        "    link.click(); //inicia o processo de dowload automaticamente\n" +
        "    // Libera o objeto URL\n" +
        "    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)\n" +
        "}\n" +
        "\n" +
        "\n";

    codigo += "// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)\n" +
        "function abrirArquivoSalvoEmLocalPermanente() {\n" +
        "    \n" +
        "    const input = document.createElement('input');\n" +
        "    //cria o elemento input do tipo file (serve para abrir o seletor de arquivos)\n" +
        "    input.type = 'file';\n" +
        "    input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local\n" +
        "    input.onchange = function (event) {\n" +
        "        /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo\n" +
        "        O evento change é disparado quando um arquivo é selecionado*/\n" +
        "        const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo\n" +
        "        console.log(arquivo.name);\n" +
        "        if (arquivo) {\n" +
        "            converterDeCSVparaListaObjeto(arquivo);\n" +
        "        }\n" +
        "        /*verifica se um arquivo foi selecionado: \n" +
        "        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento\n" +
        "        permitindo que o arquivo seja lido e processado na função processarArquivo*/\n" +
        "    };\n" +
        "    input.click(); //seletor de arquivos exibido automaticamente    \n" +
        "}\n" +
        "\n";

    codigo += "function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente.\n" +
        "   let nomeDoArquivoDestino = \"./" + nomeClasse + ".csv\";  //define o nome do arquivo csv\n" +
        "    let textoCSV = \"\";\n" +
        "    for (let i = 0; i < lista" + nomeClasse + ".length; i++) {\n" +
        "        const linha = lista" + nomeClasse + "[i]; //variavel linha contem as informações de cada " + nomeClasseMinusculo + "\n";


    codigo += "textoCSV += ";
    aux = "";
    for (let i = 0; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        
        if (i == (listaAtributos.length - 1)) {
            //alert("barra n")
            aux += "        linha." + element.nome +"+\"\\n\";" +" \";\" +\n";
        } else {
            aux += "        linha." + element.nome + " + \";\" +\n";
        }
    }
    aux = aux.substring(0, aux.length - 7);
    codigo += aux;

    codigo += "    }\n" +
        "    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);\n" +
        "}\n" +
        "\n" +
        "\n";

    codigo += "// Função para processar o arquivo CSV e transferir os dados para a lista" + nomeClasse + "\n" +
        "function converterDeCSVparaListaObjeto(arquivo) {\n" +
        "    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador \n" +
        "    leitor.onload = function (e) {\n" +
        "        const conteudo = e.target.result; // Conteúdo do arquivo CSV\n" +
        "        const linhas = conteudo.split('\\n'); // Separa o conteúdo por linha\n" +
        "        lista" + nomeClasse + " = []; // Limpa a lista atual (se necessário)\n" +
        "        for (let i = 0; i < linhas.length; i++) {\n" +
        "            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV\n" +
        "            if (linha) { //verifica se a linha não está vazia\n" +
        "                const dados = linha.split(';'); // Separa os dados por ';'\n" +
        "                if (dados.length === "+listaAtributos.length+") { //verifica os seis campos\n" +
        "                    // Adiciona os dados à lista" + nomeClasse + " como um objeto\n" +
        "                    lista" + nomeClasse + ".push({\n";

    aux = "";
    for (let i = 0; i < listaAtributos.length; i++) {
        const element = listaAtributos[i];
        aux += "    " + element.nome + ":dados[" + i + "],\n";
    }
    aux = aux.substring(0, aux.length - 2);
    codigo += aux;
    codigo += "               });\n" +
        "                }\n" +
        "            }\n" +
        "        }\n" +
        "        listar(); //exibe a lista atualizada\n" +
        "    };\n" +
        "    leitor.readAsText(arquivo); // Lê o arquivo como texto\n" +
        "}" + "\n\n";


    // Exibe 
    document.getElementById('saida').value = codigo;

    return codigo;
}

function salvarClasse() {
    salvarEmArquivo(document.getElementById("inputNomeClasse").value + ".txt", document.getElementById("inputAtributos").value);
}

function salvarCodigo() {
    salvarEmArquivo(nomeParaSalvar, document.getElementById("saida").value);
}

function salvarEmArquivo(nomeArq, conteudo) {
    // Cria um blob com o conteúdo em formato de texto
    const blob = new Blob([conteudo], { type: 'text/plain' });

    // Cria um link temporário para o download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq; // Nome do arquivo de download

    // Simula o clique no link para iniciar o download
    link.click();

    // Libera o objeto URL
    URL.revokeObjectURL(link.href);
}

function plMaius(palavra) {
    return palavra.substring(0, 1).toUpperCase() + palavra.substring(1, palavra.length);
}
function plMinus(palavra) {
    return palavra.substring(0, 1).toLowerCase() + palavra.substring(1, palavra.length);
}

function gerarcss(){
    codigo = ""

    codigo = ":root {\n" +
        "    --rosa: #ff69b4;\n" +
        "    --rosa-escuro: #c71585;\n" +
        "    --preto: #0f0f0f;\n" +
        "    --cinza: #1a1a1a;\n" +
        "    --borda: #2a2a2a;\n" +
        "    --texto: #eaeaea;\n" +
        "}\n" +
        "\n" +
        "/* RESET */\n" +
        "* {\n" +
        "    margin: 0;\n" +
        "    padding: 0;\n" +
        "    box-sizing: border-box;\n" +
        "}\n" +
        "\n" +
        "/* HTML só serve pra centralizar o \"card\" (body) na tela */\n" +
        "html {\n" +
        "    min-height: 100vh;\n" +
        "    display: flex;\n" +
        "    justify-content: center;\n" +
        "    background: radial-gradient(circle at top, #1a1a1a, #0f0f0f);\n" +
        "}\n" +
        "\n" +
        "/* BODY = CONTAINER/CARD (fluxo normal em bloco, sem flex, pra labels/inputs ficarem alinhados à esquerda) */\n" +
        "body {\n" +
        "    font-family: \"Courier New\", monospace;\n" +
        "    color: #ffb6d9;\n" +
        "\n" +
        "    width: 100%;\n" +
        "    max-width: 620px;\n" +
        "    align-self: flex-start;\n" +
        "\n" +
        "    margin: 40px 20px;\n" +
        "    background: var(--cinza);\n" +
        "    padding: 26px 30px;\n" +
        "    border-radius: 18px;\n" +
        "\n" +
        "    border: 1px solid rgba(255, 105, 180, 0.4);\n" +
        "\n" +
        "    box-shadow:\n" +
        "        0 0 10px rgba(255, 105, 180, 0.3),\n" +
        "        0 0 25px rgba(255, 105, 180, 0.2),\n" +
        "        0 0 60px rgba(255, 105, 180, 0.15),\n" +
        "        0 10px 30px rgba(0, 0, 0, 0.8);\n" +
        "\n" +
        "    transition: 0.3s;\n" +
        "}\n" +
        "\n" +
        "body:hover {\n" +
        "    box-shadow:\n" +
        "        0 0 15px rgba(255, 105, 180, 0.5),\n" +
        "        0 0 40px rgba(255, 105, 180, 0.3),\n" +
        "        0 0 80px rgba(255, 105, 180, 0.2),\n" +
        "        0 15px 40px rgba(0, 0, 0, 0.9);\n" +
        "}\n" +
        "\n" +
        "/* TITULO */\n" +
        "h1 {\n" +
        "    text-align: center;\n" +
        "    font-size: 22px;\n" +
        "    margin-bottom: 20px;\n" +
        "    color: var(--rosa);\n" +
        "    text-shadow: 0 0 10px rgba(255, 105, 180, 0.5);\n" +
        "    letter-spacing: 1px;\n" +
        "}\n" +
        "\n" +
        "/* LABEL */\n" +
        "label {\n" +
        "    display: block;\n" +
        "    width: 100%;\n" +
        "    text-align: left;\n" +
        "\n" +
        "    margin-top: 10px;\n" +
        "    margin-bottom: 4px;\n" +
        "\n" +
        "    font-size: 11px;\n" +
        "    font-weight: 700;\n" +
        "    text-transform: uppercase;\n" +
        "    letter-spacing: 0.6px;\n" +
        "    color: var(--rosa);\n" +
        "    opacity: 0.85;\n" +
        "}\n" +
        "\n" +
        "/* primeiro label do form não precisa de tanto espaço em cima */\n" +
        "label:first-of-type {\n" +
        "    margin-top: 0;\n" +
        "}\n" +
        "\n" +
        "/* INPUTS DE TEXTO/DATA/NUMERO */\n" +
        "input[type=\"text\"],\n" +
        "input[type=\"number\"],\n" +
        "input[type=\"date\"],\n" +
        "input[type=\"email\"],\n" +
        "input[type=\"password\"],\n" +
        "select,\n" +
        "textarea {\n" +
        "    display: block;\n" +
        "    width: 100%;\n" +
        "    padding: 8px 10px;\n" +
        "    margin-bottom: 4px;\n" +
        "\n" +
        "    background: #111;\n" +
        "    border: 1px solid var(--borda);\n" +
        "    border-radius: 6px;\n" +
        "    color: #ffb6d9;\n" +
        "\n" +
        "    font-family: \"Courier New\", monospace;\n" +
        "    font-size: 13px;\n" +
        "    line-height: 1.3;\n" +
        "\n" +
        "    transition: 0.25s;\n" +
        "}\n" +
        "\n" +
        "/* FOCO NEON */\n" +
        "input[type=\"text\"]:focus,\n" +
        "input[type=\"number\"]:focus,\n" +
        "input[type=\"date\"]:focus,\n" +
        "input[type=\"email\"]:focus,\n" +
        "input[type=\"password\"]:focus,\n" +
        "select:focus,\n" +
        "textarea:focus {\n" +
        "    outline: none;\n" +
        "    border-color: var(--rosa);\n" +
        "    box-shadow:\n" +
        "        0 0 5px var(--rosa),\n" +
        "        0 0 15px rgba(255, 105, 180, 0.4);\n" +
        "}\n" +
        "\n" +
        "/* date/number picker fica esquisito no fundo escuro, ajusta os ícones */\n" +
        "input[type=\"date\"]::-webkit-calendar-picker-indicator {\n" +
        "    filter: invert(60%) sepia(80%) saturate(1000%) hue-rotate(290deg);\n" +
        "    cursor: pointer;\n" +
        "}\n" +
        "\n" +
        "/* TEXTAREA (caso algum CRUD use) */\n" +
        "textarea {\n" +
        "    min-height: 120px;\n" +
        "    resize: vertical;\n" +
        "}\n" +
        "\n" +
        "/* PLACEHOLDER */\n" +
        "input::placeholder,\n" +
        "textarea::placeholder {\n" +
        "    color: #ffb6d9aa;\n" +
        "}\n" +
        "\n" +
        "/* BOTÕES (inputs type=button/submit/reset) */\n" +
        "input[type=\"button\"],\n" +
        "input[type=\"submit\"],\n" +
        "input[type=\"reset\"],\n" +
        "button {\n" +
        "    display: inline-block;\n" +
        "    width: auto;\n" +
        "\n" +
        "    background: transparent;\n" +
        "    color: var(--rosa);\n" +
        "    border: 1px solid var(--rosa);\n" +
        "\n" +
        "    padding: 7px 14px;\n" +
        "    margin: 3px 8px 3px 0;\n" +
        "    border-radius: 8px;\n" +
        "\n" +
        "    cursor: pointer;\n" +
        "    transition: 0.25s;\n" +
        "\n" +
        "    font-family: \"Courier New\", monospace;\n" +
        "    font-size: 12px;\n" +
        "    font-weight: 600;\n" +
        "}\n" +
        "\n" +
        "/* linha do Id: input pequeno + botões de ação lado a lado */\n" +
        "#inputId {\n" +
        "    display: inline-block;\n" +
        "    width: 140px;\n" +
        "    margin-right: 8px;\n" +
        "    vertical-align: middle;\n" +
        "}\n" +
        "\n" +
        "[id^=\"bt\"] {\n" +
        "    vertical-align: middle;\n" +
        "}\n" +
        "\n" +
        "input[type=\"button\"]:hover,\n" +
        "input[type=\"submit\"]:hover,\n" +
        "input[type=\"reset\"]:hover,\n" +
        "button:hover {\n" +
        "    background: var(--rosa);\n" +
        "    color: white;\n" +
        "\n" +
        "    box-shadow:\n" +
        "        0 0 10px var(--rosa),\n" +
        "        0 0 25px rgba(255, 105, 180, 0.6);\n" +
        "\n" +
        "    transform: translateY(-2px);\n" +
        "}\n" +
        "\n" +
        "input[type=\"button\"]:active,\n" +
        "input[type=\"submit\"]:active,\n" +
        "button:active {\n" +
        "    transform: scale(0.96);\n" +
        "}\n" +
        "\n" +
        "/* botão desabilitado */\n" +
        "input[type=\"button\"]:disabled {\n" +
        "    opacity: 0.4;\n" +
        "    cursor: not-allowed;\n" +
        "    transform: none;\n" +
        "    box-shadow: none;\n" +
        "}\n" +
        "\n" +
        "/* DIV DE AVISO (mensagens de erro/sucesso) */\n" +
        "#divAviso {\n" +
        "    background: #1a0f14 !important;\n" +
        "    border: 1px solid var(--rosa-escuro);\n" +
        "    border-left: 4px solid var(--rosa);\n" +
        "    border-radius: 8px;\n" +
        "    padding: 12px 16px;\n" +
        "    color: #ffdcee;\n" +
        "    min-height: 20px;\n" +
        "    font-size: 13px;\n" +
        "}\n" +
        "\n" +
        "/* DIV/TEXTO DE SAIDA (listagem, JSON, resultado) */\n" +
        "#outputSaida,\n" +
        ".saida {\n" +
        "    background: #050505 !important;\n" +
        "    border: 1px dashed var(--rosa);\n" +
        "    border-radius: 10px;\n" +
        "    padding: 14px;\n" +
        "    color: #ffb6d9;\n" +
        "    font-size: 13px;\n" +
        "    line-height: 1.6;\n" +
        "    white-space: pre-wrap;\n" +
        "    word-break: break-word;\n" +
        "    min-height: 60px;\n" +
        "}\n" +
        "\n" +
        "/* SCROLLBAR */\n" +
        "::-webkit-scrollbar {\n" +
        "    width: 8px;\n" +
        "}\n" +
        "\n" +
        "::-webkit-scrollbar-thumb {\n" +
        "    background: var(--rosa);\n" +
        "    border-radius: 10px;\n" +
        "}\n" +
        "\n" +
        "/* reduz o espaço extra dos <br><br> que o gerador injeta */\n" +
        "br {\n" +
        "    line-height: 0.9;\n" +
        "    content: \"\";\n" +
        "    display: block;\n" +
        "    margin-top: 6px;\n" +
        "}\n" +
        "\n" +
        "/* LINHA HORIZONTAL, SE HOUVER */\n" +
        "hr {\n" +
        "    border: none;\n" +
        "    border-top: 1px solid var(--borda);\n" +
        "    margin: 20px 0;\n" +
        "}\n" +
        "\n" +
        "/* TABELAS, CASO ALGUM CRUD LISTE EM TABLE */\n" +
        "table {\n" +
        "    width: 100%;\n" +
        "    border-collapse: collapse;\n" +
        "    margin-top: 15px;\n" +
        "}\n" +
        "\n" +
        "th, td {\n" +
        "    padding: 8px 10px;\n" +
        "    border: 1px solid var(--borda);\n" +
        "    text-align: left;\n" +
        "    font-size: 13px;\n" +
        "}\n" +
        "\n" +
        "th {\n" +
        "    background: #150a10;\n" +
        "    color: var(--rosa);\n" +
        "}\n" +
        "\n" +
        "tr:hover td {\n" +
        "    background: rgba(255, 105, 180, 0.08);\n" +
        "}\n";

    document.getElementById('saida').value = codigo;

    return codigo;
}