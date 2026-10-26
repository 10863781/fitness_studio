import { useState } from "react"
import { authClient } from "../lib/auth-client.js"
import FormField, { inputClass } from "./FormField.jsx"

function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setSubmitting(true)
    // Checks the password on the server; if it matches, the server sets a
    // session cookie and useSession() picks up the signed-in user.
    const result = await authClient.signIn.email({ email, password })
    setSubmitting(false)
    if (result.error) {
      setError(result.error.message || "Sign in failed. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <FormField id="signin-email" label="Email">
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </FormField>

      <FormField id="signin-password" label="Password">
        <input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
      </FormField>

      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand px-6 py-3 font-semibold uppercase text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}

export default SignInForm
