const obterGoogleSheet     = () =>  SpreadsheetApp.openById("10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA");

// Planilha Dados
const DADOS_DATA_COL              	= 0;
const DADOS_NOME_COL            	= 1;
const DADOS_ESTADIA_COL           	= 2;
const DADOS_METODO_COL            	= 3;  // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos
const DADOS_MOEDA_COL             	= 4   // Real, Ouro
const DADOS_CREDITO_DEBITO_COL      = 5;  // Credito, Debito
const DADOS_ITEM_COL              	= 6;
const DADOS_PRECO_UNIDATE_REAL_COL  = 7;  // Real
const DADOS_PRECO_UNIDATE_OURO_COL  = 8;  // Gramas de ouro 
const DADOS_ITEM_QTD__COL          	= 9;
const DADOS_TOTAL_REAL_COL         	= 10; // Real
const DADOS_TOTAL_OURO_COL         	= 11; // Gramas de ouro
const DADOS_COMENTARIOS_COL      	= 12;

// As columnas das planilhas Ouro e Real sao comuns
const TRANSACAO_DATA_COL      = 0;
const TRANSACAO_DESCRICAO_COL = 1;
const TRANSACAO_DEBITO        = 2;
const TRANSACAO_CREDITO       = 3;
const TRANSACAO_BALANCO       = 4;

const OURO_PLANILHA_NAME         = "Ouro";
const OURO_PLANILHA_NOME_GAMA    = "Ouro_Planilha_Nome";
const OURO_PLANILHA_ESTADIA_GAMA = "Ouro_Planilha_Estadia";
const OURO_TRANSACOES_GAMA       = "Ouro_Transacoes";
const obterOuroSheet             = () => obterGoogleSheet().getSheetByName(OURO_PLANILHA_NAME);
const obterOuroNomeGama          = () => obterGoogleSheet().getRangeByName(OURO_PLANILHA_NOME_GAMA);
const obterOuroEstadiaGama       = () => obterGoogleSheet().getRangeByName(OURO_PLANILHA_ESTADIA_GAMA);
const obterOuroGama              = () => obterGoogleSheet().getRangeByName(OURO_TRANSACOES_GAMA);

const REAL_PLANILHA_NAME         = "Real"
const REAL_PLANILHA_NOME_GAMA    = "Real_Planilha_Nome"
const REAL_PLANILHA_ESTADIA_GAMA = "Real_Planilha_Estadia"
const REAL_TRANSACOES_GAMA       = "Real_Transacoes";
const obterRealSheet             = () => obterGoogleSheet().getSheetByName(REAL_PLANILHA_NAME);
const obterRealNomeGama          = () => obterGoogleSheet().getRangeByName(REAL_PLANILHA_NOME_GAMA);
const obterRealEstadiaGama       = () => obterGoogleSheet().getRangeByName(REAL_PLANILHA_ESTADIA_GAMA);
const obterRealGama              = () => obterGoogleSheet().getRangeByName(REAL_TRANSACOES_GAMA);