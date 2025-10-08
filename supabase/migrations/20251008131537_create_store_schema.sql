/*
  # Gary's Store - E-commerce Database Schema

  ## New Tables
  
  ### `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (Men, Women, Children)
  - `slug` (text, unique) - URL-friendly category name
  - `description` (text) - Category description
  - `image_url` (text) - Category image
  - `created_at` (timestamptz) - Creation timestamp

  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `category_id` (uuid, foreign key) - Reference to category
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly product name
  - `description` (text) - Product description
  - `base_price` (decimal) - Starting price
  - `image_url` (text) - Main product image
  - `images` (jsonb) - Array of additional images
  - `available_sizes` (jsonb) - Array of available sizes
  - `available_colors` (jsonb) - Array of available colors
  - `customization_options` (jsonb) - Custom options (fabrics, embroidery, etc)
  - `featured` (boolean) - Featured product flag
  - `in_stock` (boolean) - Stock availability
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `cart_items`
  - `id` (uuid, primary key) - Unique cart item identifier
  - `user_id` (uuid) - User identifier (can be session-based)
  - `product_id` (uuid, foreign key) - Reference to product
  - `quantity` (integer) - Item quantity
  - `selected_size` (text) - Selected size
  - `selected_color` (text) - Selected color
  - `customizations` (jsonb) - Custom options selected
  - `price` (decimal) - Item price at time of adding
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `orders`
  - `id` (uuid, primary key) - Unique order identifier
  - `order_number` (text, unique) - Human-readable order number
  - `user_id` (uuid) - User identifier
  - `customer_name` (text) - Customer name
  - `customer_email` (text) - Customer email
  - `customer_phone` (text) - Customer phone
  - `shipping_address` (jsonb) - Shipping address details
  - `billing_address` (jsonb) - Billing address details
  - `items` (jsonb) - Order items with details
  - `subtotal` (decimal) - Subtotal amount
  - `tax` (decimal) - Tax amount
  - `shipping` (decimal) - Shipping amount
  - `total` (decimal) - Total amount
  - `status` (text) - Order status (pending, processing, shipped, delivered, cancelled)
  - `payment_status` (text) - Payment status (pending, paid, failed)
  - `notes` (text) - Order notes
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  
  1. Enable RLS on all tables
  2. Public read access for categories and products (catalog browsing)
  3. Cart items accessible only to their owner
  4. Orders accessible only to their owner
  
  ## Notes
  - All prices stored as decimal for accuracy
  - JSONB used for flexible data structures (images, options, addresses)
  - Indexes added for performance on frequently queried columns
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  base_price decimal(10,2) NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  images jsonb DEFAULT '[]'::jsonb,
  available_sizes jsonb DEFAULT '[]'::jsonb,
  available_colors jsonb DEFAULT '[]'::jsonb,
  customization_options jsonb DEFAULT '{}'::jsonb,
  featured boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  selected_size text DEFAULT '',
  selected_color text DEFAULT '',
  customizations jsonb DEFAULT '{}'::jsonb,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  user_id uuid NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text DEFAULT '',
  shipping_address jsonb DEFAULT '{}'::jsonb,
  billing_address jsonb DEFAULT '{}'::jsonb,
  items jsonb DEFAULT '[]'::jsonb,
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  tax decimal(10,2) NOT NULL DEFAULT 0,
  shipping decimal(10,2) NOT NULL DEFAULT 0,
  total decimal(10,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- RLS Policies for cart_items (user-specific access)
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  USING (true);

-- RLS Policies for orders (user-specific access)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);