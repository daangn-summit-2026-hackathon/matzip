-- Matzip Map - Initial Schema
-- Run this in Supabase SQL Editor

-- Restaurants table
CREATE TABLE restaurants (
  id TEXT PRIMARY KEY,
  district_id TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  rating DOUBLE PRECISION,
  rating_count INTEGER NOT NULL DEFAULT 0,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  translations JSONB NOT NULL DEFAULT '{}'
);

-- Restaurant photos
CREATE TABLE restaurant_photos (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  translations JSONB NOT NULL DEFAULT '{}'
);

-- Menu items
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  price INTEGER NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  translations JSONB NOT NULL DEFAULT '{}'
);

-- Indexes
CREATE INDEX idx_restaurants_district ON restaurants(district_id);
CREATE INDEX idx_restaurants_tags ON restaurants USING GIN(tags);
CREATE INDEX idx_restaurants_translations ON restaurants USING GIN(translations);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_photos_restaurant ON restaurant_photos(restaurant_id);

-- Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON restaurants FOR SELECT USING (true);

ALTER TABLE restaurant_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON restaurant_photos FOR SELECT USING (true);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON menu_items FOR SELECT USING (true);
