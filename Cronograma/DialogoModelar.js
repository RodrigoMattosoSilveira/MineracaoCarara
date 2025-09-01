var documentProperties = PropertiesService.getDocumentProperties();
const putData = (data) => documentProperties.setProperty('DATA', data);
const getData = ()     => documentProperties.getProperty('DATA');

const putTurno = (periodo) => documentProperties.setProperty('PERIODO', periodo);
const getTurno = ()        => documentProperties.getProperty('PERIODO');

const apresentarDialogoModelar = (proximoCronogramaCandidato) =>  {
    putData(proximoCronogramaCandidato[0]);
    putTurno(proximoCronogramaCandidato[1]);

    const html = HtmlService.createHtmlOutputFromFile('DialogoModelarr') 
        .setWidth(400)
        .setHeight(300);
    SpreadsheetApp.getUi().showModalDialog(html, 'Modelar');
}
