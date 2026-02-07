const GOOGLE_SHEET_ID = "1OCwl3tVukD6nhGYqGvcVrGP_NjGFLJ7NYL-5vkdZTOg";
const obterGoogleSheet = () =>  SpreadsheetApp.openById(GOOGLE_SHEET_ID);

const PUBLICADOS_PLANILHA     = "Publicados";
const PUBLICADOS_GAMA         = "Publicados";
const PUBLICADOS_DATA_COL     = 0;
const PUBLICADOS_NOME_COL     = 1;
const PUBLICADOS_ORDEM_COL    = 2;
const obterPublicadosPlanilha = ()  =>  obterGoogleSheet().getSheetByName(PUBLICADOS_PLANILHA);
const obterPublicadosGama     = ()  =>	obterGoogleSheet().getRangeByName(PUBLICADOS_GAMA)
											.sort([
												// Column numbers adjusted for A1C1 notation
												{column: PUBLICADOS_DATA_COL  + 1, ascending: false}, 
												{column: PUBLICADOS_ORDEM_COL + 1, ascending: false}
	                                 		 ]);
const obterPublicadosGamaVals = ()  =>  obterPublicadosGama().getValues()
											.filter( (elemento) => elemento[PUBLICADOS_DATA_COL] !== '' &&
											          elemento[PUBLICADOS_DATA_COL] !== 'Data');
const obterPublicadosDataPeriodoKeys = () => {
	const keys = [];
	let vals = obterPublicadosGamaVals();
	vals.forEach(elemento => {
		let key = '' + elemento[PUBLICADOS_DATA_COL] + elemento[PUBLICADOS_NOME_COL];
		if (keys.indexOf(key) == -1) {
			keys.push(key); 
		}
	});
	return keys;
}
const gamaPublicadosTemChaveDataPeriodo = (chave) => obterPublicadosDataPeriodoKeys().indexOf(chave) !== -1 ? true : false;

const ESTADIAS_PLANILHA = "Estadias";
const ESTADIAS_GAMA = "Estadias";
const ESTADIAS_NOME = 0;
const ESTADIAS_INICIO = 1;
const ESTADIAS_METODO = 2;
const ESTADIAS_SETOR = 3;
const ESTADIAS_LOCAL = 4;
const ESTADIAS_TAREFA = 5;
const ESTADIAS_REMUNERACAO = 6;
const ESTADIAS_COMENTARIOS = 7;
const obterEstadiasPlanilha = () => obterGoogleSheet().getSheetByName(ESTADIAS_PLANILHA);
const obterEstadiasGama = () => obterGoogleSheet().getRangeByName(ESTADIAS_GAMA);
const obterEstadiasGamaVals = () => {
	let  gama = obterEstadiasGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[ESTADIAS_NOME] !== '' && elemento[ESTADIAS_NOME] !== 'Nome') : [];
}
let estadiaGamaVals = obterEstadiasGamaVals().sort((a, b) => {
	return a[ESTADIAS_NOME].localeCompare(b[ESTADIAS_NOME])
});;
const obterEstadiaGamaRegistroNome = (nome) => {
	return estadiaGamaVals.find((element) => element[ESTADIAS_NOME] == nome)
}

const MODELOS_PLANILHA = "Modelos";
const MODELOS_GAMA = "Modelos";
const MODELOS_PERIODO = 0;
const MODELOS_NOME = 1;
const MODELOS_INICIO = 2;
const MODELOS_METODO = 3;
const MODELOS_SETOR = 4;
const MODELOS_LOCAL = 5;
const MODELOS_TAREFA = 6;
const MODELOS_REMUNERACAO =7;
const MODELOS_COMENTARIOS = 8;
const obterModelosPlanilha = () => obterGoogleSheet().getSheetByName(MODELOS_PLANILHA);
const obterModelosGama = () => obterGoogleSheet().getRangeByName(MODELOS_GAMA);
const obterModelosGamaVals = () => {
	let  gama = obterModelosGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[MODELOS_NOME] !== '') : [];
}
let modeloGamaVals = obterModelosGamaVals().sort((a, b) => {
	return a[MODELOS_NOME].localeCompare(b[MODELOS_NOME])
});;
const obterModelosNomeInicioKeys = () => {
	const keys = [];
	modeloGamaVals.forEach(elemento => {
		let key = '' + elemento[MODELOS_NOME] +  CararaLibrary.dateToString(elemento[MODELOS_INICIO]);
		if (keys.indexOf(key) == -1) {
			keys.push(key); 
		}
	});
	return keys;
}
const obterModelosGamaRegistroNome = (nome) => {
	return obterModelosGamaVals().find((element) => element[MODELOS_NOME] == nome)
}

const PLANEJAR_PLANILHA = "Planejar";
const PLANEJAR_GAMA = "Planejar";
const PLANEJAR_ACAO_GAMA = "PlanejarAcao"
const PLANEJAR_ACOES_VALIDAS = "AcoesValidas"
const PLANEJAR_METODOS_VALIDOS = "MetodosValidos"
const PLANEJAR_SETORES_VALIDOS = "SetoresValidos"
const PLANEJAR_LOCAIS_VALIDOS = "LocaisValidos"
const PLANEJAR_TAREFAS_VALIDAS = "TarefasValidas"
const PLANEJAR_ACAO = 0;
const PLANEJAR_DATA = 1;
const PLANEJAR_PERIODO = 2;
const PLANEJAR_NOME = 3;
const PLANEJAR_INICIO = 4;
const PLANEJAR_METODO = 5;
const PLANEJAR_SETOR = 6;
const PLANEJAR_LOCAL = 7;
const PLANEJAR_TAREFA = 8;
const PLANEJAR_REMUNERACAO = 9;
const PLANEJAR_COMENTARIOS = 10;
const obterPlanejarPlanilha = () => obterGoogleSheet().getSheetByName(PLANEJAR_PLANILHA);
const obterPlanejarGama = () => obterGoogleSheet().getRangeByName(PLANEJAR_GAMA);
const obterPlanejarGamaVals = () => {
	let  gama = obterPlanejarGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[PLANEJAR_NOME] !== '') : [];
}
const obterPlanejarDataPeriodoKeys = () => {
	const keys = [];
	let vals = obterPlanejarGamaVals();
	vals.forEach(elemento => {
		let key = '' + elemento[PLANEJAR_DATA] + elemento[PLANEJAR_PERIODO];
		if (keys.indexOf(key) == -1) {
			keys.push(key); 
		}
	});
	return keys;
}
const obterPlanejarNomeInicioKeys = () => {
	const keys = [];
	let vals = obterPlanejarGamaVals();
	vals.forEach(elemento => {
		let key = '' + elemento[PLANEJAR_NOME] + elemento[PLANEJAR_INICIO];
		if (keys.indexOf(key) == -1) {
			keys.push(key); 
		}
	});
	return keys;
}
const obterPlanejarIncluir = () => {
	let vals = obterPlanejarGamaVals();
	return vals.filter( elemento => elemento[PLANEJAR_ACAO] === 'Incluir' );
}

const ATIVOS_PLANILHA = "Ativos";
const ATIVOS_GAMA = "Ativos";
const ATIVOS_ESTADO = 0;
const ATIVOS_DATA = 1;
const ATIVOS_PERIODO = 2;
const ATIVOS_NOME = 3;
const ATIVOS_INICIO = 4;
const ATIVOS_METODO = 5;
const ATIVOS_SETOR = 6;
const ATIVOS_LOCAL = 7;
const ATIVOS_TAREFA = 8;
const ATIVOS_REMUNERACAO = 9;
const ATIVOS_COMENTARIOS = 10;
const ATIVOS_ORDEM = 11;
const ATIVOS_METODOS_VALIDOS = "MetodosValidos"
const ATIVOS_SETORES_VALIDOS = "SetoresValidos"
const ATIVOS_LOCAIS_VALIDOS = "LocaisValidos"
const ATIVOS_TAREFAS_VALIDAS = "TarefasValidas"
const obterAtivosPlanilha = () => obterGoogleSheet().getSheetByName(ATIVOS_PLANILHA);
const obterAtivosGama = () => obterGoogleSheet().getRangeByName(ATIVOS_GAMA);
function obterAtivosGamaVals () {
  let  gama = obterAtivosGama();
  return  (gama !== null) ? gama.getValues().filter( elemento => elemento[ATIVOS_NOME] !== '' && elemento[ATIVOS_NOME] !== 'Nome') : [];
}
const obterAtivosKeys = () => {
	const keys = [];
	let vals = obterAtivosGamaVals();
	vals.forEach(elemento => {
		let key = '' + elemento[ATIVOS_DATA] + elemento[ATIVOS_PERIODO];
		if (keys.indexOf(key) == -1) {
			keys.push(key); 
		}
	});
	return keys;
}

const PERIODOS_PLANILHA = "Periodos";
const PERIODOS_GAMA = "Periodos";
const PERIODOS_NOME = 0;
const PERIODOS_ORDEM = 1;
const PERIODOS_INICIO = 2;
const obterPeriodosPlanilha = () => obterGoogleSheet().getSheetByName(PERIODOS_PLANILHA);
const obterPeriodosGama = () => obterGoogleSheet().getRangeByName(PERIODOS_GAMA);
const obterPeriodosGamaVals = () => {
  let  gama = obterPeriodosGama();
  return  (gama !== null) ? gama.getValues()
  								.filter( elemento => elemento[PERIODOS_NOME] !== '' && elemento[PERIODOS_NOME] !== 'Nome') : [];
}

const CONTABILIZAR_PLANILHA     = "Contabilizar";
const CONTABILIZAR_GAMA         = "Contabilizar";
const CONTABILIZAR_ESTADO       = 0;
const CONTABILIZAR_DATA         = 1;
const CONTABILIZAR_PERIODO      = 2;
const CONTABILIZAR_NOME         = 3;
const CONTABILIZAR_INICIO       = 4;
const CONTABILIZAR_METODO       = 5;
const CONTABILIZAR_SETOR        = 6;
const CONTABILIZAR_LOCAL        = 7;
const CONTABILIZAR_TAREFA       = 8;
const CONTABILIZAR_REMUNERACAO  = 9;
const CONTABILIZAR_COMENTARIOS  = 10;
const CONTABILIZAR_ORDEM        = 11;
const obterContabilizarPlanilha = () => obterGoogleSheet().getSheetByName(CONTABILIZAR_PLANILHA);
const obterContabilizarGama     = () => obterGoogleSheet().getRangeByName(CONTABILIZAR_GAMA);
function obterContabilizarGamaVals () {
  let  gama = obterContabilizarGama();
  return  (gama !== null) ? gama.getValues().filter( elemento => elemento[CONTABILIZAR_NOME] !== '' && elemento[CONTABILIZAR_NOME] !== 'Nome') : [];
}

const PDF_PLANILHA = "PDF";
const PDF_DATA= "PDFData";
const PDF_PERIODO= "PDFPeriodo";
const PDF_GAMA = "PDFInformar";
const PDF_EXPORTAR = "PDFExportar";
const PDF_HEADER = "PDFHeader";
const PDF_NOME = 0;
const PDF_SETOR = 1;
const PDF_LOCAL = 2;
const PDF_TAREFA = 3;
const obterPdfPlanilha = () 	=> obterGoogleSheet().getSheetByName(PDF_PLANILHA);
const obterPdfInformar = () 	=> obterGoogleSheet().getRangeByName(PDF_GAMA);
const obterPdfInformarVals = () => obterPdfInformar() !== null ? obterPdfInformar().getValues() : [];
const obterPdfData = () 		=> obterGoogleSheet().getRangeByName(PDF_DATA);
const obterPdfDataVals = ()		=> obterPdfData() !== null ? obterPdfInformar.getValues() : [];
const obterPdfPeriodo = () 		=> obterGoogleSheet().getRangeByName(PDF_PERIODO);
const obterPdfPeriodoVals = () 	=> obterPdfPeriodo() !== null ? obterPdfPeriodo.getValues() : [];
const obterPdfExportar = () 	=> obterGoogleSheet().getRangeByName(PDF_EXPORTAR);
const obterPdfHeader = () 	    => obterGoogleSheet().getRangeByName(PDF_HEADER);

const PRODUCAO_PLANILHA = "Modelos";
const PRODUCAO_DATA = 0;
const PRODUCAO_QTD = 1;
const PRODUCAO_MEDIA = 2;
const obterProducaoPlanilha = () => obterGoogleSheet().getSheetByName(PRODUCAO_PLANILHA);
const obterProducaoGama = (gamaName) => obterGoogleSheet().getRangeByName(gamaName);
const obterProducaoGamaVals = gamaName => {
	let  gama = obterProducaoGama(gamaName);
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[PRODUCAO_DATA] !== '') : [];
}

const contasCorrentesId = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesRange = "Dados";
const contasCorrentesDataCol              = 0;
const contasCorrentesNomeCol              = 1;
const contasCorrentesEstadiaCol           = 2;
const contasCorrentesMetodoCol            = 3;  // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos
const contasCorrentesMoedaCol             = 4   // Real, Ouro
const contasCorrentesCreditDebitCol       = 5;  // Credito, Debito
const contasCorrentesItemCol              = 6;
const contasCorrentesPrecoUnidadeRealCol  = 7;  // Real
const contasCorrentesPrecoUnidadeOuroCol  = 8;  // Gramas de ouro 
const contasCorrentesItemQtdCol           = 9;
const contasCorrentesTotalRealCol         = 10; // Real
const contasCorrentesTotalOuroCol         = 11; // Gramas de ouro
const contasCorrentesComentariosCol       = 12;
const obterContasCorrentesPlanilha = () => SpreadsheetApp.openById(contasCorrentesId).getSheetByName(contasCorrentesRange);
const obterContasCorrentesGama = () => obterContasCorrentesPlanilha().getRangeByName(contasCorrentesRange);
const obterContasCorrentesGamaVals = () => {
  let  gama = obterContasCorrentesGama();
  return  (gama !== null) ? gama.getValues().filter( elemento => elemento[contasCorrentesDataCol] !== '' && elemento[contasCorrentesDataCol] !== 'Data') : [];
}

// ****************************************************************************
// copiarGamaValsParaPlanilha - Limpe o intervalo com o mesmo noje da planilha 
// nomeada
// 
// Input
// 		planilhaDestino <Sheet> - A planilha 
// 		gamaVals <Array of Arrays> - Os valores a serem copiados
// Output
// 		TRUE, se o sistema executou a tarefa, FALSE caso contrario;
// ****************************************************************************
//
const copiarGamaValsParaPlanilha = (planilhaDestino, gamaVals) => {
	if (planilhaDestino === null) {
		console.error("copiarGamaValsParaPlanilha - Invalida planilhaDestino");
		return false;
	}
	if (gamaVals === null) {
		console.error("copiarGamaValsParaPlanilha - Invalida gamaVals");
	}

	let lastRow = planilhaDestino.getLastRow();
	planilhaDestino.getRange(lastRow + 1, 1, gamaVals.length, gamaVals[0].length).setValues(gamaVals);
	return true;
}

// ****************************************************************************
// customVLOOKUP - Procure um valor em uma matriz
// 
// Input
// 		ChavePesquisa <string> - o valor a ser procurado nas linhas da matrix
// 
// 		matrizVals <Array of Arrays> - Os valores da matriz em questao
// 
// 		colunaPesquisa <int> - A coluna onde procurar a chavePesquisa
// // 
// 		colunaResultado <int> - A coluna na linha onde encontramos a 
//  	ChavePesquisa e onde recuperar valor
// Output
// 		O valor procurado se encontrado, NULL caso contrario;
// ****************************************************************************
//
const vLookupPersonalizado = (chavePesquisa, matrizVals, colunaPesquisa, colunaResultado) => {
  for (let i = 0; i < matrizVals.length; i++) {
    if (matrizVals[i][colunaPesquisa] === chavePesquisa) {
      return matrizVals[i][colunaResultado]; // Adjust for zero-based index
    }
  }
  return null;
}

// ****************************************************************************
// setDataValidation - Estabelecer validacao de dados
// 
// Input
// 		planilha <Sheet> - a planilha com a columna a ser validada
// 
// 		rangeName <String> - O nome da coluna a ser validade
// 
// 		validChoicesRange <string> - O nome da gama com os valores
// 
// Output
// 		Validacao estabelecida
// ****************************************************************************
//
function estabelederValidacaoDados(sheet, columnNumber, validChoicesRangeName) {
	let lastRow = sheet.getLastRow();
	let column = CararaLibrary.numeroParaLetra(columnNumber);
	let a1C1Gama = obterA1C1(sheet.getName(), column, 2, column, lastRow)

	var range = sheet.getRange(a1C1Gama); // Specify the range for validation

	var rule = SpreadsheetApp.newDataValidation()
	.requireValueInRange(sheet.getRange(validChoicesRangeName), true) // Reference range for valid values
	.setAllowInvalid(false) // Prevent invalid entries
	.build();

	range.setDataValidation(rule); // Apply the validation rule
}
// ****************************************************************************
// getA1C1 - Converter linhas e colunma ao nome de uma gama
// 
// Input
// 		planilha (string), O nome da planilha
//      colI (int), a columa inicial
//      rowI (int), a linha inicial
//      colF (int), a columa final
//      rowF (int), a linha final
// Output
// 		nomeGama (String), o nome da gama
// ****************************************************************************
//
const obterA1C1 = (planilha, colI, linI, colF, linF) => planilha + '!' + colI + linI + ':' +  colF + linF
