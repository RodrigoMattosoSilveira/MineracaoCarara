
const ContasCorrentesSpreasheetID = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
function GetContasCorrentesSpreadSheet() {
    return SpreadsheetApp.openById(ContasCorrentesSpreasheetID);
}

// *** Layout do formulário Resumo de Contas Correntes ***
// 
const ResumoGuia                  = "Resumo";
const ResumoNomeCol               = 0;    
const ResumoEstadiaCol            = 1;   
const ResumoMetdoCol 			  = 2;
const ResumoSaldoAuferidoRealCol  = 3;
const ResumoSaldoAuferidoOuroCol  = 4;

/* *****************************************************************************
 * Retorna a gama da planilha Resumo
 * @returns (Range) com os valores do intervalo Resumo de Contas Correntes
 * ************************************************************************** */
//
function GetContasCorrentesGetResumoRange() {
	const sheet    = GetContasCorrentesSpreadSheet();
	const resumo   = sheet.getSheetByName(ResumoGuia);

	const startRow = 3; 
	const numRows  = resumo.getLastRow() - 2; // Subtract 1 because we start at row 3
	const startCol = 1;
	const numCols  = resumo.getLastColumn();

	return resumo.getRange(startRow, startCol, numRows, numCols)
}

/* *****************************************************************************
 * Retorna a gama de saldos na planilha Resumo
 * @returns (Range) gama de saldos na planilha Resumo
 * ************************************************************************** */
//
function GetContasCorrentesGetSaldosRange() {
	const sheet    = GetContasCorrentesSpreadSheet();
	const resumo   = sheet.getSheetByName(ResumoGuia);

	const startRow = 3; 
	const numRows  = resumo.getLastRow() - 2; // Subtract 1 because we start at row 3
	const startCol = 4;
	const numCols  = resumo.getLastColumn();

	return resumo.getRange(startRow, startCol, numRows, numCols)
}

function CalcularSaldos() {
	// Limpe a faixa de saldo, pois pode haver registros remanescentes
	let saldosRange = GetContasCorrentesGetSaldosRange();
	saldosRange.clear();

	// Obtenha os valores do resumo corrente
	let resumoRange = GetContasCorrentesGetResumoRange();

	// Addicione os saldos auferidos
	let resumoRangeVals = resumoRange.getValues();
	resumoRangeVals.forEach( (record) => {

		let colaborador = record[ResumoNomeCol];
		let estadia     = CararaLibrary.dateToString(record[ResumoEstadiaCol]);

		let auferidas   = CararaLibrary.calcularRendasAuferidas(colaborador, estadia);

		record[ResumoSaldoAuferidoRealCol] = auferidas.Real.credito - auferidas.Real.debito;
		record[ResumoSaldoAuferidoOuroCol] = auferidas.Ouro.credito - auferidas.Ouro.debito;
	});
	resumoRange.setValues(resumoRangeVals);

	// Formate os saldos negativos em vermelho
	for (let i = 1; i <= resumoRangeVals.length; i++) {
		let cell = resumoRange.getCell(i, ResumoSaldoAuferidoRealCol + 1);
		cell.getValue() < 0 ? cell.setFontColor("#FF0000") : null;
		cell = resumoRange.getCell(i, ResumoSaldoAuferidoOuroCol + 1);
		cell.getValue() < 0 ? cell.setFontColor("#FF0000") : null;
	}
}