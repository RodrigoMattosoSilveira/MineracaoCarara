var contaCorrente = [];;

function fecharPrepare() {
	// Navegue para o formulário Diversos e limpe o mesmo
  	switchToTab("Fechar");
	limparFormularioFechar();
}

function fecharGatilho(e) {
	if (FecharAssociadoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Associado deve ser preenchido.");
		return null;
	}
	despesasSheet.getRangeByName("FecharSemaforo").setBackground("#FF0000");

	// Build Conta Corrent records
	var FecharData 			= FecharDataRange.getValue();
	var FecharAssociado		= FecharAssociadoRange.getValue();
	var FecharEstadia 		= FecharEstadiaRange.getValue();
	var FecharComentario    = FecharComentarioRange.getValue();

	// Compute outstanding totals
	var creditoReal = calculaTotais(contasCorrentesDadosTab, FecharAssociado, FecharEstadia, "Credito", "Real", FecharComentario);
	var creditoOuro = calculaTotais(contasCorrentesDadosTab, FecharAssociado, FecharEstadia, "Credito", "Ouro", FecharComentario);
	var debitoReal = calculaTotais(contasCorrentesDadosTab, FecharAssociado, FecharEstadia, "Debito", "Real"), FecharComentario;
	var debitoOuro = calculaTotais(contasCorrentesDadosTab, FecharAssociado, FecharEstadia, "Debito", "Ouro", FecharComentario);

	// Compute os registros de contas correntes
	var contaCorrenteRegistro;
	if (creditoReal > 0) {
		var item =  'A Mineração Carará pagou ao Associado seu credito em Real';
		contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Real', 'Debito', item, creditoReal)
	}
	else {
		contaCorrenteRegistro = fillUpRegister ('', '', '', '', '', '', '')
	}
	contaCorrente.push(contaCorrenteRegistro)

	if (creditoOuro > 0) {
		var item =  'A Mineração Carará pagou ao Associado seu credito em Ouro';
		var contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Ouro', 'Debito', item, creditoOuro)
		contaCorrente.push(contaCorrenteRegistro)
	}
	else {
		contaCorrenteRegistro = fillUpRegister ('', '', '', '', '', '', '')
	}
	contaCorrente.push(contaCorrenteRegistro);

	if (debitoReal > 0) {
		var item =  'O Associado  pagou a Mineração Carará seu debito em Real';
		contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Real', 'Credito', item, debitoReal)
		contaCorrente.push(contaCorrenteRegistro)
	}
	else {
		contaCorrenteRegistro = fillUpRegister ('', '', '', '', '', '', '')
	}
	contaCorrente.push(contaCorrenteRegistro);

	if (debitoOuro > 0) {
		var item =  'O Associado  pagou a Mineração Carará seu debito em Ouro';
		contaCorrenteRegistro = fillUpRegister (FecharData, FecharAssociado, FecharEstadia, 'Real', 'Credito', item, debitoOuro)
		contaCorrente.push(contaCorrenteRegistro)
	}
	else {
		contaCorrenteRegistro = fillUpRegister ('', '', '', '', '', '', '')
	}
	contaCorrente.push(contaCorrenteRegistro);

	// Show form data; build the form register
	var fecharItems = [];
	contaCorrente.forEach(function(registro) {
		var fecharItem = [];
		fecharItem[FecharDespesasItemCol]	= registro[contasCorrentesItemCol];
		fecharItem[FecharCreditoDebitolCol] = registro[contasCorrentesCreditDebitCol]
		fecharItem[FecharDespesasRealCol] 	= registro[contasCorrentesPrecoUnidadeRealCol];
		fecharItem[FecharDespesasOuroCol] 	= registro[contasCorrentesPrecoUnidadeOuroCol]
		fecharItems.push(fecharItem);
	});
	FecharDadosRange.setValues(fecharItems)

	despesasSheet.getRangeByName("FecharSemaforo").setBackground("#00FF00");
}

function fecharExecute() {
	switchToTab("Fechar");
	if (FecharAssociadoRange.getValue() == "") {
		SpreadsheetApp.getUi().alert("O Associado deve ser preenchido.");
		return null;
	}

	// 
	var lastRow = contasCorrentesDadosTab.getLastRow();
	contasCorrentesDadosTab.getRange(lastRow + 1, 1, contasCorrentes.length, contasCorrentes[0].length).setValues(contasCorrentes)
		
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
// calculaTotais - Calcula o total dos creditos ou debitos, em Real our Ouro
// do registros de conta corrente de um associado
// 
// Input
// 		contasCorrentesDadosTab (Range)
// 		associado (string)
// 		estadia (Date)
// 		creditoOuDebito (String)
// 		moeda (String)
// Output
// 		Total dos creditos ou debitos, em Real our Ouro do registros de conta 
//      corrente de um associado
// ****************************************************************************
// 
function calculaTotais(contasCorrentesDadosTab, associado, estadia, creditoOuDebito, moeda) {
	// Search for  Associado credito em Real
	var valor = 0;
	var estadiaDia = new Date(estadia).getDay();
	var estadiaMes = new Date(estadia).getMonth();
  	var estadiaAno = new Date(estadia).getFullYear();

	var registros= contasCorrentesDadosTab.getRange(2, 1, contasCorrentesDadosTab.getLastRow() - 1, contasCorrentesDadosTab.getLastColumn())
		.getValues();
	var registrosFiltrados = registros.filter(function(transaction) {
		return transaction[contasCorrentesNomeCol] == associado && 
		new Date(transaction[contasCorrentesEstadiaCol]).getDay() == estadiaDia &&
        new Date(transaction[contasCorrentesEstadiaCol]).getMonth() == estadiaMes &&
        new Date(transaction[contasCorrentesEstadiaCol]).getFullYear() == estadiaAno &&
		transaction[contasCorrentesCreditDebitCol] == creditoOuDebito &&
		transaction[contasCorrentesMoedaCol] == moeda;
	});
	registrosFiltrados.forEach(function(transaction) {
		valor += transaction[contasCorrentesTotalRealCol];
	})
	return valor;
}

// ****************************************************************************
// compararDatas 
// 
// Input
// 		umaData
//      outraData
// Output
// 		True is the same, null otherwise
// ****************************************************************************
//
function compararDatas(umaData, outraData) {
	umDia 
}

// ****************************************************************************
// preenchaRegistroCC - Preencha o registro the contas correntes
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
	return null;
}