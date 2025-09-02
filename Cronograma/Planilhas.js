const GOOGLE_SHEET_ID = "1OCwl3tVukD6nhGYqGvcVrGP_NjGFLJ7NYL-5vkdZTOg";
const obterGoogleSheet = () =>  SpreadsheetApp.openById(GOOGLE_SHEET_ID);

const PUBLICADOS_PLANILHA     = "Publicados";
const PUBLICADOS_GAMA         = "Publicados";
const PUBLICADOS_DATA_COL     = 0;
const PUBLICADOS_NOME_COL     = 1;
const PUBLICADOS_ORDEM_COL    = 2;
const obterPlanilhaPublicados = () =>  	obterGoogleSheet().getSheetByName(PUBLICADOS_PLANILHA);
const obterPublicadosGama     = () =>	obterGoogleSheet().getRangeByName(PUBLICADOS_GAMA)
											.filter( elemento => elemento[PUBLICADOS_DATA_COL] !== '') 
											.sort([
												// Column numbers adjusted for A1C1 notation
												{column: PUBLICADOS_DATA_COL  + 1, ascending: false}, 
												{column: PUBLICADOS_ORDEM_COL + 1, ascending: true}
	                                 		 ]);

function obterPublicadosGamaVals() { return obterPublicadosGama().getValues();}
const ESTADIAS_PLANILHA = "Estadias";
const ESTADIAS_GAMA = "Estadias";
const ESTADIAS_NOME = 0;
const ESTADIAS_INICIO = 1;
const ESTADIAS_METODO = 2;
const ESTADIAS_AREA = 3;
const ESTADIAS_LOCAL = 4;
const ESTADIAS_TAREFA = 5;
const ESTADIAS_REMUNERACAO = 6;
const ESTADIAS_COMENTARIOS = 7;
const obterEstadiasPlanilha = () => obterGoogleSheet().getSheetByName(ESTADIAS_PLANILHA);
const obterEstadiasGama = () => obterGoogleSheet().getRangeByName(ESTADIAS_GAMA);
const obterEstadiasGamaVals = () => {
	let  gama = obterEstadiasGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[ESTADIAS_NOME] !== '') : [];
}

const MODELOS_PLANILHA = "MODELOS";
const MODELOS_GAMA = "MODELOS";
const MODELOS_PERIODO = 0;
const MODELOS_NOME = 1;
const MODELOS_INICIO = 2;
const MODELOS_METODO = 3;
const MODELOS_AREA = 4;
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

const PLANEJAR_PLANILHA = "PLANEJAR";
const PLANEJAR_GAMA = "PLANEJAR";
const PLANEJAR_ACAO = 0;
const PLANEJAR_DATA = 1;
const PLANEJAR_PERIODO = 2;
const PLANEJAR_NOME = 3;
const PLANEJAR_INICIO = 4;
const PLANEJAR_METODO = 5;
const PLANEJAR_AREA = 6;
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

const ATIVOS_PLANILHA = "ATIVOS";
const ATIVOS_GAMA = "ATIVOS";
const ATIVOS_ESTADO = 0;
const ATIVOS_DATA = 1;
const ATIVOS_PERIODO = 2;
const ATIVOS_NOME = 3;
const ATIVOS_INICIO = 4;
const ATIVOS_METODO = 5;
const ATIVOS_AREA = 6;
const ATIVOS_LOCAL = 7;
const ATIVOS_TAREFA = 8;
const ATIVOS_REMUNERACAO = 9;
const ATIVOS_COMENTARIOS = 10;
const obterAtivosPlanilha = () => obterGoogleSheet().getSheetByName(ATIVOS_PLANILHA);
const obterAtivosGama = () => obterGoogleSheet().getRangeByName(ATIVOS_GAMA);
const obterAtivosGamaVals = () => {
  let  gama = obterAtivosGama();
  return  (gama !== null) ? gama.getValues().filter( elemento => elemento[ATIVOS_NOME] !== '') : [];
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

// ****************************************************************************
// limpaPlanilhaGama - Limpe o intervalo com o mesmo noje da planilha nomeada
// 
// Input
// 		planilha <string> - O nome da planilha
// 		gama <string> - O nome da gama
// Output
// 		TRUE, se o sistema executou a tarefa, FALSE caso contrario;
// ****************************************************************************
//
function limpaPlanilhaGama(planilha, gama) {
	let valid = true;
	let planilhaGama = null;
	switch (planilha) {
		case MODELOS_PLANILHA:
			break;
		case PLANEJAR_PLANILHA:
			switch (gama) {
				case PLANEJAR_GAMA:
					planilhaGama = obterPlanejarGama();
					break;
				default:
					valid = false;
					break
			}
			break;
		case ATIVOS_PLANILHA:
			switch (gama) {
				case PLANEJAR_GAMA:
					ativosGama = obterAtivosGama();
					break;
				default:
					valid = false;
					break
			}
			break;

		default:
			valid = false;
			break;	
	}

	if (planilhaGama !== null) {
		planilhaGama.clear({contentsOnly: true});
	} 

	return valid;
}

// ****************************************************************************
// copiarGamaValsParaPlanilha - Limpe o intervalo com o mesmo noje da planilha 
// nomeada
// 
// Input
// 		planilhaDestino <string> - O nome da planilha
// 		gamaDestino <string> - O nome da gama
// 		gamaVals <Array of Arrays> - Os valores a serem copiados
// Output
// 		TRUE, se o sistema executou a tarefa, FALSE caso contrario;
// ****************************************************************************
//
const copiarGamaValsParaPlanilhaVelho = (planilhaDestino, gamaDestino, gamaVals) => {
	// Copiar os registros formatados para a planilha Planejar
	let valid = true;
	let planilha;
	let lastRow;
	switch (planilhaDestino) {
		case MODELOS_PLANILHA:
			break;
		case PLANEJAR_PLANILHA:
			switch (gamaDestino) {
				case PLANEJAR_GAMA:
					planilha = obterPlanejarPlanilha();
					lastRow = planilha.getLastRow();
					break;
				default:
					valid = false;
					break
			}
			break;
		case ATIVOS_PLANILHA:
			switch (gamaDestino) {
				case ATIVOS_GAMA:
					planilha = obterAtivosPlanilha();
					lastRow = planilha.getLastRow();
					break;
				default:
					valid = false;
					break
			}
			break;

		default:
			valid = false;
			break;	
	}
	if (valid) {planilha.getRange(lastRow + 1, 1, gamaVals.length, gamaVals[0].length).setValues(gamaVals)}
	return valid;
}

const copiarGamaValsParaPlanilha = (planilhaDestino, gamaVals) => {
	if (planilhaDestino === null) {
		console.error("copiarGamaValsParaPlanilha - Invalida planilhaDestino");
		return false;
	}
	if (gamaVals === null) {
		console.error("copiarGamaValsParaPlanilha - Invalida gamaVals");
	}

	lastRow = planilhaDestino.getLastRow();
	planilhaDestino.getRange(lastRow + 1, 1, gamaVals.length, gamaVals[0].length).setValues(gamaVals)
	return true;
}