function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Constas Correntes')
		.addItem('Reverter',     'RevertGeneralLedgerEntry')
	.addToUi();
}