import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Archive, Download, Loader2, FileArchive } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CompressionToolsProps {
  files: Array<{ file: File; id: string }>;
}

export const CompressionTools = ({ files }: CompressionToolsProps) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState<string | null>(null);

  const compressFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files to compress",
        description: "Please upload some files first.",
        variant: "destructive",
      });
      return;
    }

    setIsCompressing(true);
    setCompressionProgress(0);

    // Simulate compression progress
    const progressInterval = setInterval(() => {
      setCompressionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    // Simulate compression - in real app, this would use a ZIP library like JSZip
    setTimeout(() => {
      clearInterval(progressInterval);
      setCompressionProgress(100);
      
      // Create a mock download URL
      const mockZipUrl = URL.createObjectURL(new Blob(["Mock ZIP file content"], { type: "application/zip" }));
      setCompressedFile(mockZipUrl);
      
      setIsCompressing(false);
      toast({
        title: "Compression complete!",
        description: `Successfully compressed ${files.length} files into a ZIP archive.`,
      });
    }, 3000);
  };

  const downloadCompressedFile = () => {
    if (compressedFile) {
      const link = document.createElement('a');
      link.href = compressedFile;
      link.download = `smartrar-compressed-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your compressed file is being downloaded.",
      });
    }
  };

  const getTotalSize = () => {
    return files.reduce((total, f) => total + f.file.size, 0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (files.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Archive className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Files to Compress</h3>
          <p className="text-muted-foreground text-center">
            Upload some files to create a ZIP archive.
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
            <Archive className="h-5 w-5" />
            File Compression
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{files.length} files ready for compression</p>
              <p className="text-sm text-muted-foreground">
                Total size: {formatFileSize(getTotalSize())}
              </p>
            </div>
            <Button 
              onClick={compressFiles} 
              disabled={isCompressing}
              className="bg-gradient-to-r from-accent to-green-500 hover:shadow-glow"
            >
              {isCompressing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCompressing ? "Compressing..." : "Create ZIP"}
            </Button>
          </div>

          {isCompressing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Compression progress</span>
                <span>{Math.round(compressionProgress)}%</span>
              </div>
              <Progress value={compressionProgress} className="h-2" />
            </div>
          )}

          {compressedFile && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                      <FileArchive className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Compression Complete!
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Your ZIP file is ready for download
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={downloadCompressedFile}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download ZIP
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Files to be compressed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm font-medium">{fileObj.file.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatFileSize(fileObj.file.size)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};