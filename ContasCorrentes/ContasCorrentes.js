// @ts-nocheck
const contasCorrentesId = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesRange = "Dados!A:H";
const contasCorrrentesSSName = "ContasCorrentes"
const contasCorrenteDataCol = 0;
const contasCorrenteNomeCol = 1;
const contasCorrenteItemCol = 2; 
const contasCorrenteMetodoCol = 3; 
const contasCorrenteValorCreditoCol = 4;
const contasCorrentePesoCreditoCol = 5;
const contasCorrenteValorDebitoCol = 6;
const contasCorrentePesoDebitoCol = 7;
const contasCorrenteComentariosCol = 8;

function meuOnEditGatilho(e) {
  var valorEmReais = 0.00;

  // Inicialize a RendasPorcentagemReais das contas correntes
  armazeneValorGama("RendasPorcentagemReais", 0)

  // Calcule a quantia de ouro, em gramas, ainda em  credito na conta corrente do 
  // associado
  ouroGramas = obtenhaValorGama("RendasPorcentagemOuroGramas")
  valorEmReais = valorDoOuroEmReais(ouroGramas);
  armazeneValorGama("RendasPorcentagemReais", valorEmReais)

  // Calcule o potencial the renda as ser auferida pelo associado ate of find de
  // sua estadia
  calculeRendasGanhar();
}


// *********************************************************************************
// valorDoOuroEmReais
// 
// Input
//  ouroGramas (float) A quantia de ouro (gramas)
//    
// Output
//  Range  (RendasPorcentagemReais A quantia em reais, equivalente a quantia de ouro, 
//  em gramas, ainda em credito na conta corrente do associado
// * ********************************************************************************
// 
function valorDoOuroEmReais(ouroGramas) {
  var cotacaoOuroRegistro = [];
  var cotacaoOuro = 0.00
  var rendasPorcentagemReais = 0.00
  var hoje = new Date();


  // Obtenha cotacao do ouro, em gramas; 
  // cotacaoOuroRegistro = obtenhaCotacaoOuro(hoje);
  // cotacaoOuro = cotacaoOuroRegistro[ouro24KaratOncaCol];
  cotacaoOuro = obtenhaCotacaoOuroSimples()

  //  Calcule a renda em reais, equivalente a quantia de ouro, 
  //  em gramas, ainda em credito na conta corrente do associado
  rendasPorcentagemReais = ouroGramas * cotacaoOuro

  return rendasPorcentagemReais;
}

// *********************************************************************************
// calculeRendasGanhar
// 
// Input
//    
// Output
//  A gama Saldo, atualizada
// * ********************************************************************************
// 
function calculeRendasGanhar() {
  var nomeAssociado = obtenhaValorGama("Associado");
  var inicioEstadia = obtenhaDadoEstadiaAtiva(nomeAssociado, estadiaDadosRangeComecoCol);
  var metodo        = obtenhaDadoEstadiaAtiva(nomeAssociado, estadiaDadosRangeMetodoCol);
  var tarefa        = obtenhaDadoEstadiaAtiva(nomeAssociado, estadiaDadosRangeTarefaCol);

  var saldoGanhar = 0.00;
  switch (metodo) {
    case "Diária":
      saldoGanhar = calculeDiariaGanhar(nomeAssociado, inicioEstadia, metodo, tarefa);
      break;
    case "Salário":
      saldoGanhar = calculeSalarioGanhar(nomeAssociado, inicioEstadia, metodo, tarefa);
      break;
    case "Porcentagem":
      saldoGanhar = calculePorcentagemGanhar(nomeAssociado, inicioEstadia, metodo, tarefa);
      break;
    default:
      break;
  }

  // Armazene o saldo a ganhar no summario das contas correntes
  armazeneValorGama("SaldoGanhar", saldoGanhar)
  return false;
}

// *********************************************************************************
// obtenhaDadoEstadiaAtiva
// Obtenha o dado com o nome em nomeAssociado, e a coluna em dadoColuna. Note que
// essa funcao so fornece dados para associados com estadias ativas
// 
// Input
//    nomeAssociado
//    dadoColumna
// Output
//  O dado na linha com o nome do associado, e a coluna do dadoColuna; campo em
//  branco no caso the nao have estadia ativa para nomeAssociado
//
//  Note que os valores para access a planilha Estadia encontram-se no arquivo 
//  Estadia.gs
// * ********************************************************************************
// 
function obtenhaDadoEstadiaAtiva(nomeAssociado, dadoColumna) {
  var dadoProcurado = "";
  var achou = false
  estadiaDadosVals.forEach(function (estadiaDadosRegistro) {
    if (!achou && 
        estadiaDadosRegistro[estadiaDadosRangeNomeCol] != "Nome" && 
        estadiaDadosRegistro[estadiaDadosRangeNomeCol] != "" &&
        estadiaDadosRegistro[estadiaDadosRangeFechadaCol] == "")  {
      if (nomeAssociado == estadiaDadosRegistro[estadiaDadosRangeNomeCol]) {
        achou = true;
        dadoProcurado = estadiaDadosRegistro[dadoColumna];
      }
    }
  })
  return dadoProcurado;
}

// *********************************************************************************
// calculeDiariaGanhar
// 
// Input
//    nomeAssociado
//    inicioEstadia
//    metodo
//    tarefa
// Output
//  A diaria a ser ganha pelo associado entre hoje e o final de sua estadia
//
// * ********************************************************************************
// 
function calculeDiariaGanhar (nomeAssociado,  inicioEstadia, metodo, tarefa) {
  var diariaGanhar = 0;
  var diaria = obtenhaRemuneracao (metodo, tarefa)
  var fimEstadia = inicioEstadia.addDays(90)
  var timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  var diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24)); 

  var diariaGanhar = diasRestantes * diaria;
  return diariaGanhar;
}

// *********************************************************************************
// calculeSalarioGanhar
// 
// Input
//    nomeAssociado
//    inicioEstadia
//    metodo
//    tarefa
// Output
//  O salario a ser ganho pelo associado entre hoje e o final de sua estadia,
//  calculado baseado no ganhos diarios
//
// * ********************************************************************************
// 
function calculeSalarioGanhar(nomeAssociado,  inicioEstadia, metodo, tarefa){
  var salarioGanhar = 0;
  var mesesRestantes = 0;
  var salario = obtenhaRemuneracao (metodo, tarefa)
  var fimEstadia = inicioEstadia.addDays(90)
  var timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  var diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24));

  var salarioGanhar = diasRestantes * salario / 30;
  return salarioGanhar;
}

// *********************************************************************************
// calculePorcentagemGanhar
// 
// Input
//    nomeAssociado
// Output
//  O sado to associado, calculado como um trabalhador on poco, que recebe baseado,\
//  na producao diaria de ouro 
//
// * ********************************************************************************
// 
function calculePorcentagemGanhar(nomeAssociado,  inicioEstadia, metodo, tarefa) {
  var gramasEstimadasGanhar = 0;
  var diasRestantes = 0;
  var hoje = new Date();
  var producaoOuroRegistro = [];
  var estimativaDeCotaDiariaAssociado = 0.00
  var estimativaDoValorGanhar = 0.00

  //  Calcule o número de dias restantes nessa estadia
  var fimEstadia = inicioEstadia.addDays(90)
  var timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  var diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Obtenha a porcentagem dos associados alocada ao associadp
  var porcentagem = obtenhaRemuneracao (metodo, tarefa)

  // Obtenha a media de producao de ouro alocada aos associados
  producaoOuroRegistro = obtenhaProducaoOuro(hoje);
  estimativaDeCotaDiariaAssociado = producaoOuroRegistro[producaoPosAssociadosMediaCol]

  // Obtenha a cotacao do ouro hoje
  // cotacaoOuroRegistro = obtenhaCotacaoOuro(hoje);
  // cotacaoOuro = cotacaoOuroRegistro[ouro24KaratOncaCol];
  cotacaoOuro = obtenhaCotacaoOuroSimples();

  //  Calcule of valor estimado a ser ganho, no valor do ouro
  var gramasEstimadasGanhar = estimativaDeCotaDiariaAssociado * diasRestantes * porcentagem;
  estimativaDoValorGanhar = gramasEstimadasGanhar*cotacaoOuro;

  return estimativaDoValorGanhar;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// *********************************************************************************
// obtenhaRendasPorcentagem
// 
// Input
//    A gama contendo as rendas auferidas atraves do credito em ouro 
// Output
//    O valor dessa rendar
// * ********************************************************************************
// 
function obtenhaRendasPorcentagem() {
  return obtenhaValorGama("RendasPorcentagem");
}

// *********************************************************************************
// obtenhaRendasDiaria
// 
// Input
//   O nome da gama contendo as rendas auferidas atraves das rendas diarias 
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaRendasDiaria() {
  return obtenhaValorGama("RendasDiaria");
}

// *********************************************************************************
// obtenhaRendasSalario
// 
// Input
//    O nome da gama contendo as rendas auferidas atraves das rendas salario 
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaRendasSalario() {
  return obtenhaValorGama("RendasSalario");
}

// *********************************************************************************
// obtenhaDespesasPix
// 
// Input
//   O nome da gama contendo as despesas PIX
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaDespesasPix() {
  return obtenhaValorGama("DespesasPIX");
}

// *********************************************************************************
// obtenhaDespesasDiversos
// 
// Input
//   O nome da gama contendo as despesas diversas
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaDespesasDiversos() {
  return obtenhaValorGama("DespesasDiversos");
}

// *********************************************************************************
// obtenhaDespesaCantina
// 
// Input
//    O nome da gama contendo as despesas na cantina 
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaDespesaCantina() {
  return obtenhaValorGama("DespesasCantina");
}

// *********************************************************************************
// obtenhaValorGama
// 
// Input
//    A gama contendo o valor procurado 
// Output
//    O valor procurado
// * ********************************************************************************
// 
function obtenhaValorGama(nomeGama) {
  var valorProcurado = "";
    const contaCorrenteIDSS = SpreadsheetApp.openById(contasCorrentesId);
    const valorProcuradoVals = contaCorrenteIDSS.getRangeByName(nomeGama).getValues();
    valorProcurado = valorProcuradoVals[0][0];
  return valorProcurado;
}


// *********************************************************************************
// armazeneValorGama
// 
// Input
//    nomeGama (Range) O nome da gama aonde armazenar o valor
//    valor (float) O valor a ser armazenado
// Output
//    Nenhum
// * ********************************************************************************
// 
function armazeneValorGama(nomeGama, valor) {
  var values = [[valor]];
  const contaCorrenteIDSS = SpreadsheetApp.openById(contasCorrentesId);
  contaCorrenteIDSS.getRangeByName(nomeGama).setValues(values);
}
