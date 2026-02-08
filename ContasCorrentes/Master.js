function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Constas Correntes')
		.addItem('Reverter',     'RevertGeneralLedgerEntry')
	.addToUi();
}

/* ********************************************************************************************************************* */
//  Ler a cotacao do ouro, mantida em tempo real pela GOOGLEFINACE
//  @returns {Number}, cotacaoOuro
//
//* ********************************************************************************************************************* */
//
function obtenhaCotacaoOuroSimples() {
  return cotacaoOuro = Referencia.obterReferenciaOuroBrlGramaVal();
}
