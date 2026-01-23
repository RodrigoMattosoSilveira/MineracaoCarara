function pixPrepare() {
	// Navegue para o formulário :IX e limpe o mesmo
  	switchToTab("Pix");
	SetUpPix();
	limparFormularioPix ();	
	GetSaldo();
}

function pixExecute() {
	// SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
	// 	.alert('You clicked PixExecute');
	switchToTab("Pix");
	SetUpPix();

	if (PixColaboradorRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Colaborador deve ser preenchido.");
		return null;
	}

	// We need to build one record for each item in PixDespesasRange
	let PixData 		= PixDataRange.getValue();
	var PixColaborador	= PixColaboradorRange.getValue();
	var PixEstadia 		= PixEstadiaRange.getValue();
	var PixMoeda 		= PixMoedaRange.getValue();
	var PixDespesas     = PixDespesasRange.getValues();
	var PixDespesasFiltrados = PixDespesas.filter(function(transaction) {
    	return transaction[PixDespesasRealol] != "";
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
		var qtd 		= 1;
		var totalReal 	= transaction[PixDespesasTotalRealCol];
		var totalOuro 	= transaction[PixDespesasTotaOurolCol];
		      
		contaCorrenteRegistro = [];
		contaCorrenteRegistro[contasCorrentesDataCol]        		= PixData;
		contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= PixColaborador
		contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= PixEstadia
		contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Pix';
		contaCorrenteRegistro[contasCorrentesMoedaCol]       		= PixMoeda;
		contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= 'Debito';
		contaCorrenteRegistro[contasCorrentesItemCol]       		= item;
		if (PixMoeda == "Real") {
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol]  	= real;
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol]  	= 0;
		} else {

			contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol]  	= 0;
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol]  	= ouro;
		}
		contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= qtd;
		if (PixMoeda == "Real") {
			contaCorrenteRegistro[contasCorrentesTotalRealCol]         	= totalReal;
			contaCorrenteRegistro[contasCorrentesTotalOuroCol]         	= 0;
		} else {
			contaCorrenteRegistro[contasCorrentesTotalRealCol]         	= 0;
			contaCorrenteRegistro[contasCorrentesTotalOuroCol]         	= totalOuro;
		}
		contaCorrenteRegistro[contasCorrentesComentariosCol] 		= PixComentario;

		// Add the record to the range
		contasCorrentesRangeDados.push(contaCorrenteRegistro)
	});
	// 
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)

	// Limpe o formulário PIX e informe ao usuário que o sistema concluiu a operação
	limparFormularioPix ();	
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('O sistema lancou o PIX do ' + PixColaborador);
}

function limparFormularioPix () {
	// PixColaboradorRange.setValue("");

	PixSaldoOuroRange.setValue("");
	PixSaldoRealRange.setValue("");
	PixFuturoOuroRange.setValue("");
	PixFuturoRealRange.setValue("");

	PixDespesaRealRange.setValue("");

	PixComentarioRange.setValue("");
}