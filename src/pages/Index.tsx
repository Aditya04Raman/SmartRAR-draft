import { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { FileUploadZone } from "@/components/file-upload/FileUploadZone";
import { DocumentAnalyzer } from "@/components/ai-features/DocumentAnalyzer";
import { CompressionTools } from "@/components/compression/CompressionTools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileArchive, Brain, Zap, Shield, Users, Star } from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              SmartRAR
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              AI-Powered Smart File Companion for Modern Productivity
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Compress files, analyze documents with AI, and unlock intelligent insights 
              from your content with our advanced document intelligence platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Upload & Process Your Files</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploadZone onFilesChange={setUploadedFiles} />
              
              {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <Tabs defaultValue="compress" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="compress" className="flex items-center gap-2">
                        <FileArchive className="h-4 w-4" />
                        Compress Files
                      </TabsTrigger>
                      <TabsTrigger value="analyze" className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        AI Analysis
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="compress" className="mt-6">
                      <CompressionTools files={uploadedFiles} />
                    </TabsContent>
                    <TabsContent value="analyze" className="mt-6">
                      <DocumentAnalyzer files={uploadedFiles} />
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for intelligent file management and document analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-glow mb-4">
                  <FileArchive className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Compression</h3>
                <p className="text-muted-foreground">
                  Compress multiple files into optimized ZIP archives with intelligent compression algorithms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-accent to-green-500 mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Document Analysis</h3>
                <p className="text-muted-foreground">
                  Get intelligent summaries, key insights, and grammar suggestions from your documents.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Q&A</h3>
                <p className="text-muted-foreground">
                  Chat with Wini-Rara, our AI assistant, to ask questions about your document content.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Processing</h3>
                <p className="text-muted-foreground">
                  Your files are processed securely with enterprise-grade encryption and privacy protection.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Share analyzed documents and insights with your team for better collaboration.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Professional-grade tools designed for productivity enthusiasts and businesses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-glow">
              <FileArchive className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">SmartRAR</span>
          </div>
          <p className="text-muted-foreground">
            AI-Powered Smart File Companion for Modern Productivity
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            © 2024 SmartRAR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
