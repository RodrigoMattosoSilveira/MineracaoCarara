// ****************************************************************************
// Menu - This is a set of functions
// ****************************************************************************
// 
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Producao')
		.addItem('Registrar', 'producaoRegistrar')
	.addToUi();
}
/* *****************************************************************************
 * Grencia a tarefa de coletar a produção diária e periódica de ouro.
 * @parm {e}, o ambiente 
 * @returns nonne
 * ************************************************************************** */
// 
function producaoRegistrar() {
	SpreadsheetApp.getActiveSpreadsheet().toast('Registrar Produção', 'Inicio', 3);

	// Navegue para a planilha Planejar
	CararaLibrary.activateSheet("Producao");

	// Construir e salvar o objetoFormulario
	let objetoFormulario = {}
	objetoFormulario['pocos'] = JSON.stringify([...Referencia.obterReferenciaPocos()]);
    objetoFormulario['periodos'] =  JSON.stringify([...Referencia.obterReferenciaPeriodos()]);
	putObjetoFormulario(JSON.stringify(objetoFormulario));

	// Apresentar dialogo modal; coletar a producao dos pocos
	apresentarDialogoProducao()
	return true
}

function producaoRegistrarProsseguir(matriz) {
	let message = ''
	matriz.length > 0 ? message = JSON.stringify(matriz) : message = 'Notning';
	SpreadsheetApp.getActiveSpreadsheet().toast(message, 'Result', 3);	

	// Armazene os dados de produção, garantindo que não sobrescreva um registro 
	// existente.
	let producaoGamaVals = obterProducaoGamaVals();
	let producaoGamaValsChaves = producaoGamaVals.map(registro => {
		let data	= new Date(registro[0]);
		let dia 	= data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
		let mes 	= data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1);
		let ano 	= data.getUTCFullYear();
		let poco 	= registro[1];
		let periodo = registro[2]
		return '' + dia + mes + ano + poco + periodo;
	})
	let producaoPlanilha = _obterProducaoPlanilha();
	let lastRow = producaoPlanilha.getLastRow();
	matriz.forEach( (registro) => {
		let data 	= registro[0];
		let dia 	= Number(data.substring(0,2)) !== NaN ? Number(data.substring(0,2)) < 10 ? '0' + Number(data.substring(0,2)) : Number(data.substring(0,2)) : NaN;
		let mes 	= Number(data.substring(3,5)) !== NaN ? Number(data.substring(3,5)) < 10 ? '0' + Number(data.substring(3,5)) : Number(data.substring(3,5)) : NaN;
		let ano 	= Number(data.substring(6,10));
		let poco 	= registro[1];
		let periodo = registro[2]
		gramas = Number(registro[3]);
		if (dia !== NaN && mes !== NaN && mes !== NaN && poco !== '' && periodo !== '' && gramas != NaN) {
			chave = '' + dia + mes + ano + poco + periodo;
			if (producaoGamaValsChaves.indexOf(chave) === -1) {
				// Temos um bom registro de produção; antes de salvá-lo, 
				// converter a data para mm/dd/aaaa
				registro[0] = mes + '/' + dia + '/' + ano;
   				producaoPlanilha.getRange(lastRow + 1, 1, 1, registro.length).setValues([registro])
				lastRow++;
			}
		}
	});

	// Classifique a gama Produção com as datas em ordem decrescente, depois 
	// por bem e período. 
	_obterProducaoGama().sort([{column: 1, ascending: false}, {column: 2, ascending: true}, {column: 3, ascending: true}])
}

/* *****************************************************************************
 * Retorna a produção do poço para em uma data e período
 * @parm {Date}, data - O dia de interesse
 * @parm {String}, poco - O nome to poco de interessse
 * @parm {String}, periodo - O periodo de interesse
 * @returns (float | null) a producao produção do poço na data e periodo de 
 * interesse; null caso contrário
 * ************************************************************************** */
// 
function obterProducaoDataPocoPeriodo(data, poco, periodo) {
	let chave = CararaLibrary.dateToString(data) + poco + periodo;
	let matrizProducao = obterProducaoGamaVals().filter((registro) => {
		dataChave = CararaLibrary.dateToString(registro[PRODUCAO_DATA_COL]) + registro[PRODUCAO_POCO_NOME_COL] +  registro[PRODUCAO_PERIODO_NOME_COL];	
		return chave === dataChave;		
	});  
	return  matrizProducao.length === 1 ? matrizProducao[0][PRODUCAO_QUANTIDADE_COL] : null;
}

if (typeof module !== 'undefined') module.exports = {
	apresentarDialogoProducaoDataPocoPeriodo, apresentarDialogoModelar
};

var documentProperties = PropertiesService.getDocumentProperties();
const putObjetoFormulario = (objetoFormulario) => documentProperties.setProperty('OBJECTO_FORMULARIO', objetoFormulario);
const getObjetoFormulario = () => documentProperties.getProperty('OBJECTO_FORMULARIO');