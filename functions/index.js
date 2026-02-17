const functions = require("firebase-functions");

const API_BASE = "https://api.data.go.kr/openapi/tn_pubr_public_nutri_info_api";

function buildUrl(req, apiKey) {
  const params = new URLSearchParams();
  params.set("serviceKey", apiKey);
  params.set("type", req.query.type || "json");
  params.set("pageNo", req.query.pageNo || "1");
  params.set("numOfRows", req.query.numOfRows || "50");
  if (req.query.foodNm) params.set("foodNm", req.query.foodNm);
  if (req.query.bsshNm) params.set("bsshNm", req.query.bsshNm);
  return `${API_BASE}?${params.toString()}`;
}

exports.koreaNutriProxy = functions.https.onRequest(async (req, res) => {
  const apiKey = functions.config()?.nutri?.key;
  if (!apiKey) {
    res.status(500).json({ error: "API key missing" });
    return;
  }
  try {
    const url = buildUrl(req, apiKey);
    const response = await fetch(url);
    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "content-encoding") return;
      res.setHeader(key, value);
    });
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).json({ error: "Proxy request failed" });
  }
});
