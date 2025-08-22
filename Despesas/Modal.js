function showModalDialogFechar() {
  modalTitle = 'Fechar Conta Corrente'
  modalHtml = 'ModalDialogFechar';
  showModalDialog(modalTitle, modalHtml)
}
function showModalDialog(modalTitle, modalHtml) {
  var ui = SpreadsheetApp.getUi();
  var template = HtmlService.createTemplateFromFile(modalHtml)
  var html = template.evaluate()    	
    .setWidth(400)
    .setHeight(300);
  ui.showModalDialog(html, modalTitle);
}