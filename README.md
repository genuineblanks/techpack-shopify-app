Content:
# TechPack Shopify App

A Shopify app for managing TechPack submissions with customer portal and admin interface.

## Quick Start

1. **Deploy to Railway:**
   - Connect this GitHub repo to Railway
   - Set environment variables
   - Deploy automatically

2. **Environment Variables:**
   DATABASE_URL=your_supabase_connection_string
   SHOPIFY_API_KEY=cbb3a67be330f1bf74701e8e8dad9df8
   SHOPIFY_API_SECRET=your_shopify_api_secret
   SHOPIFY_APP_URL=https://your-app.railway.app
   JWT_SECRET=your_random_secret_key
   SESSION_SECRET=another_random_secret

3. **Access Points:**
- Admin Dashboard: `https://your-app.railway.app/views/admin.html?shop=yourstore.myshopify.com`      
- Customer Portal:
`https://your-app.railway.app/views/customer.html?shop=yourstore.myshopify.com`
- Health Check: `https://your-app.railway.app/health`

## Features

- ✅ Database connection (Supabase PostgreSQL)
- ✅ Basic TechPack management
- ✅ Admin dashboard
- ✅ Customer portal
- ✅ API endpoints
- ⏳ Shopify OAuth (to be configured)
- ⏳ File uploads (to be added)

## Next Steps

1. Deploy to Railway
2. Configure Shopify OAuth
3. Test basic functionality
4. Add remaining features

Built for GenuineBlanks 🚀
