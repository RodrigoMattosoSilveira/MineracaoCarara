function estadiaAdicionarColaborador() {
  const names = obterPessoasNomes();
  showNamePickerDialog(names, function(selectedName) {
    // SpreadsheetApp.getUi().alert("You selected: " + selectedName);
    // Insert the name and today's date at the top of the file, then sort it
    let noneInicio = [[selectedName, new Date()]];
    let estadiasPlanilha = obterEstadiasPlanilha()
    obterEstadiasPlanilha.insertRowBefore(ESTADIAS_FIRST_ROw )
    obterEstadiasPlanilha.getRange(ESTADIAS_FIRST_ROw, 1, noneInicio.length, noneInicio[0].length).setValues(noneInicio);
  });
}

/**
 * Shows a modal dialog that lets the user pick a name from `names`.
 * When the user clicks OK, calls `onPicked(selectedName)`.
 *
 * @param {string[]} names
 * @param {(selectedName: string) => void} onPicked
 */
function showNamePickerDialog(names) {
  const tpl = HtmlService.createTemplateFromFile("AddColaboratorDB");
  tpl.namesJson = JSON.stringify(names || []);
  SpreadsheetApp.getUi().showModalDialog(
    tpl.evaluate().setWidth(520).setHeight(380),
    "Select a name"
  );
}

/**
 * Server endpoint called by the dialog when user confirms.
 * @param {string} selectedName
 */
function serverReceivePickedName(selectedName) {
  const cb = callbackRegistryGet_();
  if (cb) {
    cb(String(selectedName || ""));
    callbackRegistryClear_();
    return;
  }
  Logger.log("Selected : " + selectedName)
  // Fallback behavior if no callback registered:
  // SpreadsheetApp.getUi().alert("Picked: " + selectedName);
  estadiaAdicionarColaboradorAdicione(selectedName);
  return;
}

function estadiaAdicionarColaboradorAdicione(selectedName) {
  let noneInicio = [[selectedName, new Date()]];
  let estadiasPlanilha = obterEstadiasPlanilha();
  estadiasPlanilha.insertRowBefore(ESTADIAS_FIRST_ROw )
  estadiasPlanilha.getRange(ESTADIAS_FIRST_ROw, 1, noneInicio.length, noneInicio[0].length).setValues(noneInicio);
  Logger.log("Inserted : " + selectedName)
}

/**
 * --- Tiny in-memory-ish callback registry ---
 * Apps Script doesn't let you pass functions into HTML directly.
 * This pattern stores a "mode" for what to do next.
 *
 * Caveat: Properties can't store functions. So we store a "callback type"
 * or just store data and handle it in serverReceivePickedName.
 *
 * Below is a SIMPLE approach: store a flag that demoPickName would use,
 * but to keep your requested signature, we'll store a callback name string.
 */

// Register callback by name. This lets you pass different handlers.
function callbackRegistrySet_(fn) {
  const props = PropertiesService.getDocumentProperties();
  // Store the function name if it's a named function; otherwise fall back.
  const name = (fn && fn.name) ? fn.name : "";
  props.setProperty("NAME_PICKER_CB", name);
}

function callbackRegistryGet_() {
  const props = PropertiesService.getDocumentProperties();
  const name = props.getProperty("NAME_PICKER_CB");
  if (!name) return null;
  const fn = this[name];
  return (typeof fn === "function") ? fn : null;
}

function callbackRegistryClear_() {
  PropertiesService.getDocumentProperties().deleteProperty("NAME_PICKER_CB");
}

/**
 * Example of an alternate callback you could pass:
 */
function handlePickedNameWriteToA1_(selectedName) {
  const ss = SpreadsheetApp.getActive();
  ss.getActiveSheet().getRange("A1").setValue(selectedName);
}