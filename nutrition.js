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
  vitamin_d: ["vitamin d", "비타민d", "비타민 d", "cholecalciferol"],
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
    nutrients: {
      omega3: { amount: 1000, unit: "mg" }
    }
  },
  {
    name: "비타민D 2000IU",
    nutrients: {
      vitamin_d: { amount: 2000, unit: "iu" }
    }
  },
  {
    name: "마그네슘 350",
    nutrients: {
      magnesium: { amount: 350, unit: "mg" }
    }
  }
];

function round(value) {
  return Math.round(value * 10) / 10;
}

function normalizeAmount(key, amount, unit) {
  const target = NUTRIENT_RULES[key].unit;
  const normalizedUnit = (unit || "").toLowerCase().replace("μ", "u");
  let value = amount;

  if (normalizedUnit === target) return value;
  if (normalizedUnit === "ug") return target === "mcg" ? value : value / 1000;
  if (normalizedUnit === "mcg" && target === "mg") return value / 1000;
  if (normalizedUnit === "mg" && target === "mcg") return value * 1000;
  if (normalizedUnit === "iu" && key === "vitamin_d") {
    const mcg = value * 0.025;
    return target === "mcg" ? mcg : mcg / 1000;
  }
  return value;
}

function addNutrient(total, key, amount, unit) {
  if (!NUTRIENT_RULES[key]) return;
  const normalized = normalizeAmount(key, amount, unit);
  total[key] = (total[key] || 0) + normalized;
}

function parseNamedProducts(rawText) {
  const names = rawText
    .split(/\n|,/)
    .map((v) => v.trim())
    .filter(Boolean);
  const total = {};

  names.forEach((name) => {
    PRODUCT_DB.forEach((product) => {
      if (name.toLowerCase().includes(product.name.toLowerCase())) {
        Object.entries(product.nutrients).forEach(([key, info]) => {
          addNutrient(total, key, info.amount, info.unit);
        });
      }
    });
  });

  return total;
}

function parseNutrientsFromText(rawText) {
  const total = {};
  const unitRegex = "(mg|mcg|ug|iu|IU|MG|MCG|UG)";

  Object.entries(NUTRIENT_ALIASES).forEach(([key, aliases]) => {
    aliases.forEach((alias) => {
      const regex = new RegExp(`${alias}\\s*[:\\-]?\\s*(\\d+(?:\\.\\d+)?)\\s*${unitRegex}`, "gi");
      let match;
      while ((match = regex.exec(rawText)) !== null) {
        addNutrient(total, key, Number(match[1]), match[2]);
      }
    });
  });

  return total;
}

function mergeTotals(a, b) {
  const merged = { ...a };
  Object.entries(b).forEach(([k, v]) => {
    merged[k] = (merged[k] || 0) + v;
  });
  return merged;
}

function buildLabContext() {
  return {
    vitaminD: Number(document.getElementById("lab-vitamin-d").value) || null,
    ldl: Number(document.getElementById("lab-ldl").value) || null,
    hba1c: Number(document.getElementById("lab-hba1c").value) || null,
    ferritin: Number(document.getElementById("lab-ferritin").value) || null
  };
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

  if (key === "vitamin_d" && labs.vitaminD !== null) {
    if (labs.vitaminD < 20) {
      action = "증량";
      status = status === "danger" ? "danger" : "warn";
      reasons.push("검진 비타민D 수치 부족(<20ng/mL)");
    } else if (labs.vitaminD > 50 && action !== "감량") {
      action = "유지";
      reasons.push("검진 비타민D 수치 양호");
    }
  }

  if (key === "omega3" && labs.ldl !== null && labs.ldl >= 160) {
    if (action === "유지") action = "증량";
    reasons.push("LDL 높음(>=160mg/dL), 오메가3 보강 후보");
  }

  if (key === "iron" && labs.ferritin !== null) {
    if (labs.ferritin < 30 && intake < rule.rda) {
      action = "증량";
      status = status === "danger" ? "danger" : "warn";
      reasons.push("페리틴 낮음(<30ng/mL), 철 보강 후보");
    } else if (labs.ferritin > 300) {
      action = "감량";
      status = "danger";
      reasons.push("페리틴 높음(>300ng/mL), 철 과다 가능성");
    }
  }

  if (key === "magnesium" && labs.hba1c !== null && labs.hba1c >= 5.7 && intake < rule.rda) {
    action = "증량";
    status = status === "danger" ? "danger" : "warn";
    reasons.push("당대사 리스크(HbA1c>=5.7), 마그네슘 보강 후보");
  }

  if (reasons.length === 0) {
    reasons.push("권장 범위 내 섭취");
  }

  return { status, action, reasons: reasons.join("; ") };
}

function renderResult(total, labs) {
  const rows = Object.keys(NUTRIENT_RULES).map((key) => {
    const intake = round(total[key] || 0);
    const rule = NUTRIENT_RULES[key];
    const evalResult = evaluateAction(key, intake, labs);
    const ulText = rule.ul ? `${rule.ul}${rule.unit}` : "-";
    return `
      <tr>
        <td>${rule.label}</td>
        <td>${intake}${rule.unit}</td>
        <td>${rule.rda}${rule.unit}</td>
        <td>${ulText}</td>
        <td><span class="chip ${evalResult.status}">${evalResult.status === "ok" ? "적정" : evalResult.status === "warn" ? "주의" : "위험"}</span></td>
        <td>${evalResult.action}</td>
        <td>${evalResult.reasons}</td>
      </tr>
    `;
  });

  document.getElementById("result-body").innerHTML = rows.join("");
}

function renderSummary(total) {
  const chips = [];
  const keys = Object.keys(total);

  if (keys.length === 0) {
    chips.push(`<span class="chip warn">인식된 영양성분이 없습니다</span>`);
  } else {
    keys.forEach((key) => {
      if (!NUTRIENT_RULES[key]) return;
      chips.push(`<span class="chip ok">${NUTRIENT_RULES[key].label}: ${round(total[key])}${NUTRIENT_RULES[key].unit}</span>`);
    });
  }

  document.getElementById("summary").innerHTML = chips.join("");
}

document.getElementById("analyze-btn").addEventListener("click", () => {
  const names = document.getElementById("supplement-names").value;
  const labelText = document.getElementById("label-text").value;
  const byName = parseNamedProducts(names);
  const byText = parseNutrientsFromText(labelText);
  const total = mergeTotals(byName, byText);
  const labs = buildLabContext();

  renderSummary(total);
  renderResult(total, labs);
  document.getElementById("result-section").hidden = false;
});
