function calcularRendasFuturasOuroTeste() {
	let expectedRendas = {
		auferidas: {
		ouro: 0,
		real: 0
	},
	futuras: {
		ouro: 0,
		real: 0
	}
	};
  
	let nome = "Raul Vicente Heitor da Mata";
	let estadia = CararaLibrary.dateToString("11/15/2025");
	let gramasEstimadasGanhar = CararaLibrary.calcularRendasFuturasOuro(nome, estadia)

  typeof gramasEstimadasGanhar !== 'undefined' ? 
		console.info(" ✔︎ futura gramas a ganhar definida") :
		console.error(" ✖︎  futura gramas a ganhar indefinidas");  
}
function GetSaldoTest () {
	GetSaldo();
}