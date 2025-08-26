let datas = ['08/26/2025', '08/27/2025'];
const putDatas = (dados) => datas = [...dados];
const getDatas = () => datas;

let turnos = ['Diurno', 'Noturno'];
const putTurnos = (dados) => turnos = [...dados];
const getTurnos = () => turnos;

var nomeFuncao = ''
const putNomeFuncao = (dado) => nomeFuncao = dado;
const getNomeFuncao = () => nomeFuncao;

const apresenteCaixaDialogoDataTurno = (dataDados, turnoDados, funcao) => {
    putDatas(dataDados);
    putTurnos(turnoDados);
    putNomeFuncao(funcao);

    // var caixaModal = 'CaixaDialogoDataTurnoModal';
    var caixaModal = 'CaixaDialogoBootstrap';
    const html = HtmlService.createHtmlOutputFromFile(caixaModal) 
        .setWidth(400)
        .setHeight(300);
    SpreadsheetApp.getUi().showModalDialog(html, 'Selecione a Data e o Turno');
}

const processarDataTurnoSelecionados = (dataTurno) => {
    SpreadsheetApp.getUi().alert('Data e turno: ' + JSON.stringify(dataTurno));
    // retornar(dataTurno);
}