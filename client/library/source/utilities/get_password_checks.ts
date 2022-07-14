import { PasswordChecks } from '../definitions';

export function getPasswordChecks(password: string, confirmation: string):
    PasswordChecks {
  return {
    hasMinCharacters: password.length >= 8,
    hasNumbers:/\d/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    isMixedCase: /[A-Z]/.test(password) && /[a-z]/.test(password),
    hasSpecialCharacter: /[^\w]|_/.test(password),
    doesConfirmationMatch: password === confirmation
  } as PasswordChecks;
}
