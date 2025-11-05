/*
  # Create leaderboard table for Yaposhi Defenders game

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key) - Unique identifier for each score entry
      - `player_name` (text) - Name of the player (character name)
      - `character_id` (text) - Character used (ira, sashka, polinka)
      - `score` (integer) - Final score achieved
      - `created_at` (timestamptz) - When the score was recorded
  
  2. Security
    - Enable RLS on `leaderboard` table
    - Add policy for anyone to read leaderboard data (public scores)
    - Add policy for anyone to insert their score (no authentication required for this game)
  
  3. Indexes
    - Index on `score` for fast leaderboard queries
    - Index on `created_at` for time-based queries
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  character_id text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert their score"
  ON leaderboard
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_created_at ON leaderboard(created_at DESC);
