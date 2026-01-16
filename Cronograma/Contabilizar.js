/*
 * O planejador inspeciona e, caso necessário, atualiza os registros em 
 * Estado[Inspecionar] na planilha Cronograma!Ativos. Uma vez que o planejador
 * esteja satisfeito com esses registros, ele usa o menu Contabilizar, acionarndo a 
 * lógica que contabiliza os registros na planiha Cronograma!Ativos em 
 * Estado[Inspecionar]. Uma vez contabilizados, esses registros são removidos da
 * planilha Cronograma!Ativos.
 * 
 * Isso, com exceção decolaboradores que trabalharam em poços para os quais suas 
 * produções ainda não foram gravadas; nesse caso, o sistema preserva esses 
 * registros.
 * 
 * Uma vez que ocolaborador responsável registra a produção de um poço para um 
 * determinado dia, ele pode acionar o menu Contabilizar para contabilizar os 
 * os resgistros a espera pela produção do poço.
 */
function cronogramaContabilizar() {
    SpreadsheetApp.getActiveSpreadsheet().toast('Inicio', 'Contabilizar', 3);

	// Selecionar todos os registros na planilha Cronograma!Ativos que estão no 
	// estado 'Inspecionar'
  const contaCorrentesIDSS = SpreadsheetApp.openById(contasCorrentesId);
	let ativosGamaVals = obterAtivosGamaVals();
	let informarAtivosGamaVals = ativosGamaVals.filter( elemento => 'Inspecionar' === elemento[ATIVOS_ESTADO]);
	if (informarAtivosGamaVals.length === 0) {
		SpreadsheetApp.getActiveSpreadsheet().toast('Não há registros para Inspecionar', 'Inspecionar', 3);
		return;
	}

	// Construa uma matrix com as datas dos registros a serem contabilizados. 				
	let datasContabilizar = []
	informarAtivosGamaVals.forEach( elemento => {
		let dataStr = CararaLibrary.dateToString(elemento[ATIVOS_DATA]);
		if (datasContabilizar.indexOf(dataStr) === -1) {
			datasContabilizar.push(dataStr);
		}
	});
	
	// Processar os registros a serem contabilizados. Contabilizar todos os 
	// registros com Método igual a Diária. Contabilizar registros com Método 
	// igual a Salário caso seja o ultima dia do mês; caso contrário, 
	// contabilizar o registro como zero. Contabilizar os registros, 
	// Porcentagem, caso a producao do poço seja maior que zero. Remover os 
	// registros que foram contabilizados. 
	// 
	let contaCorrenteRegistro = [];
	let contasCorrentesRangeDados = [];
  let registrosContabilizados = [];
  let registrosNaoContabilizados = [];
	informarAtivosGamaVals.forEach( elemento => {
	  const datastr           = CararaLibrary.dateToString(elemento[ATIVOS_DATA]);
    const metodo            = elemento[ATIVOS_METODO];
    const setor              = elemento[ATIVOS_SETOR];
    const local             = elemento[ATIVOS_LOCAL];
    const tarefa            = elemento[ATIVOS_TAREFA];
    const chave             = datastr + elemento[ATIVOS_PERIODO] + elemento[ATIVOS_NOME];
    const chaveProducao     = datastr + elemento[ATIVOS_LOCAL] +  elemento[ATIVOS_PERIODO]
    let contabilizeRegistro = true;
    if (metodo != "") {
      contaCorrenteRegistro = [];
      contaCorrenteRegistro[contasCorrentesDataCol]        = elemento[ATIVOS_DATA];
      contaCorrenteRegistro[contasCorrentesNomeCol]        = elemento[ATIVOS_NOME];
      contaCorrenteRegistro[contasCorrentesEstadiaCol]     =  elemento[ATIVOS_INICIO];
      contaCorrenteRegistro[contasCorrentesMetodoCol]      = elemento[ATIVOS_METODO];
      contaCorrenteRegistro[contasCorrentesCreditDebitCol] = "Credito"
      contaCorrenteRegistro[contasCorrentesComentariosCol] = elemento[ATIVOS_COMENTARIOS];
      contaCorrenteRegistro[contasCorrentesItemCol]        = setor + "/" + local + "/" + tarefa
      switch (metodo) { 
        case "Diária":
          // Moeda Real
          contaCorrenteRegistro[contasCorrentesMoedaCol] = "Real";
          // Remuneracao em Reais
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] = elemento[ATIVOS_REMUNERACAO];
          // Remuneracao em Gramas de Ouro  
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] = 0
          // Quantidade de items
          contaCorrenteRegistro[contasCorrentesItemQtdCol] = 1;
          // Credito / Debito em Reais
          contaCorrenteRegistro[contasCorrentesTotalRealCol] = elemento[ATIVOS_REMUNERACAO];
          // Credito / Debito em Gramas de Ouro
          contaCorrenteRegistro[contasCorrentesTotalOuroCol] = 0;
          registrosContabilizados.push(elemento);
          break;
        case "Salário":
          // Moeda Real
          contaCorrenteRegistro[contasCorrentesMoedaCol] = "Real";
          // Remuneracao em Reais
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] = elemento[ATIVOS_REMUNERACAO];
          // Remuneracao em Gramas de Ouro
          contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] = 0;
          // Quantidade de items
          contaCorrenteRegistro[contasCorrentesItemQtdCol] = 0;
          // Credito / Debito em Reais  
          contaCorrenteRegistro[contasCorrentesTotalRealCol] = 0;
          // Assalariados recebem o valor total do salário no final do mês  
          if (isLastDayOfMonth(new Date(elemento[ATIVOS_DATA]))) {
              // Quantidade de items
              contaCorrenteRegistro[contasCorrentesItemQtdCol] = 1;
              // Credito / Debito em Reais  
              contaCorrenteRegistro[contasCorrentesTotalRealCol] = elemento[ATIVOS_REMUNERACAO];
          }
          // Credito / Debito em Gramas de Ouro
          contaCorrenteRegistro[contasCorrentesTotalOuroCol] = 0; 
          registrosContabilizados.push(elemento);
          break;
        case "Porcentagem":
        case  "Meio_A_Meio":
          let producaoDataPocoPeriodo = Producao.obterProducaoDataPocoPeriodoChave(chaveProducao)
          if (producaoDataPocoPeriodo !== null) {
          // if (producaoDiaria[datastr][poco] !== undefined) {
            // Moeda Ouro
            contaCorrenteRegistro[contasCorrentesMoedaCol] = "Ouro";
            // Remuneracao em Reais
            contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol] = 0;
            // Remuneracao em Gramas de Ouro
            contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol] = elemento[ATIVOS_REMUNERACAO];
            // Quantidade de items
            contaCorrenteRegistro[contasCorrentesItemQtdCol] = 1;
            // Credito / Debito em Reais
            contaCorrenteRegistro[contasCorrentesTotalRealCol] = 0;
            // Credito / Debito em Gramas de Ouro
            // contaCorrenteRegistro[contasCorrentesTotalOuroCol] = producaoDiaria[datastr][poco] * elemento[ATIVOS_REMUNERACAO];
            contaCorrenteRegistro[contasCorrentesTotalOuroCol] = producaoDataPocoPeriodo * elemento[ATIVOS_REMUNERACAO];
            registrosContabilizados.push(elemento);
          }
          else {
            // Nao contabilizar esse registro ainda, pois a producao do poco 
            // ainda nao foi registrada
            elemento[ATIVOS_COMENTARIOS] = "Aguardando Produção do Poço";
            registrosNaoContabilizados.push(chave);
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

  // Append
  if (contasCorrentesRangeDados.length > 0) {
    var contaCorrentesDados = contaCorrentesIDSS.getSheetByName("Dados");
    var lastRow = contaCorrentesDados.getLastRow();
    contaCorrentesDados.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)
  }

  // Remover os registros contabilizados da planilha Cronograma!Ativos
    let registrosContabilizadosChaves = registrosContabilizados.map( elemento => 
    CararaLibrary.dateToString(elemento[ATIVOS_DATA]) + elemento[ATIVOS_PERIODO] + elemento[ATIVOS_NOME]
  );
	let ativosPlanilha = obterAtivosPlanilha();
	obterAtivosGama().clear({contentsOnly:true, validationsOnly:true});
  let newAtivosGamaVals = []   
  ativosGamaVals.forEach( registroAtivo => {
    let chaveAtivo = CararaLibrary.dateToString(registroAtivo[ATIVOS_DATA]) + registroAtivo[ATIVOS_PERIODO] + registroAtivo[ATIVOS_NOME];
    registrosContabilizadosChaves.indexOf(chaveAtivo) === -1 ? newAtivosGamaVals.push([...registroAtivo]) : null;
  });
  if (newAtivosGamaVals.length > 0) {
	  copiarGamaValsParaPlanilha(ativosPlanilha, newAtivosGamaVals);    
		estabelederValidacaoDados(ativosPlanilha, ATIVOS_METODO+1, 	ATIVOS_METODOS_VALIDOS);
		estabelederValidacaoDados(ativosPlanilha, ATIVOS_SETOR+1, 	ATIVOS_SETORES_VALIDOS);
		estabelederValidacaoDados(ativosPlanilha, ATIVOS_LOCAL+1, 	ATIVOS_LOCAIS_VALIDOS);
		estabelederValidacaoDados(ativosPlanilha, ATIVOS_TAREFA+1, 	ATIVOS_TAREFAS_VALIDAS);
	  ativoGama = obterAtivosGama
	  ativoGama().setBackground('#ffffff');

	  // Destaque os resgisters que aguardam a produção do poço
	  ativosGamaVals = obterAtivosGamaVals();
	  let ativosSheet = obterAtivosPlanilha();
	  let ultimaAtivoCol = obterAtivosGama().getLastColumn();
	  registrosNaoContabilizados.forEach( chaveNaoContabilizada => {
	    for (let i = 0; i < ativosGamaVals.length; i++) {
	      let chaveAtivos = CararaLibrary.dateToString(ativosGamaVals[i][ATIVOS_DATA]) + ativosGamaVals[i][ATIVOS_PERIODO] + ativosGamaVals[i][ATIVOS_NOME];
	      if (chaveAtivos === chaveNaoContabilizada) { 
	        let row = ativosSheet.setActiveRange(ativosSheet.getRange(i + 2, 1, 1, ultimaAtivoCol));
	        row.setBackground('#fde9e9'); 
	      }
	    }
	  });
  }

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
