// CararaLibrary
// SciptID: 1MUcp-N2BXCoJI3ussufDnfghByRVGBATXMPP7BeZg-1iCQXbrKw5rzaO
// Software: https://script.google.com/home/projects/1MUcp-N2BXCoJI3ussufDnfghByRVGBATXMPP7BeZg-1iCQXbrKw5rzaO/edit 
// 

// *** Layout do formulário Fechar
// 
const despesasFecharTab 	 = despesasSpreadSheet.getSheetByName("Fechar");
const FecharDataRange 		 = despesasFecharTab.getRange("FecharData");
const FecharAssociadoRange   = despesasFecharTab.getRange("FecharAssociado");
const FecharEstadiaRange     = despesasFecharTab.getRange("FecharEstadia");
const FecharDadosRange       = despesasFecharTab.getRange("FecharDados");
const FecharComentarioRange  = despesasFecharTab.getRange("FecharComentario");
const FecharDadosRangeName   = "FecharDados";

const FecharDespesasItemCol    = 0;  

function fecharPrepare() {
	// Navegue para o formulário Diversos e limpe o mesmo
  	CararaLibrary.activateSheet("Fechar");
	limparFormularioFechar();
}

function fecharGatilho(e) {
	if (FecharAssociadoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Associado deve ser preenchido.");
		return null;
	}
	// TODO Issue #33 Replace the curreent Semaphors with modal dialog boxes
	// despesasSpreadSheet.getRangeByName("FecharSemaforo").setBackground("#FF0000");
	showModalDialogFechar();
}
function fecharGatilhoCompletar() {
	// Build Conta Corrent records
	const FecharData 			= FecharDataRange.getValue();
	const FecharAssociado		= FecharAssociadoRange.getValue();
	const FecharEstadia 		= FecharEstadiaRange.getValue();
	const FecharComentario    = FecharComentarioRange.getValue();

	// Compute outstanding totals
	const contasCorrentesDadosRange =   CararaLibrary.cc_getTransacoesRendasDespesasRange();
	const contasCorrentesDadosRangeVals =   contasCorrentesDadosRange.getValues();
	const creditosDebitos = CararaLibrary.resumirContaCorrenteAssociado(FecharAssociado, FecharEstadia, contasCorrentesDadosRangeVals);

	//  Obtenha e preencha a area do formularon a incluir as informations a
	// cerca dos debitos e creditos do associado
	const fecharDadosRange = despesasSpreadSheet.getRangeByName(FecharDadosRangeName)
	let fecharDadosRangeVals = fecharDadosRange.getValues();
	let i = 0;
	if (creditosDebitos["Credito"]["Real"] > 0) {
		let formattedPrice = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(creditosDebitos["Credito"]["Real"] );
		fecharDadosRangeVals[i][0] = 'A Mineração Carará pagou ao Associado seu credito em Real, ' + formattedPrice;
		i++
	}
	if (creditosDebitos["Credito"]["Ouro"] > 0) {
		fecharDadosRangeVals[i][0]  = 'A Mineração Carará pagou ao Associado seu credito em Ouro, ' + creditosDebitos["Credito"]["Ouro"] + 'g';
		i++
	}
	if (creditosDebitos["Debito"]["Real"] > 0) {
		let formattedPrice = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(creditosDebitos["Debito"]["Real"] );
		fecharDadosRangeVals[i][0]  = 'O Associado  pagou a Mineração Carará seu debito em Real, ' + formattedPrice;
		i++
	}
	if (creditosDebitos["Debito"]["Ouro"] > 0) {
		fecharDadosRangeVals[i][0]  = 'O Associado  pagou a Mineração Carará seu debito em ouro, ' + creditosDebitos["Debito"]["Ouro"] + 'g';
	}
	fecharDadosRange.setValues(fecharDadosRangeVals).setFontSize(14);

	// despesasSpreadSheet.getRangeByName("FecharSemaforo").setBackground("#00FF00");
}

function fecharExecute() {
	switchToTab("Fechar");
	if (FecharAssociadoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Associado deve ser preenchido.");
		return null;
	}

	// Build Conta Corrent records
	// const despesasFecharTab 	 = despesasSpreadSheet.getSheetByName("Fechar");
	// const FecharAssociadoRange   = despesasFecharTab.getRange("FecharAssociado");
	// const FecharEstadiaRange     = despesasFecharTab.getRange("FecharEstadia");
	// const FecharDadosRange       = despesasFecharTab.getRange("FecharDados");
	// const FecharComentarioRange  = despesasFecharTab.getRange("FecharComentario");

	const FecharData 			= FecharDataRange.getValue();
	const FecharAssociado		= FecharAssociadoRange.getValue();
	const FecharEstadia 		= FecharEstadiaRange.getValue();
	const FecharComentario    = FecharComentarioRange.getValue();

	// Compute outstanding totals
	const contasCorrentesDadosRange =   CararaLibrary.cc_getTransacoesRendasDespesasRange().getValues();
	const creditosDebitos = CararaLibrary.resumirContaCorrenteAssociado(FecharAssociado, FecharEstadia, contasCorrentesDadosRange);
	const creditoReal		= creditosDebitos["Credito"]["Real"];
	const creditoOuro 		= creditosDebitos["Credito"]["Ouro"];
	const debitoReal 		= creditosDebitos["Debito"]["Real"];
	const debitoOuro 		= creditosDebitos["Debito"]["Ouro"];

	// Compute os registros de contas correntes
	var contaCorrente = [];
	var contaCorrenteRegistro;
	if (creditoReal > 0) {
		var item =  'A Mineração Carará pagou ao Associado seu credito em Real';
		contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Real', 'Debito', item, creditoReal, FecharComentario);
		contaCorrente.push(contaCorrenteRegistro)
	}


	if (creditoOuro > 0) {
		var item =  'A Mineração Carará pagou ao Associado seu credito em Ouro';
		var contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Ouro', 'Debito', item, creditoOuro, FecharComentario);
		contaCorrente.push(contaCorrenteRegistro)
	}

	if (debitoReal > 0) {
		var item =  'O Associado  pagou a Mineração Carará seu debito em Real';
		contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Real', 'Credito', item, debitoReal, FecharComentario);
		contaCorrente.push(contaCorrenteRegistro)
	}

	if (debitoOuro > 0) {
		var item =  'O Associado  pagou a Mineração Carará seu debito em Ouro';
		contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Real', 'Credito', item, debitoOuro, FecharComentario);
		contaCorrente.push(contaCorrenteRegistro)
	}

	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contaCorrente.length, contaCorrente[0].length).setValues(contaCorrente)
		
	// Clear form
	FecharAssociadoRange.setValue("");
	FecharDadosRange.setValue("");
	FecharComentarioRange.setValue("");

	// Limpe o formulário Fechar e informe ao usuário que o sistema concluiu a operação
	limparFormularioFechar();
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('O sistema fechou a conta de ' + FecharAssociado);
} 

// ****************************************************************************
// fillUpRegister - Preencha o registro the contas correntes
// 
// Input
// 		data (Date)
// 		associado (string)
// 		estadia (Date)
// 		moeda (String)
// 		creditoOuDebito (String)
// 		item (String)
// 		valor (Float)
// Output
// 		contaCorrenteRegistro (Array)
// ****************************************************************************
// 
function fillUpRegister (data, associado, estadia, moeda, cOrD, item, valor, fecharComentario) {
	var contaCorrenteRegistro = [];
	contaCorrenteRegistro[contasCorrentesDataCol]        		= data;
	contaCorrenteRegistro[contasCorrentesNomeCol]       	 	= associado
	contaCorrenteRegistro[contasCorrentesEstadiaCol]     		= estadia
	contaCorrenteRegistro[contasCorrentesMetodoCol]      		= 'Fechar';
	contaCorrenteRegistro[contasCorrentesMoedaCol]       		= moeda
	contaCorrenteRegistro[contasCorrentesCreditDebitCol] 		= cOrD
	contaCorrenteRegistro[contasCorrentesItemCol]       		= item
	contaCorrenteRegistro[contasCorrentesItemQtdCol]         	= 1;
	switch (moeda) {
		case "Real":
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= valor;
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= 0
			contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= valor;
			contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= 0
			break;
		case "Ouro": 
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] 	= 0
			contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] 	= valor;
			contaCorrenteRegistro[contasCorrentesTotalRealCol] 			= 0
			contaCorrenteRegistro[contasCorrentesTotalOuroCol] 			= valor;
			break;
	}
	contaCorrenteRegistro[contasCorrentesComentariosCol] 		= fecharComentario;
	return contaCorrenteRegistro
}

function limparFormularioFechar() {
	despesasSpreadSheet.getRangeByName(FecharDadosRangeName).clear({contentsOnly: true});
}