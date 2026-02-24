const estadiaAdicionarColaboradorAdicioneTest = () => {
	let selectedName = 'Melindroso - Cláudio de Souza Oliveira'
	estadiaAdicionarColaboradorAdicione(selectedName);
}
const  estadiaAdicionarColaboradorTest = () => {
  const names = obterPessoasNomes();
  showNamePickerDialog(names, function(selectedName) {
	SpreadsheetApp.getUi().alert("You selected: " + selectedName);
  });
}