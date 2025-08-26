//  Usar um cronograma recente, um modelo, para agilizar o planejamento;
function cronogramaModelar() {
	let datas = [];
	// SpreadsheetApp.getUi().alert('Selected cronogramaModelar menu!');
	let dataHoje = new Date();
	var day = dataHoje.getDate()
	var month = dataHoje.getMonth() + 1
	var year = dataHoje.getFullYear()
	let dataHojeStr = "";
	dataHojeStr += (day < 10 ? "0" + day : day);
	dataHojeStr += "/" + (month < 10 ? "0" + month : month);
	dataHojeStr += year
	datas.push(dataHojeStr)

	let dataAmanha = new Date(dataHoje);
	dataAmanha.setDate(dataHoje.getDate() + 1)
	day = dataAmanha.getDate()
	month = dataAmanha.getMonth() + 1
	year = dataAmanha.getFullYear()
	let dataAmanhaStr = "";
	dataAmanhaStr += (day < 10 ? "0" + day : day);
	dataAmanhaStr += "/" + (month < 10 ? "0" + month : month);
	dataAmanhaStr += "/" + year;
	datas.push(dataAmanhaStr)

	apresenteCaixaDialogoDataTurno(datas, ['Diurno', 'Noturno'], cronogramaModelarProsseguir)
	return true
}

const cronogramaModelarProsseguir = (dataTurno) => {
	SpreadsheetApp.getUi().alert('Data e turno: ' + JSON.stringify(dataTurno));
}