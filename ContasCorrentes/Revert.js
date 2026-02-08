/*
 * Revert.js
 * 
 * Revert a general ledger entry in "Contas Correntes!Dados" . The function 
 * adds a new entry to "Contas Correntes!dados"; it preserves all fields except:
 * - Date becomes with the today's date
 * - C/D where the entry is reversed (Credito becomes Debito and vice versa)
 * - Comentarios becomes "Revertido by <<email name>>: " + original comentarios. 
 * 
 * The function is triggered by a custom menu item "Reverter Entrada" in the 
 * Google Sheets UI. The user must select a single cell in the row of the entry 
 * they want to revert, and then click the menu item. The function will identify 
 * the selected entry based on the selected cell, and then create a new entry 
 * with the reversed values as described above.
 * 
 * The columns in "Contas Correntes!Dados" are: Data, Nome, Estadia, Metodo, 
 * Moeda, Item, Credito/Debito, Total Real, Total Ouro, Comentarios. The 
 * function should preserve all columns except for Data, Item, Credito/Debito 
 * and Comentarios as described above.
 * 
 * Example: If the original entry has the following values:
 * 
 * Field        | Original Value		  | New Value
 * -------------|-------------------------|--------------------------------
 * Data         | 01/01/2024              | Today's date (e.g., 10/10/2024)
 * Nome         | João Silva              | João Silva
 * Estadia      | 01/01/2024              | 01/01/2024
 * Metodo       | Diária                  | Diária
 * Moeda        | Real                    | Real
 * Item         | Poço/Poço_1/Madeirador  | Poço/Poço_1/Madeirador
 * C/D          | Credito                 | Debito
 * Total Real   | 1000                    | 1000
 * Total Ouro   | 0                       | 0						
 * Comentarios  |                         | Revertido by <<email name>> 
 */
function RevertGeneralLedgerEntry() {
	// Current sheet must be "Contas Correntes!Dados"
	const currentSheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
	if (currentSheetName !== "Dados") {
		SpreadsheetApp.getUi().alert("Please select a cell in the 'Dados' sheet to revert an entry.");
		return;
	}

	// Get the selected range in the spreadsheet
    let selectedRange = SpreadsheetApp.getActive().getActiveRange().getA1Notation();
	const parts = selectedRange.split(/(?<=\D)(?=\d)|(?<=\d)(?=\D)|:/);
	if (parts.length !== 2) {
		SpreadsheetApp.getUi().alert("Please select a single cell in the row of the entry you want to revert.");
		return;
	}

	// Selected cell must equal or higher than the first data row (row 9 in both sheets)
	const selectedRow = parseInt(parts[1]);
	if (selectedRow < 2) {
		SpreadsheetApp.getUi().alert("Please select a cell in the row of the entry you want to revert. The first data row is 2.");
		return;
	}

	// Get the email of the user performing the revert action
	const operator = Session.getActiveUser().getEmail();

	// Get the original entry values from the selected row
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	const range = sheet.getRange(selectedRow, 1, 1, sheet.getLastColumn());
	const originalVals = range.getValues()[0];

	// Create a new entry with the reversed values
	let newEntry = originalVals.slice(); // Copy the original entry
	newEntry[contasCorrentesDataCol] = new Date(); // Set date to today's date
	newEntry[contasCorrentesCreditDebitCol] = (originalVals[contasCorrentesCreditDebitCol] === "Credito") ? "Debito" : "Credito"; // Reverse C/D
	newEntry[contasCorrentesComentariosCol] = "Revertido by " + operator + ": " + originalVals	[contasCorrentesComentariosCol]; // Add revert comment

	// Append the new entry to "Contas Correntes!Dados"
	sheet.appendRow(newEntry);

	SpreadsheetApp.getUi().alert("Entry reverted successfully.");

}
function getSelectedRange() {
	const recipient = Session.getActiveUser().getEmail();
	let selectedRange = SpreadsheetApp.getActive().getActiveRange().getA1Notation();
	const parts = selectedRange.split(/(?<=\D)(?=\d)|(?<=\d)(?=\D)|:/);
	console.log(parts);
	return selectedRange;
}