-- Nutrition optimization service schema (PostgreSQL)

create extension if not exists "pgcrypto";

create table if not exists app_user (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists supplement_product (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  source text not null default 'manual',
  created_at timestamptz not null default now()
);

create table if not exists nutrient_reference (
  code text primary key,
  label text not null,
  standard_unit text not null,
  rda numeric,
  ul numeric,
  reference_note text,
  updated_at timestamptz not null default now()
);

create table if not exists supplement_product_nutrient (
  id uuid primary key default gen_random_uuid(),
  supplement_product_id uuid not null references supplement_product(id) on delete cascade,
  nutrient_code text not null references nutrient_reference(code),
  amount numeric not null,
  unit text not null,
  serving_size text,
  unique (supplement_product_id, nutrient_code, amount, unit)
);

create table if not exists user_supplement_intake (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  supplement_product_id uuid references supplement_product(id),
  free_text_name text,
  servings_per_day numeric not null default 1,
  started_on date,
  ended_on date,
  created_at timestamptz not null default now()
);

create table if not exists user_health_check (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  measured_at date not null,
  vitamin_d_ng_ml numeric,
  ldl_mg_dl numeric,
  hba1c_pct numeric,
  ferritin_ng_ml numeric,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists recommendation_report (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  user_health_check_id uuid references user_health_check(id),
  rule_version text not null,
  summary jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists recommendation_item (
  id uuid primary key default gen_random_uuid(),
  recommendation_report_id uuid not null references recommendation_report(id) on delete cascade,
  nutrient_code text not null references nutrient_reference(code),
  intake_amount numeric not null,
  intake_unit text not null,
  status text not null check (status in ('ok', 'warn', 'danger')),
  action text not null check (action in ('maintain', 'increase', 'decrease', 'stop_review')),
  reason text not null
);

create index if not exists idx_health_check_user_date on user_health_check(user_id, measured_at desc);
create index if not exists idx_recommendation_user_date on recommendation_report(user_id, created_at desc);
