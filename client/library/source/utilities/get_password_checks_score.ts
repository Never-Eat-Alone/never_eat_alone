import { PasswordChecks } from '../definitions';

export function getPasswordChecksScore(checks: PasswordChecks): number {
  let score = 0;
  if (checks.hasMinCharacters) {
    score += 1;
  }
  if (checks.hasNumbers) {
    score += 1;
  }
  if (checks.hasLowerCase) {
    score += 1;
  }
  if (checks.isMixedCase) {
    score += 1;
  }
  if (checks.hasSpecialCharacter) {
    score += 1;
  }
  return score;
}
