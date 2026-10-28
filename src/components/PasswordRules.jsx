// The password rules of this product. Shown wherever a password is chosen.
export const RULES = [
  { label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { label: 'One uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { label: 'One lowercase letter', test: (value) => /[a-z]/.test(value) },
  { label: 'One number', test: (value) => /[0-9]/.test(value) },
  { label: 'One special character', test: (value) => /[^A-Za-z0-9]/.test(value) },
];

export function passwordIsValid(password) {
  return RULES.every((rule) => rule.test(password));
}

export function PasswordRules({ password, showErrors = false }) {
  return (
    <ul className="rules">
      {RULES.map((rule) => (
        <li key={rule.label} className={showErrors && !rule.test(password) ? 'rule-failed' : undefined}>
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
