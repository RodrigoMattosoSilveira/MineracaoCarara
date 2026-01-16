/**
 * TODO use essa biblioteca para funções nao associadas a ao domínio
 * 
 *  Converter uma Data Object to ums Data string
 * 
 * @param {Object} data - A data
 * @returns {string} - A data convertida;
 */
function dateToString(data) {
	let dataObj = new Date(data);
	let dataStr = '';

	// Month
	if ((dataObj.getMonth() + 1) < 10) {
		dataStr += "0";
	}
	dataStr += dataObj.getMonth() + 1;
	dataStr += '/';
	// Day
	if (dataObj.getDate() < 10) {
		dataStr += "0";
	}
	dataStr += dataObj.getDate();
	dataStr += '/';
	// Year
	dataStr += dataObj.getFullYear();

	return dataStr;
}
