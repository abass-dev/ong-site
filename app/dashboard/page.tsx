"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AuthService } from "@/lib/auth/sessions"

export default function DashboardPage() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("sessionToken")

      if (!token || token === "undefined") {
        router.push("/login")
        return
      }

      try {
        setIsLoading(true)
        const response = await fetch("/api/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionToken: token }),
        })

        if (!response.ok) {
          throw new Error("Session validation failed")
        }

        const data = await response.json()
        setUserData(data.user)
      } catch (error) {
        console.error("Session validation error:", error)
        localStorage.removeItem("sessionToken")
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    validateSession()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("sessionToken")
    router.push("/login")
  }

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {userData && <p>Welcome</p>}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

