const cantinaPrecosID = "1zvMAV3FiQfOKwb6_gLX5BBceSNhLJzK8dO1MF3nstL4";
const cantinaPrecosSheet = SpreadsheetApp.openById(cantinaPrecosID).getSheetByName("Dados");
const cantinaPrecosGama = cantinaPrecosSheet.getRange("CantinaPrecoGama").getValues();

const cantinaPrecosItemCol = 0;
const cantinaPrecosRealCol = 1;	
const cantinaPrecosOuroCol = 2;	

function test( ) {
	var filteredGama = cantinaPrecosGama.filter(function(transaction) {
		return transaction[cantinaPrecosItemCol] != "Nome" &&
		transaction[cantinaPrecosItemCol] != "";
	});
	if (filteredGama.length == 0) {
		var message = "";
		message += "Nao ha nehuma trasacao a ser processada";
		return null;
	}
	return 42;
}
function precoGramasDeOuro() {
	// Obtenha o valor do grama de ouro
	 var cotacaoOuro = obtenhaCotacaoOuroSimples()

	cantinaPrecosGama.forEach(function(transaction) {	
		if (transaction[cantinaPrecosItemCol] != "Nome" &&
			transaction[cantinaPrecosItemCol] != "") {
			transaction[cantinaPrecosOuroCol] = transaction[cantinaPrecosRealCol] / cotacaoOuro;
		}
	});
	cantinaPrecosSheet.getRange("CantinaPrecoGama").setValues(cantinaPrecosGama);
}
