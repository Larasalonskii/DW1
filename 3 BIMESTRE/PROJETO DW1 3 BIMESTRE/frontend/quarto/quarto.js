const URL_API = 'http://localhost:3001';
const SILHUETA_URL = `${URL_API}/imagens/silhueta.png`;

let oQueEstaFazendo = '';
let quarto = null;
bloquearAtributos(true);

async function inicializar() {
    await carregarTipoQuarto();
    await listar();
}

async function carregarTipoQuarto() {
    const select = document.getElementById("selectId_tipo_quarto");
    try {
        const resposta = await fetch(`${URL_API}/tipo_quarto/listar`);
        const data = await resposta.json();
        if (data.sucesso) {
            select.innerHTML = '<option value="">-- Selecione um Tipo de Quarto --</option>';
            data.unidades.forEach(um => {
                select.innerHTML += `<option value="${um.tipo_quarto_id}">${um.tipo_quarto_id} - ${um.tipo_quarto_nome}</option>`;
            });
        }
    } catch (erro) {
        select.innerHTML = '<option value="">Erro ao carregar os tipos</option>';
    }
}

function atualizarImagemDoTipo() {
    const selectTipo = document.getElementById('selectId_tipo_quarto');
    const imgContainer = document.querySelector('.form-direita .img-container img');

    // Pega o ID do tipo selecionado (ex: "1", "2", "3")
    const idTipo = selectTipo.value;

    if (!idTipo) {
        // Se não tiver tipo selecionado, volta para a silhueta padrão
        imgContainer.src = 'skeleton.svg'; // Mostra o skeleton animado
        imgContainer.removeAttribute('data-src'); // Remove a origem real
        imgContainer.alt = 'Selecione um tipo de quarto';
        return;
    }

    // Define os caminhos das imagens baseados no ID do tipo
    // IMPORTANTE: Assumimos que as imagens finais são PNG (tipo_1.png, tipo_2.png, etc.)
    const caminhoImagemReal = `tipo_${idTipo}.png`;
    const caminhoSkeleton = 'skeleton.svg';

    console.log(`Atualizando imagem para Tipo ID: ${idTipo}. Buscando: ${caminhoImagemReal}`);

    // Define o ID do elemento dinamicamente (para manipulação futura, se necessário)
    imgContainer.id = `quarto-tipo-${idTipo}`;

    // Define o texto alternativo corretamente
    const nomeTipo = selectTipo.options[selectTipo.selectedIndex].text;
    imgContainer.alt = `${nomeTipo} - Vibe Rosa`;

    // A MÁGICA DO SKELETON:
    // 1. Voltamos a imagem visível para o skeleton animado
    imgContainer.src = caminhoSkeleton;

    // 2. Definimos no data-src onde a imagem real está
    imgContainer.setAttribute('data-src', caminhoImagemReal);

    // 3. Chamamos a função de carregamento para fazer a troca
    carregarImagemReal(imgContainer);
}

function acionarUpload() {
    if (oQueEstaFazendo !== 'inserindo' && oQueEstaFazendo !== 'alterando') {
        mostrarAviso("Clique em Inserir ou Alterar primeiro para poder escolher uma imagem.");
        return;
    }
    document.getElementById('inputImagem').click();
}

function previewImagem() {
    const inputFiles = document.getElementById('inputImagem').files;
    if (inputFiles.length > 0) {
        const url = URL.createObjectURL(inputFiles[0]);
        document.getElementById('imgQuarto').src = url;
        mostrarAviso("Imagem escolhida! Clique em Salvar para concluir.");
    }
}

// Salva a imagem na pasta /imagens/tipos/tipo_X.png
async function uploadImagemParaServidor(idTipo) {
    const inputFiles = document.getElementById('inputImagem').files;

    // Se o usuário não escolheu nenhuma imagem nova, não faz nada
    if (inputFiles.length === 0) return;

    if (!idTipo) {
        mostrarAviso("Selecione um Tipo de Quarto para vincular a imagem!");
        return;
    }

    const formData = new FormData();
    formData.append('imagem', inputFiles[0]);

    try {
        const resposta = await fetch(`${URL_API}/tipo_quarto/upload/${idTipo}`, {
            method: 'POST',
            body: formData
        });
        const data = await resposta.json();

        if (data.sucesso) {
            // Atualiza a imagem imediatamente após salvar
            atualizarImagemDoTipo();
        } else {
            console.error("Falha no upload:", data.mensagem);
        }
    } catch (erro) {
        console.error("Erro ao enviar imagem para o servidor:", erro);
    }
}

async function procurePorChavePrimaria(chave) {
    try {
        const resposta = await fetch(`${URL_API}/quarto/${chave}`);
        const data = await resposta.json();
        return data.sucesso ? data.quarto : null;
    } catch (erro) {
        return null;
    }
}

async function procure() {
    const id_quarto = document.getElementById("inputId_quarto").value;
    if (isNaN(id_quarto) || !Number.isInteger(Number(id_quarto)) || id_quarto === "") {
        mostrarAviso("Precisa ser um número inteiro");
        return;
    }

    quarto = await procurePorChavePrimaria(id_quarto);
    oQueEstaFazendo = '';

    if (quarto) {
        mostrarDadosQuarto(quarto);
        visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
        mostrarAviso("Achou no banco, pode alterar ou excluir");
    } else {
        limparAtributos();
        visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
        mostrarAviso("Não achou no banco, pode inserir");
    }
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique em salvar");
}

function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique em salvar");
}

function excluir() {
    bloquearAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - Clique em salvar para confirmar a exclusão");
}

async function salvar() {
    let id_quarto = document.getElementById("inputId_quarto").value;
    const capacidade_quarto = document.getElementById("inputCapacidade_quarto").value;
    const tipo_quarto_id = document.getElementById("selectId_tipo_quarto").value || null;
    const dadosQuarto = { id_quarto, capacidade_quarto, tipo_quarto_id };

    try {
        if (oQueEstaFazendo === 'inserindo') {
            await fetch(`${URL_API}/quarto`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dadosQuarto) });
            await uploadImagemParaServidor(tipo_quarto_id);
            mostrarAviso("Inserido no Banco de Dados com sucesso!");
        } else if (oQueEstaFazendo === 'alterando') {
            await fetch(`${URL_API}/quarto/${id_quarto}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dadosQuarto) });
            await uploadImagemParaServidor(tipo_quarto_id);
            mostrarAviso("Alterado no Banco de Dados com sucesso!");
        } else if (oQueEstaFazendo === 'excluindo') {
            await fetch(`${URL_API}/quarto/${id_quarto}`, { method: 'DELETE' });
            mostrarAviso("Excluído do Banco de Dados!");
        }

        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        document.getElementById("inputId_quarto").value = "";
        listar();
    } catch (erro) {
        mostrarAviso("Erro ao efetuar operação no servidor.");
    }
}

async function listar() {
    try {
        const resposta = await fetch(`${URL_API}/quarto/listar`);
        const data = await resposta.json();
        if (data.sucesso) {
            let texto = "";
            for (let linha of data.quartos) {
                const tipo = linha.tipo_quarto_nome ? ` - Tipo: ${linha.tipo_quarto_nome}` : ' - Tipo: Não informado';
                texto += `Quarto ${linha.id_quarto} | Capacidade: ${linha.capacidade_quarto}${tipo}<br>`;
            }
            document.getElementById("outputSaida").innerHTML = texto || "Nenhum quarto cadastrado.";
        }
    } catch (erro) {
        document.getElementById("outputSaida").innerHTML = "Servidor offline.";
    }
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação");
}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosQuarto(p) {
    document.getElementById("inputId_quarto").value = p.id_quarto;
    document.getElementById("inputCapacidade_quarto").value = p.capacidade_quarto;
    document.getElementById("selectId_tipo_quarto").value = p.tipo_quarto_id || "";
    bloquearAtributos(true);
    atualizarImagemDoTipo();
}

function limparAtributos() {
    quarto = null;
    oQueEstaFazendo = '';
    document.getElementById("inputCapacidade_quarto").value = "";
    document.getElementById("selectId_tipo_quarto").value = "";
    document.getElementById("inputImagem").value = "";
    atualizarImagemDoTipo();
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("inputId_quarto").readOnly = !soLeitura;
    document.getElementById("inputCapacidade_quarto").readOnly = soLeitura;
    document.getElementById("selectId_tipo_quarto").disabled = soLeitura;
}

function visibilidadeDosBotoes(btP, btI, btA, btE, btS) {
    document.getElementById("btProcure").style.display = btP;
    document.getElementById("btInserir").style.display = btI;
    document.getElementById("btAlterar").style.display = btA;
    document.getElementById("btExcluir").style.display = btE;
    document.getElementById("btSalvar").style.display = btS;
    document.getElementById("btCancelar").style.display = btS;
}

// Função que faz a troca suave do Skeleton pela imagem real
function carregarImagemReal(img) {
    const imagemReal = img.getAttribute('data-src');

    // Se não houver data-src definido, não faz nada (mantém o skeleton)
    if (!imagemReal) return;

    // Cria uma imagem temporária na memória para monitorar o carregamento
    const tempImg = new Image();
    tempImg.src = imagemReal;

    // Quando a imagem real terminar de baixar...
    tempImg.onload = () => {
        console.log(`✅ Imagem real carregada com sucesso: ${imagemReal}`);
        // ...nós trocamos o src da imagem visível na tela
        img.src = imagemReal;

        // Opcional: Adicionar uma classe CSS para animação de fade-in
        img.classList.add('loaded');
    };

    // Tratamento de erro se a imagem não existir no servidor
    tempImg.onerror = () => {
        console.error(`❌ Erro ao carregar imagem real: ${imagemReal}. Mantendo silhueta.`);
        // Se der erro, você pode definir uma imagem de "erro" ou manter a silhueta
        img.src = 'imagens/silhueta.png'; // Ou mantém o skeleton, como preferir
    };
}