const ConfigurarValidacaoDadosColumnaTest = () => {

	// Data validations
	let planilhaAlvo = SpreadsheetApp.getActiveSpreadsheet();
	let planilhaFonteNome = "REFERENCIA";
	let planilhaFonteId = CararaLibrary.GetSpreadsheetId(planilhaAlvo, planilhaFonteNome);

	// Nome
   CararaLibrary.ConfigurarValidacaoDadosColumna(
		planilhaAlvo,    // Obter planilhaAlvo
	    "Dados",         // abaAlvoNome
		2,               // primeiraLinha, da abaAlvo
		ESTADIAS_METODO, // columnaNumero, da abaAlvo
		planilhaFonteId, // planilhaFonteId
		"Metodo"         // gamaFonteNome
	)
}

const GetSpreadsheetIdTest = () => {
	const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
	const ESTADIA_SPREADSHEET_ID = CararaLibrary.GetSpreadsheetId(activeSheet, "ESTADIA");
}

const estadiaAdicionarColaboradorAdicioneTest = () => {
	let selectedName = 'Melindroso - Cláudio de Souza Oliveira'
	estadiaAdicionarColaboradorAdicione(selectedName);
}
const  estadiaAdicionarColaboradorTest = () => {
  const names = obterPessoasNomes();
  showNamePickerDialog(names, function(selectedName) {
	SpreadsheetApp.getUi().alert("You selected: " + selectedName);
  });
}