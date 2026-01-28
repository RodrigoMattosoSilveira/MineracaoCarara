const UpdateGoldPriceInUSDTest = () => {
  let precoOuro = UpdateGoldPriceInUSD()
  precoOuro < 0 ?
   	console.error(" ✖︎  precoOuro negative, Expected non negative, got " + precoOuro) :
    console.info("  ✔︎ precoOuro non negative " + precoOuro );
}
const obterProducaoPocoRecenteMediaTeste = () => {
  let poco = "Poço_1";
  let dias = 10;  
  let turnos = 2;
  let producaoMedia = obterProducaoPocoRecenteMedia(poco, dias, turnos);
  let expectedMedia =12.032606254113713;
  Math.abs(producaoMedia - expectedMedia) < 0.0001 ?
   	console.info(" ✔︎ obterProducaoPocoRecenteMedia, Poço_1 " + dias + " dias, " + turnos + " turnos") :
    console.error(" ✖︎  obterProducaoPocoRecenteMedia, Poço_1 " + dias + " dias, " + turnos + " turnos. Expected " + expectedMedia + ", got " + producaoMedia);
}
const obterProducaoPocoRecenteTeste = () => {
  let poco = "Poço_1";
  let dias = 10;
  let producaoPoco = obterProducaoPocoRecente(poco, dias);
  expectedLength = 9;
  producaoPoco.length === expectedLength ? 
		console.info(" ✔︎ correta quantidade de registros para " + poco) :
		console.error(" ✖︎  incorreta quantidade de registros para poço " + poco + ". Expected " + expectedLength + ", got " + producaoPoco.length);  
}
const obterProducaoPocoTest = () => {
  let poco = "Poço_1"
  let producaoPoco = obterProducaoPoco(poco)
  expectedLength = 38;
  producaoPoco.length === expectedLength ? 
		console.info(" ✔︎ correta quantidade de registros para " + poco) :
		console.error(" ✖︎  correta quantidade de registros para " + poco)
}
const obterPeriodosTeste = () => {
  let myMap = obterPeriodos()
}
const obterReferenciaOuroBrlGramaValTeste = () => {
  let valor = obterReferenciaOuroBrlGramaVal()
}
function obterReferenciaPocosTeste () {
	let pocos = obterReferenciaPocos()
}