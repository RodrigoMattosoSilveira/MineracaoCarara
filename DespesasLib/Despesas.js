// *** Identificação da folhas das Despesas
// 
ID 		              = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4";
FECHAR_SHEET_NAME     = "Fechar";
DADOS_RANGE_NAME      = "FecharDados";
ASSOCIADO_RANGE_NAME  = "FecharAssociado";
COMENTARIO_RANGE_NAME = "FecharComentario";
DATA_RANGE_NAME       = "FecharData";
ESTADIA_RANGE_NAM     = "FecharEstadia";
SEMAFORO_RANGE_NAME   = "FecharSemaforo";

function getSpreadSheet() {
  return SpreadsheetApp.openById(CC_SHEET_ID);
}
function getSheet(sheetName) {
	let spreadSheet = getSpreadSheet();
	return spreadSheet.getSheetByName(sheetName);
}
function getSpreadSheetRange(rangeName) {
	let spreadSheet = getSpreadSheet();
	return spreadSheet.getRangeByName(rangeName);
}
function getSpreadSheetRangeVals(rangeName) {
	let spreadSheet = getSpreadSheet();
	return spreadSheet.getRangeByName(rangeName).getValues();
}