/**
 * Cantina
 */
const CANTINA_SS_ID    = CararaLibrary.GetSpreadsheetId(SpreadsheetApp.getActive(), "CANTINA_PRECO");

const CANTINA_TABALHO_SHEET_NAME     = "Trabalho"

const CANTINA_ITEM = 0;
const CANTINA_REAL = 1;
const CANTINA_OURO = 2;

const CANTINA_TRABALHO_OURO = 7;

let cantinaSS  = SpreadsheetApp.openById(CANTINA_SS_ID);
obterCantinaOuroBrlGramaGama = () => cantinaSS.getRange("OuroBrlGrama");

/**
 * Referencia
 */
const REFERENCIA_SS_ID = CararaLibrary.GetSpreadsheetId(SpreadsheetApp.getActive(), "REFERENCIA");

const REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME = 'OuroBrlGrama'

function obterReferenciaGama(nomeGama) {
  const referenciaSS = SpreadsheetApp.openById(REFERENCIA_SS_ID);
  return referenciaSS.getRangeByName(nomeGama);
}

function obterReferenciaGamaVals(rangeName) {
  const gama = obterReferenciaGama(rangeName);
  const vals = gama.getValues();
  return (gama !== null) ? vals.filter( elemento => elemento[0] !== '' && elemento[0] !== 'Nome') : [];
}
function obterReferenciaGamaVal(rangeName) {
  const gama = obterReferenciaGama(rangeName);
  const val = gama.getValue();
  return val;
}

function obterReferenciaOuroBrlGramaVal () { 
	return obterReferenciaGamaVal(REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME)
};
