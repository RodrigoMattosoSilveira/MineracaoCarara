const obterProducaoPocoTeste = () => {
  let epsilon = 0.00001;
  let pocoProducao = obterProducaoPoco("Poço_1", "9/6/2025");
  Math.abs(pocoProducao[PRODUCAO_QTD] - 15.97807122947792) < epsilon ?
   	console.info(" ✔︎ obterProducaoPoco, Poço_1 9/6/2025  15.97807122947792") :
	console.error(" ✖︎  obterProducaoPoco, Poço_1 9/6/2025  15.97807122947792")
}
const obterProducaoPocosTeste = () => {
  let pocos = obterProducaoPocosNomes();
  pocos.length === 2 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, length === 2") :
		console.error(" ✖︎  obterProducaoPocosTeste, length === 2")
  
  pocos.indexOf("Poço_1") !== -1 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, Poço_1 presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_1 presente");

  pocos.indexOf("Poço_3") === -1 ?
  	console.info(" ✔︎ obterProducaoPocosTeste, Poço_3 not presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_3 not presente");
}