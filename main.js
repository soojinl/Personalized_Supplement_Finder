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

const KOREA_NUTRI_API = {
  baseUrl: "https://api.data.go.kr/openapi/tn_pubr_public_nutri_info_api",
  serviceKey: "-",
  type: "json",
  pageNo: 1,
  numOfRows: 50
};

let dsldNameMap = new Map();
let dsldLoaded = false;

function normalizeNameKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function loadDsldIndex() {
  if (dsldLoaded) return;
  try {
    const res = await fetch("data/dsld_nutrients.json");
    if (!res.ok) return;
    const data = await res.json();
    dsldNameMap = new Map();
    data.forEach((item) => {
      if (!item?.name || !item?.nutrients) return;
      const key = item.name_key || normalizeNameKey(item.name);
      if (!key) return;
      if (!dsldNameMap.has(key)) {
        dsldNameMap.set(key, item);
      }
    });
    dsldLoaded = true;
  } catch (e) {
    // fail silently if index is not available
  }
}

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
  const matchMeta = {};
  names.forEach((name) => {
    matchMeta[name] = { sources: new Set(), matchedName: null };
    const lower = name.toLowerCase();
    PRODUCT_DB.forEach((product) => {
      const matched = lower.includes(product.name.toLowerCase()) || product.aliases.some((a) => lower.includes(a.toLowerCase()));
      if (!matched) return;
      matchedProducts.push(product.name);
      matchMeta[name].sources.add("sample_db");
      matchMeta[name].matchedName = product.name;
      Object.entries(product.nutrients).forEach(([k, info]) => addNutrient(total, k, info.amount, info.unit));
    });

    if (dsldLoaded) {
      const key = normalizeNameKey(name);
      let product = dsldNameMap.get(key);
      if (product) {
        matchedProducts.push(product.name);
        matchMeta[name].sources.add("dsld");
        matchMeta[name].matchedName = product.name;
        Object.entries(product.nutrients).forEach(([k, info]) => {
          if (!info || info.amount === null || info.amount === undefined) return;
          addNutrient(total, k, info.amount, info.unit);
        });
      }
    }
  });
  return { total, matchedProducts, matchMeta };
}

function parseNumber(value) {
  if (value === null || value === undefined) return null;
  const num = Number(String(value).replace(/,/g, "").trim());
  return Number.isFinite(num) ? num : null;
}

function pickFirstValue(item, keys) {
  for (const key of keys) {
    if (item[key] !== undefined && item[key] !== null && item[key] !== "") return item[key];
  }
  return null;
}

function extractNutrientsFromApiItem(item) {
  const nutrients = {};
  const mappings = [
    { key: "vitamin_d", fields: ["vitd", "vitD", "vitaminD", "비타민D"] , unit: "mcg" },
    { key: "vitamin_c", fields: ["vitc", "vitC", "vitaminC", "비타민C"] , unit: "mg" },
    { key: "vitamin_b12", fields: ["vitb12", "vitB12", "vitaminB12", "비타민B12"] , unit: "mcg" },
    { key: "calcium", fields: ["ca", "calcium", "칼슘"] , unit: "mg" },
    { key: "iron", fields: ["fe", "iron", "철"] , unit: "mg" },
    { key: "zinc", fields: ["zn", "zinc", "아연"] , unit: "mg" },
    { key: "magnesium", fields: ["mg", "magnesium", "마그네슘"] , unit: "mg" }
  ];
  mappings.forEach((mapping) => {
    const value = parseNumber(pickFirstValue(item, mapping.fields));
    if (value === null) return;
    nutrients[mapping.key] = { amount: value, unit: mapping.unit };
  });
  return nutrients;
}

function isLikelyNameMatch(query, item) {
  const candidates = [
    item.foodNm,
    item.foodname,
    item.prdlstNm,
    item.prdlstname,
    item.prductNm,
    item.productName,
    item.prdtNm
  ].filter(Boolean);
  if (!candidates.length) return false;
  const q = normalizeNameKey(query);
  if (!q) return false;
  const qTokens = new Set(q.split(" ").filter(Boolean));
  return candidates.some((cand) => {
    const c = normalizeNameKey(cand);
    if (!c) return false;
    if (c === q) return true;
    const cTokens = new Set(c.split(" ").filter(Boolean));
    const overlap = [...qTokens].filter((t) => cTokens.has(t)).length;
    const ratio = overlap / Math.max(1, qTokens.size);
    return ratio >= 0.7;
  });
}

async function fetchKoreaNutriByName(name) {
  const params = new URLSearchParams();
  params.set("serviceKey", KOREA_NUTRI_API.serviceKey);
  params.set("type", KOREA_NUTRI_API.type);
  params.set("pageNo", String(KOREA_NUTRI_API.pageNo));
  params.set("numOfRows", String(KOREA_NUTRI_API.numOfRows));
  params.set("foodNm", name);
  const url = `${KOREA_NUTRI_API.baseUrl}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  if (KOREA_NUTRI_API.type.toLowerCase() === "xml") {
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const items = Array.from(xml.getElementsByTagName("item"));
    return items.map((node) => {
      const obj = {};
      Array.from(node.children).forEach((child) => {
        obj[child.tagName] = child.textContent;
      });
      return obj;
    });
  }
  const data = await res.json();
  const items =
    data?.response?.body?.items?.item ||
    data?.body?.items ||
    data?.items ||
    data?.data ||
    [];
  return Array.isArray(items) ? items : [items];
}

async function enrichFromKoreaApi(names, total, matchedProducts, matchMeta) {
  const unique = [...new Set(names)].filter(Boolean);
  for (const name of unique) {
    try {
      const items = await fetchKoreaNutriByName(name);
      if (!items.length) continue;
      const item = items.find((candidate) => isLikelyNameMatch(name, candidate));
      if (!item) continue;
      const nutrients = extractNutrientsFromApiItem(item);
      if (Object.keys(nutrients).length === 0) continue;
      matchedProducts.push(item.foodNm || item.foodname || name);
      if (matchMeta?.[name]) {
        matchMeta[name].sources.add("korea_api");
        matchMeta[name].matchedName = item.foodNm || item.foodname || name;
      }
      Object.entries(nutrients).forEach(([k, info]) => addNutrient(total, k, info.amount, info.unit));
    } catch (e) {
      // ignore API failures
    }
  }
}

function parseHealthFromText(text) {
  const get = (patterns) => {
    for (const p of patterns) {
      const m = text.match(p);
      if (m) return Number(String(m[1]).replace(/,/g, ""));
    }
    return null;
  };
  return {
    vitaminD: get([/vitamin\s*d[^\d]{0,10}(\d+(?:\.\d+)?)/i, /비타민\s*d[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    ldl: get([/ldl[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    hdl: get([/hdl[^\d]{0,10}(\d+(?:\.\d+)?)/i, /좋은\s*콜레스테롤[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    triglycerides: get([/triglyceride[^\d]{0,10}(\d+(?:\.\d+)?)/i, /중성지방[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    totalChol: get([/total\s*cholesterol[^\d]{0,10}(\d+(?:\.\d+)?)/i, /총\s*콜레스테롤[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    hba1c: get([/hba1c[^\d]{0,10}(\d+(?:\.\d+)?)/i, /당화혈색소[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    fastingGlucose: get([/fasting\s*glucose[^\d]{0,10}(\d+(?:\.\d+)?)/i, /공복혈당[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    ferritin: get([/ferritin[^\d]{0,10}(\d+(?:\.\d+)?)/i, /페리틴[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    rbc: get([/rbc[^\d]{0,10}(\d+(?:\.\d+)?)/i, /적혈구[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    hb: get([/hemoglobin[^\d]{0,10}(\d+(?:\.\d+)?)/i, /\bhb\b[^\d]{0,10}(\d+(?:\.\d+)?)/i, /혈색소[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    hct: get([/hct[^\d]{0,10}(\d+(?:\.\d+)?)/i, /hematocrit[^\d]{0,10}(\d+(?:\.\d+)?)/i, /헤마토크릿[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    ast: get([/ast[^\d]{0,10}(\d+(?:\.\d+)?)/i, /got[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    alt: get([/alt[^\d]{0,10}(\d+(?:\.\d+)?)/i, /gpt[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    ggt: get([/g-?gtp[^\d]{0,10}(\d+(?:\.\d+)?)/i, /γ-?gtp[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    bilirubin: get([/bilirubin[^\d]{0,10}(\d+(?:\.\d+)?)/i, /총\s*빌리루빈[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    creatinine: get([/creatinine[^\d]{0,10}(\d+(?:\.\d+)?)/i, /크레아티닌[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    egfr: get([/egfr[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    bun: get([/bun[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    sodium: get([/sodium[^\d]{0,10}(\d+(?:\.\d+)?)/i, /\bna\b[^\d]{0,10}(\d+(?:\.\d+)?)/i, /나트륨[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    potassium: get([/potassium[^\d]{0,10}(\d+(?:\.\d+)?)/i, /\bk\b[^\d]{0,10}(\d+(?:\.\d+)?)/i, /칼륨[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    chloride: get([/chloride[^\d]{0,10}(\d+(?:\.\d+)?)/i, /\bcl\b[^\d]{0,10}(\d+(?:\.\d+)?)/i, /염소[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    uricAcid: get([/uric\s*acid[^\d]{0,10}(\d+(?:\.\d+)?)/i, /요산[^\d]{0,10}(\d+(?:\.\d+)?)/i]),
    tsh: get([/tsh[^\d]{0,10}(\d+(?:\.\d+)?)/i, /갑상선\s*tsh[^\d]{0,10}(\d+(?:\.\d+)?)/i])
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

function buildLabStatus(labs, person) {
  const gender = person?.gender;
  const bySex = (male, female) => (gender === "female" ? female : gender === "male" ? male : null);
  const descriptions = {
    wbc: "면역 상태",
    rbc: "산소 운반",
    hb: "빈혈 여부",
    hct: "혈액 농도",
    platelet: "출혈·응고",
    ast: "간 기능(손상 여부)",
    alt: "간 기능(손상 여부)",
    ggt: "간/담도 기능",
    bilirubin: "담즙 대사",
    creatinine: "신장 여과 기능",
    egfr: "신장 여과 기능",
    bun: "신장 기능/단백질 대사",
    fastingGlucose: "혈당 상태",
    hba1c: "최근 2~3개월 평균 혈당",
    totalChol: "지질 상태",
    ldl: "혈관 건강 지표",
    hdl: "보호성 지질 지표",
    triglycerides: "지질 상태",
    sodium: "체액 균형",
    potassium: "근육·심장 기능",
    chloride: "산염기/체액 균형",
    uricAcid: "통풍/대사 지표",
    tsh: "갑상선 기능",
    vitaminD: "뼈·면역 건강"
  };
  const rules = [
    { key: "vitaminD", label: "비타민 D", min: 20, max: null, unit: "ng/mL" },
    { key: "fastingGlucose", label: "공복혈당", min: 70, max: 99, unit: "mg/dL" },
    { key: "hba1c", label: "HbA1c", min: null, max: 5.6, unit: "%" },
    { key: "triglycerides", label: "중성지방", min: null, max: 150, unit: "mg/dL" },
    { key: "hdl", label: "HDL", min: 40, max: null, unit: "mg/dL" },
    { key: "ldl", label: "LDL", min: null, max: 100, unit: "mg/dL" },
    { key: "totalChol", label: "총 콜레스테롤", min: null, max: 200, unit: "mg/dL" },
    { key: "ast", label: "AST", min: 0, max: 40, unit: "IU/L" },
    { key: "alt", label: "ALT", min: 0, max: 40, unit: "IU/L" },
    { key: "ggt", label: "γ-GTP", min: bySex(10, 6), max: bySex(70, 40), unit: "IU/L" },
    { key: "bilirubin", label: "총 빌리루빈", min: 0.2, max: 1.2, unit: "mg/dL" },
    { key: "creatinine", label: "크레아티닌", min: bySex(0.7, 0.6), max: bySex(1.3, 1.1), unit: "mg/dL" },
    { key: "egfr", label: "eGFR", min: 90, max: null, unit: "" },
    { key: "bun", label: "BUN", min: 8, max: 23, unit: "mg/dL" },
    { key: "sodium", label: "나트륨", min: 135, max: 145, unit: "mEq/L" },
    { key: "potassium", label: "칼륨", min: 3.5, max: 5.0, unit: "mEq/L" },
    { key: "chloride", label: "염소", min: 98, max: 106, unit: "mEq/L" },
    { key: "uricAcid", label: "요산", min: bySex(3.5, 2.6), max: bySex(7.2, 6.0), unit: "mg/dL" },
    { key: "tsh", label: "TSH", min: 0.4, max: 4.0, unit: "μIU/mL" }
  ];

  const anemiaRules = [
    { key: "rbc", label: "적혈구", min: bySex(4.5, 4.0), max: bySex(5.9, 5.2), unit: "×10⁶/μL" },
    { key: "hb", label: "혈색소", min: bySex(13, 12), max: bySex(17, 16), unit: "g/dL" },
    { key: "hct", label: "헤마토크릿", min: bySex(40, 36), max: bySex(52, 48), unit: "%" }
  ];

  const results = [];
  [...rules, ...anemiaRules].forEach((rule) => {
    const value = normalizeLabValue(labs[rule.key]);
    if (value === null) return;
    if (rule.min === null && rule.max === null) return;
    let status = "ok";
    if (rule.min !== null && value < rule.min) status = "low";
    if (rule.max !== null && value > rule.max) status = "high";
    results.push({ ...rule, value, status, desc: descriptions[rule.key] || "" });
  });
  return results;
}

function buildHealthRecommendations(labs, person) {
  const gender = person?.gender;
  const bySex = (male, female) => (gender === "female" ? female : gender === "male" ? male : null);
  const recos = [];
  const notes = [];
  const anemia = ["rbc", "hb", "hct"].some((key) => {
    const value = normalizeLabValue(labs[key]);
    if (value === null) return false;
    if (bySex(0, 0) === null) return false;
    if (key === "rbc") return value < bySex(4.5, 4.0);
    if (key === "hb") return value < bySex(13, 12);
    if (key === "hct") return value < bySex(40, 36);
    return false;
  });
  if (anemia) recos.push("철분, 비타민 B12, 엽산 보강 고려 (빈혈 관련 지표 낮음)");

  const vitaminD = normalizeLabValue(labs.vitaminD);
  if (vitaminD !== null && vitaminD < 20) recos.push("비타민 D3 보강 고려 (비타민 D 부족)");

  const fasting = normalizeLabValue(labs.fastingGlucose);
  if (fasting !== null && fasting >= 100 && fasting <= 125) {
    recos.push("마그네슘, 알파리포산, 크롬 보강 고려 (공복혈당 경계)");
    notes.push("공복혈당은 생활습관 교정이 1순위이며 보충제는 보조 수단입니다.");
  } else if (fasting !== null && fasting >= 126) {
    notes.push("공복혈당 126 이상은 진료 기준에 해당할 수 있어 전문 상담이 필요합니다.");
  }

  const tg = normalizeLabValue(labs.triglycerides);
  const hdl = normalizeLabValue(labs.hdl);
  if ((tg !== null && tg >= 150) || (hdl !== null && hdl < 40)) {
    recos.push("오메가3(EPA/DHA) 보강 고려 (지질 수치 개선 목적)");
    notes.push("나이아신은 의사 상담 후 고려하세요.");
  }

  const uric = normalizeLabValue(labs.uricAcid);
  const uricMax = bySex(7.2, 6.0);
  if (uric !== null && uricMax !== null && uric > uricMax) recos.push("비타민 C, 수분 섭취 증가 고려 (요산 경계 상승)");

  const tsh = normalizeLabValue(labs.tsh);
  if (tsh !== null && tsh > 4.0) {
    recos.push("셀레늄 보강은 의사 상담 후 고려 (TSH 상승)");
    notes.push("요오드 과다/결핍 여부 확인이 필요할 수 있습니다.");
  }

  const ast = normalizeLabValue(labs.ast);
  const alt = normalizeLabValue(labs.alt);
  if ((ast !== null && ast > 40) || (alt !== null && alt > 40)) {
    recos.push("밀크시슬(실리마린), 비타민 E 보조적 고려 (간수치 경계 상승)");
    notes.push("간수치 상승은 원인 파악이 우선입니다.");
  }

  const potassium = normalizeLabValue(labs.potassium);
  if (potassium !== null && potassium < 3.5) recos.push("마그네슘/칼륨 섭취 개선 고려 (칼륨 낮음)");

  const sodium = normalizeLabValue(labs.sodium);
  if (sodium !== null && sodium > 145) notes.push("나트륨 높음은 보충제보다 식이 조절이 우선입니다.");

  return { recos, notes };
}

function renderHealthInsights(labs, person) {
  const summaryEl = document.getElementById("health-summary");
  const recoEl = document.getElementById("health-recos");
  if (!summaryEl || !recoEl) return;

  const statusList = buildLabStatus(labs, person);
  if (!statusList.length) {
    summaryEl.innerHTML = "";
    recoEl.innerHTML = "";
    return;
  }

  const chips = statusList.map((item) => {
    const level = item.status === "ok" ? "" : item.status === "low" ? "warn" : "danger";
    const range = [
      item.min !== null ? item.min : "-",
      item.max !== null ? item.max : "-"
    ].join("~");
    const title = item.desc ? `${item.desc} | 정상범위: ${range}${item.unit ? ` ${item.unit}` : ""}` : `정상범위: ${range}${item.unit ? ` ${item.unit}` : ""}`;
    return `<span class="health-chip ${level}" title="${title}">${item.label}: ${item.value}${item.unit} (${range})</span>`;
  });
  const legend = `
    <div class="health-legend">
      <span class="legend-item"><span class="legend-dot ok"></span>정상</span>
      <span class="legend-item"><span class="legend-dot warn"></span>낮음</span>
      <span class="legend-item"><span class="legend-dot danger"></span>높음</span>
    </div>
  `;
  summaryEl.innerHTML = `<strong>건강검진 요약</strong><div class="summary-row">${chips.join("")}</div>${legend}`;

  const { recos, notes } = buildHealthRecommendations(labs, person);
  if (!recos.length && !notes.length) {
    recoEl.innerHTML = "";
    return;
  }
  const recoList = recos.length ? `<ul>${recos.map((r) => `<li>${r}</li>`).join("")}</ul>` : "";
  const noteList = notes.length ? `<ul>${notes.map((n) => `<li>${n}</li>`).join("")}</ul>` : "";
  recoEl.innerHTML = `<strong>건강검진 기반 보강 참고</strong>${recoList}${noteList}`;
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

function renderDetectedProducts(requestedNames = [], matchMeta = {}) {
  const unique = [...new Set(state.detectedProducts)];
  const text = unique.length ? `인식된 영양제: ${unique.join(", ")}` : "인식된 영양제: 없음";
  document.getElementById("detected-products").textContent = text;

  const unmatched = requestedNames.filter((name) => {
    const meta = matchMeta[name];
    return !meta || meta.sources.size === 0;
  });
  if (!unmatched.length) {
    document.getElementById("unmatched-products").textContent = "";
    return;
  }
  const reasons = unmatched.map((name) => {
    const meta = matchMeta[name] || { sources: new Set() };
    const reasonParts = [];
    if (dsldLoaded) reasonParts.push("DSLD 정확일치 없음");
    reasonParts.push("API 유사도 매칭 실패");
    reasonParts.push("샘플 DB 불일치");
    return `- ${name}: ${reasonParts.join(", ")}`;
  });
  document.getElementById("unmatched-products").textContent = `미매칭(원인):\n${reasons.join("\n")}`;
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

function setAnalyzeUiState(state) {
  const analyzeBtn = document.getElementById("analyze-btn");
  const reanalyzeBtn = document.getElementById("reanalyze-btn");
  if (state === "loading") {
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "분석 중...";
    reanalyzeBtn.disabled = true;
    reanalyzeBtn.textContent = "분석 중...";
  } else if (state === "done") {
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "분석 완료";
    analyzeBtn.hidden = true;
    reanalyzeBtn.disabled = false;
    reanalyzeBtn.textContent = "다시 분석하기";
    reanalyzeBtn.hidden = false;
  } else {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = "분석하기";
    analyzeBtn.hidden = false;
    reanalyzeBtn.disabled = false;
    reanalyzeBtn.textContent = "다시 분석하기";
  }
}

async function analyze() {
  setAnalyzeUiState("loading");
  state.detectedProducts = [];

  const nameInput = document.getElementById("supplement-names").value;
  const byName = parseNamedProducts(nameInput);
  let total = byName.total;
  state.detectedProducts = state.detectedProducts.concat(byName.matchedProducts);

  const rawNames = nameInput
    .split(/\n|,/)
    .map((v) => v.trim())
    .filter(Boolean);
  await enrichFromKoreaApi(rawNames, total, state.detectedProducts, byName.matchMeta);

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
  let parsedLabs = {
    vitaminD: null,
    ldl: null,
    hdl: null,
    triglycerides: null,
    totalChol: null,
    hba1c: null,
    fastingGlucose: null,
    ferritin: null,
    rbc: null,
    hb: null,
    hct: null,
    ast: null,
    alt: null,
    ggt: null,
    bilirubin: null,
    creatinine: null,
    egfr: null,
    bun: null,
    sodium: null,
    potassium: null,
    chloride: null,
    uricAcid: null,
    tsh: null
  };
  for (const file of state.healthFiles) {
    const text = await recognizeImageText(file);
    const labs = parseHealthFromText(`${file.name}\n${text}`);
    parsedLabs = {
      vitaminD: parsedLabs.vitaminD ?? labs.vitaminD,
      ldl: parsedLabs.ldl ?? labs.ldl,
      hdl: parsedLabs.hdl ?? labs.hdl,
      triglycerides: parsedLabs.triglycerides ?? labs.triglycerides,
      totalChol: parsedLabs.totalChol ?? labs.totalChol,
      hba1c: parsedLabs.hba1c ?? labs.hba1c,
      fastingGlucose: parsedLabs.fastingGlucose ?? labs.fastingGlucose,
      ferritin: parsedLabs.ferritin ?? labs.ferritin,
      rbc: parsedLabs.rbc ?? labs.rbc,
      hb: parsedLabs.hb ?? labs.hb,
      hct: parsedLabs.hct ?? labs.hct,
      ast: parsedLabs.ast ?? labs.ast,
      alt: parsedLabs.alt ?? labs.alt,
      ggt: parsedLabs.ggt ?? labs.ggt,
      bilirubin: parsedLabs.bilirubin ?? labs.bilirubin,
      creatinine: parsedLabs.creatinine ?? labs.creatinine,
      egfr: parsedLabs.egfr ?? labs.egfr,
      bun: parsedLabs.bun ?? labs.bun,
      sodium: parsedLabs.sodium ?? labs.sodium,
      potassium: parsedLabs.potassium ?? labs.potassium,
      chloride: parsedLabs.chloride ?? labs.chloride,
      uricAcid: parsedLabs.uricAcid ?? labs.uricAcid,
      tsh: parsedLabs.tsh ?? labs.tsh
    };
  }
  setStatus("health-status", "건강검진 수치 추출 완료");

  const labs = Object.fromEntries(
    Object.entries(parsedLabs).map(([key, value]) => [key, normalizeLabValue(value)])
  );
  const person = buildPersonalInfoFromInputs();
  renderDetectedProducts(rawNames, byName.matchMeta);
  renderSummary(total, person);
  renderGuidelines(person);
  renderHealthInsights(labs, person);
  renderResult(total, labs, person);
  document.getElementById("result-section").hidden = false;

  setAnalyzeUiState("done");
}

function init() {
  loadDsldIndex();
  document.getElementById("supplement-image-input").addEventListener("change", (e) => addFiles("supplementFiles", e.target.files, "supplement-preview"));
  document.getElementById("health-image-input").addEventListener("change", (e) => addFiles("healthFiles", e.target.files, "health-preview"));
  bindDropZone("supplement-paste-zone", "supplementFiles", "supplement-preview");
  bindDropZone("health-paste-zone", "healthFiles", "health-preview");
  document.getElementById("analyze-btn").addEventListener("click", analyze);
  document.getElementById("reanalyze-btn").addEventListener("click", analyze);
}

init();
