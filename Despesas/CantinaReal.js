const despesasID = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4";
const despesasCantinaReaisSheet = SpreadsheetApp.openById(despesasID).getSheetByName("CantinaReal");
const cantinaRealNome = despesasCantinaReaisSheet.getRange("CantinaRealAssociado").getValue();
const cantinaRealEstadia = despesasCantinaReaisSheet.getRange("CantinaRealEstadia").getValue();
const cantinaRealData = despesasCantinaReaisSheet.getRange("CantinaRealData").getValue();
const cantinaRealDespesas = despesasCantinaReaisSheet.getRange("CantinaRealDespesas").getValues();
const cantinaRealDespesasItemCol = 0;	
const cantinaRealDespesasUnitarioCol = 1;
const cantinaRealDespesasRealCol = 2;	
const cantinaRealDespesasQTDCol = 3
const cantinaRealDespesasTotalCol = 4;
const cantinaRealDespesasComentariosCol = 5;

function test( ) {
	return 42;
}