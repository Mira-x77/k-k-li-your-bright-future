-- ========================================================
-- STAGE KÉKÉLI — SUPABASE POSTGRES SCHEMA
-- Run this script in your Supabase SQL Editor to create the table
-- ========================================================

CREATE TABLE IF NOT EXISTS public.sign_ins (
    id TEXT PRIMARY KEY,
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL DEFAULT 'Parent',
    parent_phone TEXT NOT NULL,
    series TEXT NOT NULL CHECK (series IN ('Première C', 'Première D', 'Terminale C', 'Terminale D')),
    subjects TEXT[] NOT NULL DEFAULT '{}',
    payment_plan TEXT NOT NULL CHECK (payment_plan IN ('mensuel', 'annuel')),
    payment_method TEXT NOT NULL,
    registration_fee_paid BOOLEAN NOT NULL DEFAULT true,
    tuition_fee_paid NUMERIC NOT NULL DEFAULT 0,
    total_amount_due NUMERIC NOT NULL DEFAULT 0,
    status TEXT NOT NULL CHECK (status IN ('Confirmé', 'En attente', 'Relancé')),
    saturday_session_included BOOLEAN NOT NULL DEFAULT true,
    photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    read_by_admin BOOLEAN NOT NULL DEFAULT false,
    notes TEXT
);

-- Enable Row Level Security (RLS) and grant full public access for anonymous registration
ALTER TABLE public.sign_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.sign_ins
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.sign_ins
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.sign_ins
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON public.sign_ins
    FOR DELETE USING (true);
