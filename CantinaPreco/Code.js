/**
 * Copies Referencia "OuroBrlGrama" range to Despesas "OuroBrlGrama" range
 */
function setGoldPrice() {
  const goldPrice = obterReferenciaOuroBrlGramaVal();
  const cantinaGoldPriceRange = obterCantinaOuroBrlGramaGama()
  cantinaGoldPriceRange.setValue(goldPrice);
}
