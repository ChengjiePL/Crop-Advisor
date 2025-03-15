import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Droplets, Sun, Thermometer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
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
}

const cropData = [
  {
    id: "tomatoes",
    name: "Tomatoes",
    suitability: "Excellent",
    growthPeriod: "60-80 days",
    waterNeeds: "Medium",
    description: "Thrives in warm weather with well-drained soil.",
  },
  {
    id: "lettuce",
    name: "Lettuce",
    suitability: "Very Good",
    growthPeriod: "45-60 days",
    waterNeeds: "Medium-High",
    description: "Cool-season crop that grows well in spring and fall.",
  },
  {
    id: "bell-peppers",
    name: "Bell Peppers",
    suitability: "Good",
    growthPeriod: "60-90 days",
    waterNeeds: "Medium",
    description: "Requires warm temperatures and full sun exposure.",
  },
  {
    id: "carrots",
    name: "Carrots",
    suitability: "Good",
    growthPeriod: "70-80 days",
    waterNeeds: "Medium",
    description: "Grows best in loose, sandy soil free from rocks.",
  },
  {
    id: "zucchini",
    name: "Zucchini",
    suitability: "Excellent",
    growthPeriod: "45-55 days",
    waterNeeds: "Medium",
    description: "Fast-growing summer squash that produces abundantly.",
  },
  {
    id: "basil",
    name: "Basil",
    suitability: "Very Good",
    growthPeriod: "50-75 days",
    waterNeeds: "Medium",
    description: "Aromatic herb that pairs well with tomatoes in the garden.",
  },
]

export default function ResultsPage({ searchParams }) {
  // In a real app, we would fetch this data based on the searchParams
  const location = searchParams.location || "San Francisco"
  const date = searchParams.date || "2023-10-15"
  const soil = searchParams.soil || "loamy"

  // Get area info based on location
  const areaInfo = areaInfoData[location] || areaInfoData.default

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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cropData.map((crop) => (
                <Link
                  key={crop.id}
                  href={`/crop/${crop.id}?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}&soil=${encodeURIComponent(soil)}`}
                  className="transition-transform hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98]"
                >
                  <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-semibold">{crop.name}</h4>
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
                          src={`/placeholder.svg?height=200&width=400&text=${crop.name}`}
                          alt={crop.name}
                          width={400}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          <span className="text-muted-foreground">Growth Period:</span>
                          <span>{crop.growthPeriod}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          <span className="text-muted-foreground">Water Needs:</span>
                          <span>{crop.waterNeeds}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{crop.description}</p>
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
  )
}

