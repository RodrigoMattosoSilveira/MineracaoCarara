/**
 * Central config: map environments to spreadsheet IDs.
 * Store these IDs in Script Properties in real usage; kept inline here for clarity.
 */
const ENV_NAMES = {
	DEV:  "DEV",
	TEST: "TEST",
	PROD: "PROD",
};

/**
 * Central config: map environments to spreadsheet IDs.
 * Store these IDs in Script Properties in real usage; kept inline here for clarity.
 */
const SPREADSHEET_NAMES = {
	CANTINA_PRECO:		"CANTINA_PRECO",
	CONTAS_CORRENTES:	"CONTAS_CORRENTES",
	CRONOGRAMA:			"CRONOGRAMA",
	DESPESAS:			"DESPESAS",
	ESTADIA:			"ESTADIA",
	PESSOA:				"PESSOA",
	PRODUCAO:			"PRODUCAO",
	REFERENCIA:			"REFERENCIA",
};

/**
 * Retrives the spreadsheet id for Cantina_Preco
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_Cantina_Preco_Id(env) {
	return get_SpreadSheet_Id(env, SPREADSHEET_NAMES.CANTINA_PRECO);
}
/**
 * Retrives the spreadsheet id for Contas_Correntes
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_Contas_Correntes_Id(env) {
	return get_SpreadSheet_Id(env, SPREADSHEET_NAMES.CONTAS_CORRENTES);
}
/**
 * Retrives the spreadsheet id for Cronograma
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_Cronograma_Id(env) {
	return getSpreadSheetId(env, SPREADSHEET_NAMES.CRONOGRAMA);
}
/**
 * Retrives the spreadsheet id for Despesas
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_Despesas_Id(env) {
	return get_SpreadSheet_Id(env, SPREADSHEET_NAMES.DESPESAS);
}
/**
 * Retrives the spreadsheet id for Estadia
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_etEstadia_Id(env) {
	return get_SpreadSheet_Id(env, SPREADSHEET_NAMES.ESTADIA);
}
/**
 * Retrives the spreadsheet id for Pessoa
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_getPessoa_Id(env) {
	return get_SpreadSheet_Id(env, SPREADSHEET_NAMES.PESSOA);
}
/**
 * Retrives the spreadsheet id for Producao
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_getProducao_Id(env) {
	return get_SpreadSheet_Id(env, SPREADSHEET_NAMES.PRODUCAO);
}
/**
 * Retrives the spreadsheet id for Referencia
 * @param {string} env the environment for which to select the spreadsheet id
 * @returns 
 */
function Get_Referencia_Id(env) {
	return get_SpreadSheet_Id(env, SPREADSHEET_NAMES.REFERENCIA);
}
/**
 * Retrives a spreasheet id from the script's properties
 * Best practice: store IDs in Script Properties so you don’t hardcode them in 
 * source. Script Properties keys: <<ENV>><<SpreadSheetName>>_ID, e.g., for 
 * Pessoa we will have:
 *    DEV_PESSOA_ID,TEST_PESSOA_ID, PROD_PESSOA_ID
 * 
 * @param {string} env in which the script is running
 * @param {string} name of the spreadsheet of interest
 * @returns 
 */
function get_SpreadSheet_Id(env, name) {
	let keys = Object.keys(ENV_NAMES);
	let index = keys.indexOf(env);
	if (index === -1) {
		return null;
	}
	let _env = ENV_NAMES[env]

	keys = Object.keys(SPREADSHEET_NAMES);
	index = keys.indexOf(name);
	if (index === -1) {
		return null;
	}
	let _name = SPREADSHEET_NAMES[name]

	const props = PropertiesService.getScriptProperties();

	const id  = props.getProperty(_env + "_"  + _name + "_ID");

  	if (!id) {
		return null
  	}
	return id;
}