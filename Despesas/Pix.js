function pixPrepare() {
	// Feedback
  	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked PixPrepare');
  	switchToTab("Pix");

}

function pixExecute() {
	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked PixExecute');
	switchToTab("Pix");

	if (PixAssociadoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Associado deve ser preenchido.");
		return null;
	}

	// We need to build one record for each item in PixDespesasRange
	var PixData 		= PixDataRange.getValues();
	var PixAssociado	= PixAssociadoRange.getValue();
	var PixEstadia 		= PixEstadiaRange.getValue();
	var PixMoeda 		= PixMoedaRange.getValue();
	var PixDespesas     = PixDespesasRange.getValues();
	var PixDespesasFiltrados = PixDespesas.filter(function(transaction) {
    	return transaction[PixDespesasItemCol ] != "";
  	});
	if (PixDespesasFiltrados.length == 0) {
		var message = "";
		SpreadsheetApp.getUi().alert("Nao ha nehuma Despesa de Pix a ser processada.");
		return null;
	}
	var PixComentario = PixComentarioRange.getValue();	

	var contaCorrenteRegistro = [];
  	var contasCorrentesRangeDados = [];
	PixDespesasFiltrados.forEach(function(transaction) {
		var item 		= transaction[PixDespesasItemCol];
		var real 		= transaction[PixDespesasRealol];
		var ouro 		= transaction[PixDespesasOuroCol];
		var qtd 		= transaction[PixDespesasQTDCol];
		var totalReal 	= transaction[PixDespesasTotalRealCol];
		var totalOuro 	= transaction[PixDespesasTotaOurolCol];
		      
		contaCorrenteRegistro = [];
		contaCorrenteRegistro[contasCorrentesDataCol]        		= PixData;
		contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= PixAssociado
		contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= PixEstadia
		contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Pix';
		contaCorrenteRegistro[contasCorrentesMoedaCol]       		= PixMoeda;
		contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Debito';
		contaCorrenteRegistro[contasCorrentesItemCol]       		= item;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= real;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= ouro;
		contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;	
		contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= totalReal;
		contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= totalOuro;
		contaCorrenteRegistro[contasCorrentesComentariosCol] 		= PixComentario;

		// Add the record to the range
		contasCorrentesRangeDados.push(contaCorrenteRegistro)
	});
	// 
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)

	// Clear form
	PixAssociadoRange.setValue("");
	PixMoedaRange.setValue("Real");
	PixItemsRange.setValue("");
	PixRealRange.setValue("");
	PixQuantidadesRange.setValue("");
	PixComentarioRange.setValue("");

	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('O sistema lancou o PIX do ' + PixAssociado);
}