/**
 * Central config: map environments to spreadsheet IDs.
 * Store these IDs in Script Properties in real usage; kept inline here for clarity.
 */
const ENV_NAMES = ["DEV",  "TEST", "PROD"]

/**
 * Central config: map environments to spreadsheet IDs.
 * Store these IDs in Script Properties in real usage; kept inline here for clarity.
 */
const SPREADSHEET_NAMES = [
	"CANTINA_PRECO",
	"CONTAS_CORRENTES",
	"CRONOGRAMA",
	"DESPESAS",
	"ESTADIA",
	"PESSOA",
	"PRODUCAO",
	"REFERENCIA",
];

function GetSpreadsheetId(activeSpreadsheet, spreadSheetName) {
	/**
	1. Gets the environment, env = getEnvironment(activeSpreadsheet)
		1. Gets the folderId = getParentFolderId(activeSpreadsheet)
		2. Reads and Parses the config file, config = readParsesConfigFile(folderId)
		3. Get the environment, env = config["ENV"]
	2. Get the spreadsheet id = getSpreadSheetPropId(env, spreadsheetName)
	3. Returns the spreasheet id, id
	 */
	env = getEnvironment(activeSpreadsheet)
	if (env === null) throw new Error("Não foi possível recuperar o ambiente " + env + ".");
	id  = getSpreadSheetPropId(env, spreadSheetName);
	return id
}

function getEnvironment(activeSpreadsheet) {
	/**
	1. Gets the folderId = getParentFolderId(activeSpreadsheet)
	2. Reads and Parses the config file, config = readParsesConfigFile(folderId)
	3. Get the environment, env = config["ENV"]
	 */
	folderId = getParentFolderId(activeSpreadsheet);
	if (folderId == null) throw new Error("Não foi possível recuperar o folderId.");
	config = readConfigFile(folderId)
	if (config == null) throw new Error("Não foi possível recuperar a configuracao.");	
	env = config["ENV"]
	if (ENV_NAMES.indexOf(env) === -1) throw new Error("Nome do ambiente invalido: " + env + ".");	
	return env;
}

/**
 * Retrieves the active spreadsheet's folder id
 * @param {spreasheet} activeSpreadsheet 
 * @returns {string} the active spreadsheet's folder id
 */
function getParentFolderId(activeSpreadsheet) {
	let folderId = null;

	var file = DriveApp.getFileById(activeSpreadsheet.getId());
	var folders = file.getParents();
	while (folders.hasNext()){
		let folder = folders.next()
		folderId = folder.getId();
	}

	return folderId
  }	

  /**
 * Reads a configuration file on the same folder as the current spreasheet;
 * parses the ":" separated key values, ignoring lines starting with a "#";
 *
 * @param {string} folderId the folder hosting the config file
 * @param {string} fileName the config file name
 * @returns {Object} the key/value pairs in the config file
 */
function readConfigFile(folderId) {
//   const folderId = "1uxHz6HVXnkkH4N1fRmkNT_vSwZRUi1dZ";     // Replace with your folder ID
//   const fileName = "config.txt";        // Name of the text file
	const folder = DriveApp.getFolderById(folderId);
	const files = folder.getFilesByName("config.txt");
	if (!files.hasNext()) {
		throw new Error("O arquivo de configuração não foi encontrado: config.txt");
	}

	const file = files.next();
	const content = file.getBlob().getDataAsString();

	// Parse the file into an object
	const config = {};
	const lines = content.split(/\r?\n/);

	lines.forEach(line => {
	const trimmed = line.trim();
	if (trimmed && !trimmed.startsWith("#")) { // Ignore empty lines and comments
		const parts = trimmed.split(":");
		if (parts.length === 2) {
		const key = parts[0].trim();
		const value = parts[1].trim();
		config[key] = value;
		}
	}
	});

	Logger.log("Parsed Config: %s", JSON.stringify(config, null, 2));
	return config;
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
function getSpreadSheetPropId(env, name) {
	if (ENV_NAMES.indexOf(env)) {
		throw new Error("Invalido nome de ambiente: " + env + ".");
	}

	if (SPREADSHEET_NAMES.indexOf(name) === -1) {
		throw new Error("Invalido nome de planilha: " + name + ".");
	}

	const props = PropertiesService.getScriptProperties();
	const propName = env + "_"  + name + "_ID"
	const id  = props.getProperty(propName);

  	if (!id) {
		throw new Error("A Biblioteca Carara não possui a propriedade " + propName + ".");
  	}
	return id;
}
