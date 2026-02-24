/**
 * Adds a menu so you can launch the dialog.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Cadastro')
    .addItem('Coletar Dados…', 'mostrarCaixaDialogoPessoa')
    .addToUi();
	CararaLibrary.activateSheet("Dados");
}

/**
 * Shows the modal dialog.
 * @param {string[]=} nameOptions Optional list of names for a dropdown (can be large).
 */
function mostrarCaixaDialogoPessoa(nameOptions) {
  nameOptions = Array.isArray(nameOptions) ? nameOptions : [];

  const tpl = HtmlService.createTemplateFromFile('PersonDialog');
  tpl.namesJson = JSON.stringify(nameOptions); // safe JSON; no inline <?= ... ?> parsing in JS

  const html = tpl.evaluate()
    .setTitle('Cadastro')
    .setWidth(520)
    .setHeight(560);

  SpreadsheetApp.getUi().showModalDialog(html, 'Cadastro');
}

/**
 * Receives form data from the dialog.
 * Returns ALL validation errors (if any) so the UI can show them.
 * @param {{
 *   name: string,
 *   cpf: string,
 *   rg: string,
 *   cell: string,
 *   email: string,
 *   pix: string
 * }} data
 * @return {{ok: boolean, message?: string, errors?: Array<{field: string, message: string}>}}
 */
function submitPersonData(data) {
  const validation = validateAndNormalizePersonData_(data);

  if (!validation.ok) {
    return { ok: false, errors: validation.errors };
  }


  // Example: write to active sheet (customize as needed)
  const cleaned = validation.value;
  // const sh = SpreadsheetApp.getActiveSheet();
  // sh.appendRow([
  //   new Date(),
  //   cleaned.name,
  //   cleaned.cpf,
  //   cleaned.rg,
  //   cleaned.cell,
  //   cleaned.email,
  //   cleaned.pix,
  // ]);

  pessoaAdicionar(cleaned)
  return { ok: true, message: 'Dados salvos com sucesso.' };
}

/**
 * 
 * @param {*} pessoa 
 */
function pessoaAdicionar(pessoa) {
  let pessoaRegistro = [
      pessoa.name,  // Nome
      pessoa.cpf,   // CPF
      pessoa.rg,    // RG
      pessoa.cell,  // Celular
      pessoa.email, // Email
      "",           // Rua
      "",           // Distrito
      "",           // Cidade
      "",           // CEP
      "",           // Estado
      "",           // Banco
      "",           // Numero
      "",           // Conta
      pessoa.pix,   // PIX
  ];
  let pessoasPlanilha = obterPessoasPlanilha();
  pessoasPlanilha.appendRow(pessoaRegistro);
  Logger.log("Inserted : " + pessoaRegistro)
}
/**
 * Validates + normalizes input.
 * Never throws—returns structured errors instead.
 * @param {any} data
 * @return {{ok: true, value: any} | {ok: false, errors: Array<{field: string, message: string}>}}
 */
function validateAndNormalizePersonData_(data) {
  const errors = [];

  const name = String(data?.name || '').trim();
  const cpfDigits = digitsOnly_(data?.cpf);
  const rg = digitsOnly_(data?.rg || '');
  const cellDigits = digitsOnly_(data?.cell);
  const email = String(data?.email || '').trim();
  const pix = String(data?.pix || '').trim();

  if (!name) errors.push({ field: 'name', message: 'Nome é obrigatório.' });
  if (obterPessoasGamaNome(name) !== -1) { errors.push({ field: 'name', message: 'Pessoa com esse nome ja existe.'})}

  if (!cpfDigits) {
    errors.push({ field: 'cpf', message: 'CPF é obrigatório.' });
  } else if (!isValidCpf_(cpfDigits)) {
    errors.push({ field: 'cpf', message: 'CPF inválido.' });
  }
  if (obterPessoasGamaCPF(cpfDigits) !== -1) { errors.push({ field: 'cpf', message: 'Pessoa com esse CPF ja existe.'})}

  if (!rg) errors.push({ field: 'rg', message: 'RG é obrigatório.' });
  if (obterPessoasGamaRG(rg) !== -1) { errors.push({ field: 'name', message: 'Pessoa com esse RG ja existe.'})}

  if (!cellDigits) {
    errors.push({ field: 'cell', message: 'Celular é obrigatório.' });
  } else if (!isValidBrazilCell_(cellDigits)) {
    errors.push({ field: 'cell', message: 'Celular inválido (use DDD + número).' });
  }
  if (obterPessoasGamaCell(cellDigits) !== -1) { errors.push({ field: 'cell', message: 'Pessoa com esse celular ja existe.'})}

  if (!email) {
    errors.push({ field: 'email', message: 'Email é obrigatório.' });
  } else if (!isValidEmail_(email)) {
    errors.push({ field: 'email', message: 'Email inválido.' });
  }
  if (obterPessoasGamaEmail(email) !== -1) { errors.push({ field: 'email', message: 'Pessoa com esse email ja existe.'})}

  if (!pix) errors.push({ field: 'pix', message: 'PIX é obrigatório.' });
  if (obterPessoasGamaPix(email) !== -1) { errors.push({ field: 'pix', message: 'Pessoa com esse pix ja existe.'})}

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      cpf: formatCpf_(cpfDigits),
      rg,
      cell: formatBrazilCell_(cellDigits),
      email,
      pix,
    }
  };
}


/** ---- Helpers ---- */
function digitsOnly_(v) {
  return String(v || '').replace(/\D/g, '');
}

/**
 * CPF validation (checksum).
 * Accepts only 11 digits.
 */
function isValidCpf_(cpfDigits) {
  if (!/^\d{11}$/.test(cpfDigits)) return false;
  if (/^(\d)\1{10}$/.test(cpfDigits)) return false; // all digits same

  const calcDigit = (base, factorStart) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) sum += Number(base[i]) * (factorStart - i);
    const mod = sum % 11;
    return (mod < 2) ? 0 : (11 - mod);
  };

  const d1 = calcDigit(cpfDigits.slice(0, 9), 10);
  const d2 = calcDigit(cpfDigits.slice(0, 9) + d1, 11);
  return cpfDigits === (cpfDigits.slice(0, 9) + String(d1) + String(d2));
}

function formatCpf_(cpfDigits) {
  // 000.000.000-00
  return cpfDigits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

/**
 * Brazil cell: usually 11 digits: DDD (2) + 9-digit mobile (starts with 9)
 * e.g. 11987654321
 */
function isValidBrazilCell_(cellDigits) {
  if (!/^\d{10,11}$/.test(cellDigits)) return false;
  if (cellDigits.length === 11) {
    const ddd = cellDigits.slice(0, 2);
    const ninth = cellDigits[2];
    if (ddd === '00') return false;
    if (ninth !== '9') return false;
  }
  return true;
}

function formatBrazilCell_(cellDigits) {
  if (cellDigits.length === 11) {
    // (11) 98765-4321
    return cellDigits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  // (11) 8765-4321
  return cellDigits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
}

function isValidEmail_(email) {
  // Simple, practical email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/**
 * Allows HTML templates to include other files if you want later.
 */
function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function clearForm() {
  // Clear name (dropdown or text)
  const nameSel = $("nameSel");
  const nameTxt = $("nameTxt");

  if (nameSel) nameSel.selectedIndex = 0;
  if (nameTxt) nameTxt.value = "";

  // Clear inputs
  $("cpf").value = "";
  $("rg").value = "";
  $("cell").value = "";
  $("email").value = "";
  $("pix").value = "";

  clearMessages();

  // Focus first field
  if (nameSel) nameSel.focus();
  else if (nameTxt) nameTxt.focus();
}