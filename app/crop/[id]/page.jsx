"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, Droplets, SproutIcon as Seedling, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CropDetailsPage() {
  // Usamos el hook useParams para obtener los parámetros de la ruta
  const params = useParams();
  const searchParams = useSearchParams();
  const cropName = params?.id; // Se obtiene el nombre del cultivo

  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para almacenar los textos obtenidos de /text
  const [growingGuideText, setGrowingGuideText] = useState("");
  const [commonProblemsText, setCommonProblemsText] = useState("");
  const [culinaryUsesText, setCulinaryUsesText] = useState("");

  // Parámetros para la navegación de regreso a resultados
  const location = searchParams.get("location") || "San Francisco";
  const date = searchParams.get("date") || "2023-10-15";
  const soil = searchParams.get("soil") || "loamy";

  // Función para hacer fetch a /text con el crop name y la categoría (1, 2 o 3)
  async function fetchTextData(crop, category) {
    try {
      const response = await fetch("http://localhost:5000/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, category })
      });
      const data = await response.json();
      return data.text; // Se asume que la API retorna el texto en la propiedad "text"
    } catch (error) {
      console.error("Error fetching text data:", error);
      return "";
    }
  }

  useEffect(() => {
    async function fetchCropDetails() {
      try {
        const response = await fetch("http://localhost:5000/crop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ crop: cropName })
        });
        const data = await response.json();
        // Mapear la respuesta de la API (formato JSON) a los campos que usa la UI
        // Dentro del useEffect, mapea el campo "Image Link"
        const mappedData = {
          name: data["Crop Type"] || cropName,
          scientificName: data["Scientific Name"] || "",
          description: data["Description"] || "",
          sunlight: data["Sunlight"] || "N/A",
          waterNeeds: data["Water Needs"] || "N/A",
          growthPeriod: data["Growth Period"] || "N/A",
          soilPreference: data["Soil Type"] || "N/A",
          plantingInstructions: data["Planting Instructions"] || "N/A",
          phosphorous: data["Phosphorous"] || "N/A",
          humidity: data["Humidity"] || "N/A",
          temperature: data["Temparature"] || "N/A",
          moisture: data["Moisture"] || "N/A",
          nitrogen: data["Nitrogen"] || "N/A",
          potassium: data["Potassium"] || "N/A",
          imageLink: data["Image Link"]
        };

        setCropDetails(mappedData);

        // Realizar fetch a /text para cada categoría y asignar el resultado al estado correspondiente
        const growingGuide = await fetchTextData(cropName, 1);
        setGrowingGuideText(growingGuide);

        const commonProblems = await fetchTextData(cropName, 2);
        setCommonProblemsText(commonProblems);

        const culinaryUses = await fetchTextData(cropName, 3);
        setCulinaryUsesText(culinaryUses);
      } catch (error) {
        console.error("Error fetching crop details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (cropName) {
      fetchCropDetails();
    }
  }, [cropName]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!cropDetails) {
    return <div>Error: No se encontraron detalles para este cultivo.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link
              href={`/results?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}&soil=${encodeURIComponent(soil)}`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Results</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">CropAdvisor</h1>
          <div className="w-10" />
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-12xl px-4">
        <section className="container grid items-start gap-6 pb-8 pt-6 md:py-10">
          <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
            <div>
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={cropDetails.imageLink}
                  alt={cropDetails.name}
                  width={500}
                  height={500}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{cropDetails.name}</h2>
                <Badge
                  variant={
                    cropDetails.suitability === "Excellent"
                      ? "default"
                      : cropDetails.suitability === "Very Good"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-sm"
                >
                </Badge>
              </div>
              <p className="text-muted-foreground italic">{cropDetails.scientificName}</p>
              <p className="text-base/relaxed">{cropDetails.description}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Droplets className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Water Needs</h4>
                      <p className="text-sm">{cropDetails.waterNeeds} L/m²</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Growth Period</h4>
                      <p className="text-sm">{cropDetails.growthPeriod} days</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Seedling className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Soil Preference</h4>
                      <p className="text-sm">{cropDetails.soilPreference}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Seedling className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Humidity Preference</h4>
                      <p className="text-sm">{cropDetails.humidity} %</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Seedling className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Temperature Preference</h4>
                      <p className="text-sm">{cropDetails.temperature} ºC</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Seedling className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Moisture Preference</h4>
                      <p className="text-sm">{cropDetails.moisture} %</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Seedling className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Potassium Preference</h4>
                      <p className="text-sm">{cropDetails.potassium} kg/ha</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Seedling className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Nitrogen Preference</h4>
                      <p className="text-sm">{cropDetails.nitrogen} kg/ha</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Seedling className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Phosphorous Preference</h4>
                      <p className="text-sm">{cropDetails.phosphorous} kg/ha</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <Tabs defaultValue="growing" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="growing">Growing Guide</TabsTrigger>
              <TabsTrigger value="problems">Common Problems</TabsTrigger>
              <TabsTrigger value="culinary">Culinary Uses</TabsTrigger>
            </TabsList>
            <TabsContent value="growing" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Growing Guide</CardTitle>
                  <CardDescription>
                    Everything you need to know about growing {cropDetails.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <p>{growingGuideText}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="problems" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Common Problems</CardTitle>
                  <CardDescription>
                    Issues you might encounter when growing {cropDetails.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{commonProblemsText}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="culinary" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Culinary Information</CardTitle>
                  <CardDescription>
                    Nutritional value and culinary uses for {cropDetails.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <p>{culinaryUsesText}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
