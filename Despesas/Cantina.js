function cantinaPrepare() {
	// Navegue para o formulário Cantina e limpe o mesmo
  	switchToTab("Cantina");
	clearCantinaForm();
}

function cantinaExecute() {
	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked cantinaExecute');
	switchToTab("Cantina");

	if (CantinaAssociadoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Associado deve ser preenchido.");
		return null;
	}

	// We need to build one record for each item in CantinaDespesasRange
	var cantinaData 		= CantinaDataRange.getValues();
	var cantinaAssociado	= CantinaAssociadoRange.getValue();
	var cantinaEstadia 		= CantinaEstadiaRange.getValue();
	var cantinaPagemento 	= CantinaPagementoRange.getValue();
	var cantinaMoeda 		= CantinaMoedaRange.getValue();
	var cantinaDespesas     = CantinaDespesasRange.getValues();
	var cantinaDespesasFiltrados = cantinaDespesas.filter(function(transaction) {
    	return transaction[CantinaDespesasItemCol ] != "";
  	});
	if (cantinaDespesasFiltrados.length == 0) {
		var message = "";
		SpreadsheetApp.getUi().alert("Nao ha nehuma Despesa de Cantina a ser processada.");
		return null;
	}
	var cantinaComentario = CantinaComentarioRange.getValue();	

	var contaCorrenteRegistro = [];
  	var contasCorrentesRangeDados = [];
	cantinaDespesasFiltrados.forEach(function(transaction) {
		var item 		= transaction[CantinaDespesasItemCol];
		var real 		= transaction[CantinaDespesasRealol];
		var ouro 		= transaction[CantinaDespesasOuroCol];
		var qtd 		= transaction[CantinaDespesasQTDCol];
		var totalReal 	= transaction[CantinaDespesasTotalRealCol];
		var totalOuro 	= transaction[CantinaDespesasTotaOurolCol];
		      
		contaCorrenteRegistro = [];
		contaCorrenteRegistro[contasCorrentesDataCol]        		= cantinaData;
		contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= cantinaAssociado
		contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= cantinaEstadia
		contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Cantina';
		contaCorrenteRegistro[contasCorrentesMoedaCol]       		= cantinaMoeda;
		contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Debito';
		contaCorrenteRegistro[contasCorrentesItemCol]       		= item;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= real;
		contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= ouro;
		contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;	
		contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= totalReal;
		contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= totalOuro;
		contaCorrenteRegistro[contasCorrentesComentariosCol] 		= cantinaComentario;

		// Add the record to the range
		contasCorrentesRangeDados.push(contaCorrenteRegistro)
	});
	// 
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)

	// Limpe o formulário da cantina e informe ao usuário que o sistema concluiu a operação
	clearCantinaForm();
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('O sistema lancou as despesas de cantina do ' + cantinaAssociado);
}

function clearCantinaForm () {
	CantinaAssociadoRange.setValue("");
	CantinaMoedaRange.setValue("Real");
	CantinaItemsRange.setValue("");
	CantinaQuantidadesRange.setValue("");
	CantinaComentarioRange.setValue("");
}