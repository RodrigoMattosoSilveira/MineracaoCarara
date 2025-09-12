const apresentarDialogoProducao= (proximoCronogramaCandidato) =>  {
    putData(proximoCronogramaCandidato[0]);
    putPeriodo(proximoCronogramaCandidato[1]);

    const html = HtmlService.createHtmlOutputFromFile('DialogoMProducao_1') 
        .setWidth(360)
        .setHeight(240);
    SpreadsheetApp.getUi().showModalDialog(html, 'Registrar Producao Diária');
}
