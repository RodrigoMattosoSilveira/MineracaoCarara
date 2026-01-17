function diversosPrepare() {
	// Navegue para o formulário Diversos e limpe o mesmo
 	switchToTab("Diversos");
	limparFormularioDiversos();
}


function diversosExecute() {
	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked DiversosExecute');
	switchToTab("Diversos");

	if (DiversosColaboradorRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Colaborador deve ser preenchido.");
		return null;
	}	

	// We need to build one record for each item in DiversosDespesasRange
	var DiversosData 		= DiversosDataRange.getValues();
	var DiversosColaborador	= DiversosColaboradorRange.getValue();
	if (DiversosColaborador == "") {
		SpreadsheetApp.getUi().alert("O campo DiversosColaborador deve ser preenchido.");
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
		contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= DiversosColaborador
		contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= DiversosEstadia
		contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Diversos';
		contaCorrenteRegistro[contasCorrentesMoedaCol]       		= DiversosMoeda;
		contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Debito';
		contaCorrenteRegistro[contasCorrentesItemCol]       		= item;
		contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;	
		if (DiversosMoeda == 'Real') {
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= real;
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= 0;
			contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= totalReal;
			contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= 0;
		} else {
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= 0;
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= ouro;
			contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= 0;
			contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= totalOuro;
		}
		contaCorrenteRegistro[contasCorrentesComentariosCol] 		= DiversosComentario;

		// Add the record to the range
		contasCorrentesRangeDados.push(contaCorrenteRegistro)
	});
	// 
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)

	// Limpe o formulário Diversos e informe ao usuário que o sistema concluiu a operação
	limparFormularioDiversos();
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('O sistema lancou as despesas Diversas do ' + DiversosColaborador);
}

function limparFormularioDiversos() {
	DiversosColaboradorRange.setValue("");
	DiversosMoedaRange.setValue("Real");
	DiversosItemsRange.setValue("");
	DiversosRealRange.setValue("");
	DiversosQuantidadesRange.setValue("");
	DiversosComentarioRange.setValue("");	
	DiversosSaldoOuroRange.setValue("");
	DiversosSaldoRealRange.setValue("");
	DiversosFuturoRealRange.setValue("");
	DiversosFuturoOuroRange.setValue("");
}