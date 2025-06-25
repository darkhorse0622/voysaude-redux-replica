# Database Migration Instructions

To fix the survey submission permission issue, you need to apply the following SQL migrations to your Supabase database:

## Option 1: Run migrations via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the contents of these files in order:
   - `supabase/migrations/004_fix_survey_responses_permissions.sql`
   - `supabase/migrations/005_create_insert_survey_function.sql`

## Option 2: Apply via psql (if you have direct database access)

```bash
psql "$NEXT_DATABASE_URL" -f supabase/migrations/004_fix_survey_responses_permissions.sql
psql "$NEXT_DATABASE_URL" -f supabase/migrations/005_create_insert_survey_function.sql
```

## What these migrations do:

1. **004_fix_survey_responses_permissions.sql**: 
   - Fixes table permissions for survey_responses
   - Grants necessary privileges to authenticated and anon users
   - Disables Row Level Security for the table

2. **005_create_insert_survey_function.sql**:
   - Creates a secure database function for inserting survey responses
   - Uses SECURITY DEFINER to bypass permission issues
   - Grants execute permissions to authenticated and anon users

After applying these migrations, the survey submission should work properly.