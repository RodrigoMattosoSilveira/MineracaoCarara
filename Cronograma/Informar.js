// Informar os associados de suas responsabilidades;
function cronogramaInformar() {
    SpreadsheetApp.getActiveSpreadsheet().toast('Inicio', 'Informar');

    // Navegue para a planilha PDF
    CararaLibrary.activateSheet(PDF_PLANILHA);

    // Recuperar o cronograma ATIVADO mais ANTIGO. 
    let cronogramaAtivatoMaisAntigo = [...addicioneOrdermAoCronograma( obterAtivosGamaVals())];
    cronogramaAtivatoMaisAntigo = [...sortAtivosMaisAntigo(cronogramaAtivatoMaisAntigo)];
    let dataControle = dateToString(cronogramaAtivatoMaisAntigo[0][ATIVOS_DATA]);
    let periodoControle = cronogramaAtivatoMaisAntigo[0][ATIVOS_PERIODO];
    let chaveControle = dataControle + periodoControle;
    let ativosInformar = cronogramaAtivatoMaisAntigo.filter(elemento => chaveControle === (dateToString(elemento[ATIVOS_DATA]) + elemento[ATIVOS_PERIODO]));

    let pdfInformar = obterPdfInformar();
    pdfInformar.clearContent();

    let informarRegistros = [];
    ativosInformar.forEach( elemento => {
        let informarRegistro = [];
        informarRegistro[PDF_NOME] = elemento[ATIVOS_NOME];
        informarRegistro[PDF_AREA] = elemento[ATIVOS_AREA];
        informarRegistro[PDF_LOCAL] = elemento[ATIVOS_LOCAL];
        informarRegistro[PDF_TAREFA] = elemento[ATIVOS_TAREFA];
        informarRegistros.push(informarRegistro);
    });

    obterPdfData().clearContent().setValue(dataControle);
    obterPdfPeriodo().clearContent().setValue(periodoControle);

    pdfInformar.offset(0, 0, pdfInformar.getLastRow(),  pdfInformar.getLastColumn()).setBorder(false, false, false, false, false, false);
    pdfInformar.offset(0, 0, informarRegistros.length, informarRegistros[0].length).setValues(informarRegistros);
    pdfInformar.offset(0, 0, informarRegistros.length, informarRegistros[0].length).setBorder(true, true, true, true, true, true);
    return true
}

const apresentarDialogoPDF = (proximoCronogramaCandidato) =>  {
    putData(proximoCronogramaCandidato[0]);
    putPeriodo(proximoCronogramaCandidato[1]);

    const html = HtmlService.createHtmlOutputFromFile('DialogoPdf') 
        .setWidth(360)
        .setHeight(240);
    SpreadsheetApp.getUi().showModalDialog(html, 'Modelar');
}

const exportRangeAsPDF = () => {
    let sheet = obterPdfPlanilha(); 
    let lastRow = sheet.getLastRow();
    let sheetId = sheet.getSheetId();
    let url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
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
        '&fzr=true' +
        '&fzc=false' +
        '&r1=1' +
        '&r2=' + lastrow+1 +
        '&c1=4' +
        '&c2=8' +
        '&left_margin=0.5' +
        '&right_margin=0.5' +
        '&top_margin=0.' +
        '&bottom_margin=0.5'
    let blob = getFileAsBlob(url);
    Logger.log("Content type: " + blob.getContentType());
    Logger.log("File size in MB: " + blob.getBytes().length / 1000000);
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
// obterCronogramaAtivatoMaisAntigo - Obtenha a versão mais antiga dos 
// cronogramas ativados.  
// 
// Input
// 		none
// Output
// 		cronograma (Array) - O cronograma mais antigo; caso contrario, []
// ****************************************************************************
//
function obterCronogramaAtivatoMaisAntigo() {
	// Obter os cronogramas ativos
	let ativosGamaVals = obterAtivosGamaVals();
	if (ativosGamaVals.length === 0) {
		SpreadsheetApp.getActiveSpreadsheet().toast('Não há um cronograma ativo', 'Informar');
		return [];
	}
	let informarGamaVals = [...ativosGamaVals.filter(elemento => elemento[ATIVOS_ESTADO] === 'Informar')]
	if (ativosGamaVals.length === 0) {
		SpreadsheetApp.getActiveSpreadsheet().toast('Não há um cronograma tipo Informar', 'Informar');
		return [];
	}
	let periodVals = obterPeriodosGamaVals();	
	informarGamaVals.forEach(informarRegistro => {
		let procurado = vLookupPersonalizado("Diurno", periodVals, PERIODOS_NOME, PERIODOS_ORDEM) 
		informarRegistro[ATIVOS_ORDEM] = procurado
	});
	informarGamaVals.sort((a, b) => {
		let dateA = new Date(a[ATIVOS_DATA]).getTime();
		let dateB = new Date(b[ATIVOS_DATA]).getTime();
		if (dateA === dateB) {
			return a[ATIVOS_ORDEM] - b[ATIVOS_ORDEM];
		}
		return dateA - dateB
	});
	
	return informarGamaVals;
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
