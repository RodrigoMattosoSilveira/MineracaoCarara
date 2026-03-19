/**
 * Referencia
 */
// TODO improve, have all of these in one place
const REFERENCIA_GOOGLE_SHEET_ID = CararaLibrary.GetSpreadsheetId(SpreadsheetApp.getActive(), "REFERENCIA");

const REFERENCIA_LOCAIS_GAMA_NOME         = "Local";
const REFERENCIA_PERIODO_GAMA_NOME        = "PeriodosValidos";	

function obterReferenciaGama(nomeGama) {
  const referenciaSS = SpreadsheetApp.openById(REFERENCIA_GOOGLE_SHEET_ID);
  return referenciaSS.getRangeByName(nomeGama);
}

function obterReferenciaGamaVals(rangeName) {
  const gama = obterReferenciaGama(rangeName);
  const vals = gama.getValues();
  return (gama !== null) ? vals.filter( elemento => elemento[0] !== '' && elemento[0] !== 'Nome') : [];
}

function obterReferenciaPocos() {
  let pocos = []
  obterReferenciaGamaVals(REFERENCIA_LOCAIS_GAMA_NOME).forEach( elemento => elemento[0].startsWith('Poço_') ? pocos.push(elemento[0]) : null);
  return  pocos;
}
/**
 * 
 * @returns {Array} periodos
 */
function obterReferenciaPeriodos() {
  let periodos = []
  obterReferenciaGamaVals(REFERENCIA_PERIODO_GAMA_NOME).forEach( elemento => periodos.push(elemento[0]));
  return  periodos;
}