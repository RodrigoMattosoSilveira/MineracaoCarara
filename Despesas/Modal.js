function showModalDialogFechar() {
  modalTitle = 'Fechar Conta Corrente'
  modalHtml = 'ModalDialogFechar';
  showModalDialog(modalTitle, modalHtml)
}
function showModalDialog(modalTitle, modalHtml) {
  var html = HtmlService.createHtmlOutputFromFile(modalHtml)   	
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, modalTitle);
}