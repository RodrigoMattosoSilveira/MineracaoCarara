const activeSpreadsheetId = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";

const getParentFolderIdTest = () => {
	const sheetID = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
	const activeSheet = SpreadsheetApp.openById(sheetID);;
	folderId = getParentFolderId(activeSheet);
	expected = "1yrBiKHNeF4LG4T3N8s1Ec62qPtKxObgj"
	folderId === folderId ? 
		console.info(" ✔︎ folderId === folderId ") :
		console.error(" ✖︎  folderId === folderId: " + folderId + " != " + expected);
}
const  readConfigFileTest = () => {
	const folderId = "1yrBiKHNeF4LG4T3N8s1Ec62qPtKxObgj";
  	let config = readConfigFile(folderId)
	config !== null ? 
		console.info(" ✔︎ configFile !== null ") :
		console.error(" ✖︎  configFile !== null");
	Object(config.hasOwnProperty("ENV")) !== -1 ?
		console.info(" ✔︎ hasOwnProperty(ENV)") :
		console.error(" ✖︎ hasOwnProperty(ENV)");		
   	let expected = "DEV"	
	let env = config["ENV"]
	env.localeCompare(expected) === 0 ?
		console.info(" ✔︎ config['ENV'] ==  'DEV") :
		console.error(" ✖︎ config['ENV'] == 'DEV: " + config["ENV"] + " != " + expected);
}

const getEnvironmentTest = () => {
	let activeSpreadsheet = SpreadsheetApp.openById(activeSpreadsheetId);
	let env = getEnvironment(activeSpreadsheet);
   	let expected = "DEV"		
	env.localeCompare(expected) === 0 ?
		console.info(" ✔︎ env === 'DEV") :
		console.error(" ✖︎ env === 'DEV: " + config["ENV"] + " != " + expected);
}
const GetSpreadSheetIdTeste = () => {
	// Dev CANTINA_PRECO
	let activeSpreadsheet = SpreadsheetApp.openById(activeSpreadsheetId);
	let spreadSheetName = "CANTINA_PRECO";
	let id = GetSpreadsheetId(activeSpreadsheet, spreadSheetName)
   	let expected = "1zvMAV3FiQfOKwb6_gLX5BBceSNhLJzK8dO1MF3nstL4"		
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ GetSpreadsheetId(CANTINA_PRECO))") :
		console.error(" ✖︎  GetSpreadsheetId(CANTINA_PRECO)): " + id + " != " + expected);
 	// Dev CONTAS_CORRENTES
	spreadSheetName = "CONTAS_CORRENTES";
	id = GetSpreadsheetId(activeSpreadsheet, spreadSheetName)
   	expected = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA"		
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎  GetSpreadsheetId(CONTAS_CORRENTES)") :
		console.error(" ✖︎  GetSpreadsheetId(CONTAS_CORRENTES)): " + id + " != " + expected);
	return;
}