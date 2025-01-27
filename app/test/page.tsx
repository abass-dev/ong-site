"use client"

import { useEffect, useState } from "react";

const Page = () => {
  const [vistorLog, setVisitorLog] = useState([]);

  const handleLogVisitor = async () => {
    const response = await fetch("/api/visitor-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hostname: "localhost",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        platform: "Windows",
        language: "en-US",
        screenResolution: "1920x1080",
        timezone: "America/New_York",
        referrer: "https://example.com",
        ip: "127.0.0.1",
      }),
    });

    if (response.ok) {
      console.log("Visitor logged successfully");
    } else {
      console.error("Failed to log visitor");
    }
  };

  useEffect(() => {
    fetch("/api/visitor-log", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setVisitorLog(data));
  }, []);

  if (vistorLog) {
    console.log(vistorLog)
  }
  return (
    <div>
      <button onClick={handleLogVisitor}>Log Visitor</button>
      <h1>Test Page</h1>
    </div>
  );
};

export default Page;