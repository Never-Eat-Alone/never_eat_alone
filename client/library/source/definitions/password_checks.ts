export interface PasswordChecks {
  hasMinCharacters: boolean;
  hasNumbers: boolean;
  hasLowerCase: boolean;
  isMixedCase: boolean;
  hasSpecialCharacter: boolean;
  doesConfirmationMatch: boolean;
}
