const PESSOAS_GOOGLE_SHEET_ID = "1d3XkRXMeOO6Zzn6oxPoK86GU99V-yPa-7e77SrMxoIM";
const obterPessoasGoogleSheet = () =>  SpreadsheetApp.openById(PESSOAS_GOOGLE_SHEET_ID);

const PESSOAS_PLANILHA    = "Dados";
const PESSOAS_GAMA        = "Pessoas";
const PESSOAS_FIRST_ROW   = 2;
const PESSOA_NOME_COL     = 0;
const PESSOA_CPF_COL      = 1;
const PESSOA_RG_COL       = 2;
const PESSOA_CELL_COL     = 3;
const PESSOA_EMAIL_COL    = 4;
const PESSOA_RUA_COL      = 5;
const PESSOA_DISTRITO_COL = 6;
const PESSOA_CIDADE_COL   = 7;
const PESSOA_CEP_COL      = 8;
const PESSOA_ESTADO_COL   = 9;
const PESSOA_BANCO_COL    = 10;
const PESSOA_NUMERO_COL   = 11;
const PESSOA_CONTA_COL    = 12;
const PESSOA_PIX_COL      = 13;

const obterPessoasPlanilha = ()  => obterPessoasGoogleSheet().getSheetByName(PESSOAS_PLANILHA);
const obterPessoasGama     = ()  =>	obterPessoasGoogleSheet().getRangeByName(PESSOAS_GAMA)
											.sort([
												// Column numbers adjusted for A1C1 notation
												{column: PESSOA_NOME_COL  + 1, DESCENDING: false}
	                                 		 ]);
const obterPessoasGamaVals = ()  =>  obterPessoasGama().getValues()
											.filter( (elemento) => elemento[PESSOA_NOME_COL] !== '' &&
											          elemento[PESSOA_NOME_COL] !== 'Nome');
const obterPessoasGamaNome = (nome) => {
	return obterPessoasGamaVals().findIndex((element) => element[PESSOA_NOME_COL] == nome)
}
const obterPessoasGamaCPF  = (cpf) => {
	return obterPessoasGamaVals().findIndex((element) => digitsOnly_(element[PESSOA_CPF_COL]) == cpf)
}
const obterPessoasGamaRG   = (rg) => {
	return obterPessoasGamaVals().findIndex((element) =>  digitsOnly_(element[PESSOA_RG_COL]) == rg)
}
const obterPessoasGamaCell  = (cell) => {
	return obterPessoasGamaVals().findIndex((element) => digitsOnly_(element[PESSOA_CELL_COL]) == cell)
}
const obterPessoasGamaEmail = (email) => {
	return obterPessoasGamaVals().findIndex((element) => element[PESSOA_EMAIL_COL] == email)
}
const obterPessoasGamaPix  = (pix) => {
	return obterPessoasGamaVals().findIndex((element) => element[PESSOA_PIX_COL] == pix)
}
