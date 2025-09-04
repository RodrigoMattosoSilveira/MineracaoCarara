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

function cronogramaModelarProsseguirTeste() {
  cronogramaModelarProsseguir("Planejar");
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