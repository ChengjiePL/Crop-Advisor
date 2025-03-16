"use client";
import { TbPlant } from "react-icons/tb";
import { CiCloudDrizzle } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Droplets,
  Sun,
  Thermometer,
  SproutIcon as Seedling,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResultsPage() {
  // Estado para determinar que ya estamos en el cliente
  const [mounted, setMounted] = useState(false);
  // Estado para almacenar los parámetros de búsqueda
  const [localParams, setLocalParams] = useState({
    location: "San Francisco",
    date: "2023-10-15",
    soil: "loamy",
    data: null,
  });
  // Estado para almacenar la respuesta del backend
  const [results, setResults] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    if (searchParams) {
      const location = searchParams.get("location") || "San Francisco";
      const date = searchParams.get("date") || "2023-10-15";
      const soil = searchParams.get("soil") || "loamy";
      const dataParam = searchParams.get("data");
      setLocalParams({ location, date, soil, data: dataParam });
      if (dataParam) {
        try {
          const decoded = dataParam.includes("%")
            ? decodeURIComponent(dataParam)
            : dataParam;
          setResults(JSON.parse(decoded));
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      }
    }
  }, [searchParams]);

  if (!mounted) return null;

  // Usamos los datos del backend en lugar de datos estáticos
  const weatherData = results ? results.weather_data : null;
  // cropData se extrae de las predicciones
  const cropData = results ? results.predictions : [];

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
      <section className="container mx-auto px-10 py-8 md:py-10">
          <div className="grid gap-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Crop Recommendations
            </h2>
            <p className="text-muted-foreground">
              Based on your location, planting preferences and current weather
              data
            </p>
          </div>

          {/* Información del clima proveniente del backend */}
          <div className="grid gap-2">
            {weatherData ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <Thermometer className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p>{weatherData ? weatherData.city : "N/A"}</p>
                    </div>
                  </CardContent>
                </Card>

                {weatherData.soil_type !== "" && (
                  <Card>
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-8 w-8 items-center justify-center text-primary">
                        N
                      </div>
                      <div>
                        <h4 className="font-medium">Soil Type</h4>
                        <p>{weatherData ? weatherData.soil_type : "N/A"}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <Thermometer className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Temperature</h4>
                      <p>{weatherData ? weatherData.temperature : "N/A"}°C</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <Droplets className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Humidity</h4>
                      <p>{weatherData ? weatherData.humidity : "N/A"}%</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    {/* Para moisture usamos un ícono genérico; asegúrate de tener el ícono o usa otro */}
                    <Seedling alt="Moisture" className="h-8 w-8" />
                    <div>
                      <h4 className="font-medium">Soil Moisture</h4>
                      <p>{weatherData ? weatherData.moisture : "N/A"}%</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    {/* Ícono para precipitation */}
                    <CiCloudDrizzle alt="Precipitation" className="h-8 w-8" />
                    <div>
                      <h4 className="font-medium">Precipitation</h4>
                      <p>{weatherData ? weatherData.precipitation : "N/A"}mm/m2</p>
                    </div>
                  </CardContent>
                </Card>

                {weatherData.nitrogen !== null && (
                  <Card>
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-8 w-8 items-center justify-center text-primary">
                        N
                      </div>
                      <div>
                        <h4 className="font-medium">Nitrogen</h4>
                        <p>{weatherData.nitrogen}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {weatherData.potassium !== null && (
                  <Card>
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-8 w-8 items-center justify-center text-primary">
                        K
                      </div>
                      <div>
                        <h4 className="font-medium">Potassium</h4>
                        <p>{weatherData.potassium}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {weatherData.phosphorus !== null && (
                  <Card>
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-8 w-8 items-center justify-center text-primary">
                        P
                      </div>
                      <div>
                        <h4 className="font-medium">Phosphorus</h4>
                        <p>{weatherData.phosphorus}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <p>No weather data available.</p>
            )}
          </div>

          {/* Sección de cultivos recomendados */}
          <div className="grid gap-2">
            <h3 className="text-xl font-bold tracking-tight">
              Recommended Crops
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cropData.map((crop, index) => (
                <Link
                  key={index}
                  href={`/crop/${encodeURIComponent(crop["Crop Type"])}?name=${encodeURIComponent(crop["Crop Type"])}`}
                  className="transition-transform hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98]"
                >
                  <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-semibold">
                          {crop["Crop Type"]}
                        </h4>
                        <Badge variant="default">
                          {crop["Quality"] ? crop["Quality"] : "N/A"}
                        </Badge>
                      </div>
                      <div className="mb-4 aspect-video overflow-hidden rounded-md bg-muted">
                        <Image
                          src={crop["Image Link"]}
                          alt={crop["Crop Type"]}
                          width={400}
                          height={200}
                          unoptimized
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          <span className="text-muted-foreground">
                            Growth Period:
                          </span>
                          <span>{crop["Growth Period"]} L/m²</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          <span className="text-muted-foreground">
                            Water Needs:
                          </span>
                          <span>{crop["Water Needs"]} days</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {crop.Description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
