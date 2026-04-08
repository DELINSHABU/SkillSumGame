import type { GenerationParams, SkillType, OperationType } from './types';

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function applySkillLogic(skill: SkillType, a: number, b: number, operator: OperationType): { question: string; answer: number } {
  switch (skill) {
    case 'makeTen': {
      const missing = 10 - a;
      return { question: `${a} + ? = 10`, answer: missing };
    }
    case 'addTen':
      return { question: `${a} + 10`, answer: a + 10 };
    case 'addNine':
      return { question: `${a} + 9`, answer: a + 9 };
    case 'addEight':
      return { question: `${a} + 8`, answer: a + 8 };
    case 'doubles':
      return { question: `${a} + ${a}`, answer: a + a };
    case 'nearDoubles':
      return { question: `${a} + ${a + 1}`, answer: a + (a + 1) };
    case 'subtractTen':
      return { question: `${a} - 10`, answer: Math.max(0, a - 10) };
    case 'subtractNine':
      return { question: `${a} - 9`, answer: Math.max(0, a - 9) };
    case 'multiplyByTwo':
      return { question: `${a} × 2`, answer: a * 2 };
    case 'multiplyByFive':
      return { question: `${a} × 5`, answer: a * 5 };
    case 'multiplyByTen':
      return { question: `${a} × 10`, answer: a * 10 };
    case 'multiplyByEleven':
      return { question: `${a} × 11`, answer: a * 11 };
    case 'integerDivision': {
      const product = a * b;
      return { question: `${product} ÷ ${a}`, answer: b };
    }
    case 'random':
    default:
      return { question: `${a} ${operator} ${b}`, answer: eval(`${a} ${operator} ${b}`) };
  }
}

export function generateQuestion(params: GenerationParams): { question: string; answer: number } {
  const { operators, numberRange, skill, fixedOperand, fixedOperandPosition } = params;
  
  const operator = operators[randomInRange(0, operators.length - 1)];
  
  let a: number, b: number;
  
  if (fixedOperand !== undefined && fixedOperandPosition === 'first') {
    a = fixedOperand;
    b = randomInRange(numberRange[0], numberRange[1]);
  } else if (fixedOperand !== undefined && fixedOperandPosition === 'second') {
    b = fixedOperand;
    a = randomInRange(numberRange[0], numberRange[1]);
  } else {
    a = randomInRange(numberRange[0], numberRange[1]);
    b = randomInRange(numberRange[0], numberRange[1]);
  }
  
  if (operator === '-' && a < b) {
    [a, b] = [b, a];
  }
  
  if (operator === '÷' && b === 0) {
    b = randomInRange(1, numberRange[1]);
  }
  
  return applySkillLogic(skill, a, b, operator);
}