function ReadDataValidationFile (fileName) {
  const jsonString = HtmlService.createHtmlOutputFromFile(fileName).getContent();
  const jsonObject = JSON.parse(jsonString);
  return jsonObject
}