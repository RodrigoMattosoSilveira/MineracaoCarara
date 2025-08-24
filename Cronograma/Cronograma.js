

// ****************************************************************************
// selecionarDataTipo - Exibe uma caixa de diálogo onde o usuário pode 
// selecionar o data e tipo do Cronograma a ser criado
// 
// Input
// 		None
// Output
// 		DataTipo (Object) = {
// 			data: <<Date, igual ou adiante ao dia presente>>
// 			tipo: <<String [TipoA | TipoB]
//      }
// ****************************************************************************
// 
function selecionarDataTipo() {
	let DataTipo = {};
	return DataTipo;
}
// ****************************************************************************
// selecionarModelo - O planejador usa um menu suspenso para acionar a lógica 
// para selecionar registros de Cronograma que correspondam ao tipo fornecido e
// sejam os mais recentes, colocando-os na planilha Planejar
// 
// Input
// 		tipo <<String>
// Output
// 		Planejar (Sheet), A planilha Planejar, constituida de um subconjunto de 
// 		registros da planilha Cronograma que são os mais recentes do tipo 
// 		fornecido.  O atributo Estado de cada registro e definido como 
// 		EmPlanejamento; o atributo ContaCorrent de cada registro e definido 
// 		como Pendente
// ****************************************************************************
// 
function selecionarModelo(tipo) {
	let planejar = []
	return planejar
}
// ****************************************************************************
// refinarCronograma - O Planejador adiciona, edita, e remove registros na 
// planilha Planejar manualmente; ele usa um menu suspenso para acionar logica
// para addicionar os registros da planilha Planejar na planilha Cronograma, 
// atualizados com o atributo Estad desses registros definido como Planejado 
// 
// Input
// 		Planejar (Sheet), A planilha Planejar, constituida de um subconjunto de 
// 		registros da planilha Cronograma que são os mais recentes do tipo 
// 		fornecido
// Output
// 		Cronograma (Sheet), A planilha Cronograma atualizada com os registros da
// 		Planilha Planejar com o atributo Estado desses registros definido como 
// 		Planejado
// ****************************************************************************
//
function refinarCronograma(Planejar) {

}
// ****************************************************************************
// informarAssociados - O Planejador aciona a lógica para exibir uma caixa de 
// diálogo com a data e o tipo dos cronogramas com o Estado Planejado. O 
// planejador escolhe of Cronograma a ser publicado and aciona a lógica para
// copiar esses registros para a planilha Informar. O sistema atualiza os 
// os Estado dos registros selecionados na planilha Cronograma selecionado para
// EmExecucao.
// 
// So pode haver um Cronograma em execucao
// 
// Input
// 		Cronograma (Sheet), A planilha Planejar, constituida de um subconjunto
// 		de registros da planilha Cronograma que são os mais recentes do tipo 
// 		fornecido
// Output
// 		Informar (Sheet), A planilha usada para imprimir o Cronograma, 
// 		atualizada e formatada com os registros do Cronograma a ser executado
// 
// 		Cronograma (Sheet), A planilha Cronograma, com os registros selecionados
//  	para publicao e execucao atualizados com o atributo Estado definido como 
// 		EmExecucao
// ****************************************************************************
//
function informarAssociados(Planejar) {

}
// ****************************************************************************
// completarCronograma - O Planejador aciona a lógica para encerrar o 
// Cronograma definido como o subconjunto de registros com Estado definido como 
// EmExecucao. 
// 
// So pode haver um Cronograma em execucao
// 
// Input
// 		Cronograma (Sheet), A planilha Cronograma
// Output
// 		Cronograma (Sheet), A planilha Cronograma, com os registros com Estado
// 		definido como EmExecucao, modificados para Executado
// ****************************************************************************
//
function completarCronograma(Planejar) {

}
// ****************************************************************************
// atualizarContasCorrentes - O Planejador aciona a lógica para lancar as 
// transacoes de rendas de contas correntes auferidas por trabalhos em 
// Cronogramas com os atributos Estado e ContaCorrente iguais a Executado e 
// Pendente repectivamente, usando a seguinte logica. Para cada Associado,'
// considere seu metodo de pagamento:
// - Diaria / Salario
// 		- Lancar a renda auferida pelo Associado em sua Conta Corrente
// 		- Atualizar o atributo ContasCorrente do Assocido no Cronograma como 
// 		  Lancado
// - Comissao
// 		- Se a producao do poco para o dia que trabalhou existe:
// 		- Lancar a renda auferida pelo Associado emd sua Conta Corrente
// 		- Atualizar o atributo ContasCorrente do Assocido no Cronograma como 
// 		  Lancado
// Input
// 		Cronograma (Sheet), A planilha Cronograma
// Output
// 		Cronograma (Sheet), A planilha Cronograma, com os registros para os
// 		quais foram criadas transacos in Contas Correntes, atualizados para
// 		Lancado
// 
// 		Contas Correntes (Sheet), A planilha Contas Correntes, ,atualiza com as 
// 		Transcoes do de pagamento efetuadas pelo trabalho executado de acordo
// 		com o Cronograma
// ****************************************************************************
//
function atualizarContasCorrentes(Planejar) {

}