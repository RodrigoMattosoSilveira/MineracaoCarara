/********************************************************************************************************************** */
// adicionarRegistro
// 
// Addicionar uma Localidade
// 
// Input:   Localidade (Um intervalo)
// Output:  Registro additionado
//
//********************************************************************************************************************** */
// 
function salvarRegistro() {

  var myGooglSheet  = SpreadsheetApp.getActiveSpreadsheet();          // A planilha do Google ativa 
  var sLocalForm    = myGooglSheet.getSheetByName("Registrar");       // Atablela Registrar
  var datasheet     = myGooglSheet.getSheetByName("Dados");           // A tablela Dados
  var str           = sLocalForm.getRange("Localidade").getValue();   // O valor da nova Localidade
  var values        = datasheet.getDataRange().getValues();           // As Localidades existentes

  var ui = SpreadsheetApp.getUi();
  // Display a dialog box with a title, message, and "Yes" and "No" buttons. The user can also
  // close the dialog by clicking the close button in its title bar.
  var response = ui.alert("Submit", 'Do you want to submit the data?',ui.ButtonSet.YES_NO);

  // Checking the user response and proceed with clearing the form if user selects Yes
  if (response == ui.Button.NO) {
    //exit from this function
    return;
  } 

  // Certifique-se de que todos os dados sejam válidos, prossiga se todos os dados forem válidos
  if (validarDados()==true) {
    // Selecione a próxima linha em branco
    var blankRow=datasheet.getLastRow()+1;

    // Adicione a Localidade
    datasheet.getRange(blankRow, 1).setValue(sLocalForm.getRange("F6").getValue());

    // Informar ao usuário que o novo registro foi adicionado
    ui.alert(' "Localidade Nova' + sLocalForm.getRange("F6").getValue() +' "');

    // Limpe os dados do Formulário de Entrada de Dados
    sLocalForm.getRange("Localidade").clear();
  }

}

// ****************************************************************************************************************************** */
// validarDados - Certifique-se que os dados do registro novo sao válido
// Input: Intervalo nomeado Localidade
// Output: TRUE se válidos, FALSE caso contrário
// ****************************************************************************************************************************** */
//
function validarDados(){

  var myGooglSheet  = SpreadsheetApp.getActiveSpreadsheet();        // Planilha do Google ativa 
  var shUserForm    = myGooglSheet.getSheetByName("Adicionar");     // Tablela Adicionar
  var str                                                           // Inicializada mais tarde
  var celula
  var celulaValor
  var dadosValidos = true                                           // Assumimos que os dados sao válidos
  var ui = SpreadsheetApp.getUi();                                  // Instância do ambiente de interface do usuário para usar os recursos MessageBox
 

  // ***** Valide o nome LOCALIDADE ***** 
  // 
  celulaValor = shUserForm.getRange("Localidade").getValue();
  
  // Atribuindo branco como cor de fundo padrão
  shUserForm.getRange(celula).setBackground('#FFFFFF');

  // Deve haver um valor
  if(shUserForm.getRange(celula).isBlank()==true){
  
    ui.alert("Insira a Localidade.");
    shUserForm.getRange(celula).activate();
    shUserForm.getRange(celula).setBackground('#FF0000');

    dadosValidos = false;
  }

  // Deve ter pelo menos 3 characteres
  if(dadosValidos && celulaValor.toLocaleString().length < 3){
  
    ui.alert("Deve ter pelo menos 3 caracteres.");
    shUserForm.getRange(celula).activate();
    shUserForm.getRange(celula).setBackground('#FF0000');

    dadosValidos = false;
  }

  // Não pode ter mais de 10 caracteres
   if(dadosValidos && celulaValor.toLocaleString().length > 10){
  
    ui.alert("Não pode ter mais de 10 caracteres.");
    shUserForm.getRange(celula).activate();
    shUserForm.getRange(celula).setBackground('#FF0000');

    dadosValidos = false;
  }
 
  // Dever ser unico
   if(dadosValidos && pesquisarExistencia()){
  
    ui.alert("Deve ser único");
    shUserForm.getRange(validatingCell).activate();
    shUserForm.getRange(validatingCell).setBackground('#FF0000');

    dadosValidos = false;
  }

  // informar ao usuário que a validação falhou 
  if(!dadosValidose){
    var ui = SpreadsheetApp.getUi();
    ui.alert("Dados Invalidos");
  }
 return dadosValidos;

}

// ****************************************************************************************************************************** */
// pesquisarExistencia - Verifique se a chave existe
// Input: Intervalo nomeado Localidade
// Output: TRUE se existir, FALSE caso contrário
// ****************************************************************************************************************************** */
//
function pesquisarExistencia() {
  var myGooglSheet  = SpreadsheetApp.getActiveSpreadsheet();        // Planilha do Google ativa 
  var shUserForm    = myGooglSheet.getSheetByName("Adicionar");     // Tablela Adicionar
  var datasheet     = myGooglSheet.getSheetByName("Dados");         //  Tablela Dados
  var str           = shUserForm.getRange("Localidade").getValue(); // Recupere o nome da nova Localidade
  var dados         = datasheet.getDataRange().getValues();         // Recuperar todas as localidades existentes

  var chaveExiste   = false;                                        //assumimos que o registro nao existe
  for (var i = 0; i < dados.length; i++) {
    // Recuperar uma linha
    var rowValue = dados[i];

    // Verifique se a Localidade recuperada corresponde ao candidato
    if (rowValue[1] == str) {
      // Corresponde!
      chaveExiste = true;
      break;
    }
  }

  // Informe o usuario que a Localide Escolhida existe
  // if(chaveExiste==true){
  //   var ui = SpreadsheetApp.getUi();
  //   ui.alert("Localidade " + str + " existente!");
  // }

  return chaveExiste;
}

// ****************************************************************************************************************************** */
// menssagemError - Renderizar mensagem de erro
//  veja https://spreadsheet.dev/pop-up-alert-messages-in-google-sheets para saber como lidar com escolhas OK 
// Input: 
//  - namedRange
//. - menssagem
// Output: None
// ****************************************************************************************************************************** */
//
function menssagemError(namedRange, menssagem) {
  SpreadsheetApp.getUi().alert(menssagem);
  definirBordaInValido(namedRange)
}

// ****************************************************************************************************************************** */
// definirBordaInvalida - Pintar uma borda de uma célula com conteúdo inválido
// Input: 
//  - namedRange: Nome do intervalo nomeado que identifica a célula
// Output: None
// ****************************************************************************************************************************** */
//
function definirBordaInvalida(namedRange) {
  var cor = '#ff0000';
  var estilo = SpreadsheetApp.BorderStyle.SOLID_THICK
  definirBorda(namedRange, cor, estilo)
}

// ****************************************************************************************************************************** */
// definirBordaValida - Pintar uma borda de uma célula com conteúdo válido
// Input: 
//  - namedRange: Nome do intervalo nomeado que identifica a célula
// Output: None
// ****************************************************************************************************************************** */
//
function definirBordaValida(namedRange) {
  var cor = '#000000';
  var estilo = SpreadsheetApp.BorderStyle.SOLID
  definirBorda(namedRange, cor, estilo)
}

// ****************************************************************************************************************************** */
// definirBorda - Pinte a borda
// Input: 
//  - namedRange:  Nome do intervalo nomeado que identifica a célula
//  - cor: Cadeia de caracteres RBG, no formato HEX
//  - estilo - O estilo da borda
// Output: None
// ****************************************************************************************************************************** */
//
function definirBorda(namedRange, cor, estilo) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange(namedRange).activate();
  spreadsheet.getActiveRange().setBorder(true, true, true, true, false, false, cor, estilo);
}

// function 
//  entrada - marque todas as bordas que requerem valores vermelho
//.         - set onEdit gatilhos para todas as células que requerem valor
// onEdit.  - valide a celula; marque sua borda OK ou ERRO
// Salver   - valide todas a celulas, salve se todas OK