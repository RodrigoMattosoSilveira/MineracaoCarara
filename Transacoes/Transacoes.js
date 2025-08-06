function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
		ui.createMenu('Trasações')
		.addSubMenu(ui.createMenu('Cantina')
			.addItem('Cantina Reais', 'cantinaReais')
			.addItem('Cantina Ouro', 'cantinaOuro')
		)
		.addSubMenu(ui.createMenu('PIX')
			.addItem('PIX Reais', 'pixReais')
			.addItem('PIX Ouro', 'pixOuro')
		)	
		.addSubMenu(ui.createMenu('Voo')
			.addItem('Voo Reais', 'vooReais')
			.addItem('Voo Ouro', 'vooOuro')
		)

		.addSubMenu(ui.createMenu('Diversos')
			.addItem('Diversos Reais', 'diversosReais')
			.addItem('Diversos Ouro', 'diversosOuro')
		)
		.addSubMenu(ui.createMenu('Fechar')
			.addItem('Fechar Reais', 'fecharReais')
			.addItem('Fechar Ouro', 'fecharOuro')
		)

		.addToUi();
}

function cantinaReais() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clickedcantinaReais');
}

function cantinaOuro() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked cantinaOuro');
}

function pixReais() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked on pixReais');
}

function pixOuro() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the pixOuro');
}

function diversosReais() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked on diversosReais');
}

function diversosOuro() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the diversosOuro');
}

function fecharReais() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked on fecharReais');
}

function fecharOuro() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the fecharOuro');
}

function vooReais() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked on vooReais');
}

function vooOuro() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the vooOuro');
}