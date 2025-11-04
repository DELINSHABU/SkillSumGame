// src/lib/levels.ts

/**
 * Defines the parameters for question generation.
 * 'skill' determines the specific logic used, while
 * 'operators' and 'numberRange' provide constraints.
 */
export type GenerationParams = {
  operators: Array<'+' | '-' | '×' | '÷'>;
  numberRange: [number, number]; // [min, max]
  
  /**
   * The specific mental math skill being tested.
   * 'random': Default logic based on operators/range.
   * 'makeTen': (e.g., 3 + 7, 6 + 4)
   * 'addTen': (e.g., 23 + 10, 45 + 10)
   * 'addNine': (e.g., 23 + 9) -> (23 + 10 - 1)
   * 'doubles': (e.g., 8 + 8, 15 + 15)
   * 'nearDoubles': (e.g., 8 + 9) -> (8 + 8 + 1)
   * 'subtractTen': (e.g., 45 - 10)
   * 'subtractNine': (e.g., 45 - 9) -> (45 - 10 + 1)
   * 'multiplyByTen': (e.g., 15 * 10)
   * 'multiplyByFive': (e.g., 12 * 5) -> (12 * 10 / 2)
   * 'multiplyByEleven': (e.g., 23 * 11) -> (2_ (2+3) _3) = 253
   * 'integerDivision': Division that always results in a whole number.
   */
  skill: 'random' | 'makeTen' | 'addTen' | 'addNine' | 'doubles' | 'nearDoubles' | 'subtractTen' | 'subtractNine' | 'multiplyByTen' | 'multiplyByFive' | 'multiplyByEleven' | 'integerDivision';
  
  // Optional: Used for 'makeTen' or specific operand challenges
  // e.g., { fixedOperand: 9, position: 'second' } for 'addNine' skill
  fixedOperand?: number;
  fixedOperandPosition?: 'first' | 'second';
};

export interface Level {
  id: number;
  world: string;          // e.g., "World 1: Basic Addition"
  title: string;          // e.g., "The 'Adding 9' Trick"
  description: string;  // e.g., "Learn a fast way to add 9 to any number."
  tip: string;            // The core "tip & trick" for this level
  targetScore: number;    // e.g., "Get 10 correct"
  targetTime?: number;     // Optional: "in 60 seconds"
  generationParams: GenerationParams;
}

export const campaignLevels: Level[] = [
  // === WORLD 1: THE ADDITION FOUNDATION ===
  {
    id: 1,
    world: "World 1: Addition",
    title: "Adding Small Numbers",
    description: "Let's start with the basics! Practice adding small numbers together.",
    tip: "Count up from the bigger number. For 3 + 5, start at 5 and count: 6, 7, 8.",
    targetScore: 10,
    generationParams: {
      operators: ['+'],
      numberRange: [1, 9],
      skill: 'random',
    },
  },
  {
    id: 2,
    world: "World 1: Addition",
    title: "Making Ten",
    description: "Knowing which numbers add up to 10 is a core math skill.",
    tip: "Memorize these pairs: 1+9, 2+8, 3+7, 4+6, 5+5. They are your new best friends!",
    targetScore: 10,
    generationParams: {
      operators: ['+'],
      numberRange: [1, 9],
      skill: 'makeTen',
    },
  },
  {
    id: 3,
    world: "World 1: Addition",
    title: "The 'Adding 10' Rule",
    description: "Adding 10 is one of the easiest tricks. Let's master it.",
    tip: "To add 10, just increase the 'tens' digit by one. (e.g., 23 + 10 = 33).",
    targetScore: 12,
    generationParams: {
      operators: ['+'],
      numberRange: [10, 50],
      skill: 'addTen',
      fixedOperand: 10,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 4,
    world: "World 1: Addition",
    title: "The 'Adding 9' Trick",
    description: "Learn a shortcut to add 9, fast!",
    tip: "To add 9, just add 10 (which is easy!) and then subtract 1. (e.g., 27 + 9 is 27 + 10 - 1, which is 37 - 1 = 36).",
    targetScore: 12,
    generationParams: {
      operators: ['+'],
      numberRange: [10, 50],
      skill: 'addNine',
      fixedOperand: 9,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 5,
    world: "World 1: Addition",
    title: "Speed Round: 9s & 10s",
    description: "Let's test your new skills! This level mixes 'Adding 9' and 'Adding 10'.",
    tip: "Stay sharp! Ask yourself: Am I adding 9 (add 10, minus 1) or just adding 10?",
    targetScore: 15,
    targetTime: 60, // First timed challenge!
    generationParams: {
      operators: ['+'],
      numberRange: [10, 50],
      // We'll need a way to combine skills, e.g.,
      // For now, we can pick one skill randomly in generateQuestion
      skill: 'addTen', // (In implementation, you'd randomly pick 'addTen' or 'addNine')
    },
  },
  {
    id: 6,
    world: "World 1: Addition",
    title: "Doubles",
    description: "Adding a number to itself is a key shortcut. Let's practice.",
    tip: "Memorizing your 'doubles' (like 7+7=14, 8+8=16) will make you much faster.",
    targetScore: 10,
    generationParams: {
      operators: ['+'],
      numberRange: [3, 15],
      skill: 'doubles',
    },
  },
  {
    id: 7,
    world: "World 1: Addition",
    title: "Near Doubles",
    description: "What if the numbers are *almost* doubles? (e.g., 7 + 8)",
    tip: "Use your doubles! For 7 + 8, think '7 + 7 + 1' (which is 14 + 1 = 15).",
    targetScore: 12,
    generationParams: {
      operators: ['+'],
      numberRange: [3, 15],
      skill: 'nearDoubles',
    },
  },
  
  // === WORLD 2: SUBTRACTION STRATEGIES ===
  {
    id: 8,
    world: "World 2: Subtraction",
    title: "Subtracting Small Numbers",
    description: "Let's begin subtraction by counting down.",
    tip: "Think 'what's the difference?' or 'how many steps back?' For 9 - 3, start at 9 and go back 3 steps: 8, 7, 6.",
    targetScore: 10,
    generationParams: {
      operators: ['-'],
      numberRange: [1, 15],
      skill: 'random', // Your existing logic for positive results works here
    },
  },
  {
    id: 9,
    world: "World 2: Subtraction",
    title: "The 'Subtracting 10' Rule",
    description: "Just like adding 10, subtracting 10 is simple.",
    tip: "To subtract 10, just decrease the 'tens' digit by one. (e.g., 54 - 10 = 44).",
    targetScore: 12,
    generationParams: {
      operators: ['-'],
      numberRange: [20, 60],
      skill: 'subtractTen',
      fixedOperand: 10,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 10,
    world: "World 2: Subtraction",
    title: "The 'Subtracting 9' Trick",
    description: "You guessed it! There's a trick for subtracting 9, too.",
    tip: "To subtract 9, just subtract 10 (which is easy!) and then add 1 back. (e.g., 36 - 9 is 36 - 10 + 1, which is 26 + 1 = 27).",
    targetScore: 12,
    generationParams: {
      operators: ['-'],
      numberRange: [20, 60],
      skill: 'subtractNine',
      fixedOperand: 9,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 11,
    world: "World 2: Subtraction",
    title: "Subtracting from 10s",
    description: "Practice subtracting from round numbers like 20, 30, 40.",
    tip: "Use your 'Making 10' skills! For 30 - 7, think 'What + 7 = 10?'. The answer is 3. So 30 - 7 will end in a 3... it's 23!",
    targetScore: 10,
    generationParams: {
      operators: ['-'],
      numberRange: [1, 9], // The number being *subtracted*
      skill: 'random', // In generateQuestion, you'd make the *first* number a multiple of 10 (e.g., 20, 30, 40)
    },
  },
  {
    id: 12,
    world: "World 2: Subtraction",
    title: "Speed Round: 9s & 10s",
    description: "Let's mix subtraction of 9s and 10s. Pay attention!",
    tip: "Did you subtract 10, or did you subtract 10 and add 1 back? Check your answers!",
    targetScore: 15,
    targetTime: 60,
    generationParams: {
      operators: ['-'],
      numberRange: [20, 60],
      skill: 'subtractTen', // (In implementation, you'd randomly pick 'subtractTen' or 'subtractNine')
    },
  },

  // === WORLD 3: MULTIPLICATION BASICS ===
  {
    id: 13,
    world: "World 3: Multiplication",
    title: "Multiplying by 2 (Doubles)",
    description: "Multiplying by 2 is just the 'Doubles' you learned in addition!",
    tip: "x 2 is just 'double'. 6 x 2 is 6 + 6 = 12.",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'doubles',
    },
  },
  {
    id: 14,
    world: "World 3: Multiplication",
    title: "Multiplying by 10",
    description: "The easiest trick of all.",
    tip: "To multiply by 10, just add a zero to the end of the number. (e.g., 14 x 10 = 140).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 20],
      skill: 'multiplyByTen',
      fixedOperand: 10,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 15,
    world: "World 3: Multiplication",
    title: "Multiplying by 5",
    description: "Use your 'x 10' skill to make this easy.",
    tip: "To multiply by 5, just multiply by 10 and then cut it in half. (e.g., 18 x 5 is 18 x 10 = 180... and half of 180 is 90).",
    targetScore: 12,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 20],
      skill: 'multiplyByFive',
      fixedOperand: 5,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 16,
    world: "World 3: Multiplication",
    title: "Multiplying by 11 (The Easy Way)",
    description: "There's a special trick for 11s.",
    tip: "For a 2-digit number (like 34), split the digits (3_4) and add them (3+4=7). Put the sum in the middle: 374.",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 9],
      skill: 'multiplyByEleven',
      fixedOperand: 11,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 17,
    world: "World 3: Multiplication",
    title: "Multiplying by 3",
    description: "Practice your 3 times tables.",
    tip: "If you know your doubles, you can do 3x by doing (number x 2) + number. (e.g., 7 x 3 = (7 x 2) + 7 = 14 + 7 = 21).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
      fixedOperand: 3,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 18,
    world: "World 3: Multiplication",
    title: "Multiplying by 4",
    description: "Double your doubles!",
    tip: "To multiply by 4, just double the number, then double it again! (e.g., 7 x 4 = (7 x 2) x 2 = 14 x 2 = 28).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
      fixedOperand: 4,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 19,
    world: "World 3: Multiplication",
    title: "Multiplying by 6",
    description: "Practice your 6 times tables.",
    tip: "If you know your 5s, you can do (number x 5) + number. (e.g., 7 x 6 = (7 x 5) + 7 = 35 + 7 = 42).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
      fixedOperand: 6,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 20,
    world: "World 3: Multiplication",
    title: "Multiplying by 7",
    description: "Practice your 7 times tables.",
    tip: "This one often requires memorization, but you can also use (number x 5) + (number x 2).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
      fixedOperand: 7,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 21,
    world: "World 3: Multiplication",
    title: "Multiplying by 8",
    description: "Double, double, double!",
    tip: "To multiply by 8, double the number three times! (e.g., 7 x 8 = (7 x 2) x 2 x 2 = 14 x 2 x 2 = 28 x 2 = 56).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
      fixedOperand: 8,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 22,
    world: "World 3: Multiplication",
    title: "Multiplying by 9 (The Finger Trick!)",
    description: "A classic trick for your 9 times tables.",
    tip: "Hold up 10 fingers. For 9 x 3, put down your 3rd finger. You have 2 fingers up before it, and 7 after it. Answer: 27!",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 9],
      skill: 'random',
      fixedOperand: 9,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 23,
    world: "World 3: Multiplication",
    title: "Multiplying by 12",
    description: "Practice your 12 times tables.",
    tip: "Think (number x 10) + (number x 2). (e.g., 7 x 12 = (7 x 10) + (7 x 2) = 70 + 14 = 84).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
      fixedOperand: 12,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 24,
    world: "World 3: Multiplication",
    title: "Mixed Multiplication 1",
    description: "A mix of all the multiplication facts you've learned so far.",
    tip: "Keep practicing those tricks! The more you use them, the faster you'll get.",
    targetScore: 15,
    targetTime: 60,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
    },
  },
  {
    id: 25,
    world: "World 3: Multiplication",
    title: "Mixed Multiplication 2",
    description: "Another round of mixed multiplication to solidify your skills.",
    tip: "Don't be afraid to pause and think. Accuracy first, then speed.",
    targetScore: 15,
    targetTime: 60,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 12],
      skill: 'random',
    },
  },

  // === WORLD 4: DIVISION TRICKS ===
  {
    id: 26,
    world: "World 4: Division",
    title: "Dividing by 2 (Halving)",
    description: "Let's practice cutting numbers in half.",
    tip: "This is the reverse of 'doubles'. What number, added to itself, gives you this? (e.g., 18 / 2 is 9, because 9+9=18).",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [2, 24],
      skill: 'integerDivision',
      fixedOperand: 2,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 27,
    world: "World 4: Division",
    title: "Dividing by 10",
    description: "The reverse of the 'x 10' trick.",
    tip: "If the number ends in 0, just remove the 0! (e.g., 170 / 10 = 17).",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [10, 200],
      skill: 'integerDivision',
      fixedOperand: 10,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 28,
    world: "World 4: Division",
    title: "Dividing by 5",
    description: "Use your 'divide by 10' skill.",
    tip: "To divide by 5, divide by 10 and then double the result. (e.g., 80 / 5 is 80 / 10 = 8... and 8 x 2 = 16).",
    targetScore: 12,
    generationParams: {
      operators: ['÷'],
      numberRange: [10, 100],
      skill: 'integerDivision',
      fixedOperand: 5,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 29,
    world: "World 4: Division",
    title: "Dividing by 3",
    description: "Practice dividing by 3.",
    tip: "A number is divisible by 3 if the sum of its digits is divisible by 3. (e.g., 21: 2+1=3, so 21 is divisible by 3).",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [3, 36],
      skill: 'integerDivision',
      fixedOperand: 3,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 30,
    world: "World 4: Division",
    title: "Dividing by 4",
    description: "Practice dividing by 4.",
    tip: "You can halve it, then halve it again! (e.g., 24 / 4 = (24 / 2) / 2 = 12 / 2 = 6).",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [4, 48],
      skill: 'integerDivision',
      fixedOperand: 4,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 31,
    world: "World 4: Division",
    title: "Dividing by 6",
    description: "Practice dividing by 6.",
    tip: "If a number is divisible by both 2 and 3, it's divisible by 6.",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [6, 72],
      skill: 'integerDivision',
      fixedOperand: 6,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 32,
    world: "World 4: Division",
    title: "Dividing by 7",
    description: "Practice dividing by 7.",
    tip: "This often requires memorization or working backward from multiplication facts.",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [7, 84],
      skill: 'integerDivision',
      fixedOperand: 7,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 33,
    world: "World 4: Division",
    title: "Dividing by 8",
    description: "Practice dividing by 8.",
    tip: "You can halve it three times!",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [8, 96],
      skill: 'integerDivision',
      fixedOperand: 8,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 34,
    world: "World 4: Division",
    title: "Dividing by 9",
    description: "Practice dividing by 9.",
    tip: "A number is divisible by 9 if the sum of its digits is divisible by 9.",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [9, 108],
      skill: 'integerDivision',
      fixedOperand: 9,
      fixedOperandPosition: 'second',
    },
  },
  {
    id: 35,
    world: "World 4: Division",
    title: "Mixed Division",
    description: "A mix of all the division facts you've learned so far.",
    tip: "Remember your multiplication tables to help with division!",
    targetScore: 15,
    targetTime: 60,
    generationParams: {
      operators: ['÷'],
      numberRange: [1, 100],
      skill: 'integerDivision',
    },
  },

  // === WORLD 5: ADVANCED STRATEGIES & MIXED REVIEW ===
  {
    id: 36,
    world: "World 5: Advanced Addition",
    title: "Two-Digit Addition (No Carry)",
    description: "Adding 2-digit numbers by splitting them.",
    tip: "Add the tens, then add the ones. (e.g., 23 + 45 is 20+40=60 and 3+5=8. Answer: 68).",
    targetScore: 10,
    generationParams: {
      operators: ['+'],
      numberRange: [10, 49],
      skill: 'random',
    },
  },
  {
    id: 37,
    world: "World 5: Advanced Addition",
    title: "Two-Digit Addition (With Carry)",
    description: "Now with a 'carry-over'.",
    tip: "Same as before, but the 'ones' will be over 10. (e.g., 28 + 45 is 20+40=60 and 8+5=13. Answer: 60 + 13 = 73).",
    targetScore: 10,
    generationParams: {
      operators: ['+'],
      numberRange: [10, 89],
      skill: 'random',
    },
  },
  {
    id: 38,
    world: "World 5: Advanced Subtraction",
    title: "Two-Digit Subtraction (No Borrow)",
    description: "Subtracting 2-digit numbers without needing to borrow.",
    tip: "Subtract the tens, then subtract the ones. (e.g., 58 - 23 is 50-20=30 and 8-3=5. Answer: 35).",
    targetScore: 10,
    generationParams: {
      operators: ['-'],
      numberRange: [10, 99],
      skill: 'random',
    },
  },
  {
    id: 39,
    world: "World 5: Advanced Subtraction",
    title: "Two-Digit Subtraction (With Borrow)",
    description: "Subtracting 2-digit numbers where you need to borrow.",
    tip: "If the ones digit of the first number is smaller, borrow from the tens place. (e.g., 43 - 17: borrow from 40 to make it 30 and 13. 13-7=6, 30-10=20. Answer: 26).",
    targetScore: 10,
    generationParams: {
      operators: ['-'],
      numberRange: [10, 99],
      skill: 'random',
    },
  },
  {
    id: 40,
    world: "World 6: Mixed Operations",
    title: "Mixed Operations: Add/Subtract",
    description: "A mix of addition and subtraction problems.",
    tip: "Read carefully! Is it a plus or a minus?",
    targetScore: 15,
    targetTime: 60,
    generationParams: {
      operators: ['+', '-'],
      numberRange: [1, 50],
      skill: 'random',
    },
  },
  {
    id: 41,
    world: "World 6: Mixed Operations",
    title: "Mixed Operations: Multiply/Divide",
    description: "A mix of multiplication and division problems.",
    tip: "Remember that division is the inverse of multiplication.",
    targetScore: 15,
    targetTime: 60,
    generationParams: {
      operators: ['×', '÷'],
      numberRange: [1, 100],
      skill: 'integerDivision',
    },
  },
  {
    id: 42,
    world: "World 6: Mixed Operations",
    title: "Mixed Operations: All Four",
    description: "The ultimate test of basic operations.",
    tip: "Stay focused and apply the best trick for each problem.",
    targetScore: 20,
    targetTime: 90,
    generationParams: {
      operators: ['+', '-', '×', '÷'],
      numberRange: [1, 50],
      skill: 'random',
    },
  },
  {
    id: 43,
    world: "World 7: Larger Numbers",
    title: "Adding Three-Digit Numbers (No Carry)",
    description: "Practice adding larger numbers.",
    tip: "Break it down: hundreds, then tens, then ones.",
    targetScore: 10,
    generationParams: {
      operators: ['+'],
      numberRange: [100, 499],
      skill: 'random',
    },
  },
  {
    id: 44,
    world: "World 7: Larger Numbers",
    title: "Adding Three-Digit Numbers (With Carry)",
    description: "Adding three-digit numbers with carrying.",
    tip: "Don't forget to carry over to the next place value!",
    targetScore: 10,
    generationParams: {
      operators: ['+'],
      numberRange: [100, 899],
      skill: 'random',
    },
  },
  {
    id: 45,
    world: "World 7: Larger Numbers",
    title: "Subtracting Three-Digit Numbers (No Borrow)",
    description: "Subtracting larger numbers without borrowing.",
    tip: "Subtract hundreds, then tens, then ones.",
    targetScore: 10,
    generationParams: {
      operators: ['-'],
      numberRange: [100, 999],
      skill: 'random',
    },
  },
  {
    id: 46,
    world: "World 7: Larger Numbers",
    title: "Subtracting Three-Digit Numbers (With Borrow)",
    description: "Subtracting three-digit numbers with borrowing.",
    tip: "Borrowing is just regrouping. Practice makes perfect!",
    targetScore: 10,
    generationParams: {
      operators: ['-'],
      numberRange: [100, 999],
      skill: 'random',
    },
  },
  {
    id: 47,
    world: "World 8: Mental Math Mastery",
    title: "Multiplying by 20, 30, 40...",
    description: "Multiply by multiples of 10.",
    tip: "Multiply the non-zero digits, then add the zeros back. (e.g., 12 x 20 = (12 x 2) with a zero = 240).",
    targetScore: 10,
    generationParams: {
      operators: ['×'],
      numberRange: [1, 10],
      skill: 'random',
    },
  },
  {
    id: 48,
    world: "World 8: Mental Math Mastery",
    title: "Dividing by 20, 30, 40...",
    description: "Divide by multiples of 10.",
    tip: "Cancel out zeros, then divide. (e.g., 240 / 20 = 24 / 2 = 12).",
    targetScore: 10,
    generationParams: {
      operators: ['÷'],
      numberRange: [10, 200],
      skill: 'integerDivision',
    },
  },
  {
    id: 49,
    world: "World 8: Mental Math Mastery",
    title: "Ultimate Mixed Review",
    description: "A challenging mix of all operations and number sizes.",
    tip: "Trust your mental math skills. You've come a long way!",
    targetScore: 20,
    targetTime: 90,
    generationParams: {
      operators: ['+', '-', '×', '÷'],
      numberRange: [1, 100],
      skill: 'random',
    },
  },
  
  // === FINAL LEVEL ===
  {
    id: 50,
    world: "Final Challenge",
    title: "The Grand Master",
    description: "You've learned all the tricks. Now, put them to the test in this final challenge.",
    tip: "Stay calm, use the tricks you've learned, and trust your instincts. You're a mental math wizard!",
    targetScore: 25,
    targetTime: 90,
    generationParams: {
      operators: ['+', '-', '×', '÷'],
      numberRange: [1, 100],
      skill: 'random',
    },
  },
];