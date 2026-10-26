import { useState } from "react"
import { authClient } from "../lib/auth-client.js"
import { formatPrice } from "../lib/format.js"
import FormField, { inputClass } from "./FormField.jsx"

const emptyForm = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  plan: "monthly",
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = "Please enter your name."
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Please enter a valid email."
  if (form.password.length < 8) errors.password = "Password must be at least 8 characters."
  if (form.confirm !== form.password) errors.confirm = "Passwords do not match."
  return errors
}

function SignUpForm({ memberships }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const found = validate(form)
    setErrors(found)
    setServerError("")
    if (Object.keys(found).length > 0) return

    // Creates the user in the database and signs them in straight away.
    // The password is hashed on the server – we never store it ourselves.
    setSubmitting(true)
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      plan: form.plan,
    })
    setSubmitting(false)

    if (error) {
      setServerError(error.message || "Sign up failed. Please try again.")
    }
    // On success useSession() updates by itself and Register shows the welcome view
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
      <FormField id="name" label="Full name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
      </FormField>

      <FormField id="password" label="Password" error={errors.password}>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`${inputClass} pr-16`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 mt-1 px-3 text-sm font-semibold text-brand"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </FormField>

      <FormField id="confirm" label="Confirm password" error={errors.confirm}>
        <input
          id="confirm"
          name="confirm"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={form.confirm}
          onChange={handleChange}
          aria-invalid={Boolean(errors.confirm)}
          aria-describedby={errors.confirm ? "confirm-error" : undefined}
          className={inputClass}
        />
      </FormField>

      <FormField id="plan" label="Membership plan">
        <select id="plan" name="plan" value={form.plan} onChange={handleChange} className={inputClass}>
          {memberships.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} – {formatPrice(plan.price)}/{plan.period}
            </option>
          ))}
        </select>
      </FormField>

      {serverError && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand px-6 py-3 font-semibold uppercase text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {submitting ? "Creating account…" : "Register"}
      </button>
    </form>
  )
}

export default SignUpForm
