# Prisma Setup

This project now includes Prisma ORM for type-safe database operations alongside the existing Supabase setup.

## Current Status

✅ **Completed:**
- Prisma schema created based on existing database structure
- Prisma client generated and ready to use
- Service layer created with common database operations
- Types are now available for all database models

⚠️ **Note:** 
- Direct database migrations are disabled due to Supabase authentication restrictions
- The schema is designed to work with the existing Supabase database structure
- Both Supabase client and Prisma can be used simultaneously

## Available Scripts

```bash
# Generate Prisma client (run after schema changes)
npm run db:generate

# Push schema to database (when credentials are available)
npm run db:push

# Run migrations (when credentials are available)
npm run db:migrate

# Open Prisma Studio (when credentials are available)
npm run db:studio
```

## Usage Examples

### Using Prisma Service
```typescript
import { PrismaService } from '@/services/prismaService'

// Get user by ID
const user = await PrismaService.getUserById('user-id')

// Create survey response
const response = await PrismaService.createSurveyResponse({
  user_id: 'user-id',
  form_id: 'form-id',
  responses: { question1: 'answer1' }
})

// Get delivery addresses
const addresses = await PrismaService.getDeliveryAddressesByUser('user-id')
```

### Using Prisma Client Directly
```typescript
import { prisma } from '@/lib/prisma'

const users = await prisma.user.findMany({
  where: { is_active: true },
  include: { deliveryAddresses: true }
})
```

## Database Models

- **User** - User accounts and profiles
- **SurveyResponse** - Health questionnaire responses  
- **DeliveryAddress** - User shipping addresses
- **Credit** - User credit system
- **Mockup** - Product mockup generation
- **Payment** - Payment processing
- **Subscription** - Subscription management
- **Product** - Product catalog
- **SystemConfig** - Application configuration

## Environment Variables

```env
DATABASE_URL="postgresql://..." # Connection pooling URL
DIRECT_URL="postgresql://..."   # Direct connection (for migrations)
```

## Integration with Supabase

Prisma works alongside the existing Supabase setup:
- Use Supabase for authentication and real-time features
- Use Prisma for complex queries and type safety
- Both can access the same database tables

## Troubleshooting

If you encounter authentication issues:
1. Verify database credentials in Supabase dashboard
2. Update DATABASE_URL and DIRECT_URL in .env
3. Ensure your IP is allowlisted in Supabase
4. For migrations, you may need database owner privileges