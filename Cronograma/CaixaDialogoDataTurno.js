var dataOpcoes = ['08/24/2025', '09/24/2025'];
var dataSelecionada = '';
var retornar;
const definirDatasOpções = (dados) => {
    dataOpcoes = [...dados];
};
const retorneCaixaDialogoDatas = () => {
    Logger.log('retorneCaixaDialogoDatas: ' + JSON.stringify(turnoOpcoes));
    return dataOpcoes;
}
const processarDataSelecionada = (dado) => {
	dataSelecionada = dado;
}

var turnoOpcoes = ['Diario', 'Noturno'];
var turnoSelecionado = '';
const definirTurnosOpções = (dados) => {
    turnoOpcoes = [...dados];
};

const processarTurnoSelecionado = (dado) => {
	turnoSelecionado = dado;
}

const retorneCaixaDialogoTurnos = () => {
    Logger.log('retorneCaixaDialogoTurnos: ' + JSON.stringify(turnoOpcoes));
    return turnoOpcoes;
}

const retorneFuncaoServidor = () => {
    Logger.log('retorneFuncaoServidor');
    return retornar;
}


const apresenteCaixaDialogoDataTurno = (dataDados, turnoDados, retorno) => {
    definirDatasOpções(dataDados);
    definirTurnosOpções(turnoDados);
    retornar = retorno;

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