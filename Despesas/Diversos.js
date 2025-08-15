function diversosPrepare() {
	// Feedback
  	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked DiversosPrepare');
  	switchToTab("Diversos");
	
	// Clear all the field 
	DiversosAssociadoRange.setValue("");
	// DiversosDataRange.setValue(""); it is a formula =TODAY()
	// DiversosEstadiaRange.setValue(""); // it is a formula =TODAY()
	DiversosMoedaRange.setValue("Real");
	DiversosItemsRange.setValue("");
	DiversosRealRange.setValue("");
	DiversosQuantidadesRange.setValue("");
	DiversosComentarioRange.setValue("");
}

function diversosExecute() {
	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked DiversosExecute');
	switchToTab("Diversos");

	// We need to build one record for each item in DiversosDespesasRange
	var DiversosData 		= DiversosDataRange.getValues();
	var DiversosAssociado	= DiversosAssociadoRange.getValue();
	if (DiversosAssociado == "") {
		SpreadsheetApp.getUi().alert("O campo DiversosAssociado deve ser preenchido.");
		return null;
	}
	var DiversosEstadia 		= DiversosEstadiaRange.getValue();
	var DiversosMoeda 		= DiversosMoedaRange.getValue();
	var DiversosDespesas     = DiversosDespesasRange.getValues();
	var DiversosDespesasFiltrados = DiversosDespesas.filter(function(transaction) {
    	return transaction[DiversosDespesasItemCol ] != "";
  	});
	if (DiversosDespesasFiltrados.length == 0) {
		var message = "";
		SpreadsheetApp.getUi().alert("Nao ha nehuma Despesa de Diversos a ser processada.");
		return null;
	}
	var DiversosComentario = DiversosComentarioRange.getValue();	

	var contaCorrenteRegistro = [];
  	var contasCorrentesRangeDados = [];
	DiversosDespesasFiltrados.forEach(function(transaction) {
		var item 		= transaction[DiversosDespesasItemCol];
		var real 		= transaction[DiversosDespesasRealol];
		var ouro 		= transaction[DiversosDespesasOuroCol];
		var qtd 		= transaction[DiversosDespesasQTDCol];
		var totalReal 	= transaction[DiversosDespesasTotalRealCol];
		var totalOuro 	= transaction[DiversosDespesasTotaOurolCol];
		      
		contaCorrenteRegistro = [];
		contaCorrenteRegistro[contasCorrentesDataCol]        		= DiversosData;
		contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= DiversosAssociado
		contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= DiversosEstadia
		contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Diversos';
		contaCorrenteRegistro[contasCorrentesMoedaCol]       		= DiversosMoeda;
		contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Debito';
		contaCorrenteRegistro[contasCorrentesItemCol]       		= item;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= real;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= ouro;
		contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;	
		contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= totalReal;
		contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= totalOuro;
		contaCorrenteRegistro[contasCorrentesComentariosCol] 		= DiversosComentario;

		// Add the record to the range
		contasCorrentesRangeDados.push(contaCorrenteRegistro)
	});
	// 
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)
}