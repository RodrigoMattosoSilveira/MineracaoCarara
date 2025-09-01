var documentProperties = PropertiesService.getDocumentProperties();
const putData = (data) => documentProperties.setProperty('DATA', data);
const getData = ()     => documentProperties.getProperty('DATA');

const putPeriodo = (periodo) => documentProperties.setProperty('PERIODO', periodo);
const getPeriodo = ()        => documentProperties.getProperty('PERIODO');

//  Usar um cronograma recente, um modelo, para agilizar o planejamento;
function cronogramaModelar() {
	// Navegue para a planilha Planejar
	CararaLibrary.activateSheet("Planejar");

	// Recuperar o cronograma publicado mais recente. Usar hoje caso não haja nenhuma
	let cronogramaPublicadoMaisRecente = [...obterCronogramaPublicadoMaisRecente()]

	// Recuperar os períodos válidos. Usar "Diurno" caso não haja nenhum 
	let periodosMap = Master.obterPeriodos();

	// Calcular o candidato ao proximo cronograma
	let proximoCronogramaCandidato = [...obterProximoCronograma(cronogramaPublicadoMaisRecente, periodosMap)]
    putData(proximoCronogramaCandidato[0]);
    putPeriodo(proximoCronogramaCandidato[1]);

	// Apresentar dialogo modal; selecionar Planejar or Ignorar
	apresentarDialogoModelar(proximoCronogramaCandidato)
	return true
}

const cronogramaModelarProsseguir = (acaoSelecionada) => {
	// SpreadsheetApp.getUi().alert('Acao selecionada: ' + JSON.stringify(acaoSelecionada));
	let data = getData();
  	let periodo = getPeriodo()
	let message = '';
	switch (acaoSelecionada) {
		case 'Planejar':
			message += 'Acao selecionada: ' + "Planejando"
			message += "\n"
			message += "Data:" + data.toString();
			message += "\n"
			message += "Periodo:" + periodo;
			SpreadsheetApp.getUi().alert(message);
			break;
		case 'Ignorar':
			message += 'Acao selecionada: ' + "Ignorando"
			message += "\n"
			message += "Data:" + data.toString();
			message += "\n"
			message += "Periodo:" + periodo;
			SpreadsheetApp.getUi().alert(message);
			break;
		default:
			break;
	}
}

// ****************************************************************************
// obterCronogramaPublicadoMaisRecente - Obtenha a versão mais recente dos 
// cronogramas publicados. Suponha que o intervalo Publicados esteja 
// classificado, por Data e Período Orde) em ordem decrescente publicados; 
// 
// Input
// 		none
// Output
// 		cronograma (Array) - Dois elementos, o primeiro representando a 
// 		data e o segundo o periodo to proximo cronograma
// ****************************************************************************
//
function obterCronogramaPublicadoMaisRecente() {
	let cronogramaPublicadoMaisRecente = [];
	cronogramaPublicadoMaisRecente = [...obterPublicadosGamaVals()][0]
	return cronogramaPublicadoMaisRecente;
}

// ****************************************************************************
// obterProximoPeriodo - Calcula a data e periodo do proximo cronograma
// 
// Input
// 		cronogramaRecente <Array> - Dois elementos, o primeiro representando a 
// 		data e o segundo o periodo to proximo cronograma mais recente;
// 
// 		periodos <Map> - Ordenados por suas `keys`, com cada 'key` 
// 		representando um objeto consistindo da ID and Hora do periodo
// Output
// 		proximoCronograma (Array) - Dois elementos, o primeiro representando a 
// 		data e o segundo o periodo to proximo cronograma
// ****************************************************************************
// 
function obterProximoCronograma(cronogramaRecente, periodosMap) {
	let proximoCronograma = [];

	const DATA_COL    = 0;
	const PERIODO_COL = 1;

	let dataRecente = cronogramaRecente[DATA_COL];
	let periodoRecenteNome = cronogramaRecente[PERIODO_COL];

	let dataProxima;         // Date
	let periodoProximoOrdem; // Integer
	let periodoProximoNome;  // String


	// Incrementar a ordem do período executado por 1. Se for maior que o tamanho 
	// do MAP de períodos, selecione o primeiro período, caso contrário, selecione 
	// o período com a nova ordem
	// 
	let periodoRecenteOrderm = periodosMap.get(periodoRecenteNome)["ID"];
	if (periodoRecenteOrderm + 1 > periodosMap.size) {
		dataProxima = calcularDiaSeguinte(dataRecente)
		periodoProximoOrdem = 1
	}
	else {
		dataProxima = dataRecente;
		periodoProximoOrdem = periodoRecenteOrderm + 1
	}

	// Usar ordemPeriodoProximo para encontrar seu nome
	let iterator = periodosMap.keys();
	let keepIterating = true;
	let result = iterator.next();
	while (!result.done && keepIterating) {
		if (periodosMap.get(result.value)["ID"] === periodoProximoOrdem) {
			periodoProximoNome = result.value;
			keepIterating = false
		}
		result = iterator.next();
	}

	proximoCronograma.push(dataProxima);
	proximoCronograma.push(periodoProximoNome)
	proximoCronograma.push(periodoProximoOrdem)

	return proximoCronograma;
}

// TODO move this to the Library
function calcularDiaSeguinte (data) {
	return adicionarDias(data, 1)
}
 
// TODO move this to the Library
function adicionarDias(data, dias) {
    const newDate = new Date(data);
    newDate.setDate(data.getDate() + dias);
    return newDate;
}