function folgaPrepare() {
	// Feedback
  	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked FolgaPrepare');
  	switchToTab("Folga");
	
	// Clear all the field 
	FolgaAssociadoRange.setValue("");
	// FolgaDataRange.setValue(""); it is a formula =TODAY()
	// FolgaEstadiaRange.setValue(""); // it is a formula =TODAY()
	FolgaMoedaRange.setValue("Real");
	FolgaItemsRange.setValue("");
	FolgaRealRange.setValue("");
	FolgaQuantidadesRange.setValue("");
	FolgaSubstituidoRange.setValue("");
	FolgaComentarioRange.setValue("");
}

function folgaExecute() {
	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked FolgaExecute');
	switchToTab("Folga");

	if (FolgaAssociadoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Assiciado deve ser preenchido.");
		return null;
	}
	if (FolgaPagementoRange.getValue() != "Porcentagem") {
		SpreadsheetApp.getUi().alert("O Associado precisa ser comissionado.");
		return null;
	}
	if (FolgaSubstituidoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O  substituto do comissionado deve ser preenchido.");
		return null;
	}
		if (FolgaSubstituidoDiariaRange.getValue() == "Porcetagem") {
		SpreadsheetApp.getUi().alert("O  substituto do comissionado nao pode ser commissionado.");
		return null;
	}

	// We need to build one record for each item in FolgaDespesasRange
	var FolgaData 		= FolgaDataRange.getValues();
	var FolgaAssociado	= FolgaAssociadoRange.getValue();
	var FolgaEstadia 		= FolgaEstadiaRange.getValue();
	var FolgaMoeda 		= FolgaMoedaRange.getValue();
	var FolgaDespesas     = FolgaDespesasRange.getValues();
	var FolgaDespesasFiltrados = FolgaDespesas.filter(function(transaction) {
    	return transaction[FolgaDespesasItemCol ] != "";
  	});
	if (FolgaDespesasFiltrados.length == 0) {
		var message = "";
		SpreadsheetApp.getUi().alert("Nao ha nehuma Despesa de Folga a ser processada.");
		return null;
	}
	var FolgaComentario = FolgaComentarioRange.getValue();	

	var contaCorrenteRegistro = [];
  	var contasCorrentesRangeDados = [];
	FolgaDespesasFiltrados.forEach(function(transaction) {
		var item 		= transaction[FolgaDespesasItemCol];
		var real 		= transaction[FolgaDespesasRealol];
		var ouro 		= transaction[FolgaDespesasOuroCol];
		var qtd 		= transaction[FolgaDespesasQTDCol];
		var totalReal 	= transaction[FolgaDespesasTotalRealCol];
		var totalOuro 	= transaction[FolgaDespesasTotaOurolCol];
		      
		contaCorrenteRegistro = [];
		contaCorrenteRegistro[contasCorrentesDataCol]        		= FolgaData;
		contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= FolgaAssociado
		contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= FolgaEstadia
		contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Folga';
		contaCorrenteRegistro[contasCorrentesMoedaCol]       		= FolgaMoeda;
		contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Debito';
		contaCorrenteRegistro[contasCorrentesItemCol]       		= item;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= real;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= ouro;
		contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;	
		contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= totalReal;
		contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= totalOuro;
		contaCorrenteRegistro[contasCorrentesComentariosCol] 		= FolgaComentario;

		// Add the record to the range
		contasCorrentesRangeDados.push(contaCorrenteRegistro)
	});
	// 
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)

	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('O sistema lancou a despesa do pagamento da folga de ' + FolgaAssociado);
}