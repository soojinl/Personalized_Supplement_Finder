const NUTRIENT_META = {
  vitamin_d: { label: "비타민D", unit: "mcg" },
  omega3: { label: "오메가3(EPA+DHA)", unit: "mg" },
  magnesium: { label: "마그네슘", unit: "mg" },
  vitamin_c: { label: "비타민C", unit: "mg" },
  zinc: { label: "아연", unit: "mg" },
  calcium: { label: "칼슘", unit: "mg" },
  iron: { label: "철", unit: "mg" },
  vitamin_b12: { label: "비타민B12", unit: "mcg" }
};

const BASE_RULES = {
  vitamin_d: { rda: 15, ul: 100 },
  omega3: { rda: 1000, ul: 3000 },
  magnesium: { rda: 350, ul: 350 },
  vitamin_c: { rda: 100, ul: 2000 },
  zinc: { rda: 10, ul: 40 },
  calcium: { rda: 700, ul: 2500 },
  iron: { rda: 10, ul: 45 },
  vitamin_b12: { rda: 2.4, ul: null }
};

const KDRI_RULES = {
  vitamin_d: {
    source: "KDRI 2020",
    bySex: {
      male: [
        { min: 1, max: 2, rda: 5, ul: 30 },
        { min: 3, max: 5, rda: 5, ul: 35 },
        { min: 6, max: 8, rda: 5, ul: 40 },
        { min: 9, max: 11, rda: 5, ul: 60 },
        { min: 12, max: 18, rda: 10, ul: 100 },
        { min: 19, max: 64, rda: 10, ul: 100 },
        { min: 65, max: 74, rda: 15, ul: 100 },
        { min: 75, max: 200, rda: 15, ul: 100 }
      ],
      female: [
        { min: 1, max: 2, rda: 5, ul: 30 },
        { min: 3, max: 5, rda: 5, ul: 35 },
        { min: 6, max: 8, rda: 5, ul: 40 },
        { min: 9, max: 11, rda: 5, ul: 60 },
        { min: 12, max: 18, rda: 10, ul: 100 },
        { min: 19, max: 64, rda: 10, ul: 100 },
        { min: 65, max: 74, rda: 15, ul: 100 },
        { min: 75, max: 200, rda: 15, ul: 100 }
      ]
    }
  },
  vitamin_c: {
    source: "KDRI 2020",
    bySex: {
      male: [
        { min: 1, max: 2, rda: 40, ul: 340 },
        { min: 3, max: 5, rda: 45, ul: 510 },
        { min: 6, max: 8, rda: 50, ul: 750 },
        { min: 9, max: 11, rda: 70, ul: 1100 },
        { min: 12, max: 14, rda: 90, ul: 1400 },
        { min: 15, max: 18, rda: 100, ul: 1600 },
        { min: 19, max: 200, rda: 100, ul: 2000 }
      ],
      female: [
        { min: 1, max: 2, rda: 40, ul: 340 },
        { min: 3, max: 5, rda: 45, ul: 510 },
        { min: 6, max: 8, rda: 50, ul: 750 },
        { min: 9, max: 11, rda: 70, ul: 1100 },
        { min: 12, max: 14, rda: 90, ul: 1400 },
        { min: 15, max: 18, rda: 100, ul: 1600 },
        { min: 19, max: 200, rda: 100, ul: 2000 }
      ]
    }
  },
  vitamin_b12: {
    source: "KDRI 2020",
    bySex: {
      male: [
        { min: 1, max: 2, rda: 0.9, ul: null },
        { min: 3, max: 5, rda: 1.1, ul: null },
        { min: 6, max: 8, rda: 1.3, ul: null },
        { min: 9, max: 11, rda: 1.7, ul: null },
        { min: 12, max: 14, rda: 2.3, ul: null },
        { min: 15, max: 18, rda: 2.4, ul: null },
        { min: 19, max: 200, rda: 2.4, ul: null }
      ],
      female: [
        { min: 1, max: 2, rda: 0.9, ul: null },
        { min: 3, max: 5, rda: 1.1, ul: null },
        { min: 6, max: 8, rda: 1.3, ul: null },
        { min: 9, max: 11, rda: 1.7, ul: null },
        { min: 12, max: 14, rda: 2.3, ul: null },
        { min: 15, max: 18, rda: 2.4, ul: null },
        { min: 19, max: 200, rda: 2.4, ul: null }
      ]
    }
  },
  calcium: {
    source: "KDRI 2020",
    bySex: {
      male: [
        { min: 1, max: 2, rda: 500, ul: 2500 },
        { min: 3, max: 5, rda: 600, ul: 2500 },
        { min: 6, max: 8, rda: 700, ul: 2500 },
        { min: 9, max: 11, rda: 800, ul: 3000 },
        { min: 12, max: 14, rda: 1000, ul: 3000 },
        { min: 15, max: 18, rda: 900, ul: 3000 },
        { min: 19, max: 29, rda: 800, ul: 2500 },
        { min: 30, max: 49, rda: 800, ul: 2500 },
        { min: 50, max: 64, rda: 750, ul: 2000 },
        { min: 65, max: 74, rda: 700, ul: 2000 },
        { min: 75, max: 200, rda: 700, ul: 2000 }
      ],
      female: [
        { min: 1, max: 2, rda: 500, ul: 2500 },
        { min: 3, max: 5, rda: 600, ul: 2500 },
        { min: 6, max: 8, rda: 700, ul: 2500 },
        { min: 9, max: 11, rda: 800, ul: 3000 },
        { min: 12, max: 14, rda: 900, ul: 3000 },
        { min: 15, max: 18, rda: 800, ul: 3000 },
        { min: 19, max: 29, rda: 700, ul: 2500 },
        { min: 30, max: 49, rda: 700, ul: 2500 },
        { min: 50, max: 64, rda: 800, ul: 2000 },
        { min: 65, max: 74, rda: 800, ul: 2000 },
        { min: 75, max: 200, rda: 800, ul: 2000 }
      ]
    }
  },
  iron: {
    source: "KDRI 2020",
    bySex: {
      male: [
        { min: 1, max: 2, rda: 6, ul: 40 },
        { min: 3, max: 5, rda: 7, ul: 40 },
        { min: 6, max: 8, rda: 9, ul: 40 },
        { min: 9, max: 11, rda: 11, ul: 40 },
        { min: 12, max: 14, rda: 14, ul: 40 },
        { min: 15, max: 18, rda: 14, ul: 45 },
        { min: 19, max: 49, rda: 10, ul: 45 },
        { min: 50, max: 64, rda: 10, ul: 45 },
        { min: 65, max: 74, rda: 9, ul: 45 },
        { min: 75, max: 200, rda: 9, ul: 45 }
      ],
      female: [
        { min: 1, max: 2, rda: 6, ul: 40 },
        { min: 3, max: 5, rda: 7, ul: 40 },
        { min: 6, max: 8, rda: 9, ul: 40 },
        { min: 9, max: 11, rda: 10, ul: 40 },
        { min: 12, max: 14, rda: 16, ul: 40 },
        { min: 15, max: 18, rda: 14, ul: 45 },
        { min: 19, max: 49, rda: 14, ul: 45 },
        { min: 50, max: 64, rda: 8, ul: 45 },
        { min: 65, max: 74, rda: 8, ul: 45 },
        { min: 75, max: 200, rda: 7, ul: 45 }
      ]
    }
  },
  zinc: {
    source: "KDRI 2020",
    bySex: {
      male: [
        { min: 1, max: 2, rda: 3, ul: 6 },
        { min: 3, max: 5, rda: 4, ul: 9 },
        { min: 6, max: 8, rda: 5, ul: 13 },
        { min: 9, max: 11, rda: 8, ul: 19 },
        { min: 12, max: 14, rda: 8, ul: 27 },
        { min: 15, max: 18, rda: 10, ul: 33 },
        { min: 19, max: 29, rda: 10, ul: 35 },
        { min: 30, max: 49, rda: 10, ul: 35 },
        { min: 50, max: 64, rda: 10, ul: 35 },
        { min: 65, max: 74, rda: 9, ul: 35 },
        { min: 75, max: 200, rda: 9, ul: 35 }
      ],
      female: [
        { min: 1, max: 2, rda: 3, ul: 6 },
        { min: 3, max: 5, rda: 4, ul: 9 },
        { min: 6, max: 8, rda: 5, ul: 13 },
        { min: 9, max: 11, rda: 8, ul: 19 },
        { min: 12, max: 14, rda: 8, ul: 27 },
        { min: 15, max: 18, rda: 9, ul: 33 },
        { min: 19, max: 49, rda: 8, ul: 35 },
        { min: 50, max: 64, rda: 8, ul: 35 },
        { min: 65, max: 74, rda: 7, ul: 35 },
        { min: 75, max: 200, rda: 7, ul: 35 }
      ]
    }
  },
  magnesium: {
    source: "KDRI 2020",
    bySex: {
      male: [
        { min: 1, max: 2, rda: 70, ul: 60 },
        { min: 3, max: 5, rda: 110, ul: 90 },
        { min: 6, max: 8, rda: 150, ul: 130 },
        { min: 9, max: 11, rda: 220, ul: 190 },
        { min: 12, max: 14, rda: 320, ul: 270 },
        { min: 15, max: 18, rda: 410, ul: 350 },
        { min: 19, max: 29, rda: 360, ul: 350 },
        { min: 30, max: 49, rda: 370, ul: 350 },
        { min: 50, max: 64, rda: 370, ul: 350 },
        { min: 65, max: 200, rda: 370, ul: 350 }
      ],
      female: [
        { min: 1, max: 2, rda: 70, ul: 60 },
        { min: 3, max: 5, rda: 110, ul: 90 },
        { min: 6, max: 8, rda: 150, ul: 130 },
        { min: 9, max: 11, rda: 220, ul: 190 },
        { min: 12, max: 14, rda: 290, ul: 270 },
        { min: 15, max: 18, rda: 340, ul: 350 },
        { min: 19, max: 29, rda: 280, ul: 350 },
        { min: 30, max: 49, rda: 280, ul: 350 },
        { min: 50, max: 200, rda: 280, ul: 350 }
      ]
    }
  }
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
  const target = NUTRIENT_META[key].unit;
  const normalizedUnit = (unit || "").toLowerCase().replace("μ", "u");
  if (normalizedUnit === target) return amount;
  if (normalizedUnit === "ug") return target === "mcg" ? amount : amount / 1000;
  if (normalizedUnit === "mcg" && target === "mg") return amount / 1000;
  if (normalizedUnit === "mg" && target === "mcg") return amount * 1000;
  if (normalizedUnit === "iu" && key === "vitamin_d") return amount * 0.025;
  return amount;
}

function addNutrient(total, key, amount, unit) {
  if (!NUTRIENT_META[key]) return;
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

function normalizeText(value) {
  return (value || "").trim().toLowerCase();
}

function isKorean(nationality) {
  return ["대한민국", "한국", "korea", "republic of korea", "south korea"].some((token) => nationality.includes(token));
}

function isAmerican(nationality) {
  return ["미국", "usa", "united states", "america", "u.s."].some((token) => nationality.includes(token));
}

function pickByAge(ranges, age) {
  if (age === null || !Number.isFinite(age)) return null;
  return ranges.find((range) => age >= range.min && age <= range.max) || null;
}

function getReference(person) {
  const nationality = normalizeText(person?.nationality);
  if (!nationality || isKorean(nationality)) return "KDRI 2020";
  return "BASE";
}

function getRuleForPerson(key, person) {
  const base = BASE_RULES[key];
  const meta = NUTRIENT_META[key];
  const gender = person?.gender;
  const age = person?.age ?? null;
  const reference = getReference(person);

  if (reference === "KDRI 2020" && KDRI_RULES[key] && (gender === "male" || gender === "female")) {
    const ranges = KDRI_RULES[key].bySex[gender];
    const match = pickByAge(ranges, age);
    if (match) {
      return {
        label: meta.label,
        unit: meta.unit,
        rda: match.rda,
        ul: match.ul,
        source: "KDRI 2020"
      };
    }
  }

  return { label: meta.label, unit: meta.unit, rda: base.rda, ul: base.ul, source: "BASE" };
}

function evaluateAction(key, intake, labs, person, rule) {
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
  if (rule.source === "BASE" && person?.age !== null) reasons.push("연령대에 따라 권장량이 달라질 수 있어 개별 기준 확인 필요");
  if (person?.gender === "female" && key === "iron") reasons.push("성별에 따라 철 권장량이 달라질 수 있어 개별 기준 확인 필요");
  const nationality = normalizeText(person?.nationality);
  if (nationality && !isKorean(nationality)) reasons.push("국가별 권장량 기준 차이가 있을 수 있음");
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

function normalizeLabValue(value) {
  if (value === null || value === undefined) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function buildPersonalInfoFromInputs() {
  const ageRaw = (document.getElementById("user-age").value || "").trim();
  const ageValue = ageRaw === "" ? null : Number(ageRaw);
  const age = Number.isFinite(ageValue) ? ageValue : null;
  const gender = document.getElementById("user-gender").value || null;
  const nationality = (document.getElementById("user-nationality").value || "").trim() || null;
  return { age, gender, nationality };
}

function getGuidelineNotes(person) {
  const nationality = normalizeText(person?.nationality);
  if (isAmerican(nationality)) {
    return {
      title: "DGA 2025–2030 요약",
      items: [
        "가공식품과 첨가당, 정제 탄수화물 섭취를 크게 줄이고 실제 식품 중심으로 식단을 구성",
        "단백질 1.2–1.6 g/kg/일 범위를 목표로 필요 열량에 맞춰 조정",
        "2,000 kcal 기준: 유제품 3회, 채소 3회, 과일 2회, 통곡물 2–4회 섭취",
        "14세 이상 나트륨 2,300mg/일 이하(어린이는 연령별 하향)",
        "주류 섭취는 최소화"
      ]
    };
  }
  return null;
}

function renderGuidelines(person) {
  const el = document.getElementById("guideline-notes");
  if (!el) return;
  const note = getGuidelineNotes(person);
  if (!note) {
    el.innerHTML = "";
    return;
  }
  const items = note.items.map((item) => `<li>${item}</li>`).join("");
  el.innerHTML = `<strong>${note.title}</strong><ul>${items}</ul>`;
}

function renderSummary(total, person) {
  const keys = Object.keys(total);
  const nutrientHtml = keys.length
    ? keys.map((key) => `<span class="chip ok">${NUTRIENT_META[key].label}: ${round(total[key])}${NUTRIENT_META[key].unit}</span>`).join("")
    : `<span class="chip warn">인식된 영양성분이 없습니다</span>`;
  const personalChips = [];
  const reference = getReference(person);
  if (person?.age !== null) personalChips.push(`<span class="chip ok">나이: ${person.age}세</span>`);
  if (person?.gender) personalChips.push(`<span class="chip ok">성별: ${person.gender === "female" ? "여성" : person.gender === "male" ? "남성" : person.gender === "other" ? "기타" : "응답 안 함"}</span>`);
  if (person?.nationality) personalChips.push(`<span class="chip ok">국적: ${person.nationality}</span>`);
  personalChips.push(`<span class="chip ok">기준: ${reference === "KDRI 2020" ? "KDRI 2020" : "기본값"}</span>`);
  const personalHtml = personalChips.length ? `<div class="summary-row">${personalChips.join("")}</div>` : "";
  const nutrientRow = `<div class="summary-row">${nutrientHtml}</div>`;
  document.getElementById("summary").innerHTML = `${personalHtml}${nutrientRow}`;
}

function renderDetectedProducts() {
  const unique = [...new Set(state.detectedProducts)];
  const text = unique.length ? `인식된 영양제: ${unique.join(", ")}` : "인식된 영양제: 없음";
  document.getElementById("detected-products").textContent = text;
}

function renderResult(total, labs, person) {
  const rows = Object.keys(NUTRIENT_META).map((key) => {
    const intake = round(total[key] || 0);
    const rule = getRuleForPerson(key, person);
    const evalResult = evaluateAction(key, intake, labs, person, rule);
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
  setStatus("health-status", "건강검진 수치 추출 완료");

  const labs = {
    vitaminD: normalizeLabValue(parsedLabs.vitaminD),
    ldl: normalizeLabValue(parsedLabs.ldl),
    hba1c: normalizeLabValue(parsedLabs.hba1c),
    ferritin: normalizeLabValue(parsedLabs.ferritin)
  };
  const person = buildPersonalInfoFromInputs();
  renderDetectedProducts();
  renderSummary(total, person);
  renderGuidelines(person);
  renderResult(total, labs, person);
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
