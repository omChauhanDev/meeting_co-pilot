"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, Check, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

function UploadComponent() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ]

    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or PowerPoint file")
      return
    }

    setFile(file)
    simulateUpload()
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsUploaded(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const resetUpload = () => {
    setFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setIsUploaded(false)
  }

  return (
    <section className="">
      <div className="container px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            {!file ? (
              <div
                className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors duration-300 ${
                  isDragging ? "border-secondary bg-secondary/5" : "border-border"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FileUp className="h-16 w-16 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Drag & Drop your PDF or PowerPoint</h3>
                <p className="text-muted-foreground mb-4">or</p>
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Browse Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  onChange={handleFileInput}
                />
                <p className="text-sm text-muted-foreground mt-4">Supported formats: PDF, PPT, PPTX</p>
              </div>
            ) : (
              <div className="p-10">
                <div className="flex items-center mb-4">
                  <File className="h-10 w-10 text-secondary mr-4" />
                  <div className="flex-1">
                    <h3 className="font-medium truncate">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  {isUploaded ? (
                    <Check className="h-6 w-6 text-green-500" />
                  ) : (
                    <Button variant="ghost" size="sm" onClick={resetUpload} disabled={isUploading}>
                      Cancel
                    </Button>
                  )}
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
                  </div>
                )}

                {isUploaded && (
                  <div className="space-y-4">
                    <div className="flex items-center text-green-500 bg-green-50 dark:bg-green-950/30 p-3 rounded-md">
                      <Check className="h-5 w-5 mr-2" />
                      <p>Upload complete! Your AI presenter is being trained.</p>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetUpload}>
                        Upload Another
                      </Button>
                      <Button className="bg-secondary hover:bg-secondary/90">Continue</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export { UploadComponent }

