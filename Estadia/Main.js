// ****************************************************************************
// Menu - This is a set of functions
// ****************************************************************************
// 
function onOpen() {
  	// Initialize the menu
 	var ui = SpreadsheetApp.getUi();
	ui.createMenu('Estadia')
		.addItem('Adicionar Colaborador', 'estadiaAdicionarColaborador')
	.addToUi();

	// Data validations
// 	let planilhaAlvo = SpreadsheetApp.getActiveSheet();
// 	let planilhaFonteNome = "REFERENCIA";
// 	let planilhaFonteId = CararaLibrary.GetSpreadsheetId(planilhaAlvo, planilhaFonteNome);

// 	// Nome
//    CararaLibrary.ConfigurarValidacaoDadosColumna(
// 		planilhaAlvo,    // Obter planilhaAlvo
// 	    "Dados",         // abaAlvoNome
// 		2,               // primeiraLinha, da abaAlvo
// 		ESTADIAS_METODO, // columnaNumero, da abaAlvo
// 		planilhaFonteId, // planilhaFonteId
// 		"Metodo"         // gamaFonteNome
// 	)
}