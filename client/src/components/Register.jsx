import { useState } from "react"
import { authClient } from "../lib/auth-client.js"
import SignInForm from "./SignInForm.jsx"
import SignUpForm from "./SignUpForm.jsx"

function tabClass(active) {
  return `flex-1 rounded-md px-4 py-2 text-sm font-semibold transition ${
    active ? "bg-brand text-white" : "text-brand hover:bg-surface-2"
  }`
}

function Register({ memberships }) {
  // useSession asks the server "who is signed in?" using the session cookie.
  // Because the cookie survives a refresh, so does the signed-in state.
  const { data: session, isPending } = authClient.useSession()
  const [mode, setMode] = useState("signup")

  const user = session?.user
  const planName = memberships.find((p) => p.id === user?.plan)?.name ?? user?.plan

  return (
    <section id="register" className="scroll-mt-44 bg-surface-2 px-4 py-12 sm:py-16 md:scroll-mt-20">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        {isPending ? (
          <p className="text-center" role="status">Checking your account…</p>
        ) : user ? (
          <div className="text-center" role="status">
            <h2 className="font-display text-2xl text-brand sm:text-3xl">Welcome, {user.name}!</h2>
            <p className="mt-4 break-words">
              You're signed in as <span className="font-semibold">{user.email}</span>
              {planName && (
                <>
                  {" "}with the <span className="font-semibold">{planName}</span> membership
                </>
              )}
              .
            </p>
            <button
              type="button"
              onClick={() => authClient.signOut()}
              className="mt-6 rounded-md bg-brand px-5 py-2 font-semibold text-white transition hover:bg-blue-800"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-center font-display text-2xl text-brand sm:text-3xl">
              {mode === "signup" ? "Become a Member" : "Welcome Back"}
            </h2>
            <div className="mt-6 flex gap-2 rounded-lg bg-surface p-1" role="group" aria-label="Choose form">
              <button
                type="button"
                onClick={() => setMode("signup")}
                aria-pressed={mode === "signup"}
                className={tabClass(mode === "signup")}
              >
                Create account
              </button>
              <button
                type="button"
                onClick={() => setMode("signin")}
                aria-pressed={mode === "signin"}
                className={tabClass(mode === "signin")}
              >
                Sign in
              </button>
            </div>
            {mode === "signup" ? <SignUpForm memberships={memberships} /> : <SignInForm />}
          </>
        )}
      </div>
    </section>
  )
}

export default Register
