/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Referencia')
    .addItem('Autorize', 'autorize')
    .addSeparator()
		.addItem('Atualizar Cotacao do Ouro', 'showFloatDialog')
	.addToUi();
}

/**
 * Run once per user to grant permissions.
 * Put ALL services you will ever need here (SpreadsheetApp, DriveApp, etc.).
 */
function autorize() {
  // Touch services that need scopes:
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  sheet.getName(); // Spreadsheet scope

  // If you use Drive/Files, include this:
  // DriveApp.getRootFolder().getName(); // Drive scope

  // If you use UrlFetch, include this:
  // UrlFetchApp.fetch('https://example.com'); // UrlFetch scope (optional)

  SpreadsheetApp.getUi().alert(
    'Autorizacao completa',
    'Autorização concedida. Agora você pode usar os outros menus.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function showFloatDialog() {
  const html = HtmlService.createHtmlOutputFromFile("FloatingPointDialog")
    .setWidth(420)
    .setHeight(240);
  SpreadsheetApp.getUi().showModalDialog(html, "Registre o preco do ouro");
}

/**
 * Receives the float from the dialog.
 * @param {string} raw User input from the dialog (kept as string for validation).
 * @return {{ok:boolean, value?:number, error?:string}}
 */
function submitFloat(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return { ok: false, error: "Por favor, insira um valor." };

  // Allow comma decimal separator; also strip spaces.
  const normalized = s.replace(/\s+/g, "").replace(",", ".");

  // Strict-ish float check: optional sign, digits, optional decimal, optional exponent.
  const floatRe = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
  if (!floatRe.test(normalized)) {
    return { ok: false, error: "Valor invalido. Exampleo: 12.34, -0.5, 1e-3" };
  }

  const value = Number(normalized);
  if (!Number.isFinite(value)) {
    return { ok: false, error: "O número é muito grande ou não é finito." };
  }

  // Do something with it (example: store in Script Properties)
  atualizeReferenciaOuro(value)

  return { ok: true, value };
}

function atualizeReferenciaOuro(valor) {
 
  // Do something with it (example: store in Script Properties)
  obterReferenciaOuroBrlOuroMinasGama().setValue(valor)
  return 
}
// ****************************************************************************
// Retorna um mapa, identificados e classificados pelos nomes dos periodos de 
// trabalho na organizacao, cada nomecolaborador com um objeto consistindo da 
// indetidade e hora do periodo de trabalho
// 
// @returns {Object} os períodos de trabalho da organização
// ****************************************************************************
// 
function obterPeriodos() {
  let periodos = new Map();
  let periodosGamaVals = obterReferenciaPeriodosGamaVals();
  periodosGamaVals.forEach(element => { 
    periodos.set(element[REFERENCIA_PERIODO_NOME_COL], {'ID': element[REFERENCIA_PERIODO_ID_COL], 'Hora': element[REFERENCIA_PERIODO_HORA_COL],});
  });
  return periodos;
}
// ****************************************************************************
// obterPeriodosIds - Retorna um de objetos que consiste dos IDs dos períodos 
// de trabalho da organização
// 
// @returns {Array} as IDs dos períodos de trabalho da organização
// ****************************************************************************
// 
const obterPeriodosIds = () => {
  let matriz = []
  obterReferenciaPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_ID_COL])});
  return matriz;
}
// ****************************************************************************
// obterPeriodosNomes - Retorna uma matriz de objetos que consiste dos nomes 
// dos períodos de trabalho da organização
// 
// @returns {Array} os nomes dos períodos de trabalho da organização
// ****************************************************************************
// 
const obterPeriodosNomes = () => {
  let matriz = []
  // obterPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_NOME_COL])});
  // let sheet = obterMasterSheet();
  // let range =  obterMasterSheet().obterPeriodosGama().obterPeriodosGamaVals()
  // let vals = range.getValues();
  obterReferenciaPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_NOME_COL])})
  return matriz;
}