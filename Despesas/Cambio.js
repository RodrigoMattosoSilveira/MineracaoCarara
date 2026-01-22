function cambioPrepare() {
	// Navegue para o formulário Diversos e limpe o mesmo
 	switchToTab("Cambio");
	limparFormularioDiversos();
}

function cambioExecute() {
	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked CambioExecute');
	switchToTab("Cambio");

	if (CambioColaboradorRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Colaborador deve ser preenchido.");
		return null;
	}	

	// We need to build one record for Cambio
	var CambioData 		    = CambioDataRange.getValues();
	var CambioColaborador	= CambioColaboradorRange.getValue();
	var CambioEstadia 		= CambioEstadiaRange.getValue();
	var CambioMoeda 		= CambioMoedaRange.getValue();
	var CambioDespesas      = CambioDespesasRange.getValues();
	var CambioDespesasFiltrados = CambioDespesas.filter(function(transaction) {
    	return transaction[CambioDespesasRealCol] != "";
  	});
	if (CambioDespesasFiltrados.length == 0) {
		var message = "";
		SpreadsheetApp.getUi().alert("Nao ha nehuma transacao de Cambio a ser processada.");
		return null;
	}
	var CambioComentario   = CambioComentarioRange.getValue();	

	var transaction = CambioDespesasFiltrados[0]; // There should be only one transaction for Cambio
	var item 		= transaction[CambioDespesasItemCol];
	var real 		= transaction[CambioDespesasRealCol];
	var ouro 		= transaction[CambioDespesasOuroCol];
	var qtd 		= 1;
	var totalReal 	= transaction[CambioDespesasTotalRealCol];
	var totalOuro 	= transaction[CambioDespesasTotaOurolCol];

	var contaCorrenteRegistro = [];
  	var contasCorrentesRangeDados = [];

	//Credit the real value
	contaCorrenteRegistro = [];
	contaCorrenteRegistro[contasCorrentesDataCol]        		= CambioData;
	contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= CambioColaborador
	contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= CambioEstadia
	contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Cambio';
	contaCorrenteRegistro[contasCorrentesMoedaCol]       		= "Real";
	contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Credito';
	contaCorrenteRegistro[contasCorrentesItemCol]       		= item
	contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= real;
	contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= 0;
	contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;	
	contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= totalReal;
	contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= 0;
	contaCorrenteRegistro[contasCorrentesComentariosCol] 		= CambioComentario;			
	// Add the record to the range
	contasCorrentesRangeDados.push(contaCorrenteRegistro)


	//Debit the gold equivalent
	contaCorrenteRegistro = [];
	contaCorrenteRegistro[contasCorrentesDataCol]        		= CambioData;
	contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= CambioColaborador
	contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= CambioEstadia
	contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Cambio';
	contaCorrenteRegistro[contasCorrentesMoedaCol]       		= "Ouro";
	contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Debito';
	contaCorrenteRegistro[contasCorrentesItemCol]       		= item
	contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= 0;
	contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= ouro;
	contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;	
	contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= 0;
	contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= totalOuro;
	contaCorrenteRegistro[contasCorrentesComentariosCol] 		= CambioComentario;			
	// Add the record to the range
	contasCorrentesRangeDados.push(contaCorrenteRegistro)

	// Append to the Conta Correntes tab
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)

	SpreadsheetApp.getUi().alert("Despesa de Cambio registrada com sucesso.");

	// Navegue para o formulário Cambio e limpe o mesmo
	switchToTab("Cambio");
	limparFormularioCambio ();
}

function limparFormularioCambio () {
	CambioColaboradorRange.setValue("");

	CambioSaldoOuroRange.setValue("");
	CambioSaldoRealRange.setValue("");
	CambioFuturoOuroRange.setValue("");
	CambioFuturoRealRange.setValue("");

	CambioDespesaRealRange.setValue("");

	CambioComentarioRange.setValue("");
}