// *** Identificação da folha de constas correntes
// 
const contasCorrentesID 		 = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesSpreadSheet = SpreadsheetApp.openById(contasCorrentesID);
const ccColaboradorRange	     = contasCorrentesSpreadSheet.getRangeByName("ContasCorrentesNome");
const ccEstadiaRange		     = contasCorrentesSpreadSheet.getRangeByName("ContasCorrentesEstadia");

const ContasCorrentesTab = contasCorrentesSpreadSheet.getSheetByName("ContasCorrentes");
const CreditoRealRange	 = ContasCorrentesTab.getRange("CreditoReal");
const CreditoOuroRange	 = ContasCorrentesTab.getRange("CreditoOuro");
const DebitoRealRange	 = ContasCorrentesTab.getRange("DebitoReal");
const DebitoOuroRange	 = ContasCorrentesTab.getRange("DebitoOuro");
const FuturoRealRange	 = ContasCorrentesTab.getRange("AGanharReal");
const FuturoOuroRange	 = ContasCorrentesTab.getRange("AGanharOuro");

function getRendas() {
	let colaboradorNome   = ccColaboradorRange.getValue();
  	let colaboradoEstadia = ccEstadiaRange.getValue();
	let rendas = CararaLibrary.calcularRendas(colaboradorNome, CararaLibrary.dateToString(colaboradoEstadia));
	if (rendas != null) {
		CreditoOuroRange.setValue(rendas.auferidas.Ouro.Credito);
		CreditoRealRange.setValue(rendas.auferidas.Real.Credito);
		DebitoOuroRange.setValue(rendas.auferidas.Ouro.Debito);
		DebitoRealRange.setValue(rendas.auferidas.Real.Debito);
		FuturoOuroRange.setValue(rendas.futuras.Ouro);
		FuturoRealRange.setValue(rendas.futuras.Real);
  	}

	// Preencha as transações
	PreencherTransacoes (colaboradorNome, CararaLibrary.dateToString(colaboradoEstadia))
}

/* Preencher as planilhas de transações--Ouro e Real
 * @parm {string} - Nome do colaborador
 * @parm {data}   - Data to inicio da estadia
 * @returns       - None
 */
function PreencherTransacoes (nome, estadia) {
	let transacoes_cc = CararaLibrary.cc_getTransacoesRendasDespesasRange()
		.getValues().filter(transacao_cc => {
			let estadiaDateStr = CararaLibrary.dateToString(transacao_cc[DADOS_ESTADIA_COL]);
			return transacao_cc[DADOS_NOME_COL] === nome && estadiaDateStr === estadia;
	});

	// Configurar a planilha Ouro
	obterOuroNomeGama().setValue(nome);
	obterOuroEstadiaGama().setValue(estadia);
	let ouroGama = obterOuroGama();
	ouroGama.clearContent();
	let moeda = "Ouro";
	let planilhaAlvo  = obterOuroSheet()
	PreencherPlanilha (moeda, transacoes_cc, DADOS_TOTAL_OURO_COL, ouroGama, planilhaAlvo)
	// Configurar a planilha Real
	obterRealNomeGama().setValue(nome);
	obterRealEstadiaGama().setValue(estadia);
	let realGama = obterRealGama();
	realGama.clearContent();
	moeda = "Real";
	planilhaAlvo  = obterRealSheet()
	PreencherPlanilha (moeda, transacoes_cc, DADOS_TOTAL_REAL_COL, realGama, planilhaAlvo)
}

/* Preencher a planilha com transacoes para apresentar ao colaborador
 * @parm {string} - A moeda
 * @parm {Array of Arrays} - transacoes do colaborador
 * @parm {number} - A columna a ser usada
 * @parm {Range} - A gama a ser preenchida
 * @parm {Sheet} - a planilha alvo (Ouro ou Real)
 * @returns {}
 */
function PreencherPlanilha (moeda, transacoes_cc, DADOS_TOTAL_COL, gamaAlvo, planilhaAlvo) {
	let transacoes_cc_moeda = transacoes_cc.filter(transacao_cc => {
		return transacao_cc[DADOS_MOEDA_COL] === moeda;
	});
	let transacoes = montarTransacoes(transacoes_cc_moeda, DADOS_TOTAL_COL);
	if (transacoes.length > 0) {
		copiarGama (transacoes, gamaAlvo, planilhaAlvo)
	}
}
	
/* Transacoes do colaborador formatadas de acordo com o layout das planinlhas Ouro/Real
 * @parm {Array of Array} - Transacoes do colaborador, filtradas pela moeda
 * @returns - {Array of Array} formatado de acordo com o layout das planinlhas Ouro/Real
 */
function montarTransacoes (transacoes_cc, DADOS_TOTAL_COL) {
	let transacoes = [];
	let balanco    = 0;
	transacoes_cc.forEach (transacao_cc => {
		let transacao = [];
		transacao[TRANSACAO_DATA_COL]      = transacao_cc[DADOS_DATA_COL]
		transacao[TRANSACAO_DESCRICAO_COL] = transacao_cc[DADOS_ITEM_COL]
		if (transacao_cc[DADOS_CREDITO_DEBITO_COL] == "Debito") {
			transacao[TRANSACAO_DEBITO] = transacao_cc[DADOS_TOTAL_COL];
			transacao[TRANSACAO_CREDITO] = "";
			balanco -= transacao[TRANSACAO_DEBITO] 
		}
		else {
			if (transacao_cc[DADOS_CREDITO_DEBITO_COL] == "Credito") {
				transacao[TRANSACAO_DEBITO] = "";
				transacao[TRANSACAO_CREDITO] = transacao_cc[DADOS_TOTAL_COL];
				balanco += transacao[TRANSACAO_CREDITO] 
			}
			else {
				transacao[TRANSACAO_DEBITO] = "";
				transacao[TRANSACAO_CREDITO] = "";
			}
		}
		transacao[TRANSACAO_BALANCO] = balanco;
		transacoes.push(transacao)
	})
	return transacoes;
}

/* Copiar um Array of Arrays a uma gama da planilha Ouro ou Real
 * @parm {Array of Arrays} o conteudo a ser copiado 
 * @parm {Range} - A gama a ser preenchida
 * @parm {Sheet} a planilha Ouro ou Real
 * @returns {}
 */
function copiarGama (transacoes, gamaAlvo, planilhaAlvo) {
	let gamaPrimeiraLinha   = gamaAlvo.getRowIndex();
 	let gamePrimeiraColumna = gamaAlvo.getColumn(); 
	CararaLibrary.copiarGama(transacoes, planilhaAlvo, gamaPrimeiraLinha, gamePrimeiraColumna)
}
