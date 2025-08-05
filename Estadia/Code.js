const estadiaID = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const estadiaDadosSheet = "Dados"
const estadiaDadosRange = "A:H";
const nomeCol = 0;
const comecoCol = 1;
const fechadaCol = 2;
const disponibilidadeCol = 3;
const metodoCol = 4;	
const areaCol = 5;	
const localCol = 6;	
const tarefaCol = 7;	
const comentariosCol = 8;

// ****************************************************************************
// * Getters and Setters for Estadia Data	
// ****************************************************************************

function getEstadiaComeco(nome) {
	return getRegister(nome,comecoCol)
}
function getEstadiaArea(nome) {
	return getRegister(nome, areaCol);
}
function getEstadiaLocal(nome) {
	return getRegister(nome, localCol);
}
function getEstadiaTabelaTarefa(nome) {
	return getRegister(nome, tarefaCol);	
}
function getEstadiaComentarios(nome) {
	return getRegister(nome, comentariosCol);
}
function setEstadiaComeco(nome, comeco) {
	return setRegistro(nome, comecoCol, comeco);
}
function setEstadiaFechada(nome, fechada) {
	return setRegistro(nome, fechadaCol), fechada;
}
function setEstadiaDisponibilidade(nome, disponibilidade) {
	return setRegistro(nomee, disponibilidadeCol, disponibilidade);
}
function setEstadiaMetodo(nome, metodo) {
	return setRegistro(nome, metodoCol, metodo);
}
function setEstadiaArea(nome, area) {
	return setRegistro(nome, areaCol, area);
}
function setEstadiaLocal(nome, local) {
	return setRegistro(nome, localCol, local);	
}
function setEstadiaTarefa(nome, tarefa) {
	return setRegistro(nome, tarefaCol, tarefa);
}
function setEstadiaComentarios(nome, comentarios) {
	return setRegistro(nome, comentariosCol, comentarios);
}	

function setRegistro(chave, coluna, valor) {
	var valorRange =[[valor]]

	const ss = SpreadsheetApp.openById(estadiaID);
	const sheet = ss.getSheetByName(estadiaDados);
	const dataRange = sheet.getRange(estadiaDadosRange);
	for (let i = 0; i < dataRange.length; i++) {
		if (dataRange[i][nomeCol] === chave) {
			var rangeString = "R" + (i + 1) + "C" + (coluna + 1);
			sheet.getRange(rangeString ).setValues(valorRange);
			return true
		}
	}
  // If the name is not found, return null
  	return null;
}													

function getRegister(chave, coluna) {
	const dataRange = getDataRange();
	const dataRangeValues = dataRange.getValues();
	for (let i = 0; i < dataRangeValues.length; i++) {
		if (dataRangeValues[i][nomeCol] === chave) {
			return dataRangeValues[i][coluna]
		}
	}
  // If the name is not found, return null
  	return null;
}

function getDataRange() {
	const ss = SpreadsheetApp.openById(estadiaID);
	const sheet = ss.getSheetByName("Dados");
	const dataRange = sheet.getRange(estadiaDados);
	return dataRange;
}