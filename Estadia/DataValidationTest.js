const ReadDataValidationFileTest = () => {
	let validationCfg = ReadDataValidationFile("DataValidationHtmlTest.html")
	validationCfg !== null ? 
		console.info(" ✔︎ validationCfg !== null ") :
		console.error(" ✖︎  validationCfg !== null: " + validationCfg + " is null ");
	// accetableEntries
	validationCfg.hasOwnProperty("acceptableEntries")?
		console.info(" ✔︎ validationCfg.hasOwnProperty('acceptableEntries'") :
		console.error(" ✖︎ validationCfg.hasOwnProperty('acceptableEntries'");	
	let acceptableEntries = validationCfg.acceptableEntries;
	acceptableEntries !== null ? 
		console.info(" ✔︎ acceptableEntries !== null ") :
		console.error(" ✖︎  acceptableEntries !== null");
	// accetableEntries.Disponibilidade
		acceptableEntries.hasOwnProperty("Disponibilidade") ?
		console.info(" ✔︎ aacceptableEntries.hasOwnProperty('Disponibilidade')") :
		console.error(" ✖︎  acceptableEntries.hasOwnProperty('Disponibilidade')");
	let acceptableEntriesDisponibilidade = acceptableEntries.Disponibilidade
	acceptableEntriesDisponibilidade !== null ? 
		console.info(" ✔︎ acceptableEntriesDisponibilidade !== null ") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade !== null");
	// accetableEntries.Disponibilidade.spreadsheetName
	acceptableEntriesDisponibilidade.hasOwnProperty("spreadsheetName") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('spreadsheetName')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('spreadsheetName')");
	let expectedValue = "Referencia";
	let actualValue = acceptableEntriesDisponibilidade.spreadsheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.spreadsheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.spreadsheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.sheetName
	acceptableEntriesDisponibilidade.hasOwnProperty("sheetName") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('sheetName')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('sheetName')");
	expectedValue = "Disponibilidade";
	actualValue = acceptableEntriesDisponibilidade.sheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.sheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.sheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.columnNumber
	acceptableEntriesDisponibilidade.hasOwnProperty("columnNumber") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('columnNumber')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('columnNumber')");
	expectedValue = 1;
	actualValue = acceptableEntriesDisponibilidade.columnNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.columnNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.columnNumber !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.rowNumber
	acceptableEntriesDisponibilidade.hasOwnProperty("rowNumber") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('rowNumber')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('rowNumber')");
	expectedValue = 2;
	actualValue = acceptableEntriesDisponibilidade.rowNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.rowNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.rowNumber !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Metodo
	acceptableEntries.hasOwnProperty("Metodo") ?
		console.info(" ✔︎ acceptableEntries.hasOwnProperty('Metodo')") :
		console.error(" ✖︎  acceptableEntries.hasOwnProperty('Metodo')");
	let acceptableEntriesMetodo = acceptableEntries.Metodo
	acceptableEntriesMetodo !== null ? 
		console.info(" ✔︎ acceptableEntriesMetodo !== null ") :
		console.error(" ✖︎  acceptableEntriesMetodo !== null");
	// accetableEntries.Metodo.spreadsheetName
	acceptableEntriesMetodo.hasOwnProperty("spreadsheetName") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('spreadsheetName')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('spreadsheetName')");
	expectedValue = "Referencia";
	actualValue = acceptableEntriesMetodo.spreadsheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.spreadsheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.spreadsheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.sheetName
	acceptableEntriesMetodo.hasOwnProperty("sheetName") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('sheetName')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('sheetName')");
	expectedValue = "Metodo";
	actualValue = acceptableEntriesMetodo.sheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.sheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.sheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.columnNumber
	acceptableEntriesMetodo.hasOwnProperty("columnNumber") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('columnNumber')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('columnNumber')");
	expectedValue = 1;
	actualValue = acceptableEntriesMetodo.columnNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.columnNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.columnNumber !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.rowNumber
	acceptableEntriesMetodo.hasOwnProperty("rowNumber") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('rowNumber')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('rowNumber')");
	expectedValue = 2;
	actualValue = acceptableEntriesMetodo.rowNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.rowNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.rowNumber !== " + expectedValue + ", " + actualValue);
	validationCfg.hasOwnProperty("dataValidation") ?
		console.info(" ✔︎ validationCfg.hasOwnProperty('dataValidation'") :
		console.error(" ✖︎ validationCfg.hasOwnProperty('dataValidation'");	
	let dataValidaton = validationCfg.dataValidation
	dataValidaton.hasOwnProperty('Estadia') ?
		console.info(" ✔︎ dataValidaton.hasOwnProperty('Estadia')") :
		console.error(" ✖︎ dataValidaton.hasOwnProperty('Estadia')");	
	let dataValidatonEstadia = dataValidaton.Estadia
	dataValidatonEstadia.hasOwnProperty('DadosTeste') ?
		console.info(" ✔︎ dataValidatonEstadia.hasOwnProperty('DadosTeste')") :
		console.error(" ✖︎ dataValidatonEstadia.hasOwnProperty('DadosTeste')");	
	let dataValidatonEstadiaDados = dataValidaton.Estadia.DadosTeste
	dataValidatonEstadiaDados.hasOwnProperty('Disponibilidade') ?
		console.info(" ✔︎ dataValidatonEstadiaDados.hasOwnProperty('Disponibilidade')") :
		console.error(" ✖︎ dataValidatonEstadiaDados.hasOwnProperty('Disponibilidade')");	
	let dataValidatonEstadiaDadosDisponibilidade = dataValidatonEstadiaDados.Disponibilidade
	dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('targetColumn') ?
		console.info(" ✔︎ dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('targetColumn') ") :
		console.error(" ✖︎ dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('targetColumn') ");	
	expectedValue = 3;
	actualValue = dataValidatonEstadiaDadosDisponibilidade.targetColumn;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidatonEstadiaDadosDisponibilidade.targetColumn === " + actualValue) :
		console.error(" ✖︎ dataValidatonEstadiaDadosDisponibilidade.targetColumn !== " + expectedValue + ", " + actualValue);
	dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('targetRow') ?
		console.info(" ✔︎ dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('targetRow')") :
		console.error(" ✖︎ dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('targetRow')");	
	expectedValue = 2;
	actualValue = dataValidatonEstadiaDadosDisponibilidade.targetRow;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidatonEstadiaDadosDisponibilidade.targetRow === " + actualValue) :
		console.error(" ✖︎ dataValidatonEstadiaDadosDisponibilidade.targetRow !== " + expectedValue + ", " + actualValue);
	dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('acceptableEntriesName') ?
		console.info(" ✔︎ dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('acceptableEntriesName')") :
		console.error(" ✖︎ dataValidatonEstadiaDadosDisponibilidade.hasOwnProperty('acceptableEntriesName')");	
	expectedValue = "Disponibilidade";
	actualValue = dataValidatonEstadiaDadosDisponibilidade.acceptableEntriesName;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidatonEstadiaDadosDisponibilidade.acceptableEntriesName === " + actualValue) :
		console.error(" ✖︎ dataValidatonEstadiaDadosDisponibilidade.acceptableEntriesName !== " + expectedValue + ", " + actualValue);
	dataValidatonEstadiaDados.hasOwnProperty('Metodo') ?
		console.info(" ✔︎ dataValidatonEstadiaDados.hasOwnProperty('Metodo')") :
		console.error(" ✖︎ dataValidatonEstadiaDados.hasOwnProperty('Metodo')");	
	let dataValidatonEstadiaDadosMetodo = dataValidatonEstadiaDados.Metodo
	dataValidatonEstadiaDadosMetodo.hasOwnProperty('targetColumn') ?
		console.info(" ✔︎ dataValidatonEstadiaDadosMetodo.hasOwnProperty('targetColumn') ") :
		console.error(" ✖︎ dataValidatonEstadiaDadosMetodo.hasOwnProperty('targetColumn') ");	
	expectedValue = 4;
	actualValue = dataValidatonEstadiaDadosMetodo.targetColumn;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidatonEstadiaDadosMetodo.targetColumn === " + actualValue) :
		console.error(" ✖︎ dataValidatonEstadiaDadosMetodo.targetColumn !== " + expectedValue + ", " + actualValue);
	dataValidatonEstadiaDadosMetodo.hasOwnProperty('targetRow') ?
		console.info(" ✔︎ dataValidatonEstadiaDadosMetodo.hasOwnProperty('targetRow')") :
		console.error(" ✖︎ dataValidatonEstadiaDadosMetodo.hasOwnProperty('targetRow')");	
	expectedValue = 2;
	actualValue = dataValidatonEstadiaDadosMetodo.targetRow
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidatonEstadiaDadosMetodo.targetRow === " + actualValue) :
		console.error(" ✖︎ dataValidatonEstadiaDadosMetodo.targetRow !== " + expectedValue + ", " + actualValue);
	dataValidatonEstadiaDadosMetodo.hasOwnProperty('acceptableEntriesName') ?
		console.info(" ✔︎ dataValidatonEstadiaDadosMetodo.hasOwnProperty('acceptableEntriesName')") :
		console.error(" ✖︎ dataValidatonEstadiaDadosMetodo.hasOwnProperty('acceptableEntriesName')");	
	expectedValue = "Metodo";
	actualValue = dataValidatonEstadiaDadosMetodo.acceptableEntriesName;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidatonEstadiaDadosMetodo.acceptableEntriesName === " + actualValue) :
		console.error(" ✖︎ dataValidatonEstadiaDadosMetodo.acceptableEntriesName !== " + expectedValue + ", " + actualValue);
}