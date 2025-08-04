import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocumentAnalyzerProps {
  files: Array<{ file: File; id: string }>;
}

interface AnalysisResult {
  summary: string;
  grammarIssues: Array<{
    text: string;
    suggestion: string;
    type: "grammar" | "spelling" | "style";
  }>;
  keyPoints: string[];
}

export const DocumentAnalyzer = ({ files }: DocumentAnalyzerProps) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [userQuestion, setUserQuestion] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  const documentFiles = files.filter(f => 
    f.file.type.includes('pdf') || 
    f.file.type.includes('text') || 
    f.file.type.includes('document')
  );

  const analyzeDocuments = async () => {
    if (documentFiles.length === 0) {
      toast({
        title: "No documents to analyze",
        description: "Please upload PDF, DOCX, or TXT files first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis - in real app, this would call your AI service
    setTimeout(() => {
      setAnalysis({
        summary: "This document discusses project management methodologies, focusing on Agile and Scrum frameworks. It outlines best practices for team collaboration, sprint planning, and continuous improvement. The content emphasizes the importance of regular communication and adaptive planning in modern software development.",
        grammarIssues: [
          {
            text: "Their are many benefits",
            suggestion: "There are many benefits",
            type: "grammar"
          },
          {
            text: "effectivness",
            suggestion: "effectiveness",
            type: "spelling"
          },
          {
            text: "This sentence is very long and could be simplified for better readability and understanding.",
            suggestion: "Consider breaking this into shorter sentences.",
            type: "style"
          }
        ],
        keyPoints: [
          "Agile methodology improves team productivity",
          "Regular sprint reviews ensure project alignment",
          "Continuous integration reduces deployment risks",
          "Customer feedback drives iterative improvements"
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Your documents have been analyzed successfully.",
      });
    }, 3000);
  };

  const askQuestion = async () => {
    if (!userQuestion.trim() || !analysis) return;

    const newMessage = { role: "user" as const, content: userQuestion };
    setChatMessages(prev => [...prev, newMessage]);
    setUserQuestion("");
    setIsAnswering(true);

    // Simulate AI response - in real app, this would call your AI service
    setTimeout(() => {
      const response = {
        role: "assistant" as const,
        content: "Based on the analyzed documents, I can help clarify that point. The documents suggest that implementing Agile methodologies requires a cultural shift in the organization, focusing on collaboration and iterative development. Would you like me to elaborate on any specific aspect?"
      };
      setChatMessages(prev => [...prev, response]);
      setIsAnswering(false);
    }, 2000);
  };

  if (documentFiles.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Brain className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Documents to Analyze</h3>
          <p className="text-muted-foreground text-center">
            Upload PDF, DOCX, or TXT files to enable AI-powered document analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Document Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ready to analyze {documentFiles.length} document(s)</p>
              <p className="text-sm text-muted-foreground">
                Files: {documentFiles.map(f => f.file.name).join(", ")}
              </p>
            </div>
            <Button 
              onClick={analyzeDocuments} 
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-primary to-primary-glow"
            >
              {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAnalyzing ? "Analyzing..." : "Analyze Documents"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{analysis.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Key Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Grammar & Style Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.grammarIssues.map((issue, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant={issue.type === "grammar" ? "destructive" : issue.type === "spelling" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {issue.type}
                          </Badge>
                        </div>
                        <p className="text-sm mb-1">
                          <span className="line-through text-muted-foreground">{issue.text}</span>
                        </p>
                        <p className="text-sm text-green-600">→ {issue.suggestion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with Wini-Rara
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chatMessages.length > 0 && (
                <div className="max-h-64 overflow-y-auto space-y-3 border rounded-lg p-3">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isAnswering && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask a question about your documents..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  className="flex-1"
                  rows={2}
                />
                <Button onClick={askQuestion} disabled={!userQuestion.trim() || isAnswering}>
                  Ask
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};