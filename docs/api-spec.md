# 영양제 최적화 서비스 API 명세 (v1 초안)

## Base
- `/api/v1`

## 1) 영양제 파싱
### POST `/supplements/parse`
- 목적: 제품명/OCR 텍스트를 성분 목록으로 정규화
- Request
```json
{
  "products": ["센트룸 우먼", "오메가3 1000"],
  "label_text": "Vitamin D 2000 IU, Magnesium 250 mg"
}
```
- Response
```json
{
  "nutrients": [
    { "code": "vitamin_d", "amount": 60, "unit": "mcg", "source": ["product_db", "ocr"] },
    { "code": "magnesium", "amount": 300, "unit": "mg", "source": ["ocr"] }
  ]
}
```

## 2) 건강검진 저장
### POST `/health-checks`
- 목적: 사용자 건강검진 지표 저장
- Request
```json
{
  "user_id": "uuid",
  "measured_at": "2026-02-16",
  "vitamin_d_ng_ml": 18.0,
  "ldl_mg_dl": 165,
  "hba1c_pct": 6.1,
  "ferritin_ng_ml": 22.5
}
```
- Response
```json
{
  "health_check_id": "uuid",
  "status": "saved"
}
```

## 3) 추천 생성
### POST `/recommendations/generate`
- 목적: 섭취 성분 + 건강검진 기반 추천 결과 생성
- Request
```json
{
  "user_id": "uuid",
  "nutrients": [
    { "code": "vitamin_d", "amount": 60, "unit": "mcg" },
    { "code": "omega3", "amount": 1000, "unit": "mg" }
  ],
  "health_check_id": "uuid"
}
```
- Response
```json
{
  "recommendation_id": "uuid",
  "items": [
    {
      "code": "vitamin_d",
      "intake": { "amount": 60, "unit": "mcg" },
      "status": "warn",
      "action": "increase",
      "reason": "혈중 비타민D 부족"
    },
    {
      "code": "omega3",
      "intake": { "amount": 1000, "unit": "mg" },
      "status": "ok",
      "action": "maintain",
      "reason": "권장량 범위 내"
    }
  ],
  "disclaimer": "의료 진단/처방을 대체하지 않습니다."
}
```

## 4) 추천 조회
### GET `/recommendations/{recommendation_id}`
- 목적: 저장된 추천 리포트 조회
- Response: `generate` 응답과 동일 구조

## 5) 에러 포맷
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "vitamin_d_ng_ml must be >= 0"
  }
}
```
