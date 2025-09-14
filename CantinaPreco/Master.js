const masterId = "1CXo2aNn6bXqbMZTypgG6I9DTdVEy-8wly5AhOs0k8Zg";

/* ********************************************************************************************************************* */
// obtenhaCotacaoOuroSimples
// Ler a cotacao do ouro, mantida em tempo real pela GOOGLEFINACE
// 
// Input:
//    Master (Google Sheet)
//.   masterID (string) - Identificador exclusivo da planilha Google
//.   OuroBrlGrama (Range) O nome da celula na planilha Master onde extrair a cotacao do ouro
// 
// Output:
//    cotacaoOuro (float)
//
//* ********************************************************************************************************************* */
//
// TODO replace with Referencia library
function obtenhaCotacaoOuroSimples() {
  // const masterSS = SpreadsheetApp.openById(masterId);
  // const cotacaoOuroArray = masterSS.getRangeByName("OuroBrlGrama").getValues();
  // const cotacaoOuro = cotacaoOuroArray[0][0];
  return cotacaoOuro = Referencia.obterReferenciaOuroBrlGramaVal();
}
