"use client"; 


import React, { useState } from "react"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { CopyIcon } from "lucide-react"; 
import axios from "axios"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BITLY_API_URL = "https://api-ssl.bitly.com/v4/shorten";
const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>(""); 
  const [shortUrl, setShortUrl] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    setShortUrl(""); // Reset shortened URL state

    try {
      const response = await axios.post(
        BITLY_API_URL,
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.link); // Set the shortened URL state with the response data
    } catch (err) {
      setError("Failed to shorten the URL. Please try again."); // Set error state if the request fails
    }
  };

  // Function to handle copying the shortened URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        fontSize: "0.9rem",
      },
    });
  };

  // JSX return statement rendering the URL Shortener UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-[300px] sm:max-w-md w-full space-y-4 p-6 rounded-lg bg-background shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">URL Shortener</h1>
          <p className="text-muted-foreground">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>
        {/* Form to input and submit the long URL */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              type="url"
              placeholder="Paste your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="pr-16"
              required
            />
            <Button
              type="submit"
              className="absolute top-1/2 right-0 -translate-y-1/2"
            >
              Shorten
            </Button>
          </div>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {/* Display the shortened URL and copy button */}
          {shortUrl && (
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="cursor-pointer"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted/50"
                onClick={handleCopy}
              >
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}