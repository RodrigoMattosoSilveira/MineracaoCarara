/*
 * O planejador inspeciona e, caso necessário, atualiza os registros em 
 * ACAO[Incluir] na planilha Cronograma!Ativos. Uma vez que o planejador
 * esteja satisfeito com esses registros, ele usa o menu Contabilizar, acionarndo 
 * a lógica que addiciona os registros em Cronograma!Ativos com ACAO[Incluir] a 
 * Cronograma!Contablizar e contabiliza os registros na planilha 
 * Cronograma!Contablizar. Uma vez contabilizados, esses registros são removidos
 * da planilha Cronograma!Contablizar.
 * 
 * Isso, com exceção de colaboradores que trabalharam em poços para os quais suas 
 * produções ainda não foram gravadas; nesse caso, o sistema preserva esses 
 * registros.
 * 
 * Uma vez que ocolaborador responsável registra a produção de um poço para um 
 * determinado dia, ele pode acionar o menu Contabilizar para contabilizar os 
 * os resgistros a espera pela produção do poço.
 */
function cronogramaContabilizar() {
  SpreadsheetApp.getActiveSpreadsheet().toast('Inicio', 'Contabilizar', 3);

  // Copie os registros da planilha Cronograma!Ativos para a planilha 
  // Cronograma!Contabilizar.
  let contabilizarPlanilha = obterContabilizarPlanilha();
  let ativosGamaVals = obterAtivosGamaVals().filter( elemento => elemento[ATIVOS_ACAO] === "Incluir" );
  if (ativosGamaVals.length  > 0) { 
    // copiarGama (transacoes, planilhaAlvo, gamaAlvoLinha, gamaAlvoColumna)
    let planilhaLinha = contabilizarPlanilha.getLastRow() + 1;
    let planilhaColumna = 1;
    CararaLibrary.copiarGama (ativosGamaVals, contabilizarPlanilha, planilhaLinha, planilhaColumna);
  }

	// Processar os registros a serem contabilizados. Contabilizar todos os 
	// registros com Método igual a Diária. Contabilizar registros com Método 
	// igual a Salário; use zero para o total a menos que seja o ultima dia do
  // mês; Contabilizar os registros, Porcentagem, caso a producao do poço seja 
  // maior que zero. 
  // 
  // Remover os registros que foram contabilizados. 
	// 
	let contaCorrenteRegistro = [];
	let contasCorrentesRangeDados = [];
  let registrosContabilizados = [];
  let registrosNaoContabilizados = [];
  var ss = obterContabilizarPlanilha()
  var names = ss.getNamedRanges();
  names.forEach(function(n) {
    Logger.log("Name: " + n.getName() + " → Range: " + n.getRange().getA1Notation());
  });
  let contabilizarGamaVals = obterContabilizarGamaVals();
	contabilizarGamaVals.forEach( elemento => {
	  const datastr           = CararaLibrary.dateToString(elemento[CONTABILIZAR_DATA]);
    const metodo            = elemento[CONTABILIZAR_METODO];
    const setor             = elemento[CONTABILIZAR_SETOR];
    const local             = elemento[CONTABILIZAR_LOCAL];
    const tarefa            = elemento[CONTABILIZAR_TAREFA];
    const chaveProducao     = datastr + elemento[CONTABILIZAR_LOCAL] +  elemento[CONTABILIZAR_PERIODO]
    let contabilizeRegistro = true;
    if (metodo != "") {
      contaCorrenteRegistro = [];
      contaCorrenteRegistro[contasCorrentesDataCol]        = elemento[CONTABILIZAR_DATA];
      contaCorrenteRegistro[contasCorrentesNomeCol]        = elemento[CONTABILIZAR_NOME];
      contaCorrenteRegistro[contasCorrentesEstadiaCol]     =  elemento[CONTABILIZAR_INICIO];
      contaCorrenteRegistro[contasCorrentesMetodoCol]      = elemento[CONTABILIZAR_METODO];
      contaCorrenteRegistro[contasCorrentesCreditDebitCol] = "Credito"
      contaCorrenteRegistro[contasCorrentesComentariosCol] = elemento[CONTABILIZAR_COMENTARIOS];
      contaCorrenteRegistro[contasCorrentesItemCol]        = metodo + "/" + setor + "/" + local + "/" + tarefa
      switch (metodo) { 
        case "Diária":
          // Moeda Real
          contaCorrenteRegistro[contasCorrentesMoedaCol] = "Real";
          // Remuneracao em Reais
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] = elemento[CONTABILIZAR_REMUNERACAO];
          // Remuneracao em Gramas de Ouro  
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] = 0
          // Quantidade de items
          contaCorrenteRegistro[contasCorrentesItemQtdCol] = 1;
          // Credito / Debito em Reais
          contaCorrenteRegistro[contasCorrentesTotalRealCol] = elemento[CONTABILIZAR_REMUNERACAO];
          // Credito / Debito em Gramas de Ouro
          contaCorrenteRegistro[contasCorrentesTotalOuroCol] = 0;
          registrosContabilizados.push(elemento);
          break;
        case "Salário":
          // Moeda Real
          contaCorrenteRegistro[contasCorrentesMoedaCol] = "Real";
          // Remuneracao em Reais
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] = elemento[CONTABILIZAR_REMUNERACAO];
          // Remuneracao em Gramas de Ouro  
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] = 0
          // Quantidade de items
          contaCorrenteRegistro[contasCorrentesItemQtdCol] = 1;
          // Credito / Debito em Reais
          let dataRegistro = new Date(elemento[CONTABILIZAR_DATA]);
          try {
            let numeroDeDiasNesseMes = ObterNumberoDeDiasNoMesDessaData(dataRegistro); //
            contaCorrenteRegistro[contasCorrentesTotalRealCol] = elemento[CONTABILIZAR_REMUNERACAO] / numeroDeDiasNesseMes;
          } 
          catch (err) {
            contaCorrenteRegistro[contasCorrentesTotalRealCol] = 0;
            contaCorrenteRegistro[contasCorrentesComentariosCol] = "Erro ao calcular o salário: número de dias no mês inválido";
          }
          // Credito / Debito em Gramas de Ouro
          contaCorrenteRegistro[contasCorrentesTotalOuroCol] = 0;
          registrosContabilizados.push(elemento);
          break;
        case "Porcentagem":
        case  "Meio_A_Meio":
          let data    = elemento[CONTABILIZAR_DATA];
          let poco    = elemento[CONTABILIZAR_LOCAL];
          let periodo = elemento[CONTABILIZAR_PERIODO];
          let producaoDataPocoPeriodo = Producao.obterProducaoDataPocoPeriodo(data, poco, periodo);
          if (producaoDataPocoPeriodo !== null) {
          // if (producaoDiaria[datastr][poco] !== undefined) {
            // Moeda Ouro
            contaCorrenteRegistro[contasCorrentesMoedaCol] = "Ouro";
            // Remuneracao em Reais
            contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] = 0;
            // Remuneracao em Gramas de Ouro
            contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] = elemento[CONTABILIZAR_REMUNERACAO];
            // Quantidade de items
            contaCorrenteRegistro[contasCorrentesItemQtdCol] = 1;
            // Credito / Debito em Reais
            contaCorrenteRegistro[contasCorrentesTotalRealCol] = 0;
            // Credito / Debito em Gramas de Ouro
            // contaCorrenteRegistro[contasCorrentesTotalOuroCol] = producaoDiaria[datastr][poco] * elemento[CONTABILIZAR_REMUNERACAO];
            contaCorrenteRegistro[contasCorrentesTotalOuroCol] = producaoDataPocoPeriodo * elemento[CONTABILIZAR_REMUNERACAO];
             elemento[CONTABILIZAR_COMENTARIOS] = "";
            registrosContabilizados.push(elemento);
          }
          else {
            elemento[CONTABILIZAR_COMENTARIOS] = "Aguardando Produção do Poço";
            registrosNaoContabilizados.push(elemento);
            contabilizeRegistro = false;
          }
          break;
        default:
          var message = ""
          message += "Metodo de pagamento invalido: " + metodo
          Logger.log(message);
          contabilizeRegistro = false;
          break;  
      }
      if (contabilizeRegistro) {
        contasCorrentesRangeDados.push(contaCorrenteRegistro) 
      }
    }
  })

  // Append os registros contabilizados na planilha ContasCorrentes!Dados
   if (contasCorrentesRangeDados.length  > 0) { 
    // copiarGama (transacoes, planilhaAlvo, gamaAlvoLinha, gamaAlvoColumna)
    let contaCorrentesDadosPlanilha = obterContasCorrentesPlanilha();
    let planilhaLinha = contaCorrentesDadosPlanilha.getLastRow() + 1;
    let planilhaColumna = 1;
    CararaLibrary.copiarGama (contasCorrentesRangeDados, contaCorrentesDadosPlanilha, planilhaLinha, planilhaColumna);
  }

  // Remover os registros contabilizados da planilha Cronograma!Ativos
  obterContabilizarGama().clear();
  if (registrosNaoContabilizados.length > 0) {
    // copiarGama (transacoes, planilhaAlvo, gamaAlvoLinha, gamaAlvoColumna)
    let planilhaLinha = contabilizarPlanilha.getLastRow() + 1;
    let planilhaColumna = 1;
    CararaLibrary.copiarGama (registrosNaoContabilizados, contabilizarPlanilha, planilhaLinha, planilhaColumna);
  } 

  limparContentDataValidations(obterAtivosGama());

	SpreadsheetApp.getActiveSpreadsheet().toast('O sistema contabilizou os ganhos doscolaboradores', 'Contabilizar', 3);
}

/****************************************************************************
 * Verificar se a data fornecida é o último dia do mês
 *
 * @parm {Date} transactionDate
 * @returns {boolean} true, no caso de a data ser o último dia do mês; false 
 *caso contrário
 */
function isLastDayOfMonth(transactionDate) {
  var itIs = false;
  const thisDay = transactionDate.getDate();
  const thisMonth = transactionDate.getMonth() + 1;  
  const thisYear = transactionDate.getFullYear();
  const lastDayOfThisMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  if (lastDayOfThisMonth == thisDay) {
    itIs = true;
  }
  return itIs
}

/**
 * Obeter o número de dias no mês da data fornecida
 * @param {Date} data - a data fornecida
 * @returns {Number} -  o número de dias no mês da data fornecida
 */
function ObterNumberoDeDiasNoMesDessaData(data) {
  // Check if it's a Date object
  if (!(data instanceof Date)) {
    throw new Error("Invalid date. Expected a Date object.");
  }

  // Step 2: Check if it's a valid date (not "Invalid Date")
  if (isNaN(data.getTime())) {
    throw new Error("Invalid date. The date is not a valid Date object.");
  }

  // (month + 1), JavaScript calculates the last day of the current month.
  let numeroDeDiasNoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();
  return numeroDeDiasNoMes;
}