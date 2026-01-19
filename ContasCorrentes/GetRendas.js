// *** Identificação da folha de constas correntes
// 
const contasCorrentesID 		 = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesSpreadSheet = SpreadsheetApp.openById(contasCorrentesID);
const ccColaboradorRange	     = contasCorrentesSpreadSheet.getRangeByName("ContasCorrentesNome");
const ccEstadiaRange		     = contasCorrentesSpreadSheet.getRangeByName("ContasCorrentesEstadia");

const ContasCorrentesTab = contasCorrentesSpreadSheet.getSheetByName("ContasCorrentes");
const CreditoRealRange	 = ContasCorrentesTab.getRange("CreditoReal");
const CreditoOuroRange	 = ContasCorrentesTab.getRange("CreditoOuro");
const DebitoRealRange	 = ContasCorrentesTab.getRange("DebitoReal");
const DebitoOuroRange	 = ContasCorrentesTab.getRange("DebitoOuro");
const FuturoRealRange	 = ContasCorrentesTab.getRange("AGanharReal");
const FuturoOuroRange	 = ContasCorrentesTab.getRange("AGanharOuro");

function getRendas() {
	colaboradorNome   = ccColaboradorRange.getValue();
  	colaboradoEstadia = ccEstadiaRange.getValue();
	let rendas = CararaLibrary.calcularRendas(colaboradorNome, CararaLibrary.dateToString(colaboradoEstadia));
	if (rendas != null) {
		CreditoOuroRange.setValue(rendas.auferidas.Ouro.credito);
		CreditoRealRange.setValue(rendas.auferidas.Real.credito);
		DebitoOuroRange.setValue(rendas.auferidas.Ouro.debito);
		DebitoRealRange.setValue(rendas.auferidas.Real.debito);
		FuturoOuroRange.setValue(rendas.futuras.Ouro);
		FuturoRealRange.setValue(rendas.futuras.Real);
  	}
}	