
"use client"; // Necesario para ejecutar en el cliente
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        setResults(JSON.parse(decodeURIComponent(data)));
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto max-w-lg">
      <h2 className="text-3xl font-bold text-center my-6">Crop Recommendations</h2>
      {results ? (
        <div className="grid gap-4">
          {results.predictions.map((crop, index) => (
            <div key={index} className="border p-4 rounded-md shadow">
              <h3 className="text-xl font-bold">{crop["Crop Type"]}</h3>
              <p>{crop.Description}</p>
              <img src={crop["Image Link"]} alt={crop["Crop Type"]} className="w-full h-40 object-cover rounded-md mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Loading results...</p>
      )}
    </div>
  );
}

