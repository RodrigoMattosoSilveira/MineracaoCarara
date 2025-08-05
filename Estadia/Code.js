const estadiaID = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const estadiaDados = "Dados!A:H"
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
	return getRegistro(nome,comecoCol)
}
function getEstadiaArea(nome) {
	return getRegistro(nome, areaCol);
}
function getEstadiaLocal(nome) {
	return getRegistro(nome, localCol);
}
function getEstadiaTabelaTarefa(nome) {
	return getRegistro(nome, tarefaCol);	
}
function getEstadiaComentarios(nome) {
	return getRegistro(nome, comentariosCol);
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
 	const dados = getDados();
	const registro = getRegistro(chave, coluna);
	if (registro) {
		registro[coluna] = valor;
		return true;
	}
	// If the name is not found, return null
  	return null;
}													

function getRegistro(chave, coluna) {
	const dados = getDados();
	for (let i = 0; i < dados.length; i++) {
		if (dados[i][nomeCol] === chave) {
			return dados[i]
		}
	}
  // If the name is not found, return null
  	return null;
}

function getDados() {
	const ss = SpreadsheetApp.openById(estadiaID);
	const sheet = ss.getSheetByName("Dados");
	const dataRange = sheet.getRange(estadiaDados);
	const data = dataRange.getValues();
	return data;
}