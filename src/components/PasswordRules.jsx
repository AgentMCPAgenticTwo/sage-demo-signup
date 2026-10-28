// The password rules this product enforces wherever a password is chosen.
export const passwordRules = [
  { label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { label: 'At least one uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { label: 'At least one lowercase letter', test: (value) => /[a-z]/.test(value) },
  { label: 'At least one number', test: (value) => /[0-9]/.test(value) },
  { label: 'At least one special character', test: (value) => /[^a-zA-Z0-9]/.test(value) },
];

export function unmetRules(password) {
  return passwordRules.filter((rule) => !rule.test(password)).map((rule) => rule.label);
}

// Always shown under a password field; rules listed in `failed` are marked in error colour.
export default function PasswordRules({ password, failed = [] }) {
  return (
    <ul className="rules">
      {passwordRules.map((rule) => (
        <li key={rule.label} className={failed.includes(rule.label) ? 'rule error' : 'rule'}>
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
