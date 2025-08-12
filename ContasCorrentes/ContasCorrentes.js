// @ts-nocheck
const contasCorrentesId = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesSheet = SpreadsheetApp.openById(contasCorrentesId);
const contasCorrrentesSSName = "ContasCorrentes"
const contasCorrentesRange 				  = "Dados";
const contasCorrentesNome 				  = "ContasCorrentesNome";
const contasCorrentesEstadia 			  = "ContasCorrentesEstadia";
const contasCorrentesRendasDepesas 		  = "TransacoesRendasDepesas";	
const contasCorrentesCreditoReal          = "CreditoReal";
const contasCorrentesCreditoOuro          = "CreditoOuro";
const contasCorrentesDebitoReal           = "DebitoReal";	
const contasCorrentesDebitoOuro           = "DebitoOuro";
const contasCorrentesDataCol              = 0;
const contasCorrentesNomeCol              = 1;
const contasCorrentesEstadiaCol           = 2;
const contasCorrentesMetodoCol            = 3;  // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos
const contasCorrentesMoedaCol             = 4   // Real, Ouro
const contasCorrentesCreditDebitCol       = 5;  // Credito, Debito
const contasCorrentesItemCol              = 6;
const contasCorrentesPrecoUnidadeRealCol  = 7;  // Real
const contasCorrentesPrecoUnidadeOuroCol  = 8;  // Gramas de ouro 
const contasCorrentesItemQtdCol           = 9;
const contasCorrentesTotalRealCol         = 10; // Real
const contasCorrentesTotalOuroCol         = 11; // Gramas de ouro
const contasCorrentesComentariosCol       = 12;

function meuOnEditGatilho(e) {
	contasCorrentesSheet.getRangeByName(contasCorrentesCreditoReal).setValues([[0]]);
	contasCorrentesSheet.getRangeByName(contasCorrentesCreditoOuro).setValues([[0]]);
	contasCorrentesSheet.getRangeByName(contasCorrentesDebitoReal).setValues([[0]]);
	contasCorrentesSheet.getRangeByName(contasCorrentesDebitoOuro).setValues([[0]]);

	var nome = contasCorrentesSheet.getRangeByName(contasCorrentesNome).getValues()[0][0];
	var estadia = contasCorrentesSheet.getRangeByName(contasCorrentesEstadia).getValues()[0][0];
	var trasactions = contasCorrentesSheet.getRangeByName(contasCorrentesRendasDepesas).getValues();
	if (nome == "" || estadia == "") {
		var message = "";
		message += "O nome do associado ou a estadia nao foram preenchidos";
		console.error(message);
		return;
	}
	if (trasactions.length == 0) {
		var message = "";
		message += "Nao ha nehuma trasacao a ser processada";
		console.error(message);	
	}
	var creditosDebitos = calculateCreditsAndDebts(nome, estadia, trasactions);
	contasCorrentesSheet.getRangeByName(contasCorrentesCreditoReal).setValues([[creditosDebitos["Credito"]["Real"]]]);
	contasCorrentesSheet.getRangeByName(contasCorrentesCreditoOuro).setValues([[creditosDebitos["Credito"]["Ouro"]]]);
	contasCorrentesSheet.getRangeByName(contasCorrentesDebitoReal).setValues([[creditosDebitos["Debito"]["Real"]]]);
	contasCorrentesSheet.getRangeByName(contasCorrentesDebitoOuro).setValues([[creditosDebitos["Debito"]["Ouro"]]]);

	var rendasFuturas = calculeRendasGanhar(nome, estadia, trasactions);
	contasCorrentesSheet.getRangeByName("AGanharReal").setValues([[rendasFuturas["Real"]]]);
	contasCorrentesSheet.getRangeByName("AGanharOuro").setValues([[rendasFuturas["Ouro"]]]);
}

function calculateCreditsAndDebts (nome, estadia, trasactions) {
  var estadiaDia = new Date(estadia).getDay();
  var estadiaMes = new Date(estadia).getMonth();
  var estadiaAno = new Date(estadia).getFullYear();
	var creditsAndDebtsRealOuro = {
		Credito: {
			Real: 0,
			Ouro: 0
		},
		Debito: {
			Real: 0,
			Ouro: 0
		},
	}
	if (trasactions.length == 0) {
		var message = "";
		message += "Nao ha nehuma trasacao a ser processada";
		return null;
	}
  var filteredTransactions = trasactions.filter(function(transaction) {
    return transaction[contasCorrentesNomeCol] == nome &&
           transaction[contasCorrentesDataCol] != "" &&
           new Date(transaction[contasCorrentesEstadiaCol]).getDay() == estadiaDia &&
           new Date(transaction[contasCorrentesEstadiaCol]).getMonth() == estadiaMes &&
           new Date(transaction[contasCorrentesEstadiaCol]).getFullYear() == estadiaAno;
  });
	if (filteredTransactions.length == 0) {
		var message = "";
		message += "Nao ha nehuma trasacao a ser processada";
		return null;
	}

	for (i=0; i < filteredTransactions.length; i++) {
    var creditoDebito = trasactions[i][contasCorrentesCreditDebitCol]
		switch (creditoDebito) {
			// Caso o valor do atributo Credito/Debito seja Credito, some o valor	
			// do atributo TotalReal e TotalOuro, de acordo com o valor do atributo
			// Moeda, ao valor do atributo Credito, na gama CreditosEDeb
			// itosRealOuro caso o valor do atributo Moeda seja Real, some ao Credito Real,
			// e caso o valor do atributo Moeda seja Ouro, some ao Credito Ouro
			// caso o valor do atributo Moeda seja invalido, retorne uma mensagem de
			// erro e retorne null
			case "Credito":
        		var moeda = filteredTransactions[i][contasCorrentesMoedaCol];
        		switch (moeda) {
					// Caso o valor do atributo Moeda seja Real, some ao Credito Real
					// caso o valor do atributo Moeda seja Ouro, some ao Credito Ouro
					// caso o valor do atributo Moeda seja invalido, retorne uma mensagem de
					// erro e retorne null
					case "Real":
						creditsAndDebtsRealOuro["Credito"]["Real"] += filteredTransactions[i][contasCorrentesTotalRealCol];
						break;
					// Caso o valor do atributo Moeda seja Ouro, some ao Credito Ouro	
					// caso o valor do atributo Moeda seja invalido, retorne uma mensagem de
					// erro e retorne null
					// caso o valor do atributo Moeda seja Real, some ao Credito Real
					// caso o valor do atributo Moeda seja invalido, retorne uma mensagem de	
					case "Ouro":
						creditsAndDebtsRealOuro["Credito"]["Ouro"] += filteredTransactions[i][contasCorrentesTotalOuroCol];
						break;
					// Caso o valor do atributo Moeda seja invalido, retorne uma mensagem de	
					// erro e retorne null	
					default:
						var message = "";
						message += "Valor do atributo Moeda invalido (";
						message += filteredTransactions[i][moedaCol];
						message += ") na linha #"
						message += i;
						message += " na matrix de transacoes";
						return null;
				}
				break;
			// Caso o valor do atributo Credito/Debito seja Debito, some o valor
			// do atributo TotalReal e TotalOuro, de acordo com o valor do atributo
			// Moeda, ao valor do atributo Debito, na gama CreditosEDebitosRealOuro
			// caso o valor do atributo Moeda seja Real, some ao Debito Real, e caso
			// o valor do atributo Moeda seja Ouro, some ao Debito Ouro
			// caso o valor do atributo Moeda seja invalido, retorne uma mensagem de
			// erro e retorne null	
			case "Debito":
        		var moeda = filteredTransactions[i][contasCorrentesMoedaCol];
				switch (moeda) {
					// Caso o valor do atributo Moeda seja Real, some ao Debito Real
					// caso o valor do atributo Moeda seja Ouro, some ao Debito Ouro
					// caso o valor do atributo Moeda seja invalido, retorne uma mensagem de
					// erro e retorne null
					// caso o valor do atributo Moeda seja Real, some ao Debito Real		
					case "Real":
						creditsAndDebtsRealOuro["Debito"]["Real"] += filteredTransactions[i][contasCorrentesTotalRealCol];
						break;
					// Caso o valor do atributo Moeda seja Ouro, some ao Debito Ouro	
					case "Ouro":
						creditsAndDebtsRealOuro["Debito"]["Ouro"] += filteredTransactions[i][contasCorrentesTotalOuroCol];
						break;
					// Caso o valor do atributo Moeda seja invalido, retorne uma mensagem de	
					// erro e retorne null
					// caso o valor do atributo Moeda seja Real, some ao Debito Real	
					default:
						var message = "";
						message += "Valor do atributo Moeda invalido (";
						message += filteredTransactions[i][contasCorrentesMoedaCol];
						message += ") na linha #"
						message += i;
						message += " na matrix de transacoes";
						return null;
				}
				break;
			// Caso o valor do atributo Credito/Debito seja invalido, retorne
			// uma mensagem de erro
			// e retorne null
			default:
				var message = "";
				message += "Valor do atributo Credito/Debito invalido (";
				message += filteredTransactions[i][contasCorrentesCreditDebitCol];
				message += ") na linha #"
				message += i;
				message += " na matrix de transacoes"
				console.error(message)
				return null;
		}
	}
	return creditsAndDebtsRealOuro;
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
function calculeRendasGanhar(nomeAssociado, inicioEstadia) {
  var metodo        = obtenhaDadoEstadiaAtiva(nomeAssociado, estadiaDadosRangeMetodoCol);
  var tarefa        = obtenhaDadoEstadiaAtiva(nomeAssociado, estadiaDadosRangeTarefaCol);
  var rendasFuturas = {
	"Real": 0.00,
	"Ouro": 0.00
  }

  var saldoGanhar = 0.00;
  switch (metodo) {
    case "Diária":
      saldoGanhar = calculeDiariaGanhar(nomeAssociado, inicioEstadia, metodo, tarefa);
	  rendasFuturas["Real"]= saldoGanhar;
      break;
    case "Salário":
      saldoGanhar = calculeSalarioGanhar(nomeAssociado, inicioEstadia, metodo, tarefa);
	  rendasFuturas["Real"]= saldoGanhar;
      break;
    case "Porcentagem":
      saldoGanhar = calculePorcentagemGanhar(nomeAssociado, inicioEstadia, metodo, tarefa);
	  rendasFuturas["Ouro"]= saldoGanhar;
      break;
    default:
      break;
  }

  return rendasFuturas;
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
