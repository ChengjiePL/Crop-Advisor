"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function WeatherPage() {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    weather_variable: "temperature_2m",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          weather_variable: formData.weather_variable,
          start_date: formData.start_date,
          end_date: formData.end_date,
        }),
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data",
      );
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold tracking-tight">
            CropAdvisor Weather
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Weather Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form inputs remain the same as before */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    required
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    required
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Weather Variable</Label>
                <Select
                  value={formData.weather_variable}
                  onValueChange={(value) =>
                    setFormData({ ...formData, weather_variable: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature_2m">Temperature</SelectItem>
                    <SelectItem value="precipitation">Precipitation</SelectItem>
                    <SelectItem value="rain">Rain</SelectItem>
                    <SelectItem value="soil_moisture_0_to_1cm">
                      Soil Moisture
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Get Forecast"
                )}
              </Button>
            </form>

            {error && <p className="mt-4 text-red-500">{error}</p>}

            {weatherData && (
              <div className="mt-8 space-y-6">
                <Card>
                  <CardContent className="p-0">
                    <img
                      src={`data:image/png;base64,${weatherData.plot}`}
                      alt="Weather Plot"
                      className="w-full rounded-lg"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weather Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-auto">
                      {weatherData.data.map((entry: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 border-b"
                        >
                          <span className="text-muted-foreground">
                            {entry.date}
                          </span>
                          <span className="font-medium">
                            {entry[formData.weather_variable]?.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
