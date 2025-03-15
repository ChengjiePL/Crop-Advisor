"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Droplets, Sun, Thermometer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Datos de área para demostración
const areaInfoData = {
  "San Francisco": {
    climate: "Mediterranean",
    humidity: "Medium",
    temperature: "15-25°C",
    rainfall: "600mm annually",
  },
  default: {
    climate: "Temperate",
    humidity: "Medium",
    temperature: "10-20°C",
    rainfall: "800mm annually",
  },
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "San Francisco";
  const date = searchParams.get("date") || "2023-10-15";
  const soil = searchParams.get("soil") || "loamy";

  // Coordenadas de ejemplo para la ubicación
  const coordinates = {
    "San Francisco": { latitude: 37.7749, longitude: -122.4194 },
    default: { latitude: 0, longitude: 0 },
  };
  const { latitude, longitude } = coordinates[location] || coordinates.default;

  // Estados para predicciones, loading y error
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Información de área (tarjeta superior)
  const areaInfo = areaInfoData[location] || areaInfoData.default;

  // useEffect para hacer la petición al endpoint /predict
  useEffect(() => {
    async function fetchPredictions() {
      try {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude,
            longitude,
            date,
            temperature: null,
            humidity: null,
            moisture: null,
            soil_type: soil,
            nitrogen: null,
            potassium: null,
            phosphorus: null,
          }),
        });
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        setPredictions(data.predictions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch predictions");
      } finally {
        setLoading(false);
      }
    }
    fetchPredictions();
  }, [latitude, longitude, date, soil]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">CropAdvisor</h1>
          <div className="w-10" />
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-start gap-6 pb-8 pt-6 md:py-10">
          <div className="grid gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Crop Recommendations</h2>
            <p className="text-muted-foreground">Based on your location and planting preferences</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p>{location}</p>
                </div>
                <div>
                  <h3 className="font-medium">Planting Date</h3>
                  <p>{date}</p>
                </div>
                <div>
                  <h3 className="font-medium">Soil Type</h3>
                  <p className="capitalize">{soil}</p>
                </div>
                <div>
                  <h3 className="font-medium">Climate</h3>
                  <p>{areaInfo.climate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-2">
            <h3 className="text-xl font-bold tracking-tight">Area Information</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Thermometer className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Temperature</h4>
                    <p>{areaInfo.temperature}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Droplets className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Humidity</h4>
                    <p>{areaInfo.humidity}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Sun className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Rainfall</h4>
                    <p>{areaInfo.rainfall}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="text-xl font-bold tracking-tight">Recommended Crops</h3>
            {loading ? (
              <p>Loading predictions...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {predictions.map((crop, index) => (
                  <Link
                    key={index}
                    href={`/crop/${encodeURIComponent(crop["Crop Type"])}?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}&soil=${encodeURIComponent(soil)}`}
                    className="transition-transform hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98]"
                  >
                    <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="text-lg font-semibold">{crop["Crop Type"]}</h4>
                          <Badge
                            variant={
                              crop.suitability === "Excellent"
                                ? "default"
                                : crop.suitability === "Very Good"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {crop.suitability}
                          </Badge>
                        </div>
                        <div className="mb-4 aspect-video overflow-hidden rounded-md bg-muted">
                          <Image
                            src={crop["Image Link"] || `/placeholder.svg?height=200&width=400&text=${crop["Crop Type"]}`}
                            alt={crop["Crop Type"]}
                            width={400}
                            height={200}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-2 gap-1 text-sm">
                            <span className="text-muted-foreground">Growth Period:</span>
                            <span>{crop["Growth Period"]} days</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-sm">
                            <span className="text-muted-foreground">Water Needs:</span>
                            <span>{crop["Water Needs"]} mm</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{crop.Description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
