const EPSILON = 0.00001;
const obterProducaoPocosTestes = () => {
  let dataProcurada = '9/5/2025'
	let producao = obterProducaoPocos(dataProcurada);
	let producaoKeys = Object.keys(producao);
	producaoKeys.length === 2 ?
		console.info(" ✔︎ obterProducaoPocos, " + dataProcurada + " length === 2") :
		console.error(" ✖︎  obterProducaoPocos, " + dataProcurada + " length === 2")
	Math.abs(producao["Poço_1"] - 21.9534838229411) < EPSILON ?
		console.info(" ✔︎ obterProducaoPocos, Poço_1" + dataProcurada + " 21.9534838229411") :
		console.error(" ✖︎  obterProducaoPocos, Poço_1" + dataProcurada + " 21.9534838229411")
	Math.abs(producao["Poço_2"] - 0.710864316655835) < EPSILON ?
		console.info(" ✔︎ obterProducaoPocos, Poço_2" + dataProcurada + " 7.98903561473896") :
		console.error(" ✖︎  obterProducaoPocos, Poço_2 " + dataProcurada + " 7.98903561473896")	

    dataProcurada = '1/1/2025'
    producao = obterProducaoPocos(dataProcurada);
	producaoKeys = Object.keys(producao);
	producaoKeys.length === 1 ?
		console.info(" ✔︎ obterProducaoPocos, " + dataProcurada + " length === 1") :
		console.error(" ✖︎  obterProducaoPocos, " + dataProcurada + " length === 1");
    producaoKeys.indexOf("Poço_1") !== -1 ?
  	    console.info(" ✔︎ obterProducaoPocosTeste, Poço_1 " + dataProcurada + " presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_1 " + dataProcurada + " resente");
    producaoKeys.indexOf("Poço_2") === -1 ?
  	    console.info(" ✔︎ obterProducaoPocosTeste, Poço_2 " + dataProcurada + " nao presente") :
		console.error(" ✖︎  obterProducaoPocosTeste, Poço_2 " + dataProcurada + " nao presente");
	Math.abs(producao["Poço_1"] - 19.6178864851321) < EPSILON ?
		console.info(" ✔︎ obterProducaoPocos, Poço_1 " + dataProcurada + "  21.9534838229411") :
		console.error(" ✖︎  obterProducaoPocos, Poço_1 " + dataProcurada + " 21.9534838229411")	

    dataProcurada = '31/12/2024'
    producao = obterProducaoPocos(dataProcurada);
	producaoKeys = Object.keys(producao);
	producaoKeys.length === 0 ?
		console.info(" ✔︎ obterProducaoPocos, " + dataProcurada + " length === 0") :
		console.error(" ✖︎  obterProducaoPocos, " + dataProcurada + " length === 0");
}
const obterProducaoPocoTeste = () => {
  let pocoProducao = Producao.obterProducaoPoco("Poço_1", "9/6/2025");
  Math.abs(pocoProducao[PRODUCAO_QTD] - 15.97807122947792) < EPSILON ?
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