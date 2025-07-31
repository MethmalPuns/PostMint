{/*'use client'

import { useState } from "react"

export default function EmailCaptureForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "error" | "success" | "loading">("idle")
  const [message, setMessage] = useState("")

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }
    setStatus("loading")
    setMessage("")
    // TODO: Replace with real API or DB save logic
    setTimeout(() => {
      console.log("Collected email:", email)
      setStatus("success")
      setMessage("Thank you! You're on the list.")
      setEmail("")
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row gap-3 mb-12"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Email address"
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {status === "loading" ? "Saving..." : "Subscribe"}
      </button>

      {message && (
        <p className={`mt-2 text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </form>
  )
}
*/}