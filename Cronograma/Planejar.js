var documentProperties = PropertiesService.getDocumentProperties();
const putData = (data) => documentProperties.setProperty('DATA', data);
const getData = ()     => documentProperties.getProperty('DATA');

const putPeriodo = (periodo) => documentProperties.setProperty('PERIODO', periodo);
const getPeriodo = ()        => documentProperties.getProperty('PERIODO');

const putOrdem = (ordem) => documentProperties.setProperty('ORDEM', ordem);
const getOrdem = ()        => documentProperties.getProperty('ORDEM');

//  Usar um cronograma recente, um modelo, para agilizar o planejamento;
function cronogramaPlanejar() {
	// Navegue para a planilha Planejar
	CararaLibrary.activateSheet("Planejar");

	// Recuperar o cronograma publicado mais recente. Usar hoje caso não haja nenhuma
	let cronogramaPublicadoMaisRecente = [...obterCronogramaPublicadoMaisRecente()]

	// Recuperar os períodos válidos. Usar "Diurno" caso não haja nenhum 
	let periodosMap = Referencia.obterPeriodos();

	// Calcular o candidato ao proximo cronograma
	let proximoCronogramaCandidato = [...obterProximoCronograma(cronogramaPublicadoMaisRecente, periodosMap)]
    putData(proximoCronogramaCandidato[0]);
    putPeriodo(proximoCronogramaCandidato[1]);
	putOrdem(proximoCronogramaCandidato[2]);

	// Apresentar dialogo modal; selecionar Planejar or Ignorar
	apresentarDialogoPlanejar(proximoCronogramaCandidato)
	return true
}

const cronogramaPlanejarProsseguir = (acaoSelecionada) => {
	// SpreadsheetApp.getUi().alert('Acao selecionada: ' + JSON.stringify(acaoSelecionada));
	let data = getData();
  	let periodo = getPeriodo()
	let ordem = Math.trunc(getOrdem());	
	// Helps write tests for cronogramaPlanejarProsseguir,
	cronogramaPlanejarExecutar(acaoSelecionada, data, periodo, ordem);
}

const cronogramaPlanejarExecutar = (acaoSelecionada, data, periodo, ordem) => {
	let menssagem = '';
	let resultado = '';
	let dataStr =  CararaLibrary.dateToString(data);

	// I'll use the following data elements:
	// - periodoEmPlanejamento: contém o nome do período que está sendo 
	//   planejado;
	// - modelarGama: os registros do planejamento mais recente para cada
	//   período;
	// - estadiaGama: os registros de todos os colaboradores disponíveis para o
	//   trabalhado
	// - planejarGama: os registros que retratam o cronograma sugerido do 
	//   período
	//  
	// I'll use the following algorithm
	// Para cada colaborador em estadiaGama
	//    Se colaboradorEstadia estiver em modelosGama
	//       adicionar o colaboradorModelos ao planejarGama
	//       definir colaboradorPlanejar[Planejar_INICIO] = colaboradorEstadia[PLANEJAR_INICIO]
	//       se colaboradorModelos[MODELOS_PERIODO] == periodoEmPlananejamento
	//          definir colaboradorPlanejar[PLANEJAR_ACAO] = "Incluir"
	//       senão
	//          definir colaboradorPlanejar[PLANEJAR_ACAO] = "Excluir"
	//       fim
	//    senão
	//       adicionar o colaboradorEstadia ao planejarGama
	//       definir colaboradorPlanejar[PLANEJAR_ACAO] = "Excluir"
	//       definir colaboradorPlanejar[PLANEJAR_PERIODO] = periodoEmPlananejamento
	//    fim
	// fim
	switch (acaoSelecionada) {
		case 'Planejar':
			let estadias = obterEstadiasGama();
			let plano = obterPlanejarGama().clear().clearDataValidations();
			for (let linha = 1; ; linha++) {
				// Obter o nome do colaborador
				let nome = estadias.getCell(linha, ESTADIAS_NOME+1).getValue().toString().trim();

				// Processamos todos colaboradores? Sim --> terminamos; caso contrario, prossiga
				if (nome == "") break;

				// Processar esse colaborador
				let modeloRegistro = obterModelosGamaRegistroNome(nome);

				// Caso haja um registro em Modelos com esse nome, incluir of registro de 
				// Modelo para o periodo em planejamento; caso nao nao haja um registro em
				// Modelos com esse nome, incluir o registro em Estadia (representado por 
				// linhaEstadia) 
				let estadiaRegistro = obterEstadiaGamaRegistroNome(nome);
				if (typeof modeloRegistro === "undefined") {		 
					usarEstadia(estadiaRegistro, plano, linha, dataStr, periodo)
				}
				else {
					usarModelo(estadiaRegistro, modeloRegistro, plano, linha, dataStr, periodo);
				}
			}

			// Add Data Validations:
			let planilhaPlanejar = obterPlanejarPlanilha();
			estabelederValidacaoDados(planilhaPlanejar, PLANEJAR_ACAO+1,   PLANEJAR_ACOES_VALIDAS);
			estabelederValidacaoDados(planilhaPlanejar, PLANEJAR_METODO+1, PLANEJAR_METODOS_VALIDOS);
			estabelederValidacaoDados(planilhaPlanejar, PLANEJAR_SETOR+1,  PLANEJAR_SETORES_VALIDOS);
			estabelederValidacaoDados(planilhaPlanejar, PLANEJAR_LOCAL+1,  PLANEJAR_LOCAIS_VALIDOS);
			estabelederValidacaoDados(planilhaPlanejar, PLANEJAR_TAREFA+1, PLANEJAR_TAREFAS_VALIDAS);
			
			// Pintar o texto da coluna ACAO de verde para Incluir, vermelho para Excluir
			pintarAcao(planilhaPlanejar.getName());

			// Ativar a planilha Planejar
			CararaLibrary.activateSheet(planilhaPlanejar.getName());

			// Informar ao usuário que o sistema concluiu a operação 
			resultado = "Povoou a planilha Planejar com os registros do mais recente cronograma do mesmo período"
			resultado += '\n';
			menssagem = construirProsseguirMenssagem(resultado, data, periodo, ordem) 
			console.info(menssagem);
			SpreadsheetApp.getUi().alert(menssagem);
			break;
		case 'Ignorar':
			menssagem = construirProsseguirMenssagem(acaoSelecionada, data, periodo, ordem) 
			console.info(menssagem);

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

	// Update the Publicados folha e termine a operacao
	publicarCronograma(data, periodo, ordem);

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
	menssagem += "Data: " +  CararaLibrary.dateToString(data);
	menssagem += "\n"
	menssagem += "Periodo: " + periodo;
	menssagem += "\n"
	menssagem += "Ordem: " + ordem;

	return menssagem;
}
function usarEstadia(estadiaRegistro, plano, linha, dataStr, periodo) {
	// ACAO 
	plano.getCell(linha, PLANEJAR_ACAO+1).setValue("Excluir");

	// DATA
	plano.getCell(linha, PLANEJAR_DATA+1).setValue(dataStr);

	// PERIODO
	plano.getCell(linha, PLANEJAR_PERIODO+1).setValue(periodo);

	// NOME
	plano.getCell(linha, PLANEJAR_NOME+1).setValue(estadiaRegistro[ESTADIAS_NOME]);

	// Inicio
	plano.getCell(linha, PLANEJAR_INICIO+1).setValue(estadiaRegistro[ESTADIAS_INICIO]);


	// METODO
	plano.getCell(linha, PLANEJAR_METODO+1).setValue(estadiaRegistro[ESTADIAS_METODO]);

	// SETOR
	plano.getCell(linha, PLANEJAR_SETOR+1).setValue(estadiaRegistro[ESTADIAS_SETOR]);

	// LOCAL
	plano.getCell(linha, PLANEJAR_LOCAL+1).setValue(estadiaRegistro[ESTADIAS_LOCAL]);

	// TAREFA
	plano.getCell(linha, PLANEJAR_TAREFA+1).setValue(estadiaRegistro[ESTADIAS_TAREFA]);

	// REMUNERACAO
	plano.getCell(linha, PLANEJAR_REMUNERACAO+1).setValue(estadiaRegistro[ESTADIAS_REMUNERACAO]);

	// COMENTARIOS
	plano.getCell(linha, PLANEJAR_COMENTARIOS+1).setValue(estadiaRegistro[ESTADIAS_COMENTARIOS]);
}

function usarModelo(estadiaRegistro, modeloRegistro, plano, linha, dataStr, periodo) {
	// ACAO 
	if (modeloRegistro[MODELOS_PERIODO] === periodo) {
		plano.getCell(linha, PLANEJAR_ACAO+1).setValue("Incluir");
	}
	else {
		plano.getCell(linha, PLANEJAR_ACAO+1).setValue( "Excluir");
	}

	// DATA
	plano.getCell(linha, PLANEJAR_DATA+1).setValue(dataStr);

	// PERIODO
	plano.getCell(linha, PLANEJAR_PERIODO+1).setValue(periodo);

	// NOME
	plano.getCell(linha, PLANEJAR_NOME+1).setValue(modeloRegistro[MODELOS_NOME]);

	// Começo
	plano.getCell(linha, PLANEJAR_INICIO+1).setValue(modeloRegistro[MODELOS_INICIO]);

	// METODO
	definirPlanoAjudante (plano, linha, PLANEJAR_METODO,     modeloRegistro, MODELOS_METODO,       estadiaRegistro, ESTADIAS_METODO)

	// SETOR
	definirPlanoAjudante (plano, linha, PLANEJAR_SETOR,      modeloRegistro, MODELOS_SETOR,        estadiaRegistro, ESTADIAS_SETOR)

	// LOCAL
	definirPlanoAjudante (plano, linha, PLANEJAR_LOCAL,       modeloRegistro, MODELOS_LOCAL,       estadiaRegistro, ESTADIAS_LOCAL)

	// TAREFA
	definirPlanoAjudante (plano, linha, PLANEJAR_TAREFA,       modeloRegistro, MODELOS_TAREFA,      estadiaRegistro, ESTADIAS_TAREFA)

	// REMUNERACAO
	definirPlanoAjudante (plano, linha, PLANEJAR_REMUNERACAO, modeloRegistro, MODELOS_REMUNERACAO, estadiaRegistro, ESTADIAS_REMUNERACAO)

	// COMENTARIOS
	definirPlanoAjudante (plano, linha, PLANEJAR_COMENTARIOS, modeloRegistro, MODELOS_COMENTARIOS, estadiaRegistro, ESTADIAS_COMENTARIOS)
}


function definirPlanoAjudante (pGama, planoLinha, planoColumna, mRegistro, mColuna, eRegistro, eColuna) {
    let cell = pGama.getCell(planoLinha, planoColumna+1);
	cell.setValue(mRegistro[mColuna]);
	if (eRegistro[eColuna] !== mRegistro[mColuna]) {
		cell.setBackground('#FFFF00')
	}
}
