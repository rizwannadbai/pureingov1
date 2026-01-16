# Product Database Migration Instructions

## Step 1: Run Schema Migration

1. Open **Supabase Dashboard** → Your Project → **SQL Editor**
2. Copy and paste the entire content of `supabase/products_schema.sql`
3. Click **Run**
4. Verify: You should see "Success. No rows returned"

## Step 2: Run Data Migration

1. In the same **SQL Editor**
2. Copy and paste the entire content of `supabase/products_data.sql`
3. Click **Run**
4. Verify: You should see **"Inserted 40 products"** (or similar count)

## Step 3: Verify in Supabase

1. Go to **Table Editor** → Select `products` table
2. You should see all products listed
3. Check that categories include: `fresh-juices`, `fresh-fruit-boxes`, `sprouts`, etc.

## Step 4: Once Done

Reply with "Done" or "SQL ran successfully" and I will:
- Update all frontend pages to use the database
- Add product management to Admin Panel
- Test the integration

## Troubleshooting

**Error: "relation products already exists"**
- The table already exists. You can either:
  - Drop it: `DROP TABLE public.products CASCADE;` then run schema again
  - OR skip products_schema.sql and just run products_data.sql

**Error: "duplicate key value"**
- Products already inserted. You can clear them:
  - `DELETE FROM public.products;` then run products_data.sql again
