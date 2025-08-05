const estadiaID = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const  estadiaDados = "Dados!A:H"
const nomeCol = 0;
const comecoCol = 1;
const fechadaCol = 2;
const disponibilidadeCol = 3;
const metodoCol = 4;	
const areaCol = 5;	
const localCol = 6;	
const tabelaarefaCol = 7;	
const comentariosCol = 8;

// ****************************************************************************
// * Getters and Setters for Estadia Data	
// ****************************************************************************

function getEstadiaComeco(nome) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		return registro[comecoCol];
	}
	// If the name is not found, return null
  	return null;
}
function getEstadiaArea(nome) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		return registro[areaCol];
	}
	// If the name is not found, return null
  	return null;
}
function getEstadiaLocal(nome) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		return registro[localCol];
	}
	// If the name is not found, return null
  	return null;
}
function getEstadiaTabelaTarefa(nome) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		return registro[tabelaarefaCol];
	}
	// If the name is not found, return null
  	return null;
}
function getEstadiaComentarios(nome) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		return registro[comentariosCol];
	}
	// If the name is not found, return null
  	return null;
}
function setEstadiaComeco(nome, comeco) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[comecoCol] = comeco;
		return true;
	}
	// If the name is not found, return null
  	return null;
}
function setEstadiaFechada(nome, fechada) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[fechadaCol] = fechada;
		return true;
	}
	// If the name is not found, return null
  	return null;
}
function setEstadiaDisponibilidade(nome, disponibilidade) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[disponibilidadeCol] = disponibilidade;
		return true;
	}
	// If the name is not found, return null
  	return null;
}
function setEstadiaMetodo(nome, metodo) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[metodoCol] = metodo;
		return true;
	}
	// If the name is not found, return null
  	return null;
}

function setEstadiaArea(nome, area) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[areaCol] = area;
		return true;
	}
	// If the name is not found, return null
  	return null;
}
function setEstadiaLocal(nome, local) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[localCol] = local;
		return true;
	}
	// If the name is not found, return null
  	return null;
}
function setEstadiaTabelaTarefa(nome, tabelaTarefa) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[tabelaarefaCol] = tabelaTarefa;
		return true;
	}
	// If the name is not found, return null
  	return null;
}
function setEstadiaComentarios(nome, comentarios) {
 	const dados = getDados();
	const registro = getRegistro(dados, nome);
	if (registro) {
		registro[comentariosCol] = comentarios;
		return true;
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

function getRegistro(estadiaRange, nome) {
	for (let i = 0; i < estadiaRange.length; i++) {
		if (estadiaRange[i][nomeCol] === nome) {
			estadiaRange[i][comecoCol] = comeco;
			return estadiaRange[i]
		}
	}
  // If the name is not found, return null
  	return null;
}