import type { Level } from './types';
export type { Level };

// Helper to generate level ids cleanly
// World 1 = IDs 1-50, World 2 = 51-100, etc.
const w = (worldId: number, localId: number): number =>
  (worldId - 1) * 50 + localId;

const WORLDS: Record<number, string> = {
  1: "World 1: Addition Foundation",
  2: "World 2: Subtraction Strategies",
  3: "World 3: Multiplication Mastery",
  4: "World 4: Division Techniques",
  5: "World 5: Mixed Operations",
  6: "World 6: Number Sense & Patterns",
  7: "World 7: Speed Drills",
  8: "World 8: Mental Math Elite",
};

// ============================================================
// WORLD 1 — ADDITION FOUNDATION (Levels 1-50)
// Skills: singles, doubles, nearDoubles, +8, +9, +10, 2-digit
// ============================================================
const world1Levels: Level[] = [
  // --- Introduction (1-5): No timer, low targets ---
  {
    id: w(1,1), worldId: 1, worldName: WORLDS[1], type: 'intro',
    title: "First Steps: Adding Small Numbers",
    description: "Welcome! Let's start with the most basic addition.",
    tip: "Count up from the bigger number. For 3 + 5, start at 5 and count up 3: 6, 7, 8.",
    tipDiagram: { steps: ["Look at the bigger number","Count up from it","That's your answer!"], example: "3 + 5 = ?", solution: ["Start at 5","Count: 6, 7, 8","Answer: 8"] },
    targetScore: 5, star1Score: 3, star2Score: 4,
    generationParams: { operators: ['+'], numberRange: [1, 5], skill: 'random' }
  },
  {
    id: w(1,2), worldId: 1, worldName: WORLDS[1], type: 'intro',
    title: "Making Ten",
    description: "Knowing which numbers add to exactly 10 is one of the most powerful skills.",
    tip: "Memorize these pairs: 1+9, 2+8, 3+7, 4+6, 5+5. These are your 'Make 10' friends!",
    tipDiagram: { steps: ["1+9=10","2+8=10","3+7=10","4+6=10","5+5=10"], example: "3 + ? = 10", solution: ["3 + 7 = 10","The missing number is 7"] },
    targetScore: 8, star1Score: 4, star2Score: 6,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'makeTen' }
  },
  {
    id: w(1,3), worldId: 1, worldName: WORLDS[1], type: 'intro',
    title: "Adding to Single Digits",
    description: "Practice adding any two single-digit numbers confidently.",
    tip: "Always start counting from the BIGGER number. It saves steps!",
    targetScore: 8, star1Score: 4, star2Score: 6,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'random' }
  },
  {
    id: w(1,4), worldId: 1, worldName: WORLDS[1], type: 'intro',
    title: "Doubles",
    description: "Adding a number to itself — your first mental shortcut!",
    tip: "Memorize these: 1+1=2, 2+2=4, 3+3=6, 4+4=8, 5+5=10, 6+6=12, 7+7=14, 8+8=16, 9+9=18",
    tipDiagram: { steps: ["A double is a number + itself","Think of it as 2 groups"], example: "7 + 7 = ?", solution: ["7 + 7 = 14","Two groups of 7"] },
    targetScore: 8, star1Score: 4, star2Score: 6,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'doubles' }
  },
  {
    id: w(1,5), worldId: 1, worldName: WORLDS[1], type: 'intro',
    title: "Near Doubles",
    description: "What if the numbers are almost the same? Use your doubles!",
    tip: "For 7+8: think '7+7=14, then add 1 more = 15'. Use the double closest to both numbers.",
    tipDiagram: { steps: ["Spot that the numbers are close","Use the double you know","Add or subtract the difference"], example: "7 + 8 = ?", solution: ["7 + 7 = 14 (known double)","14 + 1 = 15","Answer: 15"] },
    targetScore: 8, star1Score: 4, star2Score: 6,
    generationParams: { operators: ['+'], numberRange: [3, 9], skill: 'nearDoubles' }
  },
  // --- Foundation (6-10): 90s timer, single skill focus ---
  {
    id: w(1,6), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "The 'Adding 10' Rule",
    description: "Adding 10 is one of the simplest tricks. Master it!",
    tip: "To add 10, just increase the TENS digit by 1. The ones digit stays the same. 23+10=33.",
    tipDiagram: { steps: ["Find the tens digit","Add 1 to it","Ones digit stays the same"], example: "47 + 10 = ?", solution: ["Tens digit is 4 → becomes 5","Ones digit stays 7","Answer: 57"] },
    targetScore: 10, star1Score: 6, star2Score: 8,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [10, 60], skill: 'addTen', fixedOperand: 10 }
  },
  {
    id: w(1,7), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "The 'Adding 9' Trick",
    description: "9 is just one less than 10. Use that!",
    tip: "To add 9: add 10 first, then subtract 1. Example: 27+9 = 27+10-1 = 37-1 = 36.",
    tipDiagram: { steps: ["Add 10 instead of 9","Then subtract 1"], example: "34 + 9 = ?", solution: ["34 + 10 = 44 (easy!)","44 - 1 = 43","Answer: 43"] },
    targetScore: 10, star1Score: 6, star2Score: 8,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [11, 60], skill: 'addNine', fixedOperand: 9 }
  },
  {
    id: w(1,8), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "The 'Adding 8' Trick",
    description: "Same idea as adding 9, but subtract 2.",
    tip: "To add 8: add 10, then subtract 2. Example: 35+8 = 35+10-2 = 45-2 = 43.",
    tipDiagram: { steps: ["Add 10 instead of 8","Then subtract 2"], example: "27 + 8 = ?", solution: ["27 + 10 = 37","37 - 2 = 35","Answer: 35"] },
    targetScore: 10, star1Score: 6, star2Score: 8,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [11, 60], skill: 'addEight', fixedOperand: 8 }
  },
  {
    id: w(1,9), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Mixed: 8s, 9s, and 10s",
    description: "Now let's mix all three tricks together!",
    tip: "Before answering, decide: am I adding 8 (add 10, -2), 9 (add 10, -1), or 10 (just +1 to tens)?",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [11, 60], skill: 'random' }
  },
  {
    id: w(1,10), worldId: 1, worldName: WORLDS[1], type: 'boss',
    title: "BOSS: Addition Basics Champion",
    description: "Show what you've learned so far! This is your first boss level.",
    tip: "Stay calm. Use the trick that fits each question. You've got this!",
    targetScore: 20, star1Score: 10, star2Score: 15,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [1, 60], skill: 'random' }
  },
  // --- Building (11-20): 75s timer, 2-digit addition ---
  {
    id: w(1,11), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "2-Digit + 1-Digit (No Carry)",
    description: "Adding a small number to a 2-digit number.",
    tip: "Split it: add the ones digits first, then combine. 43+5 = 40+(3+5) = 40+8 = 48.",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [10, 50], skill: 'random' }
  },
  {
    id: w(1,12), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "2-Digit + 1-Digit (With Carry)",
    description: "What if the ones digits add past 10?",
    tip: "28+5: 8+5=13, carry the 1. 20+13=33. Or think 28+2=30, then 30+3=33.",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [15, 60], skill: 'random' }
  },
  {
    id: w(1,13), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding to Multiples of 10",
    description: "Practice adding to round numbers like 20, 30, 40.",
    tip: "Round numbers are easy bases. 30+17 = 30+10+7 = 47.",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [10, 50], skill: 'addTen' }
  },
  {
    id: w(1,14), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Bridging Through 10",
    description: "When adding makes you cross over a tens boundary.",
    tip: "For 8+5: go to 10 first (8+2=10), then add what's left (10+3=13).",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [3, 9], skill: 'random' }
  },
  {
    id: w(1,15), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding Doubles (2-Digit)",
    description: "Extend your doubles skill to bigger numbers.",
    tip: "15+15=30, 20+20=40, 25+25=50. Double the tens, double the ones, combine.",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [10, 30], skill: 'doubles' }
  },
  {
    id: w(1,16), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding Near Doubles (2-Digit)",
    description: "Use 2-digit doubles to solve near-double problems.",
    tip: "For 15+16: 15+15=30, then +1=31. Always find the double first.",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [10, 30], skill: 'nearDoubles' }
  },
  {
    id: w(1,17), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding 2-Digit + 2-Digit (No Carry)",
    description: "Both numbers have two digits! No carrying needed.",
    tip: "Add tens together, then ones together. 23+45 = (20+40)+(3+5) = 60+8 = 68.",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [11, 44], skill: 'random' }
  },
  {
    id: w(1,18), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding 2-Digit + 2-Digit (With Carry)",
    description: "Two 2-digit numbers where the ones add past 10.",
    tip: "28+45: tens=20+40=60, ones=8+5=13. Total=60+13=73. Don't forget the carry!",
    targetScore: 12, star1Score: 7, star2Score: 10,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [15, 55], skill: 'random' }
  },
  {
    id: w(1,19), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Mixed 2-Digit Addition",
    description: "A mix of all 2-digit addition types.",
    tip: "Decide: is there a carry? Split into tens and ones, then combine.",
    targetScore: 14, star1Score: 8, star2Score: 11,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [10, 60], skill: 'random' }
  },
  {
    id: w(1,20), worldId: 1, worldName: WORLDS[1], type: 'boss',
    title: "BOSS: 2-Digit Addition",
    description: "Prove you can handle all 2-digit addition challenges!",
    tip: "Use the split strategy: tens first, ones second, combine. Stay calm!",
    targetScore: 22, star1Score: 12, star2Score: 17,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [10, 70], skill: 'random' }
  },
  // --- Challenge (21-30): 60s timer, skill combos ---
  {
    id: w(1,21), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding 19 and 21",
    description: "Use the +20 trick with adjustment!",
    tip: "To add 19: add 20, subtract 1. To add 21: add 20, add 1.",
    targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [15, 60], skill: 'random' }
  },
  {
    id: w(1,22), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Compensation Strategy",
    description: "Round one number up, add, then adjust.",
    tip: "38+25: round 38→40, so 40+25=65, then subtract 2: 63.",
    targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [20, 60], skill: 'random' }
  },
  {
    id: w(1,23), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding Three Numbers",
    description: "Look for pairs that make 10 first!",
    tip: "For 7+5+3: spot 7+3=10, then 10+5=15. Always find 'Make 10' pairs first.",
    targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [2, 15], skill: 'random' }
  },
  {
    id: w(1,24), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding to 99 and 100",
    description: "Practice adding to numbers near 100.",
    tip: "99+anything: just add 100 and subtract 1. 99+34 = 100+34-1 = 133.",
    targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [10, 50], skill: 'random' }
  },
  {
    id: w(1,25), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Quick Doubles Review",
    description: "Speed drill on all doubles up to 20+20.",
    tip: "Instant recall is the goal. No counting — just know them!",
    targetScore: 15, star1Score: 9, star2Score: 12, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [1, 20], skill: 'doubles' }
  },
  {
    id: w(1,26), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Mixed: Tricks Review",
    description: "All addition tricks from +8, +9, +10 to compensation.",
    tip: "Identify the trick BEFORE you calculate. Pattern recognition is key.",
    targetScore: 15, star1Score: 9, star2Score: 12, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [10, 70], skill: 'random' }
  },
  {
    id: w(1,27), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding Larger 2-Digit Numbers",
    description: "Both numbers between 30 and 70.",
    tip: "Break into friendly chunks: 47+38 = 47+30+8 = 77+8 = 85.",
    targetScore: 15, star1Score: 9, star2Score: 12, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [25, 70], skill: 'random' }
  },
  {
    id: w(1,28), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding When Both End in Big Digits",
    description: "Both ones digits are 6, 7, 8, or 9.",
    tip: "Expect a carry! 48+37: 40+30=70, 8+7=15, total=85.",
    targetScore: 15, star1Score: 9, star2Score: 12, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [26, 69], skill: 'random' }
  },
  {
    id: w(1,29), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Addition Speed Challenge",
    description: "How fast can you go? All addition tricks, short timer!",
    tip: "Trust your first instinct. Speed comes from confidence in your tricks.",
    targetScore: 16, star1Score: 9, star2Score: 13, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [5, 70], skill: 'random' }
  },
  {
    id: w(1,30), worldId: 1, worldName: WORLDS[1], type: 'boss',
    title: "BOSS: Addition Trickster",
    description: "A boss-level challenge mixing every addition strategy.",
    tip: "You know all the tricks. Use them wisely!",
    targetScore: 22, star1Score: 12, star2Score: 17, timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [1, 80], skill: 'random' }
  },
  // --- Speed Runs (31-40): 45s timer ---
  {
    id: w(1,31), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: Single Digits", description: "Rapid-fire single-digit addition.",
    tip: "These should be instant. No counting — pure recall!",
    targetScore: 18, star1Score: 10, star2Score: 14, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'random' }
  },
  {
    id: w(1,32), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: Doubles & Near Doubles", description: "Fast doubles and near-doubles.",
    tip: "Know your doubles cold. Near doubles are just +1 or -1 away.",
    targetScore: 18, star1Score: 10, star2Score: 14, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [2, 15], skill: 'doubles' }
  },
  {
    id: w(1,33), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: +8, +9, +10 Blitz", description: "Rapid +8, +9, +10 with 2-digit numbers.",
    tip: "All three tricks use +10 as the base. Adjust by 0, -1, or -2.",
    targetScore: 18, star1Score: 10, star2Score: 14, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [11, 60], skill: 'random' }
  },
  {
    id: w(1,34), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: 2-Digit + 2-Digit", description: "Fast 2-digit addition — both types.",
    tip: "Split, add, combine. Make it automatic!",
    targetScore: 18, star1Score: 10, star2Score: 14, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [10, 60], skill: 'random' }
  },
  {
    id: w(1,35), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: Mixed Addition", description: "Everything mixed at speed.",
    tip: "Pattern recognition is key. Identify the trick instantly.",
    targetScore: 18, star1Score: 10, star2Score: 14, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [1, 70], skill: 'random' }
  },
  {
    id: w(1,36), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: Making Tens Fast", description: "Rapid-fire Make 10 pairs.",
    tip: "These pairs should be instant: 1+9, 2+8, 3+7, 4+6, 5+5.",
    targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'makeTen' }
  },
  {
    id: w(1,37), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: Large 2-Digit Sums", description: "Both numbers are 30-80. Quick!",
    tip: "Round to the nearest 10 to estimate, then adjust.",
    targetScore: 18, star1Score: 10, star2Score: 14, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [30, 80], skill: 'random' }
  },
  {
    id: w(1,38), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: Addition Marathon", description: "A sustained burst of all addition types.",
    tip: "Stay focused. Don't let one mistake throw you off.",
    targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [1, 80], skill: 'random' }
  },
  {
    id: w(1,39), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Speed: Race to 20", description: "Get 20 correct as fast as you can!",
    tip: "Accuracy AND speed. Don't sacrifice one for the other.",
    targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45,
    generationParams: { operators: ['+'], numberRange: [5, 70], skill: 'random' }
  },
  {
    id: w(1,40), worldId: 1, worldName: WORLDS[1], type: 'boss',
    title: "BOSS: Speed Demon", description: "The speed test boss. How fast can you add?",
    tip: "You've trained for this. Trust your instincts and GO!",
    targetScore: 22, star1Score: 12, star2Score: 17, timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [1, 80], skill: 'random' }
  },
  // --- Mastery (41-49): Speedrun levels ---
  { id: w(1,41), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: Tiny Numbers", description: "Blitz through small additions.", tip: "Pure recall. No thinking!", targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'random' } },
  { id: w(1,42), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: Tens & Nines", description: "All +9 and +10 at max speed.", tip: "+10 is instant. +9 is +10-1. Go!", targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [11, 70], skill: 'addNine' } },
  { id: w(1,43), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: Doubles Dash", description: "All doubles, as fast as possible.", tip: "Know them by heart!", targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [1, 20], skill: 'doubles' } },
  { id: w(1,44), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: 2-Digit Blitz", description: "Fast 2-digit + 2-digit.", tip: "Split and combine. Make it a reflex.", targetScore: 18, star1Score: 10, star2Score: 14, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [10, 60], skill: 'random' } },
  { id: w(1,45), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: Mixed Small", description: "Quick mix of easy additions.", tip: "Warm up your brain!", targetScore: 22, star1Score: 14, star2Score: 18, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [1, 30], skill: 'random' } },
  { id: w(1,46), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: Mixed Medium", description: "Medium difficulty at top speed.", tip: "Split strategy for 2-digit. Recall for singles.", targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [5, 60], skill: 'random' } },
  { id: w(1,47), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: Mixed Hard", description: "Bigger numbers, tight timer.", tip: "Round-and-adjust for large numbers.", targetScore: 20, star1Score: 12, star2Score: 16, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [15, 80], skill: 'random' } },
  { id: w(1,48), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: The Gauntlet", description: "Full range, full speed. No mercy.", tip: "This is the ultimate addition speed test!", targetScore: 22, star1Score: 14, star2Score: 18, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [1, 90], skill: 'random' } },
  { id: w(1,49), worldId: 1, worldName: WORLDS[1], type: 'speedrun', title: "Speedrun: Final Warmup", description: "Last warmup before the World Boss.", tip: "Stay sharp. The boss is next!", targetScore: 22, star1Score: 14, star2Score: 18, timeLimit: 45, generationParams: { operators: ['+'], numberRange: [1, 90], skill: 'random' } },
  // --- World Boss ---
  {
    id: w(1,50), worldId: 1, worldName: WORLDS[1], type: 'boss',
    title: "WORLD BOSS: Addition Master",
    description: "The final test for World 1. Prove you've mastered all addition tricks!",
    tip: "Every trick you've learned is fair game. Trust your instincts.",
    targetScore: 30, star1Score: 15, star2Score: 22, timeLimit: 120,
    generationParams: { operators: ['+'], numberRange: [1, 99], skill: 'random' }
  },
];

// ============================================================
// WORLD 2 — SUBTRACTION STRATEGIES (Levels 51-100)
// ============================================================
const world2Levels: Level[] = [
  { id: w(2,1), worldId: 2, worldName: WORLDS[2], type: 'intro', title: "Subtracting Small Numbers", description: "Count back from the bigger number.", tip: "For 9-3: start at 9, count back 3: 8, 7, 6.", targetScore: 5, star1Score: 3, star2Score: 4, generationParams: { operators: ['-'], numberRange: [1, 9], skill: 'random' } },
  { id: w(2,2), worldId: 2, worldName: WORLDS[2], type: 'intro', title: "Subtracting from 10", description: "Use Make 10 pairs in reverse!", tip: "10-3=7 because 3+7=10.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['-'], numberRange: [1, 10], skill: 'random' } },
  { id: w(2,3), worldId: 2, worldName: WORLDS[2], type: 'intro', title: "Single-Digit Subtraction", description: "All single-digit subtraction.", tip: "Think addition: 8-5 → what + 5 = 8?", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['-'], numberRange: [1, 15], skill: 'random' } },
  { id: w(2,4), worldId: 2, worldName: WORLDS[2], type: 'intro', title: "The 'Subtract 10' Rule", description: "Decrease the tens digit by 1.", tip: "54-10=44. Ones digit stays the same!", tipDiagram: { steps: ["Find the tens digit","Subtract 1","Ones stay the same"], example: "67-10=?", solution: ["6→5","7 stays","Answer: 57"] }, targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['-'], numberRange: [20, 60], skill: 'subtractTen', fixedOperand: 10 } },
  { id: w(2,5), worldId: 2, worldName: WORLDS[2], type: 'intro', title: "The 'Subtract 9' Trick", description: "Subtract 10, add 1 back.", tip: "36-9=36-10+1=27.", tipDiagram: { steps: ["Subtract 10","Add 1 back"], example: "53-9=?", solution: ["53-10=43","43+1=44"] }, targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['-'], numberRange: [20, 60], skill: 'subtractNine', fixedOperand: 9 } },
  { id: w(2,6), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "The 'Subtract 8' Trick", description: "Subtract 10, add 2 back.", tip: "45-8=45-10+2=37.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['-'], numberRange: [20, 60], skill: 'random' } },
  { id: w(2,7), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Mixed: -8, -9, -10", description: "Mix all three subtraction tricks.", tip: "-10 (just do it), -9 (-10+1), -8 (-10+2).", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['-'], numberRange: [20, 70], skill: 'random' } },
  { id: w(2,8), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Subtracting from Multiples of 10", description: "30-7, 40-5, 50-8...", tip: "Use Make 10: 30-7 → 7+3=10, so ends in 3 → 23.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['-'], numberRange: [1, 9], skill: 'random' } },
  { id: w(2,9), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "2-Digit - 1-Digit (No Borrow)", description: "Simple 2-digit minus small number.", tip: "47-3=44. Just subtract the ones.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 90, generationParams: { operators: ['-'], numberRange: [10, 50], skill: 'random' } },
  { id: w(2,10), worldId: 2, worldName: WORLDS[2], type: 'boss', title: "BOSS: Subtraction Basics", description: "Show your subtraction foundation!", tip: "Identify the trick, solve confidently.", targetScore: 20, star1Score: 10, star2Score: 15, timeLimit: 90, generationParams: { operators: ['-'], numberRange: [1, 60], skill: 'random' } },
  { id: w(2,11), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "2-Digit - 1-Digit (Borrow)", description: "When ones digit isn't big enough.", tip: "42-7: borrow → 30+12, 12-7=5 → 35.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [20, 60], skill: 'random' } },
  { id: w(2,12), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Counting Up Strategy", description: "Count UP from smaller number.", tip: "52-48: 48→52 = 4 steps.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [20, 60], skill: 'random' } },
  { id: w(2,13), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Subtracting Doubles", description: "Reverse your doubles.", tip: "14-7=7, 16-8=8.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [2, 30], skill: 'random' } },
  { id: w(2,14), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "2-Digit - 2-Digit (No Borrow)", description: "Both 2 digits, no borrowing.", tip: "56-23: 50-20=30, 6-3=3 → 33.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [20, 60], skill: 'random' } },
  { id: w(2,15), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "2-Digit - 2-Digit (Borrow)", description: "Borrowing across tens.", tip: "52-27: 40+12, 12-7=5, 40-20=20 → 25.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [25, 70], skill: 'random' } },
  { id: w(2,16), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Compensation Subtraction", description: "Round what you subtract.", tip: "63-29: -30=33, +1=34.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [30, 70], skill: 'random' } },
  { id: w(2,17), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Subtracting from 100", description: "100 minus 2-digit.", tip: "100-37: 9-3=6, 10-7=3 → 63.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [10, 99], skill: 'random' } },
  { id: w(2,18), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Mixed 2-Digit Subtraction", description: "All subtraction strategies.", tip: "Pick the fastest strategy.", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [10, 70], skill: 'random' } },
  { id: w(2,19), worldId: 2, worldName: WORLDS[2], type: 'standard', title: "Big Number Subtraction", description: "Numbers up to 90.", tip: "Same strategies, bigger numbers.", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['-'], numberRange: [20, 90], skill: 'random' } },
  { id: w(2,20), worldId: 2, worldName: WORLDS[2], type: 'boss', title: "BOSS: 2-Digit Subtraction", description: "Master all 2-digit subtraction!", tip: "Borrowing is regrouping. You've got this!", targetScore: 22, star1Score: 12, star2Score: 17, timeLimit: 90, generationParams: { operators: ['-'], numberRange: [10, 80], skill: 'random' } },
  // --- Challenge (21-30) ---
  ...Array.from({ length: 10 }, (_, i) => {
    const localId = 21 + i;
    const isBoss = localId === 30;
    return { id: w(2,localId), worldId: 2, worldName: WORLDS[2], type: (isBoss ? 'boss' : 'standard') as Level['type'], title: isBoss ? "BOSS: Strategy Master" : `Challenge: Subtraction ${localId-20}`, description: isBoss ? "All strategies at challenge difficulty." : "Mixed subtraction challenge.", tip: isBoss ? "Flexibility is your superpower!" : "Pick the best strategy for each problem.", targetScore: isBoss ? 22 : 15 + Math.floor(i/3), star1Score: isBoss ? 12 : 9, star2Score: isBoss ? 17 : 12, timeLimit: isBoss ? 90 : 60, generationParams: { operators: ['-'] as Level['generationParams']['operators'], numberRange: [10, 90] as [number, number], skill: 'random' as const } };
  }),
  // --- Speed (31-49) ---
  ...Array.from({ length: 19 }, (_, i) => {
    const localId = 31 + i;
    const isBoss = localId === 40;
    const isSpeedrun = localId >= 41;
    return { id: w(2,localId), worldId: 2, worldName: WORLDS[2], type: (isBoss ? 'boss' : isSpeedrun ? 'speedrun' : 'standard') as Level['type'], title: isBoss ? "BOSS: Subtraction Speed" : `${isSpeedrun ? 'Speedrun' : 'Speed'}: Subtract ${localId-30}`, description: isBoss ? "Speed boss for subtraction!" : "Subtraction speed drill.", tip: isBoss ? "Fast and accurate!" : "Instant recall!", targetScore: isBoss ? 22 : 18 + Math.floor(i/5), star1Score: isBoss ? 12 : 10 + Math.floor(i/8), star2Score: isBoss ? 17 : 14 + Math.floor(i/8), timeLimit: isBoss ? 60 : 45, generationParams: { operators: ['-'] as Level['generationParams']['operators'], numberRange: [5, 90] as [number, number], skill: 'random' as const } };
  }),
  { id: w(2,50), worldId: 2, worldName: WORLDS[2], type: 'boss', title: "WORLD BOSS: Subtraction Master", description: "The final test for World 2!", tip: "Every subtraction trick. Trust your instincts!", targetScore: 30, star1Score: 15, star2Score: 22, timeLimit: 120, generationParams: { operators: ['-'], numberRange: [1, 99], skill: 'random' } },
];

// ============================================================
// WORLD 3 — MULTIPLICATION MASTERY (Levels 101-150)
// ============================================================
const world3Levels: Level[] = [
  { id: w(3,1), worldId: 3, worldName: WORLDS[3], type: 'intro', title: "Multiplying by 2", description: "Doubling!", tip: "6×2 = 6+6 = 12.", targetScore: 5, star1Score: 3, star2Score: 4, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'multiplyByTwo', fixedOperand: 2, fixedOperandPosition: 'second' } },
  { id: w(3,2), worldId: 3, worldName: WORLDS[3], type: 'intro', title: "Multiplying by 10", description: "Add a zero!", tip: "14×10=140.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['×'], numberRange: [1, 20], skill: 'multiplyByTen', fixedOperand: 10, fixedOperandPosition: 'second' } },
  { id: w(3,3), worldId: 3, worldName: WORLDS[3], type: 'intro', title: "Multiplying by 5", description: "×10 then halve.", tip: "18×5=180÷2=90.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['×'], numberRange: [1, 20], skill: 'multiplyByFive', fixedOperand: 5, fixedOperandPosition: 'second' } },
  { id: w(3,4), worldId: 3, worldName: WORLDS[3], type: 'intro', title: "Multiplying by 11", description: "Split and sum trick.", tip: "34×11: 3_(3+4)_4=374.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['×'], numberRange: [1, 9], skill: 'multiplyByEleven', fixedOperand: 11, fixedOperandPosition: 'second' } },
  { id: w(3,5), worldId: 3, worldName: WORLDS[3], type: 'intro', title: "Multiplying by 3", description: "Double then add once more.", tip: "7×3=(7×2)+7=21.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random', fixedOperand: 3, fixedOperandPosition: 'second' } },
  { id: w(3,6), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Multiplying by 4", description: "Double the double!", tip: "7×4=(7×2)×2=28.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random', fixedOperand: 4, fixedOperandPosition: 'second' } },
  { id: w(3,7), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Multiplying by 6", description: "×5 + one more.", tip: "7×6=(7×5)+7=42.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random', fixedOperand: 6, fixedOperandPosition: 'second' } },
  { id: w(3,8), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Multiplying by 7", description: "The trickiest table.", tip: "Use (×5)+(×2). 8×7=40+16=56.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random', fixedOperand: 7, fixedOperandPosition: 'second' } },
  { id: w(3,9), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Multiplying by 8", description: "Triple double!", tip: "7×8: 7→14→28→56.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random', fixedOperand: 8, fixedOperandPosition: 'second' } },
  { id: w(3,10), worldId: 3, worldName: WORLDS[3], type: 'boss', title: "BOSS: Tables 2-8", description: "All tables 2-8!", tip: "Use the right trick for each.", targetScore: 20, star1Score: 10, star2Score: 15, timeLimit: 90, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,11), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Multiplying by 9", description: "Finger trick or ×10-×1.", tip: "9×3: put down finger 3 → 2|7=27.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 10], skill: 'random', fixedOperand: 9, fixedOperandPosition: 'second' } },
  { id: w(3,12), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Multiplying by 12", description: "×10+×2.", tip: "7×12=70+14=84.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random', fixedOperand: 12, fixedOperandPosition: 'second' } },
  { id: w(3,13), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Mixed: 2s, 3s, 4s", description: "Easy tables mixed.", tip: "Double, triple, double-double!", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,14), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Mixed: 5s, 6s, 7s", description: "Middle tables.", tip: "5s are easy. 6=5+1. 7=5+2.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,15), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Mixed: 8s, 9s, 10s", description: "Upper tables.", tip: "8=double³, 9=finger, 10=+zero.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,16), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Mixed: 11s and 12s", description: "Full table extension.", tip: "11=split trick. 12=×10+×2.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,17), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "Square Numbers", description: "Number times itself.", tip: "1,4,9,16,25,36,49,64,81,100,121,144.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,18), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "All Tables Mixed 1", description: "Every table 2-12.", tip: "Identify trick, apply, move on.", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,19), worldId: 3, worldName: WORLDS[3], type: 'standard', title: "All Tables Mixed 2", description: "Another round of all tables.", tip: "Speed up — these should be automatic.", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  { id: w(3,20), worldId: 3, worldName: WORLDS[3], type: 'boss', title: "BOSS: All Times Tables", description: "Every table 2-12!", tip: "Prove mastery!", targetScore: 22, star1Score: 12, star2Score: 17, timeLimit: 90, generationParams: { operators: ['×'], numberRange: [1, 12], skill: 'random' } },
  // --- Challenge & Speed (21-49) ---
  ...Array.from({ length: 29 }, (_, i) => {
    const localId = 21 + i;
    const isBoss = localId === 30 || localId === 40;
    const isSpeedrun = localId >= 41;
    return { id: w(3,localId), worldId: 3, worldName: WORLDS[3], type: (isBoss ? 'boss' : isSpeedrun ? 'speedrun' : 'standard') as Level['type'], title: isBoss ? `BOSS: Multiply ${localId===30?'Champion':'Speed'}` : `${isSpeedrun?'Speedrun':'Speed'}: Multiply ${localId-20}`, description: isBoss ? "Ultimate multiplication test!" : "Multiplication speed drill.", tip: isBoss ? "Every table, every trick!" : "Instant recall!", targetScore: isBoss ? 22 : 18+Math.floor(i/5)*2, star1Score: isBoss ? 12 : 10+Math.floor(i/8), star2Score: isBoss ? 17 : 14+Math.floor(i/8), timeLimit: isBoss ? (localId===30?90:60) : (localId<=30?60:45), generationParams: { operators: ['×'] as Level['generationParams']['operators'], numberRange: [2, 12] as [number, number], skill: 'random' as const } };
  }),
  { id: w(3,50), worldId: 3, worldName: WORLDS[3], type: 'boss', title: "WORLD BOSS: Multiplication Master", description: "The final test for World 3!", tip: "Trust your recall!", targetScore: 30, star1Score: 15, star2Score: 22, timeLimit: 120, generationParams: { operators: ['×'], numberRange: [2, 12], skill: 'random' } },
];

// ============================================================
// WORLD 4 — DIVISION TECHNIQUES (Levels 151-200)
// ============================================================
const world4Levels: Level[] = [
  { id: w(4,1), worldId: 4, worldName: WORLDS[4], type: 'intro', title: "Dividing by 2 (Halving)", description: "Cut in half.", tip: "18÷2=9. Reverse your doubles!", targetScore: 5, star1Score: 3, star2Score: 4, generationParams: { operators: ['÷'], numberRange: [2, 24], skill: 'integerDivision', fixedOperand: 2, fixedOperandPosition: 'second' } },
  { id: w(4,2), worldId: 4, worldName: WORLDS[4], type: 'intro', title: "Dividing by 10", description: "Remove the zero.", tip: "170÷10=17.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['÷'], numberRange: [10, 200], skill: 'integerDivision', fixedOperand: 10, fixedOperandPosition: 'second' } },
  { id: w(4,3), worldId: 4, worldName: WORLDS[4], type: 'intro', title: "Dividing by 5", description: "÷10 then double.", tip: "80÷5: 80÷10=8, 8×2=16.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['÷'], numberRange: [5, 100], skill: 'integerDivision', fixedOperand: 5, fixedOperandPosition: 'second' } },
  { id: w(4,4), worldId: 4, worldName: WORLDS[4], type: 'intro', title: "Dividing by 3", description: "Reverse ×3.", tip: "21÷3=7. What×3=21?", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['÷'], numberRange: [3, 36], skill: 'integerDivision', fixedOperand: 3, fixedOperandPosition: 'second' } },
  { id: w(4,5), worldId: 4, worldName: WORLDS[4], type: 'intro', title: "Dividing by 4", description: "Halve twice.", tip: "24÷4: 24÷2=12, 12÷2=6.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['÷'], numberRange: [4, 48], skill: 'integerDivision', fixedOperand: 4, fixedOperandPosition: 'second' } },
  { id: w(4,6), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Dividing by 6", description: "Reverse ×6.", tip: "42÷6=7.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['÷'], numberRange: [6, 72], skill: 'integerDivision', fixedOperand: 6, fixedOperandPosition: 'second' } },
  { id: w(4,7), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Dividing by 7", description: "Reverse ×7.", tip: "56÷7=8.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['÷'], numberRange: [7, 84], skill: 'integerDivision', fixedOperand: 7, fixedOperandPosition: 'second' } },
  { id: w(4,8), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Dividing by 8", description: "Halve three times.", tip: "64÷8: 64→32→16→8.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['÷'], numberRange: [8, 96], skill: 'integerDivision', fixedOperand: 8, fixedOperandPosition: 'second' } },
  { id: w(4,9), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Dividing by 9", description: "Reverse ×9.", tip: "81÷9=9. Digit sum trick.", targetScore: 10, star1Score: 6, star2Score: 8, timeLimit: 90, generationParams: { operators: ['÷'], numberRange: [9, 108], skill: 'integerDivision', fixedOperand: 9, fixedOperandPosition: 'second' } },
  { id: w(4,10), worldId: 4, worldName: WORLDS[4], type: 'boss', title: "BOSS: Division Basics", description: "All basics combined!", tip: "Think multiplication backwards.", targetScore: 20, star1Score: 10, star2Score: 15, timeLimit: 90, generationParams: { operators: ['÷'], numberRange: [1, 100], skill: 'integerDivision' } },
  { id: w(4,11), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Dividing by 12", description: "Reverse ×12.", tip: "84÷12=7.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [12, 144], skill: 'integerDivision', fixedOperand: 12, fixedOperandPosition: 'second' } },
  { id: w(4,12), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Mixed: ÷2, ÷5, ÷10", description: "Easy division mixed.", tip: "Halve, ÷10+double, remove zero.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [2, 100], skill: 'integerDivision' } },
  { id: w(4,13), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Mixed: ÷3, ÷4, ÷6", description: "Mid-range mixed.", tip: "÷4=halve twice.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [3, 72], skill: 'integerDivision' } },
  { id: w(4,14), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Mixed: ÷7, ÷8, ÷9", description: "Hard division mixed.", tip: "Strong tables recall needed.", targetScore: 12, star1Score: 7, star2Score: 10, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [7, 108], skill: 'integerDivision' } },
  { id: w(4,15), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "All Divisors Mixed 1", description: "Every divisor 2-12.", tip: "Identify, recall, answer.", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [2, 144], skill: 'integerDivision' } },
  { id: w(4,16), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "All Divisors Mixed 2", description: "More mixed division.", tip: "Getting faster!", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [2, 144], skill: 'integerDivision' } },
  { id: w(4,17), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "× and ÷ Connection", description: "See how they link.", tip: "7×8=56 → 56÷7=8, 56÷8=7.", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [2, 100], skill: 'integerDivision' } },
  { id: w(4,18), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Division Speed Practice", description: "Pick up the pace.", tip: "Fast recall is key.", targetScore: 14, star1Score: 8, star2Score: 11, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [2, 120], skill: 'integerDivision' } },
  { id: w(4,19), worldId: 4, worldName: WORLDS[4], type: 'standard', title: "Division Challenge", description: "Harder problems.", tip: "Use reverse multiplication.", targetScore: 15, star1Score: 9, star2Score: 12, timeLimit: 75, generationParams: { operators: ['÷'], numberRange: [2, 144], skill: 'integerDivision' } },
  { id: w(4,20), worldId: 4, worldName: WORLDS[4], type: 'boss', title: "BOSS: Division All-Star", description: "All division facts!", tip: "Tables backwards!", targetScore: 22, star1Score: 12, star2Score: 17, timeLimit: 90, generationParams: { operators: ['÷'], numberRange: [2, 144], skill: 'integerDivision' } },
  // --- Challenge & Speed (21-49) ---
  ...Array.from({ length: 29 }, (_, i) => {
    const localId = 21 + i;
    const isBoss = localId === 30 || localId === 40;
    const isSpeedrun = localId >= 41;
    return { id: w(4,localId), worldId: 4, worldName: WORLDS[4], type: (isBoss ? 'boss' : isSpeedrun ? 'speedrun' : 'standard') as Level['type'], title: isBoss ? `BOSS: Division ${localId===30?'Challenger':'Speed'}` : `${isSpeedrun?'Speedrun':'Speed'}: Divide ${localId-20}`, description: isBoss ? "Boss division test!" : "Division speed drill.", tip: isBoss ? "Every table backwards!" : "Instant recall!", targetScore: isBoss ? 22 : 18+Math.floor(i/5)*2, star1Score: isBoss ? 12 : 10+Math.floor(i/8), star2Score: isBoss ? 17 : 14+Math.floor(i/8), timeLimit: isBoss ? (localId===30?90:60) : (localId<=30?60:45), generationParams: { operators: ['÷'] as Level['generationParams']['operators'], numberRange: [2, 144] as [number, number], skill: 'integerDivision' as const } };
  }),
  { id: w(4,50), worldId: 4, worldName: WORLDS[4], type: 'boss', title: "WORLD BOSS: Division Master", description: "The final test for World 4!", tip: "Multiplication in reverse!", targetScore: 30, star1Score: 15, star2Score: 22, timeLimit: 120, generationParams: { operators: ['÷'], numberRange: [2, 144], skill: 'integerDivision' } },
];

// ============================================================
// WORLD 5 — MIXED OPERATIONS (Levels 201-250)
// ============================================================
const world5Levels: Level[] = [
  { id: w(5,1), worldId: 5, worldName: WORLDS[5], type: 'intro', title: "Add or Subtract?", description: "Read the operator carefully!", tip: "Don't rush past the + or - sign!", targetScore: 5, star1Score: 3, star2Score: 4, generationParams: { operators: ['+', '-'], numberRange: [1, 20], skill: 'random' } },
  { id: w(5,2), worldId: 5, worldName: WORLDS[5], type: 'intro', title: "Multiply or Divide?", description: "× and ÷ mixed.", tip: "For ÷: what times the divisor gives this?", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['×', '÷'], numberRange: [1, 50], skill: 'random' } },
  { id: w(5,3), worldId: 5, worldName: WORLDS[5], type: 'intro', title: "All Four: Easy", description: "All ops, small numbers.", tip: "Identify the operation first.", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['+', '-', '×', '÷'], numberRange: [1, 15], skill: 'random' } },
  { id: w(5,4), worldId: 5, worldName: WORLDS[5], type: 'intro', title: "All Four: Medium", description: "Bigger numbers, all ops.", tip: "The operation changes every question!", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['+', '-', '×', '÷'], numberRange: [1, 30], skill: 'random' } },
  { id: w(5,5), worldId: 5, worldName: WORLDS[5], type: 'intro', title: "All Four: Getting Harder", description: "Building to full mixed ops.", tip: "Each op has its own tricks!", targetScore: 8, star1Score: 4, star2Score: 6, generationParams: { operators: ['+', '-', '×', '÷'], numberRange: [1, 40], skill: 'random' } },
  ...Array.from({ length: 45 }, (_, i) => {
    const localId = 6 + i;
    const isBoss = localId % 10 === 0;
    const isSpeedrun = localId >= 41 && !isBoss;
    const phase = localId <= 10 ? 0 : localId <= 20 ? 1 : localId <= 30 ? 2 : localId <= 40 ? 3 : 4;
    const timers = [90, 75, 60, 60, 45];
    const targets = [10, 12, 15, 18, 20];
    const ranges: [number, number][] = [[1,30],[1,50],[1,60],[1,80],[1,99]];
    return { id: w(5,localId), worldId: 5, worldName: WORLDS[5], type: (isBoss ? 'boss' : isSpeedrun ? 'speedrun' : 'standard') as Level['type'], title: localId===50 ? "WORLD BOSS: Operations Master" : isBoss ? `BOSS: Mixed Ops ${localId/10}` : `${isSpeedrun?'Speedrun':'Mixed'}: All Ops ${localId-5}`, description: localId===50 ? "Ultimate test of all four operations!" : isBoss ? "Boss: all operations!" : "All four operations mixed.", tip: localId===50 ? "Every trick from every world!" : isBoss ? "Read each operator carefully." : "Switch strategies per operator.", targetScore: localId===50 ? 30 : isBoss ? 22 : targets[phase]+Math.floor((localId%10)/3), star1Score: localId===50 ? 15 : isBoss ? 12 : Math.floor(targets[phase]*0.6), star2Score: localId===50 ? 22 : isBoss ? 17 : Math.floor(targets[phase]*0.8), timeLimit: localId===50 ? 120 : isBoss ? 90 : timers[phase], generationParams: { operators: ['+','-','×','÷'] as Level['generationParams']['operators'], numberRange: (localId===50?[1,99]:ranges[phase]) as [number,number], skill: 'random' as const } };
  }),
];

// ============================================================
// WORLD 6 — NUMBER SENSE & PATTERNS (Levels 251-300)
// ============================================================
const world6Levels: Level[] = Array.from({ length: 50 }, (_, i) => {
  const localId = i + 1;
  const isBoss = localId % 10 === 0;
  const isIntro = localId <= 5;
  const isSpeedrun = localId >= 41 && !isBoss;
  const phase = localId <= 10 ? 0 : localId <= 20 ? 1 : localId <= 30 ? 2 : localId <= 40 ? 3 : 4;
  const timers = [undefined, 90, 75, 60, 45];
  const targets = [8, 10, 14, 18, 20];
  const ranges: [number, number][] = [[1,20],[1,40],[1,60],[1,80],[1,99]];
  const titles = ["Number Patterns","Even and Odd","Counting by 2s","Counting by 5s","Counting by 10s","Rounding to 10","Comparing Numbers","Number Between","Skip Counting Mix","BOSS: Patterns","Estimation: Add","Estimation: Subtract","Rounding to 100","Nearest Ten Add","Nearest Ten Sub","Sense: Doubles","Sense: Halves","Estimation: Multiply","Estimation Challenge","BOSS: Estimation","Fast Rounding","Quick Compare","Mental Est. +","Mental Est. -","Number Line","Pattern Recognition","Sequence Fill","Estimation Blitz","Number Sense Mix","BOSS: Number Whiz","Speed: Rounding","Speed: Estimation","Speed: Patterns","Speed: Compare","Speed: Sense","Speed: Mix 1","Speed: Mix 2","Speed: Mix 3","Speed: Mix 4","BOSS: Speed Sense","Speedrun: 1","Speedrun: 2","Speedrun: 3","Speedrun: 4","Speedrun: 5","Speedrun: 6","Speedrun: 7","Speedrun: 8","Speedrun: 9","WORLD BOSS: Number Sense"];
  return {
    id: w(6,localId), worldId: 6, worldName: WORLDS[6],
    type: (isIntro ? 'intro' : isBoss ? 'boss' : isSpeedrun ? 'speedrun' : 'standard') as Level['type'],
    title: titles[i], description: `Number sense challenge ${localId}.`,
    tip: "Use estimation, rounding, and pattern recognition!",
    targetScore: localId===50 ? 30 : isBoss ? 22 : targets[phase]+Math.floor((localId%10)/3),
    star1Score: localId===50 ? 15 : isBoss ? 12 : Math.floor((targets[phase])*0.55),
    star2Score: localId===50 ? 22 : isBoss ? 17 : Math.floor((targets[phase])*0.78),
    timeLimit: localId===50 ? 120 : isBoss ? 90 : timers[phase],
    generationParams: { operators: ['+','-'] as Level['generationParams']['operators'], numberRange: (localId===50?[1,99]:ranges[phase]) as [number,number], skill: 'random' as const }
  };
});

// ============================================================
// WORLD 7 — SPEED DRILLS (Levels 301-350)
// ============================================================
const world7Levels: Level[] = Array.from({ length: 50 }, (_, i) => {
  const localId = i + 1;
  const isBoss = localId % 10 === 0;
  const isIntro = localId <= 5;
  const isSpeedrun = localId >= 41 && !isBoss;
  const ops: Level['generationParams']['operators'][] = [['+'], ['-'], ['×'], ['÷'], ['+','-'], ['+','-'], ['×','÷'], ['×','÷'], ['+','-','×','÷'], ['+','-','×','÷']];
  const opSet = ops[Math.min(Math.floor((localId-1)/5), ops.length-1)];
  const phase = localId <= 10 ? 0 : localId <= 20 ? 1 : localId <= 30 ? 2 : localId <= 40 ? 3 : 4;
  const ranges: [number, number][] = [[1,30],[1,50],[1,70],[1,90],[1,99]];
  const targets = [10, 15, 18, 22, 24];
  const titles = ["Speed: Add","Speed: Subtract","Speed: Multiply","Speed: Divide","Speed: +/- Mix","Speed: Add Pressure","Speed: Sub Pressure","Speed: Mul Pressure","Speed: Div Pressure","BOSS: Speed Foundation","Speed: Fast +/-","Speed: Fast ×/÷","Speed: All Ops","Speed: Blitz","Speed: Rapid 1","Speed: Rapid 2","Speed: Rapid 3","Speed: Rapid 4","Speed: Rapid 5","BOSS: Speed Mid","Lightning +","Lightning -","Lightning ×","Lightning ÷","Lightning Mix 1","Lightning Mix 2","Lightning Mix 3","Lightning Mix 4","Lightning Mix 5","BOSS: Lightning","Turbo 1","Turbo 2","Turbo 3","Turbo 4","Turbo 5","Turbo 6","Turbo 7","Turbo 8","Turbo 9","BOSS: Turbo","Sprint 1","Sprint 2","Sprint 3","Sprint 4","Sprint 5","Sprint 6","Sprint 7","Sprint 8","Sprint 9","WORLD BOSS: Speed Legend"];
  return {
    id: w(7,localId), worldId: 7, worldName: WORLDS[7],
    type: (isIntro ? 'intro' : isBoss ? 'boss' : isSpeedrun ? 'speedrun' : 'standard') as Level['type'],
    title: titles[i], description: `Speed drill ${localId}. Race the clock!`,
    tip: "Speed comes from confidence. Trust your tricks!",
    targetScore: localId===50 ? 30 : isBoss ? 25 : targets[phase]+Math.floor((localId%10)/3),
    star1Score: localId===50 ? 15 : isBoss ? 13 : Math.floor(targets[phase]*0.55),
    star2Score: localId===50 ? 22 : isBoss ? 19 : Math.floor(targets[phase]*0.78),
    timeLimit: localId===50 ? 120 : isBoss ? 75 : (isIntro ? 60 : phase<=1 ? 45 : 40),
    generationParams: { operators: opSet, numberRange: (localId===50?[1,99]:ranges[phase]) as [number,number], skill: 'random' as const }
  };
});

// ============================================================
// WORLD 8 — MENTAL MATH ELITE (Levels 351-400)
// ============================================================
const world8Levels: Level[] = Array.from({ length: 50 }, (_, i) => {
  const localId = i + 1;
  const isBoss = localId % 10 === 0;
  const isIntro = localId <= 5;
  const isSpeedrun = localId >= 41 && !isBoss;
  const phase = localId <= 10 ? 0 : localId <= 20 ? 1 : localId <= 30 ? 2 : localId <= 40 ? 3 : 4;
  const ops: Level['generationParams']['operators'][] = [['+'], ['-'], ['+','-'], ['×','÷'], ['+','-','×','÷']];
  const opSet = ops[Math.min(phase, ops.length-1)];
  const ranges: [number, number][] = [[100,500],[100,500],[50,300],[10,100],[1,999]];
  const targets = [8, 10, 14, 18, 22];
  const titles = ["Elite: 3-Digit Add","Elite: 3-Digit+2-Digit","Elite: 3-Digit+3-Digit","Elite: Add to 1000","Elite: Large Add","Elite: 3-Digit Sub","Elite: 3-Digit-2-Digit","Elite: 3-Digit-3-Digit","Elite: Sub from 1000","BOSS: 3-Digit Basics","Elite: Large Sub","Elite: Compensation","Elite: +/- Large","Elite: +/- Speed","Elite: Shortcuts","Elite: Fast Estimate","Elite: Splitting","Elite: Round & Adjust","Elite: Mixed Strategy","BOSS: Mental Arith","Elite: 2D×2D","Elite: ×20,30,40","Elite: Large ÷","Elite: Mixed ×/÷","Elite: All Ops Med","Elite: All Ops Hard","Elite: All Ops Harder","Elite: Marathon","Elite: Pressure","BOSS: Elite Challenge","Elite: Speed 1","Elite: Speed 2","Elite: Speed 3","Elite: Speed 4","Elite: Speed 5","Elite: Speed 6","Elite: Speed 7","Elite: Speed 8","Elite: Speed 9","BOSS: Elite Speed","Sprint: Elite 1","Sprint: Elite 2","Sprint: Elite 3","Sprint: Elite 4","Sprint: Elite 5","Sprint: Elite 6","Sprint: Elite 7","Sprint: Elite 8","Sprint: Elite 9","WORLD BOSS: Grand Master"];
  return {
    id: w(8,localId), worldId: 8, worldName: WORLDS[8],
    type: (isIntro ? 'intro' : isBoss ? 'boss' : isSpeedrun ? 'speedrun' : 'standard') as Level['type'],
    title: titles[i],
    description: localId===50 ? "The ultimate test. Every skill, every trick." : `Elite challenge ${localId}.`,
    tip: localId===50 ? "You are a mental math legend!" : "Break big numbers into smaller, friendly chunks.",
    targetScore: localId===50 ? 35 : isBoss ? 25 : targets[phase]+Math.floor((localId%10)/3),
    star1Score: localId===50 ? 18 : isBoss ? 13 : Math.floor(targets[phase]*0.55),
    star2Score: localId===50 ? 27 : isBoss ? 19 : Math.floor(targets[phase]*0.78),
    timeLimit: localId===50 ? 150 : isBoss ? 90 : (isIntro ? undefined : phase<=1 ? 75 : phase<=3 ? 60 : 45),
    generationParams: { operators: opSet, numberRange: (localId===50?[1,999]:ranges[phase]) as [number,number], skill: 'random' as const }
  };
});

// ============================================================
// EXPORT
// ============================================================
export const ALL_LEVELS: Level[] = [
  ...world1Levels,
  ...world2Levels,
  ...world3Levels,
  ...world4Levels,
  ...world5Levels,
  ...world6Levels,
  ...world7Levels,
  ...world8Levels,
];

export const getLevelById = (id: number): Level | undefined =>
  ALL_LEVELS.find(l => l.id === id);

export const getLevelsByWorld = (worldId: number): Level[] =>
  ALL_LEVELS.filter(l => l.worldId === worldId);

export const getNextLevel = (currentId: number): Level | undefined => {
  const current = getLevelById(currentId);
  if (!current) return undefined;
  return ALL_LEVELS.find(l => l.id === currentId + 1 && l.worldId === current.worldId)
    || ALL_LEVELS.find(l => l.worldId === current.worldId + 1 && l.id === (current.worldId) * 50 + 1);
};

export const WORLDS_META = [
  { id: 1, name: "Addition Foundation", icon: "➕", color: "#ff8fab" },
  { id: 2, name: "Subtraction Strategies", icon: "➖", color: "#ff9f1c" },
  { id: 3, name: "Multiplication Mastery", icon: "✖️", color: "#2ec4b6" },
  { id: 4, name: "Division Techniques", icon: "➗", color: "#7b2d8b" },
  { id: 5, name: "Mixed Operations", icon: "🔀", color: "#e63946" },
  { id: 6, name: "Number Sense", icon: "🧠", color: "#457b9d" },
  { id: 7, name: "Speed Drills", icon: "⚡", color: "#f72585" },
  { id: 8, name: "Mental Math Elite", icon: "🏆", color: "#1d3557" },
];
