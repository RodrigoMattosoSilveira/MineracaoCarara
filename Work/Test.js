function setEstadiaFormatConditionTest () {
	var sheetNName = 'Conditional Formating';
	var column = 2;
	ccSetEstadiaFormatCondition (sheetNName, column)
}

function removeHeaderAndBlankRowsTest() {
	var rangeName = 'TurnoHojeDia';
	var header = "Nome";
	var column = 1;
	removeHeaderAndBlankRows(rangeName, header, column)
}