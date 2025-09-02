// Depois de editar os registros da Planilha Cronograma!Planejar,  o 
// planejador seleciona o menu Planejar para copiar todos os registros da
// planilha Cronograma!Planejar planilha com seu atributo Ação igual a Incluir
// para a planilha Cronograma!Ativos
// 
// Como parte dessa operação, o sistema garante que o cronograma a ser
// ativado é único. Ele o faz, garantindo que a data/período nos registros da 
// planilha Cronograma!Planejar (ele são todos iguais) não se encontra em nenhum
// dos registros da planilha Cronograma!Ativos
//  
function cronogramaPlanejar() {
	let ativosGamaVals = [];
	let ativosGamaRegistro = [];

	// SpreadsheetApp.getUi().alert('Selected cronogramaPlanejar menu!');

	// Construa uma matriz com os datas/peridos na planilha Cronograma!Ativos
	const ativosGamaObjKeys = obterAtivosKeys();

	const planejarGamaVals = obterPlanejarGamaVals();
	if (planejarGamaVals.length === 0) {
		SpreadsheetApp.getUi().alert(" A planilha Cronograma!Planejar não tem um cronograma para ser ativado");
		return;
	}
	const planejarDataPeriodoKeys = obterPlanejarDataPeriodoKeys();
	if (planejarDataPeriodoKeys.length != 1) {
		SpreadsheetApp.getUi().alert(" A planilha Cronograma!Planejar contém vários cronogramas");
		return;
	}
	const planejarDataPeriodoKey = planejarDataPeriodoKeys[0];
	if (ativosGamaObjKeys.indexOf(planejarDataPeriodoKey) != -1) {
		let menssagem = '';
		menssagem +=  'O cronograma da planilha Cronograma!Planejar ';
		menssagem +=  '\n';
		menssagem +=  dateToString(planejarGamaVals[0][PLANEJAR_DATA]) + ' / ' + planejarGamaVals[0][PLANEJAR_PERIODO]
		menssagem +=  ' já existe na planilha Cronograma!Ativos';
		menssagem +=  '\n';
		SpreadsheetApp.getUi().alert(menssagem);
		return;
	}
	planejarGamaVals.forEach(planejarRegistro => {
		if (planejarRegistro[PLANEJAR_ACAO] === 'Incluir') {
			ativosGamaRegistro = [...planejarRegistro];
			ativosGamaRegistro[ATIVOS_ESTADO] = "Informar"
			ativosGamaVals.push(ativosGamaRegistro);
		}
	});
	copiarGamaValsParaPlanilha(obterAtivosPlanilha(), ativosGamaVals);

	// Ativar a planilha ATIVOS
	CararaLibrary.activateSheet(ATIVOS_PLANILHA);

	// Informar ao usuário que o sistema concluiu a operação 
	menssagem = "Povoou a planilha Cronograma!Ativos com os registros da planilha Cronograma!Planejar"
	console.info(menssagem);
	SpreadsheetApp.getUi().alert(menssagem);
}