const apresentarDialogoProducao = () =>  {

    const html = HtmlService.createHtmlOutputFromFile('DialogoProducao_1') 
        .setWidth(1200)
        .setHeight(800);
    SpreadsheetApp.getUi().showModalDialog(html, 'Registrar Producao Diária');
}
