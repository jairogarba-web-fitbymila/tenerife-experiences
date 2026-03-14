-- Tenerife Experiences - Initial Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- AREAS (regions of Tenerife)
-- ============================================
create table public.areas (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name jsonb not null default '{}',
  description jsonb not null default '{}',
  image text,
  region text not null check (region in ('north', 'south', 'east', 'west', 'central')),
  coordinates jsonb,
  created_at timestamptz default now()
);

-- ============================================
-- CATEGORIES
-- ============================================
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  icon text not null default 'MapPin',
  image text,
  name jsonb not null default '{}',
  description jsonb not null default '{}',
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SUBCATEGORIES
-- ============================================
create table public.subcategories (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references public.categories(id) on delete cascade,
  slug text not null,
  name jsonb not null default '{}',
  description jsonb not null default '{}',
  short_description jsonb not null default '{}',
  image text,
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(category_id, slug)
);

-- ============================================
-- ITEMS (experiences, beaches, restaurants, etc.)
-- ============================================
create table public.items (
  id uuid primary key default uuid_generate_v4(),
  subcategory_id uuid not null references public.subcategories(id) on delete cascade,
  slug text not null,
  name jsonb not null default '{}',
  description jsonb not null default '{}',
  short_description jsonb not null default '{}',
  image text,
  images text[] default '{}',
  location jsonb default '{}',
  area_id uuid references public.areas(id),
  coordinates jsonb,
  rating numeric(2,1) not null default 0,
  review_count int not null default 0,
  price_from numeric(10,2),
  currency text not null default 'EUR',
  duration text,
  highlights jsonb default '[]',
  includes jsonb default '[]',
  -- Beach-specific
  sand_type jsonb,
  bathing_conditions jsonb,
  accessibility jsonb,
  typical_risk jsonb,
  -- Booking
  bookable boolean not null default false,
  booking_url text,
  affiliate_url text,
  -- SEO
  meta_title jsonb,
  meta_description jsonb,
  -- Flags
  visible boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(subcategory_id, slug)
);

-- ============================================
-- ARTICLES (blog posts, AI-generated content)
-- ============================================
create table public.articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title jsonb not null default '{}',
  excerpt jsonb not null default '{}',
  content jsonb not null default '{}',
  image text,
  category_id uuid references public.categories(id),
  area_id uuid references public.areas(id),
  tags text[] default '{}',
  author text not null default 'Tenerife Experiences',
  meta_title jsonb,
  meta_description jsonb,
  published boolean not null default false,
  ai_generated boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz
);

-- ============================================
-- PARTNERS (restaurants, hotels, operators)
-- ============================================
create table public.partners (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  type text not null check (type in ('restaurant', 'hotel', 'operator', 'shop', 'service')),
  description jsonb not null default '{}',
  image text,
  logo text,
  area_id uuid references public.areas(id),
  address text,
  phone text,
  email text,
  website text,
  coordinates jsonb,
  featured boolean not null default false,
  plan text not null default 'free' check (plan in ('free', 'basic', 'premium')),
  visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- REVIEWS
-- ============================================
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid references public.items(id) on delete cascade,
  partner_id uuid references public.partners(id) on delete cascade,
  author_name text not null,
  rating int not null check (rating >= 1 and rating <= 5),
  comment jsonb not null default '{}',
  locale text not null default 'en',
  approved boolean not null default false,
  created_at timestamptz default now(),
  check (item_id is not null or partner_id is not null)
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
create table public.subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  locale text not null default 'en',
  subscribed boolean not null default true,
  created_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_subcategories_category on public.subcategories(category_id);
create index idx_items_subcategory on public.items(subcategory_id);
create index idx_items_area on public.items(area_id);
create index idx_items_featured on public.items(featured) where featured = true;
create index idx_items_visible on public.items(visible) where visible = true;
create index idx_articles_published on public.articles(published, published_at desc) where published = true;
create index idx_articles_category on public.articles(category_id);
create index idx_articles_slug on public.articles(slug);
create index idx_reviews_item on public.reviews(item_id);
create index idx_reviews_partner on public.reviews(partner_id);
create index idx_partners_type on public.partners(type);
create index idx_partners_area on public.partners(area_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
alter table public.areas enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.items enable row level security;
alter table public.articles enable row level security;
alter table public.partners enable row level security;
alter table public.reviews enable row level security;
alter table public.subscribers enable row level security;

-- Public read policies (anonymous users can read visible content)
create policy "Public can read areas" on public.areas for select using (true);
create policy "Public can read visible categories" on public.categories for select using (visible = true);
create policy "Public can read visible subcategories" on public.subcategories for select using (visible = true);
create policy "Public can read visible items" on public.items for select using (visible = true);
create policy "Public can read published articles" on public.articles for select using (published = true);
create policy "Public can read visible partners" on public.partners for select using (visible = true);
create policy "Public can read approved reviews" on public.reviews for select using (approved = true);

-- Public write policies
create policy "Anyone can submit reviews" on public.reviews for insert with check (true);
create policy "Anyone can subscribe" on public.subscribers for insert with check (true);

-- Service role has full access (for admin dashboard and AI generation)
-- This is handled by using the service_role key in admin.ts

-- ============================================
-- FUNCTIONS
-- ============================================

-- Update updated_at timestamp automatically
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger categories_updated_at before update on public.categories
  for each row execute function public.handle_updated_at();
create trigger subcategories_updated_at before update on public.subcategories
  for each row execute function public.handle_updated_at();
create trigger items_updated_at before update on public.items
  for each row execute function public.handle_updated_at();
create trigger articles_updated_at before update on public.articles
  for each row execute function public.handle_updated_at();
create trigger partners_updated_at before update on public.partners
  for each row execute function public.handle_updated_at();

-- Function to update item rating when review is added
create or replace function public.update_item_rating()
returns trigger as $$
begin
  if new.item_id is not null and new.approved = true then
    update public.items
    set
      rating = (select round(avg(rating)::numeric, 1) from public.reviews where item_id = new.item_id and approved = true),
      review_count = (select count(*) from public.reviews where item_id = new.item_id and approved = true)
    where id = new.item_id;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger update_rating_on_review after insert or update on public.reviews
  for each row execute function public.update_item_rating();
