export const usernameRegex = {
  length: /^.{3,20}$/,
  validChars: /^[A-Za-z0-9_]+$/,
};

interface validateUsernameProps {
  length: boolean;
  validChars: boolean;
  [key: string]: boolean;
}

export function validateUsername(username: string): validateUsernameProps {
  return {
    length: usernameRegex.length.test(username),
    validChars: usernameRegex.validChars.test(username),
  };
}

export const passwordRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  symbol: /[!@#$%^&*()_\-+=[\]{};:"\\|,.<>/?]/,
  length: /.{8,}/,
};

interface validatePasswordProps {
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  symbol: boolean;
  passwordsMatch: boolean;
  [key: string]: boolean;
}

export function validatePassword(
  password: string,
  confirmPassword: string
): validatePasswordProps {
  return {
    length: passwordRegex.length.test(password),
    lowercase: passwordRegex.lowercase.test(password),
    uppercase: passwordRegex.uppercase.test(password),
    number: passwordRegex.number.test(password),
    symbol: passwordRegex.symbol.test(password),
    passwordsMatch: password === confirmPassword,
  };
}
