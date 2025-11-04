import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the structure of a leaderboard entry
interface ScoreEntry {
  username: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  maxTime: number;
  date: string;
}

// Path to the JSON file
const jsonFilePath = path.resolve(process.cwd(), 'jsonDatabase', 'leaderboard.json');

// Helper function to read the database
async function readDb(): Promise<ScoreEntry[]> {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

// Helper function to write to the database
async function writeDb(data: ScoreEntry[]): Promise<void> {
  await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * GET /api/leaderboard
 * Fetches and returns the sorted leaderboard.
 * Supports filtering by 'difficulty' and 'maxTime' via query params.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get('difficulty');
  const maxTime = searchParams.get('maxTime');

  try {
    let scores = await readDb();

    // Filter scores if query params are provided
    if (difficulty) {
      scores = scores.filter(s => s.difficulty === difficulty);
    }
    if (maxTime) {
      scores = scores.filter(s => s.maxTime === parseInt(maxTime, 10));
    }

    // Sort scores by score (descending) and then by date (ascending)
    scores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // Limit to top 100 scores
    const topScores = scores.slice(0, 100);

    return NextResponse.json(topScores);
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return NextResponse.json({ message: 'Error fetching leaderboard' }, { status: 500 });
  }
}

/**
 * POST /api/leaderboard
 * Adds a new score to the leaderboard.
 */
export async function POST(request: Request) {
  try {
    const newEntry: Omit<ScoreEntry, 'date'> = await request.json();

    // Basic validation
    if (!newEntry.username || typeof newEntry.score !== 'number' || !newEntry.difficulty || !newEntry.maxTime) {
      return NextResponse.json({ message: 'Invalid score data' }, { status: 400 });
    }

    const scores = await readDb();
    
    const scoreToSave: ScoreEntry = {
      ...newEntry,
      username: newEntry.username.slice(0, 15), // Truncate username
      date: new Date().toISOString(),
    };

    scores.push(scoreToSave);
    await writeDb(scores);

    return NextResponse.json({ message: 'Score added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Failed to add score:', error);
    return NextResponse.json({ message: 'Error adding score' }, { status: 500 });
  }
}
