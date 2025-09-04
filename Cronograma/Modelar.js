var documentProperties = PropertiesService.getDocumentProperties();
const putData = (data) => documentProperties.setProperty('DATA', data);
const getData = ()     => documentProperties.getProperty('DATA');

const putPeriodo = (periodo) => documentProperties.setProperty('PERIODO', periodo);
const getPeriodo = ()        => documentProperties.getProperty('PERIODO');

const putOrdem = (ordem) => documentProperties.setProperty('ORDEM', ordem);
const getOrdem = ()        => documentProperties.getProperty('ORDEM');

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
	putOrdem(proximoCronogramaCandidato[2]);

	// Apresentar dialogo modal; selecionar Planejar or Ignorar
	apresentarDialogoModelar(proximoCronogramaCandidato)
	return true
}

const cronogramaModelarProsseguir = (acaoSelecionada) => {
	// SpreadsheetApp.getUi().alert('Acao selecionada: ' + JSON.stringify(acaoSelecionada));
	let data = getData();
	let dataStr = dateToString(data);
  	let periodo = getPeriodo()
	let ordem = Math.trunc(getOrdem());
	let menssagem = '';
	let resultado = '';
	switch (acaoSelecionada) {
		case 'Planejar':
			let planejarGamaVals = [];
			let planejarGamaRegistro = [];

			// Construir a planilha Cronograma!Planejar, incluindo todos os 
			// registros ativos da planilha Cronograma!Estadia, 
			// 	  - Limpar todos os registros na planilha Cronograma!Planejar;
			//    - Definir o atributo Acao do registro a incluir na planilha
			//      Cronograma!Planejar do seguinte modo:
			//        - Definir seu atributo Ação como Incluir, caso o 
			//          associado tiver um registro correspondente na planilha
			//          Cronograma!Modelos com o atributo de Período 
			//          correspondente ao Período que está sendo planejado;
			// 		  - Caso contrário, definir seu atributo Ação como Excluir
			// 
			// Observe que os registros na planilha Cronograma!Estadia
			// representam um subconjunto dos registros da planilha 
			// Estadia!Dados, onde filtramos aqueles com estadias expiradas.
			//  
			obterPlanejarGama() !== null ? obterPlanejarGama().clear({contentsOnly: true}) : null;

			// Construa uma matriz de todos os associados na planilha 
			// Cronograma!Modelos cujo atributo de período corresponde ao 
			// período que está sendo planejado
			const modeloGamaObjKeys = [];
			let modeloGamaVals = obterModelosGamaVals();
			modeloGamaVals.forEach(elemento => {
				if (elemento[MODELOS_PERIODO === periodo]) {
					let key = '' + elemento[MODELOS_NOME] + dateToString(elemento[MODELOS_INICIO]);
					modeloGamaObjKeys.push(key);
				}
			});

			let estadiasGamaVals = obterEstadiasGamaVals();
			estadiasGamaVals.forEach(elemento => {
				if (elemento[ESTADIAS_NOME] != '') {
					planejarGamaRegistro = [...[]];

					key = '' + elemento[ESTADIAS_NOME] + dateToString(elemento[ESTADIAS_INICIO]);
					let acao = modeloGamaObjKeys.indexOf(key) == -1 ? "Incluir" : "Excluir"

					planejarGamaRegistro.push(acao)
					planejarGamaRegistro.push(dataStr)
					planejarGamaRegistro.push(periodo)
					planejarGamaRegistro.push(elemento[ESTADIAS_NOME]);
					planejarGamaRegistro.push(elemento[ESTADIAS_INICIO]);
					planejarGamaRegistro.push(elemento[ESTADIAS_METODO]);
					planejarGamaRegistro.push(elemento[ESTADIAS_AREA]);
					planejarGamaRegistro.push(elemento[ESTADIAS_LOCAL]);
					planejarGamaRegistro.push(elemento[ESTADIAS_TAREFA]);
					planejarGamaRegistro.push(elemento[ESTADIAS_REMUNERACAO]);
					planejarGamaRegistro.push(elemento[ESTADIAS_COMENTARIOS]);
					planejarGamaVals.push([...planejarGamaRegistro]);	
				}
			});

			// Copiar os registros formatados para a planilha Planejar
			// copiarGamaValsParaPlanilhaVelho(PLANEJAR_PLANILHA, PLANEJAR_GAMA, planejarGamaVals)
			copiarGamaValsParaPlanilha(obterPlanejarPlanilha(), planejarGamaVals)
			estabelederValidacaoDados(obterPlanejarPlanilha(), PLANEJAR_ACAO+1, PLANEJAR_ACOES_VALIDAS);
			estabelederValidacaoDados(obterPlanejarPlanilha(), PLANEJAR_METODO+1, PLANEJAR_METODOS_VALIDOS);
			estabelederValidacaoDados(obterPlanejarPlanilha(), PLANEJAR_AREA+1, PLANEJAR_AREAS_VALIDAS);
			estabelederValidacaoDados(obterPlanejarPlanilha(), PLANEJAR_LOCAL+1, PLANEJAR_LOCAIS_VALIDOS);
			estabelederValidacaoDados(obterPlanejarPlanilha(), PLANEJAR_TAREFA+1, PLANEJAR_TAREFAS_VALIDAS);

			// Ativar a planilha Planejar
			CararaLibrary.activateSheet("Planejar");

			// Informar ao usuário que o sistema concluiu a operação 
			resultado = "Povoou a planilha Planajar com os registros do mais recente cronograma do mesmo período"
			menssagem = construirProsseguirMenssagem(resultado, data, periodo, ordem) 
			console.info(menssagem);
			SpreadsheetApp.getUi().alert(menssagem);
			break;
		case 'Ignorar':
			menssagem = construirProsseguirMenssagem(acaoSelecionada, data, periodo, ordem) 
			console.info(menssagem);

			// Update the Publicados folha e termine a operacao
			publicarCronograma(data, periodo, ordem);

			// Navegue para a planilha Planejar
			CararaLibrary.activateSheet("PUBLICADOS_PLANILHA");		

			// Informar ao usuário que o sistema concluiu a operação 
			resultado = "Inseriu cronograma como publicado, sem o planejar"
			menssagem = construirProsseguirMenssagem(resultado, data, periodo, ordem) 
			console.info(menssagem);
			SpreadsheetApp.getUi().alert(menssagem);
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
// ****************************************************************************
// TODO move this to the Library
// construirProsseguirMenssagem - Cria uma string de mensagem para informar o 
// usuário sobre o resultado do trabalho do sistema
// 
// Input
// 		acao <string> - O Resultado
// 		data <Date> - A data do cronograma
// 		periodo <string> O periodo do cronograma
// 		orderm <int> A ordem do periodo no dia de trabalho
// Output
// 		true, caso o sistema enviou a mensagem, false caso contrário
// ****************************************************************************
// 
function construirProsseguirMenssagem(acao, data, periodo, ordem) {
	let menssagem = '';

	menssagem += 'Resultado: ' + acao;
	menssagem += "\n"
	menssagem += "Data: " + dateToString(data);
	menssagem += "\n"
	menssagem += "Periodo: " + periodo;
	menssagem += "\n"
	menssagem += "Ordem: " + ordem;

	return menssagem;
}