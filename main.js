const NUTRIENT_RULES = {
  vitamin_d: { label: "비타민D", unit: "mcg", rda: 15, ul: 100 },
  omega3: { label: "오메가3(EPA+DHA)", unit: "mg", rda: 1000, ul: 3000 },
  magnesium: { label: "마그네슘", unit: "mg", rda: 350, ul: 350 },
  vitamin_c: { label: "비타민C", unit: "mg", rda: 100, ul: 2000 },
  zinc: { label: "아연", unit: "mg", rda: 10, ul: 40 },
  calcium: { label: "칼슘", unit: "mg", rda: 700, ul: 2500 },
  iron: { label: "철", unit: "mg", rda: 10, ul: 45 },
  vitamin_b12: { label: "비타민B12", unit: "mcg", rda: 2.4, ul: null }
};

const NUTRIENT_ALIASES = {
  vitamin_d: ["vitamin d", "vit d", "비타민d", "cholecalciferol"],
  omega3: ["omega-3", "omega 3", "오메가3", "epa", "dha"],
  magnesium: ["magnesium", "마그네슘"],
  vitamin_c: ["vitamin c", "비타민c", "ascorbic acid"],
  zinc: ["zinc", "아연"],
  calcium: ["calcium", "칼슘"],
  iron: ["iron", "철"],
  vitamin_b12: ["vitamin b12", "비타민b12", "cyanocobalamin"]
};

const PRODUCT_DB = [
  {
    name: "센트룸 우먼",
    aliases: ["centrum women", "centrum woman"],
    nutrients: {
      vitamin_d: { amount: 10, unit: "mcg" },
      magnesium: { amount: 50, unit: "mg" },
      zinc: { amount: 8, unit: "mg" },
      vitamin_c: { amount: 100, unit: "mg" },
      vitamin_b12: { amount: 4, unit: "mcg" },
      iron: { amount: 14, unit: "mg" }
    }
  },
  {
    name: "오메가3 1000",
    aliases: ["omega3 1000", "omega 3 1000"],
    nutrients: { omega3: { amount: 1000, unit: "mg" } }
  },
  {
    name: "비타민D 2000IU",
    aliases: ["vitamin d 2000iu", "vit d 2000"],
    nutrients: { vitamin_d: { amount: 2000, unit: "iu" } }
  },
  {
    name: "마그네슘 350",
    aliases: ["magnesium 350"],
    nutrients: { magnesium: { amount: 350, unit: "mg" } }
  }
];

const state = {
  supplementFiles: [],
  healthFiles: [],
  detectedProducts: []
};

function round(value) {
  return Math.round(value * 10) / 10;
}

function normalizeAmount(key, amount, unit) {
  const target = NUTRIENT_RULES[key].unit;
  const normalizedUnit = (unit || "").toLowerCase().replace("μ", "u");
  if (normalizedUnit === target) return amount;
  if (normalizedUnit === "ug") return target === "mcg" ? amount : amount / 1000;
  if (normalizedUnit === "mcg" && target === "mg") return amount / 1000;
  if (normalizedUnit === "mg" && target === "mcg") return amount * 1000;
  if (normalizedUnit === "iu" && key === "vitamin_d") return amount * 0.025;
  return amount;
}

function addNutrient(total, key, amount, unit) {
  if (!NUTRIENT_RULES[key]) return;
  total[key] = (total[key] || 0) + normalizeAmount(key, amount, unit);
}

function mergeTotals(a, b) {
  const merged = { ...a };
  Object.entries(b).forEach(([k, v]) => {
    merged[k] = (merged[k] || 0) + v;
  });
  return merged;
}

function parseNutrientsFromText(text) {
  const total = {};
  const unitRegex = "(mg|mcg|ug|iu|IU|MG|MCG|UG)";
  Object.entries(NUTRIENT_ALIASES).forEach(([key, aliases]) => {
    aliases.forEach((alias) => {
      const regex = new RegExp(`${alias}\\s*[:\\-]?\\s*(\\d+(?:\\.\\d+)?)\\s*${unitRegex}`, "gi");
      let match;
      while ((match = regex.exec(text)) !== null) addNutrient(total, key, Number(match[1]), match[2]);
    });
  });
  return total;
}

function findProductsFromText(text) {
  const lower = text.toLowerCase();
  return PRODUCT_DB.filter((p) => {
    if (lower.includes(p.name.toLowerCase())) return true;
    return p.aliases.some((a) => lower.includes(a.toLowerCase()));
  });
}

function parseNamedProducts(rawText) {
  const names = rawText
    .split(/\n|,/)
    .map((v) => v.trim())
    .filter(Boolean);
  const total = {};
  const matchedProducts = [];
  names.forEach((name) => {
    const lower = name.toLowerCase();
    PRODUCT_DB.forEach((product) => {
      const matched = lower.includes(product.name.toLowerCase()) || product.aliases.some((a) => lower.includes(a.toLowerCase()));
      if (!matched) return;
      matchedProducts.push(product.name);
      Object.entries(product.nutrients).forEach(([k, info]) => addNutrient(total, k, info.amount, info.unit));
    });
  });
  return { total, matchedProducts };
}

function parseHealthFromText(text) {
  const get = (patterns) => {
    for (const p of patterns) {
      const m = text.match(p);
      if (m) return Number(m[1]);
    }
    return null;
  };
  return {
    vitaminD: get([/vitamin\s*d[^\d]{0,10}(\d+(?:\.\d+)?)/i, /비타민\s*d[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    ldl: get([/ldl[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    hba1c: get([/hba1c[^\d]{0,10}(\d+(?:\.\d+)?)/i, /당화혈색소[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    ferritin: get([/ferritin[^\d]{0,10}(\d+(?:\.\d+)?)/i, /페리틴[^\d]{0,10}(\d+(?:\.\d+)?)/i])
  };
}

async function recognizeImageText(file) {
  if (!window.Tesseract) return "";
  const result = await Tesseract.recognize(file, "eng+kor");
  return result?.data?.text || "";
}

function evaluateAction(key, intake, labs) {
  const rule = NUTRIENT_RULES[key];
  const reasons = [];
  let status = "ok";
  let action = "유지";
  if (intake < rule.rda) {
    status = "warn";
    action = "증량";
    reasons.push(`권장량(${rule.rda}${rule.unit}) 대비 부족`);
  }
  if (rule.ul && intake > rule.ul) {
    status = "danger";
    action = "감량";
    reasons.push(`상한섭취량(${rule.ul}${rule.unit}) 초과`);
  }
  if (key === "vitamin_d" && labs.vitaminD !== null && labs.vitaminD < 20) reasons.push("검진 비타민D 수치 부족(<20ng/mL)");
  if (key === "omega3" && labs.ldl !== null && labs.ldl >= 160) reasons.push("LDL 높음(>=160mg/dL), 오메가3 보강 후보");
  if (key === "magnesium" && labs.hba1c !== null && labs.hba1c >= 5.7 && intake < rule.rda) reasons.push("HbA1c>=5.7, 마그네슘 보강 후보");
  if (key === "iron" && labs.ferritin !== null && labs.ferritin < 30 && intake < rule.rda) reasons.push("페리틴 낮음(<30ng/mL), 철 보강 후보");
  if (reasons.length === 0) reasons.push("권장 범위 내 섭취");
  return { status, action, reasons: reasons.join("; ") };
}

function setStatus(id, text) {
  document.getElementById(id).textContent = text;
}

function renderPreview(id, files) {
  const el = document.getElementById(id);
  el.innerHTML = files.map((f) => `<span class="preview-item">${f.name}</span>`).join("");
}

function addFiles(key, files, previewId) {
  state[key] = state[key].concat(Array.from(files));
  renderPreview(previewId, state[key]);
}

function bindDropZone(zoneId, key, previewId) {
  const zone = document.getElementById(zoneId);
  zone.addEventListener("paste", (e) => {
    const items = Array.from(e.clipboardData?.items || []);
    const files = items.filter((it) => it.type.startsWith("image/")).map((it) => it.getAsFile()).filter(Boolean);
    if (files.length) addFiles(key, files, previewId);
  });
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("active");
  });
  zone.addEventListener("dragleave", () => zone.classList.remove("active"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("active");
    addFiles(key, e.dataTransfer.files, previewId);
  });
}

function fillHealthInputs(labs) {
  if (labs.vitaminD !== null) document.getElementById("lab-vitamin-d").value = labs.vitaminD;
  if (labs.ldl !== null) document.getElementById("lab-ldl").value = labs.ldl;
  if (labs.hba1c !== null) document.getElementById("lab-hba1c").value = labs.hba1c;
  if (labs.ferritin !== null) document.getElementById("lab-ferritin").value = labs.ferritin;
}

function buildLabContextFromInputs() {
  return {
    vitaminD: Number(document.getElementById("lab-vitamin-d").value) || null,
    ldl: Number(document.getElementById("lab-ldl").value) || null,
    hba1c: Number(document.getElementById("lab-hba1c").value) || null,
    ferritin: Number(document.getElementById("lab-ferritin").value) || null
  };
}

function renderSummary(total) {
  const keys = Object.keys(total);
  const html = keys.length
    ? keys.map((key) => `<span class="chip ok">${NUTRIENT_RULES[key].label}: ${round(total[key])}${NUTRIENT_RULES[key].unit}</span>`).join("")
    : `<span class="chip warn">인식된 영양성분이 없습니다</span>`;
  document.getElementById("summary").innerHTML = html;
}

function renderDetectedProducts() {
  const unique = [...new Set(state.detectedProducts)];
  const text = unique.length ? `인식된 영양제: ${unique.join(", ")}` : "인식된 영양제: 없음";
  document.getElementById("detected-products").textContent = text;
}

function renderResult(total, labs) {
  const rows = Object.keys(NUTRIENT_RULES).map((key) => {
    const intake = round(total[key] || 0);
    const rule = NUTRIENT_RULES[key];
    const evalResult = evaluateAction(key, intake, labs);
    const ulText = rule.ul ? `${rule.ul}${rule.unit}` : "-";
    const statusText = evalResult.status === "ok" ? "적정" : evalResult.status === "warn" ? "주의" : "위험";
    return `<tr><td>${rule.label}</td><td>${intake}${rule.unit}</td><td>${rule.rda}${rule.unit}</td><td>${ulText}</td><td><span class="chip ${evalResult.status}">${statusText}</span></td><td>${evalResult.action}</td><td>${evalResult.reasons}</td></tr>`;
  });
  document.getElementById("result-body").innerHTML = rows.join("");
}

async function analyze() {
  const button = document.getElementById("analyze-btn");
  button.disabled = true;
  button.textContent = "분석 중...";
  state.detectedProducts = [];

  const nameInput = document.getElementById("supplement-names").value;
  const byName = parseNamedProducts(nameInput);
  let total = byName.total;
  state.detectedProducts = state.detectedProducts.concat(byName.matchedProducts);

  setStatus("supplement-status", "영양제 이미지 OCR 분석 중...");
  for (const file of state.supplementFiles) {
    const text = await recognizeImageText(file);
    const products = findProductsFromText(`${file.name}\n${text}`);
    products.forEach((p) => {
      state.detectedProducts.push(p.name);
      Object.entries(p.nutrients).forEach(([k, info]) => addNutrient(total, k, info.amount, info.unit));
    });
    total = mergeTotals(total, parseNutrientsFromText(text));
  }
  setStatus("supplement-status", "영양제 분석 완료");

  setStatus("health-status", "건강검진 결과 OCR 분석 중...");
  let parsedLabs = { vitaminD: null, ldl: null, hba1c: null, ferritin: null };
  for (const file of state.healthFiles) {
    const text = await recognizeImageText(file);
    const labs = parseHealthFromText(`${file.name}\n${text}`);
    parsedLabs = {
      vitaminD: parsedLabs.vitaminD ?? labs.vitaminD,
      ldl: parsedLabs.ldl ?? labs.ldl,
      hba1c: parsedLabs.hba1c ?? labs.hba1c,
      ferritin: parsedLabs.ferritin ?? labs.ferritin
    };
  }
  fillHealthInputs(parsedLabs);
  setStatus("health-status", "건강검진 수치 추출 완료");

  const labs = buildLabContextFromInputs();
  renderDetectedProducts();
  renderSummary(total);
  renderResult(total, labs);
  document.getElementById("result-section").hidden = false;

  button.disabled = false;
  button.textContent = "분석하기";
}

function init() {
  document.getElementById("supplement-image-input").addEventListener("change", (e) => addFiles("supplementFiles", e.target.files, "supplement-preview"));
  document.getElementById("health-image-input").addEventListener("change", (e) => addFiles("healthFiles", e.target.files, "health-preview"));
  bindDropZone("supplement-paste-zone", "supplementFiles", "supplement-preview");
  bindDropZone("health-paste-zone", "healthFiles", "health-preview");
  document.getElementById("analyze-btn").addEventListener("click", analyze);
}

init();
