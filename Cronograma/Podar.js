// Remover os registros marcados com "Excluir" na guia Planejar
function cronogramaPodar() {
	// Navegue para a planilha Planejar
		CararaLibrary.activateSheet("Planejar");	

	let planejarPlanilha = obterPlanejarPlanilha();
	let planilhaPlanejarIncluir = obterPlanejarIncluir();
	obterPlanejarGama().clear();

	obterPlanejarGama().clear({contentsOnly: true})
	copiarGamaValsParaPlanilha(planejarPlanilha, planilhaPlanejarIncluir)	
}