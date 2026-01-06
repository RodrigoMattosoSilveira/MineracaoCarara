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

	SpreadsheetApp.getActiveSpreadsheet().toast('Inicio', 'Planejar');

	// SpreadsheetApp.getUi().alert('Selected cronogramaPlanejar menu!');

	// Construa uma matriz com os datas/peridos na planilha Cronograma!Ativos
	const ativosGamaObjKeys = obterAtivosKeys();

	// Certificar de que a planilha  Cronograma!Planejar esteja preenchida 
	const planejarGamaVals = obterPlanejarGamaVals();
	if (planejarGamaVals.length === 0) {
		SpreadsheetApp.getUi().alert(" A planilha Cronograma!Planejar não tem um cronograma para ser ativado");
		return;
	}

	// Certificar de que a planilha  Cronograma!Planejar contem apenas um cronograma 
	const planejarDataPeriodoKeys = obterPlanejarDataPeriodoKeys();
	if (planejarDataPeriodoKeys.length != 1) {
		SpreadsheetApp.getUi().alert(" A planilha Cronograma!Planejar contém vários cronogramas");
		return;
	}

	// Certificar de que o cronograma da planilha  Cronograma!Planejar nao 
	// existe na planilha // Certificar de que a planilha  Cronograma!Ativos 
	const planejarDataPeriodoKey = planejarDataPeriodoKeys[0];
	let data =  CararaLibrary.dateToString(planejarGamaVals[0][PLANEJAR_DATA]);
	let periodo = planejarGamaVals[0][PLANEJAR_PERIODO];
	if (ativosGamaObjKeys.indexOf(planejarDataPeriodoKey) != -1) {
		let menssagem = '';
		menssagem +=  'O cronograma da planilha Cronograma!Planejar ';
		menssagem +=  '\n';
		menssagem +=  data + ' / ' + periodo;
		menssagem +=  ' já existe na planilha Cronograma!Ativos';
		menssagem +=  '\n';
		SpreadsheetApp.getUi().alert(menssagem);
		return;
	}

	// Copiar os registros da da planilha  Cronograma!Planejar para a planilha
	// Cronograma!Ativos 
	planejarGamaVals.forEach(planejarRegistro => {
		if (planejarRegistro[PLANEJAR_ACAO] === 'Incluir') {
			ativosGamaRegistro = [...planejarRegistro];
			ativosGamaRegistro[ATIVOS_ESTADO] = "Informar"
			ativosGamaVals.push(ativosGamaRegistro);
		}
	});
	let ativosPlanilha = obterAtivosPlanilha();
	copiarGamaValsParaPlanilha(ativosPlanilha, ativosGamaVals);
	estabelederValidacaoDados(ativosPlanilha, ATIVOS_METODO+1, 	ATIVOS_METODOS_VALIDOS);
	estabelederValidacaoDados(ativosPlanilha, ATIVOS_SETOR+1, 	ATIVOS_SETORES_VALIDOS);
	estabelederValidacaoDados(ativosPlanilha, ATIVOS_LOCAL+1, 	ATIVOS_LOCAIS_VALIDOS);
	estabelederValidacaoDados(ativosPlanilha, ATIVOS_TAREFA+1, 	ATIVOS_TAREFAS_VALIDAS);
	
	// Atualizar a planilha Cronograma!Publicados, including o periodo 
	// planejado
  	let periodVals = obterPeriodosGamaVals();
	let ordem = vLookupPersonalizado(periodo, periodVals, PERIODOS_NOME, PERIODOS_ORDEM);
	let periodoVal = [[CararaLibrary.dateToString(data), periodo, ordem]]
	copiarGamaValsParaPlanilha(obterPublicadosPlanilha(), periodoVal);

	// Substituir a instância do período na planilha Cronograma!Modelo pelo
	// período planejado em ativosGamaVals
	let modelosGama = obterModelosGama();
	let modelosGamaVals = modelosGama === null ? [] : obterModelosGamaVals();
	let newModelosGamaVals = []
	modelosGama.clear({contentsOnly: true})
	modelosGamaVals.forEach( (elemento) => elemento[MODELOS_PERIODO] !== periodo ? newModelosGamaVals.push([...elemento]) : null)
	ativosGamaVals.forEach ( (elemento) => {
		// Remover o Estado e Data, manter o resto
		elemento.shift();
		elemento.shift()
		newModelosGamaVals.push([...elemento])
	})
	copiarGamaValsParaPlanilha(obterModelosPlanilha(), newModelosGamaVals);

	// limpar a planilha Cronograma!Planejar
	obterPlanejarGama() !== null ? obterPlanejarGama().clearContent() : null;

	// Ativar a planilha Cronograma!Ativos
	CararaLibrary.activateSheet(ATIVOS_PLANILHA);

	// Informar ao usuário que o sistema concluiu a operação 
	menssagem = '';
	menssagem += "Povoou a planilha Cronograma!Ativos com os registros da planilha Cronograma!Planejar"
	menssagem += '\n' + '\n';
	menssagem += "Atualizou a planilha Cronograma!Modelos com os registros da planilha Cronograma!Planejar"
	menssagem += '\n' + '\n';
	menssagem += "Atualizou a planilha Cronograma!Publicados com os registros do period publicado"
	console.info(menssagem);
	SpreadsheetApp.getUi().alert(menssagem);
}

