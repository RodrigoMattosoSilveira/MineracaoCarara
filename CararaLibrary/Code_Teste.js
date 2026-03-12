const calcularRendasActiveSSTest = () => {
  let nome = "Barbosa - Valdinei Barbosa";
  let estadia = dateToString(new Date("03/11/2026"));
  // This is DEV and we need it!
  let activeSS = SpreadsheetApp.openById("1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4");
  calcularRendasActiveSS(nome, estadia, activeSS)
}
const calcularSaldoContasCorrentesCCTest = () => {
  let nome = "Barbosa - Valdinei Barbosa";
  let estadia = new Date("3/11/2026");
  // This is DEV and we need it!
  let activeSS = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4"
  calcularSaldoContasCorrentesCC(nome, estadia, activeSS)
}
const ParseKeyValueTest = () => {
  let keyValue = ParseKeyValue("env: DEV")
  let expected = ["env", "DEV"]		
  keyValue !== null ?
		console.info(" ✔︎ ParseKeyValue") :
		console.error(" ✖︎  ParseKeyValue: " + keyValue + " != " + expected);
  let expectedKey = "env";	
  keyValue[0].localeCompare(expectedKey) === 0 ?
		console.info(" ✔︎ ParseKeyValue[0]") :
		console.error(" ✖︎  ParseKeyValue[0[]]: " + keyValue[0] + " != " + expectedKey);
  let expectedValue = "DEV";	
  keyValue[1].localeCompare(expectedValue) === 0 ?
		console.info(" ✔︎ ParseKeyValue[1]") :
		console.error(" ✖︎  ParseKeyValuek[1]: " + keyValue[1] + " != " + expectedValue);

  keyValue = ParseKeyValue("env:    DEV")
  expected = ["env", "DEV"]		
  keyValue !== null ?
		console.info(" ✔︎ ParseKeyValue") :
		console.error(" ✖︎  ParseKeyValue: " + keyValue + " != " + expected);
  expectedKey = "env";	
  keyValue[0].localeCompare(expectedKey) === 0 ?
		console.info(" ✔︎ ParseKeyValue[0]") :
		console.error(" ✖︎  ParseKeyValue[0[]]: " + keyValue[0] + " != " + expectedKey);
  expectedValue = "DEV";	
  keyValue[1].localeCompare(expectedValue) === 0 ?
		console.info(" ✔︎ ParseKeyValue[1]") :
		console.error(" ✖︎  ParseKeyValuek[1]: " + keyValue[1] + " != " + expectedValue);

  keyValue = ParseKeyValue("env    DEV")
  expected = null			
  keyValue === expected ?
		console.info(" ✔︎ ParseKeyValue[INVALID]") :
		console.error(" ✖︎  ParseKeyValue[INVALID]: " + keyValue + " != " + expected);
}
const ObterNumeroDeDiasNesseMesTeste = () => {
  let numeroDeDiasNesseMes = ObterNumeroDeDiasNesseMes();
  let dataAtual = new Date();
  let anoAtual = dataAtual.getFullYear();
  let mesAtual = dataAtual.getMonth() + 1;
  let ultimoDiaDoMes = new Date(anoAtual, mesAtual, 0).getDate();
  let valido = numeroDeDiasNesseMes === ultimoDiaDoMes;		
  valido ?
	console.info(" ✔︎ ObterNumeroDeDiasNesseMesTeste") :
	console.error(" ✖︎  ObterNumeroDeDiasNesseMesTeste: " + numeroDeDiasNesseMes + " != " + ultimoDiaDoMes);
  return valido;
}
