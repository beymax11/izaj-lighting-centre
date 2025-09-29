# E-Wallet Database Setup

This document contains the SQL script to create the `user_ewallets` table in your Supabase database.

## SQL Migration Script

Run this SQL script in your Supabase SQL Editor:

```sql
-- Create user_ewallets table
CREATE TABLE IF NOT EXISTS user_ewallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(100) NOT NULL,
  icon VARCHAR(100) DEFAULT 'mdi:wallet',
  color VARCHAR(50) DEFAULT 'bg-gray-500',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_user_ewallets_user_id ON user_ewallets(user_id);

-- Create index on is_active for faster filtering
CREATE INDEX IF NOT EXISTS idx_user_ewallets_is_active ON user_ewallets(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE user_ewallets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only view their own e-wallets
CREATE POLICY "Users can view their own e-wallets"
  ON user_ewallets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own e-wallets
CREATE POLICY "Users can insert their own e-wallets"
  ON user_ewallets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own e-wallets
CREATE POLICY "Users can update their own e-wallets"
  ON user_ewallets
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own e-wallets
CREATE POLICY "Users can delete their own e-wallets"
  ON user_ewallets
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_ewallets_updated_at
  BEFORE UPDATE ON user_ewallets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## How to Apply

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the entire SQL script above
5. Click "Run" to execute the script

## Table Structure

| Column         | Type      | Description                              |
|----------------|-----------|------------------------------------------|
| id             | UUID      | Primary key (auto-generated)             |
| user_id        | UUID      | Foreign key to auth.users                |
| type           | VARCHAR   | E-wallet type (GCash, PayMaya, etc.)     |
| account_name   | VARCHAR   | Account holder name                      |
| account_number | VARCHAR   | Account number or mobile number          |
| icon           | VARCHAR   | Icon identifier for the e-wallet         |
| color          | VARCHAR   | Color class for the e-wallet card        |
| is_active      | BOOLEAN   | Soft delete flag                         |
| created_at     | TIMESTAMP | Record creation timestamp                |
| updated_at     | TIMESTAMP | Record update timestamp (auto-updated)   |

## Security

- Row Level Security (RLS) is enabled
- Users can only access their own e-wallet records
- All CRUD operations are protected by RLS policies

## Verification

After running the script, verify the table was created:

```sql
SELECT * FROM user_ewallets LIMIT 1;
```

The query should run without errors (even if it returns no rows).
