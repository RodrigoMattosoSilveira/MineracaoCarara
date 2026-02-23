// Informar oscolaboradores de suas responsabilidades;
function cronogramaInformar() {
    SpreadsheetApp.getActiveSpreadsheet().toast('Inicio', 'Informar', 3);

	let ativoGamaVals = obterAtivosGamaVals();
	if (ativoGamaVals.length > 0) {	
		SpreadsheetApp.getUi().alert("Existem registros na planilha Ativos. Favor completar of plano em progresso our remover os registros mannualmente.");
		return
	}

    // Build the Ativos Sheet
    let transacoes      = obterPlanejarGamaVals().filter( elemento => elemento[PLANEJAR_ACAO] === "Incluir" );
    let planilhaAlvo    = obterAtivosPlanilha();
    let planilhaLinha   = 2;
    let planilhaColumna = 1;
    CararaLibrary.copiarGama (transacoes, planilhaAlvo, planilhaLinha, planilhaColumna);
 	ativoGamaVals = obterAtivosGamaVals();

    // Navegue para a planilha PDF
    CararaLibrary.activateSheet(PDF_PLANILHA);

    let pdfInformar = obterPdfInformar().clearContent();

    let informarRegistros = [];
    ativoGamaVals.forEach( elemento => {
        let informarRegistro = [];
        informarRegistro[PDF_NOME] = elemento[ATIVOS_NOME];
        informarRegistro[PDF_SETOR] = elemento[ATIVOS_SETOR];
        informarRegistro[PDF_LOCAL] = elemento[ATIVOS_LOCAL];
        informarRegistro[PDF_TAREFA] = elemento[ATIVOS_TAREFA];
        informarRegistros.push(informarRegistro);
    });

    let dataControle = ativoGamaVals[0][ATIVOS_DATA];
    let periodoControle = ativoGamaVals[0][ATIVOS_PERIODO];
    obterPdfData().clearContent().setValue(dataControle);
    obterPdfPeriodo().clearContent().setValue(periodoControle);

    pdfInformar.offset(0, 0, pdfInformar.getLastRow(),  pdfInformar.getLastColumn()).setBorder(false, false, false, false, false, false);
    pdfInformar.offset(0, 0, informarRegistros.length, informarRegistros[0].length).setValues(informarRegistros);
    pdfInformar.offset(0, 0, informarRegistros.length, informarRegistros[0].length).setBorder(true, true, true, true, true, true);

    let pdfExportar = obterPdfExportar();
    let pdfHeaderHeight = obterPdfHeader().getNumRows();
    let r1 = pdfInformar.getRow()
    let r2 = r1 + informarRegistros.length - 1;
    let c1 = pdfExportar.getColumn();
    let c2 = pdfExportar.getLastColumn();
    exportRangeAsPDF(r1, r2, c1, c2);

   // Add Data Validations:
     CararaLibrary.activateSheet("Ativos");
    let planilhaAtivos = obterAtivosPlanilha();
    let planilhaAtivosName = planilhaAtivos.getName();
     estabelederValidacaoDados(planilhaAtivos, ATIVOS_ACAO+1,   ATIVOS_ACOES_VALIDAS);
    estabelederValidacaoDados(planilhaAtivos, ATIVOS_METODO+1, PLANEJAR_METODOS_VALIDOS);
    estabelederValidacaoDados(planilhaAtivos, ATIVOS_SETOR+1,  PLANEJAR_SETORES_VALIDOS);
    estabelederValidacaoDados(planilhaAtivos, ATIVOS_LOCAL+1,  PLANEJAR_LOCAIS_VALIDOS);
    estabelederValidacaoDados(planilhaAtivos, ATIVOS_TAREFA+1, PLANEJAR_TAREFAS_VALIDAS);
    // TODO: Refatorar colher os parametros de pintarAcao para serem mais genericos;
    pintarAcao(planilhaAtivosName, "Excluir", "Incluir");

    limparContentDataValidations(obterPlanejarGama());

    CararaLibrary.activateSheet("PDF");
    SpreadsheetApp.getActiveSpreadsheet().toast('Fim', 'Informar', 1);
    return true
}

const exportRangeAsPDF = (r1, r2, c1, c2) => {
    let sheet = obterPdfPlanilha(); 
    let lastRow = sheet.getLastRow();
    let sheetId = sheet.getSheetId();
    let url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    // let url = 'https://docs.google.com/spreadsheets/d/'+SpreadsheetApp.getActiveSpreadsheet().getId()+'/export?';
    url = url.replace(/edit$/, '') + 'export?' +
        // 'format=pdf' +
        // '&portrait=true' +
        // '&scale=true'
        // '&size=B5' + // Tamanho do papel
        // '&portrait=true' + // Orientação paisagem
        // '&fitw=true' + // Ajustar à largura da página           
        'format=pdf' + 
        '&portrait=true' + 
        '&size=letter' +  
        '&scale=1' +  
        '&sheetnames=false' +  
        '&gid=857268188' + 
        '&printnotes=false' +
        '&title=false' +
        '&gridlines=false' +
        '&pagenum=CENTER' +
        '&r1=' + 1 +
        '&r2=' + r2 +
        '&c1=' + c1 +
        '&c2=' + c2 +
        '&left_margin=0.5' +
        '&right_margin=0.5' +
        '&top_margin=.5' +
        '&bottom_margin=0.5'
    let blob = getFileAsBlob(url);
    // Logger.log("Content type: " + blob.getContentType());
    // Logger.log("File size in MB: " + blob.getBytes().length / 1000000);
    let blobName = 'Cronograma - ' +  CararaLibrary.dateToString(obterPdfData().getValue()) + ' - ' + obterPdfPeriodo().getValue() + '.pdf';
    blob.setName(blobName);
    DriveApp.getFolderById('1dNBIZ0NG9bsEad9vd-QgbxmLQZ5rPgJc').createFile(blob);
}

const getFileAsBlob = (exportUrl) => {
    let response = UrlFetchApp.fetch(exportUrl, {
        muteHttpExceptions: true,
        headers: {
        Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
    },
    });
    return response.getBlob();
}

// ****************************************************************************
// addicioneOrdermAoCronograma - Obtenha a versão mais antiga dos 
// cronogramas ativados.  
// 
// Input
// 		none
// Output
// 		cronograma (Array) - O cronograma mais antigo; caso contrario, false
// ****************************************************************************
//
const addicioneOrdermAoCronograma = (cronograma) => {
    if (cronograma.length === 0) { return []; } 
    let periodVals = obterPeriodosGamaVals();	
    cronograma.forEach(cronogramaRegistro => {
        let procurado = vLookupPersonalizado(cronogramaRegistro[ATIVOS_PERIODO], periodVals, PERIODOS_NOME, PERIODOS_ORDEM) 
        cronogramaRegistro[ATIVOS_ORDEM] = procurado
    });
    return cronograma;
}

const sortAtivosMaisAntigo = (informarAtivosGamaVals) => {
	informarAtivosGamaVals.sort((a, b) => {
		let dateA = new Date(a[ATIVOS_DATA]).getTime();
		let dateB = new Date(b[ATIVOS_DATA]).getTime();
		if (dateA === dateB) {
			return a[ATIVOS_ORDEM] - b[ATIVOS_ORDEM];
		}
		return dateA - dateB
	});
    return informarAtivosGamaVals
}
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
if (typeof module !== 'undefined') module.exports = {
    sum,
    subtract
}
