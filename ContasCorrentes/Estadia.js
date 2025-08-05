const estadiaID = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const estadiaDadosRange = "Dados!A:H"
const estadiaDadosRangeNomeCol = 0;
const estadiaDadosRangeComecoCol = 1;
const estadiaDadosRangeFechadaCol = 2;
const estadiaDadosRangeDisponibilidadeCol = 3;
const estadiaDadosRangeMetodoCol = 4;	
const estadiaDadosRangeAreaCol = 5;	
const estadiaDadosRangeLocalCol = 6;	
const estadiaDadosRangeTarefaCol = 7;	
const estadiaDadosRangeComentariosCol = 8;

const estadiaSS = SpreadsheetApp.openById(estadiaID);
const estadiaDadosRng = estadiaSS.getRange(estadiaDadosRange)
const estadiaDadosVals = estadiaDadosRng.getValues();
