# Chosen

Toronto streetwear storefront. Headless Shopify + Next.js.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Shopify Storefront API (headless)
- Vercel deployment

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | Your store domain, e.g. `your-store.myshopify.com` (no `https://`) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Public Storefront API token |

### How to get the Shopify Storefront Access Token

1. Go to your Shopify Admin
2. Navigate to **Apps > Develop apps**
3. Create a new app (or use an existing one)
4. Under **Configuration**, enable the Storefront API and add these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
5. Install the app and copy the **Storefront API access token**

**No env vars?** The site falls back to a local mock dataset and still runs fully.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Dropping in your own media

Place your files in `public/` following this structure:

```
public/
  videos/
    hero.mp4          <- Hero background video (replace this)
  images/
    hero-poster.jpg   <- Hero poster frame (shows before video loads)
    products/
      brown-cargo-set-1.jpg
      brown-cargo-set-2.jpg
      brown-cargo-pants-1.jpg
      brown-cargo-pants-2.jpg
      brown-cargo-zipup-1.jpg
      brown-cargo-zipup-2.jpg
    collections/
      brown-cargo-set.jpg
      rhinestone-tracksuit.jpg
    lookbook/
      look-1.jpg  (through look-6.jpg)
```

The hero video source is configured in `lib/config.ts`.

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel (vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

Vercel auto-detects Next.js, no extra config needed.
