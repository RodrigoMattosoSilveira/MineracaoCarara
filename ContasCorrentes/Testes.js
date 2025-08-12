// *********************************************************************************
// Conta Correntes
// * ********************************************************************************
//
function valorDoOuroEmReaisTeste() {
  var valor = valorDoOuroEmReais()
}

// *********************************************************************************
// Estadia
// * ********************************************************************************
//
function obtenhaDadoEstadiaAtivaTeste (){
  var nome = "Pietro Thomas Lorenzo Duarte";
  var coluna = estadiaDadosRangeTarefaCol;
  var dado = obtenhaDadoEstadiaAtiva(nome, coluna);
  Logger.log("Dado Estadia Ativa")
  Logger.log("Nome: " + nome)
  Logger.log("Columa: " + coluna)
  Logger.log("Dado: " + dado)
}
function calculeRendasGanharTeste() {
  var nome = contasCorrentesSheet.getRangeByName("ContasCorrentesNome").getValues()[0][0];
  var estadia = contasCorrentesSheet.getRangeByName("ContasCorrentesEstadia").getValues()[0][0];
  var trasactions = contasCorrentesSheet.getRangeByName("TransacoesRendasDepesas").getValues();
  var creditosDebitos = calculateCreditsAndDebts(nome, estadia, trasactions);
}
