import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { sendToWebhook } from "@/services/webhook";

export const NewsForm = () => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent empty submissions
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }

    // Prevent multiple submissions
    if (isLoading) {
      return;
    }

    // Prevent rapid repeated submissions
    const now = Date.now();
    if (now - lastRequestTime < 5000) { // 5 second cooldown
      toast({
        title: "Please wait",
        description: "Please wait a few seconds before submitting another request",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLastRequestTime(now);
    
    try {
      await sendToWebhook(topic.trim());
      toast({
        title: "Request Sent",
        description: "Your request has been sent to the server. Links will appear in your social media accounts shortly.",
      });
      // Clear the form after successful submission
      setTopic("");
    } catch (error) {
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect to the server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Content Pipeline</CardTitle>
        <CardDescription>
          Enter a news topic to generate content across your social media platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter link..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Generate Content"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
