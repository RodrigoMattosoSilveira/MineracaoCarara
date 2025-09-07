const EPSILON = 0.00001;
const obterProducaoPocosTestes = () => {
  let dataProcurada = '9/5/2025'
	let producao = Producao.obterProducaoPocos("9/5/2025");
	let producaoKeys = Object.keys(producao);
	producaoKeys.length === 2 ?
		console.info(" ✔︎ obterProducaoPocos, " + dataProcurada + " length === 2") :
		console.error(" ✖︎  obterProducaoPocos, " + dataProcurada + " length === 2")
	Math.abs(producao["Poço_1"] - 21.9534838229411) < EPSILON ?
		console.info(" ✔︎ obterProducaoPocos, Poço_1" + dataProcurada + " 21.9534838229411") :
		console.error(" ✖︎  obterProducaoPocos, Poço_1" + dataProcurada + " 21.9534838229411")
	Math.abs(producao["Poço_2"] - 0.710864316655835) < EPSILON ?
		console.info(" ✔︎ obterProducaoPocos, Poço_2" + dataProcurada + " 7.98903561473896") :
		console.error(" ✖︎  obterProducaoPocos, Poço_2 " + dataProcurada + " 7.98903561473896")	

    dataProcurada = '1/1/2025'
    producao = Producao.obterProducaoPocos("1/1/2025");
	producaoKeys = Object.keys(producao);
	producaoKeys.length === 1 ?
		console.info(" ✔︎ obterProducaoPocos, " + dataProcurada + " length === 1") :
		console.error(" ✖︎  obterProducaoPocos, " + dataProcurada + " length === 1");
  producaoKeys.indexOf("Poço_1") !== -1 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, Poço_1 " + dataProcurada + " presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_1 " + dataProcurada + " resente");
  producaoKeys.indexOf("Poço_2") === -1 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, Poço_2 " + dataProcurada + " nao presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_2 " + dataProcurada + " nao presente");
	Math.abs(producao["Poço_1"] - 19.6178864851321) < EPSILON ?
		console.info(" ✔︎ obterProducaoPocos, Poço_1 " + dataProcurada + "  21.9534838229411") :
		console.error(" ✖︎  obterProducaoPocos, Poço_1 " + dataProcurada + " 21.9534838229411")	
}
const obterProducaoPocoTeste = () => {
  let pocoProducao = Producao.obterProducaoPoco("Poço_1", "9/6/2025");
  Math.abs(pocoProducao[PRODUCAO_QTD] - 15.97807122947792) < EPSILON ?
   	console.info(" ✔︎ obterProducaoPoco, Poço_1 9/6/2025  15.97807122947792") :
	console.error(" ✖︎  obterProducaoPoco, Poço_1 9/6/2025  15.97807122947792")
}
const obterProducaoPocosTeste = () => {
  let pocos = Producao.obterProducaoPocosNomes();
  pocos.length === 2 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, length === 2") :
		console.error(" ✖︎  obterProducaoPocosTeste, length === 2")
  
  pocos.indexOf("Poço_1") !== -1 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, Poço_1 presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_1 presente");

  pocos.indexOf("Poço_3") === -1 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, Poço_3 not presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_3 not presente");
}
const sorAtivosMaisAntigoTeste = () => {
	let ativosGama = obterAtivosGamaVals();
	ativosGama = [...addicioneOrdermAoCronograma(ativosGama)];

	let expectedArray = JSON.stringify(ativosGama);
	let resultArray = JSON.stringify(sortAtivosMaisAntigo(ativosGama));
	expectedArray.localeCompare(resultArray) === 0 ? 
		console.info(" ✔︎ sorAativosMaisAntigoTeste") :
		console.error(" ✖︎  sorAativosMaisAntigoTeste")

	ativosGamaReversed = [...ativosGama].reverse();
	resultArray = JSON.stringify(sortAtivosMaisAntigo(ativosGama));
	expectedArray.localeCompare(resultArray) === 0 ? 
		console.info(" ✔︎ sorAativosMaisAntigoTeste") :
		console.error(" ✖︎  sorAativosMaisAntigoTeste")
}

const cronogramaModelarProsseguirTeste = () => {
  cronogramaModelarProsseguir("Planejar");
}
const gamaPublicadosTemChaveDataPeriodoTeste = () => {
  let valido = gamaPublicadosTemChaveDataPeriodo('02/08/2025Diurno')
	!valido ? 
		console.info(" ✔︎ GamaPublicadosTemChaveDataPeriodoTeste, 02/08/2025Diurno") :
		console.error(" ✖︎  GamaPublicadosTemChaveDataPeriodoTeste, 02/08/2025Diurno")
}

const numeroParaLetraTeste = () => {
  let letra = numeroParaLetra(PLANEJAR_ACAO + 1)
  let valido = letra.localeCompare('A') === 0 ? true : false;
	valido ? 
		console.info(" ✔︎ numeroParaLetraTeste, A") :
		console.error(" ✖︎  numeroParaLetraTeste, A")
}

const getA1C1Teste = () => {
  let nomeGama = obterA1C1(PLANEJAR_PLANILHA, 'C', 2, 'C', 10)
  let valido = nomeGama.localeCompare('Planejar!C2:C10') === 0 ? true : false;
	valido ? 
		console.info(" ✔︎ getA1C1Teste, colI = 3, rowI = 2, colF = 3, rowI = 10") :
		console.error(" ✖︎  getA1C1Teste, colI = 3, rowI = 2, colF = 3, rowI = 10")

}

const vLookupPersonalizadoTeste = () => {
  let periodVals = obterPeriodosGamaVals();
  let procurado = vLookupPersonalizado("Diurno", periodVals, PERIODOS_NOME, PERIODOS_ORDEM) 
  valido = procurado === 1 ? true : false;

	valido ? 
		console.info(" ✔︎ vLookupPersonalizado, chave Diurno") :
		console.error(" ✖︎  vLookupPersonalizado")

  procurado = vLookupPersonalizado(2, periodVals, PERIODOS_ORDEM, PERIODOS_NOME) 
  valido = procurado === "Noturno" ? true : false;

	valido ? 
		console.info(" ✔︎ vLookupPersonalizado, chave 2") :
		console.error(" ✖︎  vLookupPersonalizado")
}

function obterProximoCronogramaTeste(testData) {

	let cronogramaPublicadoMaisRecente = testData.CRONOGRAMA_TESTE
	let periodosMap = testData.PERIODOS_TESTE
	let cronogramaCalculado = [...obterProximoCronograma(cronogramaPublicadoMaisRecente, periodosMap)]
	let dataCalculada = cronogramaCalculado[0];
	let turnoCalculado = cronogramaCalculado[1];

	
	let valido = true;
	if (dataCalculada < testData.DATA_PREVISTA || dataCalculada > testData.DATA_PREVISTA ) {
		valido = false;
		console.info(" Data proxima invalida")
	}
	if (turnoCalculado != testData.TURNO_PREVISTO) {
		valido = false;
		console.error(" Turno proximo invalido")
	}

	// valido ? 
	// 	console.info(" ✔︎ obterProximoCronograma") :
	// 	console.error(" ✖︎  obterProximoCronograma")

	return valido;
}

function obterProximoCronogramaTeste_1 () {
	console.info(" Executing obterProximoCronogramaTeste_1")

	let dataTeste = new Date('8/1/2025');
	let periodosTeste = new Map();
	periodosTeste.set('Diurno',  {'ID': 1, 'Hora': '06:00:00'});
	periodosTeste.set('Noturno', {'ID': 2, 'Hora': '18:00:00'});

	let testData  = {
		CRONOGRAMA_TESTE: [dataTeste, 'Noturno'],
		PERIODOS_TESTE: periodosTeste,
		DATA_PREVISTA: calcularDiaSeguinte(dataTeste),
		TURNO_PREVISTO: 'Diurno'
	}
	valido = obterProximoCronogramaTeste(testData)

	valido ? 
		console.info(" ✔︎ obterProximoCronogramaTeste1") :
		console.error(" ✖︎  obterProximoCronogramaTeste1")
	
	return valido;
}


function obterProximoCronogramaTeste_2 () {
	console.info(" Executing obterProximoCronogramaTeste_2")

	let dataTeste = new Date('8/1/2025');
	let periodosTeste = new Map();
	periodosTeste.set('Diurno',  {'ID': 1, 'Hora': '06:00:00'});
	periodosTeste.set('Noturno', {'ID': 2, 'Hora': '18:00:00'});

	let testData  = {
		CRONOGRAMA_TESTE: [dataTeste, 'Diurno'],
		PERIODOS_TESTE: periodosTeste,
		DATA_PREVISTA: dataTeste,
		TURNO_PREVISTO: 'Noturno'
	}
	valido = obterProximoCronogramaTeste(testData)

	valido ? 
		console.info(" ✔︎ obterProximoCronogramaTeste1") :
		console.error(" ✖︎  obterProximoCronogramaTeste1")
	
	return valido;
}


function obterProximoCronogramaTeste_Todos () {
	console.info(" Executing obterProximoCronogramaTeste_Todos")

	let valido = obterProximoCronogramaTeste_1();
	valido &= obterProximoCronogramaTeste_2();

	valido ? 
		console.info(" ✔︎ obterProximoCronogramaTeste_Todos") :
		console.error(" ✖︎  obterProximoCronogramaTeste_Todos")
}