
const  Get_Config_Folder_IdTest = () => {
	// DEV
	let id = Get_Config_Folder_Id("DEV");
   	let expected = "1hi85uRXZZWUrmF-nnGcTn-bGB6Vz0HD8"	
 	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Config_Folder_Id('DEV')") :
		console.error(" ✖︎   Get_Config_Folder_Id('DEV'): " + id + " != " + expected);
 	// TEST
	id = Get_Config_Folder_Id('TEST');
   	expected = "TEST_FOLDER_ID"		
 	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Contas_Correntes_Id('TEST')") :
		console.error(" ✖︎  Get_Contas_Correntes_Id('TEST'): " + id + " != " + expected);
}
const  ReadConfigFileTest = () => {
	const folderId = "1hi85uRXZZWUrmF-nnGcTn-bGB6Vz0HD8";
	const fileName = "config.txt";
  	let envLine = ReadConfigFile(folderId, fileName)
	let expected = "env: DEV"		
	envLine.localeCompare(expected) === 0 ?
		console.info(" ✔︎ ReadConfigFile") :
		console.error(" ✖︎  ReadConfigFile: " + envLine + " != " + expected);
}

const GetSpreadSheetIdTeste = () => {
	// Dev CANTINA_PRECO
	let id = Get_Cantina_Preco_Id("DEV")
   	let expected = "1zvMAV3FiQfOKwb6_gLX5BBceSNhLJzK8dO1MF3nstL4"		
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Cantina_Preco_Id('DEV')") :
		console.error(" ✖︎  Get_Cantina_Preco_Id('DEV'): " + id + " != " + expected);
 	// Dev CONTAS_CORRENTES
	id = Get_Contas_Correntes_Id("DEV")
   	expected = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA"		
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Contas_Correntes_Id('DEV')") :
		console.error(" ✖︎  Get_Contas_Correntes_Id('DEV'): " + id + " != " + expected);

	// Test CANTINA_PRECO
	id = Get_Cantina_Preco_Id("TEST")
   	expected = "TEST_CANTINA_PRECO_ID"		
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Cantina_Preco_Id('TEST')") :
		console.error(" ✖︎  Get_Cantina_Preco_Id('TEST'): " + id + " != " + expected);
 	// Test CONTAS_CORRENTES
	id = Get_Contas_Correntes_Id("TEST")
   	expected ="TEST_CONTAS_CORRENTES_ID"			
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Contas_Correntes_Id('TEST')") :
		console.error(" ✖︎  Get_Contas_Correntes_Id('TEST'): " + id + " != " + expected);

	// Prod CANTINA_PRECO
	id = Get_Cantina_Preco_Id("PROD")
   	expected = "PROD_CANTINA_PRECO_ID"		
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Cantina_Preco_Id('PROD')") :
		console.error(" ✖︎  Get_Cantina_Preco_Id('PROD'): " + id + " != " + expected);
 	// Prod CONTAS_CORRENTES
	id = Get_Contas_Correntes_Id("PROD")
   	expected = "PROD_CONTAS_CORRENTES_ID"			
  	id.localeCompare(expected) === 0 ?
		console.info(" ✔︎ Get_Contas_Correntes_Id('PROD')") :
		console.error(" ✖︎  Get_Contas_Correntes_Id('PROD'): " + id + " != " + expected);
 	
	return;
}