export function Card({ title, children }) {
  return (
    <main className="card">
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export function Field({ label, ...input }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...input} />
    </label>
  );
}

export function Message({ kind = 'error', children }) {
  if (!children) return null;
  return (
    <p className={`message ${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      {children}
    </p>
  );
}
