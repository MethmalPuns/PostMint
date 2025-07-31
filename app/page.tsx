"use client"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useQuota } from "@/hooks/useQuota"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Sparkles, Zap } from "lucide-react"
//import EmailCaptureForm from "@/components/EmailCaptureForm"

  
export default function PostMint() {
  const [businessDescription, setBusinessDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([])
  const [hasGenerated, setHasGenerated] = useState(false)
const [lastInputUsed, setLastInputUsed] = useState("")
const { toast } = useToast()



  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  const sessionId = generateSessionId()

    


const handleGenerate = async () => {
  const trimmedInput = businessDescription.trim()

  if (!trimmedInput) {
    alert("Please enter a business description.")
    return
  }

  // ✅ Check if input is the same as last used
  if (trimmedInput === lastInputUsed) {
    alert("You've already generated posts for this input. Please change it to generate again.")
    return
  }

  setIsGenerating(true)

  try {
    const response = await fetch("/api/generate-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessDescription: trimmedInput })
    })

    const data = await response.json()

    if (data?.posts?.length) {
      setGeneratedPosts(data.posts)
      setHasGenerated(true)
      setLastInputUsed(trimmedInput) // ✅ Store to prevent reuse
      toast({
  title: "✅ Posts Generated",
  description: "Try a new description to generate more posts.",
  duration: 3000,
})



    } else {
      alert("No posts returned.")
    }
  } catch (error) {
    alert("Error generating posts.")
  }

  setIsGenerating(false)
}



  const handleGumroadRedirect = (productType: "more-posts" | "new-input") => {
    const baseUrl = "https://gumroad.com/l/postmint"
    const url = `${baseUrl}?session_id=${sessionId}&type=${productType}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PostMint
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">AI-Powered SEO Posts Generator</p>
          <p className="text-gray-500">Transform your business description into engaging social media posts</p>
        </div>

                    {/*<EmailCaptureForm />*/}

        {/* Form */}
        <div className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="business-description" className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your business
                  </label>
                  <Textarea
                    id="business-description"
                    placeholder="Describe your business, products, services, target audience, and what makes you unique..."
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    className="min-h-[120px] resize-none border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

<Button
  onClick={handleGenerate}
  disabled={
    isGenerating ||
    !businessDescription.trim() ||
    businessDescription.trim() === lastInputUsed
  }
  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 text-lg"
>
  {isGenerating ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Generating SEO Posts...
    </>
  ) : (
    <>
      <Zap className="mr-2 h-5 w-5" />
      Generate SEO Posts
    </>
  )}
</Button>


              </div>
            </CardContent>
          </Card>

          {/* Output */}
          {hasGenerated && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Generated Posts</h2>
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                  {generatedPosts.map((post, index) => (
                   <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
  <CardContent className="p-4 relative group">
    <p className="text-gray-700 leading-relaxed">{post}</p>
    
    <button
      onClick={() => navigator.clipboard.writeText(post)}
      className="absolute top-2 right-2 text-xs text-blue-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
    >
      Copy
    </button>
  </CardContent>
</Card>
                  ))}
                </div>
              </div>

              {/* Upsell 
              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Want More Posts?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleGumroadRedirect("more-posts")}
                      variant="outline"
                      className="h-auto p-4 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                    >
                      <div className="text-center">
                        <div className="font-medium text-gray-800">Want 10 more posts for this input?</div>
                        <div className="text-sm text-gray-600 mt-1">Get 10 posts – $5</div>
                      </div>
                    </Button>
              
                    <Button
                      onClick={() => handleGumroadRedirect("new-input")}
                      variant="outline"
                      className="h-auto p-4 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                    >
                      <div className="text-center">
                        <div className="font-medium text-gray-800">Used your free input?</div>
                        <div className="text-sm text-gray-600 mt-1">Buy 1 more input + 5 posts – $5</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>*/}
            </div>
          )}
        </div>
   
  
        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>© 2025 PostMint.</p>
        </div>
      </div>
    </div>
    
  )
   
}
