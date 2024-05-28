// @ts-nocheck
// components/QrScanner.tsx
"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const QrScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [data, setData] = useState("kosong")

  const router = useRouter()

  useEffect(() => {
    var scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    function onScanSuccess(decodedText, decodedResult) {
      // Handle on success condition with the decoded text or result.
      setData(decodedText)

      console.log(`Scan result: ${decodedText}`, decodedResult);
      
      // ...
      html5QrcodeScanner.clear();
      router.push(decodedText)
      // ^ this will stop the scanner (video feed) and clear the scan area.
    }

    function onScanError(errorMessage) {
      // handle on error condition, with error message
      console.log(errorMessage)
    }

    
    scannerRef.current = scanner;

    // scanner.render(success, error);
    scanner.render(onScanSuccess, onScanError);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="container">
      <h1>QR Code Scanner</h1>
      {data}
      {scanResult ? (
        <div>Success: {scanResult}</div>
      ) : (
        <div id="reader" style={{ width: "100%" }}></div>
      )}
    </div>
  );
};

export default QrScanner;
