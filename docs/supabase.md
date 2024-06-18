## Supabase

- [Pulling down changes made on cloud instance](https://supabase.com/docs/guides/cli/local-development#link-your-project)
- [Creating migration file from local changes](https://supabase.com/docs/guides/cli/local-development#diffing-changes)

### Quick commands

**Diffing changes**

`supabase db diff --schema public`

**Capture any changes that you have made to your remote database**

`supabase db pull`

**Capture any changes that you have made to your localhost database**

`supabase db pull --local`

**To apply the new migration to your local database**

`supabase migration up`

**To reset your local database completely**

`supabase db reset`

**Deploy any local database migrations to remote/production**

`supabase db push`
