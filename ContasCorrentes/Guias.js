const activeSheet             = SpreadsheetApp.getActiveSpreadsheet();

// https://stackoverflow.com/questions/62175748/driveapp-error-were-sorry-a-server-error-occurred-please-wait-a-bit-and-try
// const ESTADIA_SPREADSHEET_ID = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const CONTAS_CORRENTES_SPREADSHEET_ID  = CararaLibrary.GetSpreadsheetId(activeSheet, "CONTAS_CORRENTES")

const obterGoogleSheet     = () =>  SpreadsheetApp.openById(CONTAS_CORRENTES_SPREADSHEET_ID);

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

const ESTADIAS_SPREADSHEET_ID  = CararaLibrary.GetSpreadsheetId(activeSheet, "ESTADIA")
const obterEstadiaSS           = () =>  SpreadsheetApp.openById(ESTADIAS_SPREADSHEET_ID);
const obterEstadiaDadosS       = () =>  obterEstadiaSS.getSheetByName("Dados");

const PESSOA_SPREADSHEET_ID  = CararaLibrary.GetSpreadsheetId(activeSheet, "PESSOA")


/**
 * Copies one spreadsheet's sheet content to another spreadsheet's sheet
 * @param {string} sourceSS_ID 
 * @param {string} sourceSheetName 
 * @param {string} targetSS_ID 
 * @param {string*} targetSheetName 
 * @returns none
 */
function copySheetToAnotherSpreadsheet(sourceSS_ID, sourceSheetName, targetSS_ID, targetSheetName) {
  const source = SpreadsheetApp.openById(sourceSS_ID)
                .getSheetByName(sourceSheetName);

  const target = SpreadsheetApp.openById(targetSS_ID)
                .getSheetByName(targetSheetName);

  const data = source.getDataRange().getValues();

  target.clearContents();
  target.getRange(1,1,data.length,data[0].length).setValues(data);
}