import { useState } from "react"
import { formatPrice } from "../lib/format.js"

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

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-brand">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  "mt-1 w-full rounded-md border border-ink/20 bg-white px-3 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"

function Register({ memberships }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [member, setMember] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // No backend: keep only what the welcome message needs, never the password
    const plan = memberships.find((p) => p.id === form.plan)
    setMember({ name: form.name.trim(), email: form.email, plan: plan.name })
    setForm(emptyForm)
    setShowPassword(false)
  }

  return (
    <section id="register" className="scroll-mt-32 bg-surface-2 px-4 py-12 sm:py-16 md:scroll-mt-20">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h2 className="text-center font-display text-2xl text-brand sm:text-3xl">Become a Member</h2>

        {member ? (
          <div className="mt-6 text-center" role="status">
            <p className="text-lg font-semibold">Welcome, {member.name}!</p>
            <p className="mt-2 break-words">
              Your {member.plan} membership request was received. We'll contact you at{" "}
              <span className="font-semibold">{member.email}</span>.
            </p>
            <button
              type="button"
              onClick={() => setMember(null)}
              className="mt-6 rounded-md bg-brand px-5 py-2 font-semibold text-white transition hover:bg-blue-800"
            >
              Register someone else
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <Field id="name" label="Full name" error={errors.name}>
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
            </Field>

            <Field id="email" label="Email" error={errors.email}>
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
            </Field>

            <Field id="password" label="Password" error={errors.password}>
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
            </Field>

            <Field id="confirm" label="Confirm password" error={errors.confirm}>
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
            </Field>

            <Field id="plan" label="Membership plan">
              <select id="plan" name="plan" value={form.plan} onChange={handleChange} className={inputClass}>
                {memberships.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} – {formatPrice(plan.price)}/{plan.period}
                  </option>
                ))}
              </select>
            </Field>

            <button
              type="submit"
              className="w-full rounded-md bg-brand px-6 py-3 font-semibold uppercase text-white transition hover:bg-blue-800"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Register
