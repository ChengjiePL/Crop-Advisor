"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Thermometer,
  Droplets,
  MapPin,
  FlaskConical,
  TestTube,
  ChevronDown,
  Sprout,
  Sun,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Home() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    soil_type: "",
    temperature: "",
    humidity: "",
    moisture: "",
    nitrogen: "",
    potassium: "",
    phosphorus: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: 26.244159,
          longitude: -98.245178,
          ...formData,
          temperature: formData.temperature
            ? Number.parseFloat(formData.temperature)
            : null,
          humidity: formData.humidity
            ? Number.parseFloat(formData.humidity)
            : null,
          moisture: formData.moisture
            ? Number.parseFloat(formData.moisture)
            : null,
          nitrogen: formData.nitrogen
            ? Number.parseFloat(formData.nitrogen)
            : null,
          potassium: formData.potassium
            ? Number.parseFloat(formData.potassium)
            : null,
          phosphorus: formData.phosphorus
            ? Number.parseFloat(formData.phosphorus)
            : null,
        }),
      });

      const data = await response.json();
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-center">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-heading font-semibold tracking-tight text-soil-dark">
              CropAdvisor
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-8 pb-12 pt-10 md:py-14">
          <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Smart Farming Solutions
            </div>
            <h2 className="text-3xl font-heading font-medium tracking-tight sm:text-4xl md:text-5xl text-soil-dark">
              Find the Perfect Crops for Your Land
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Enter your location and planting date to get personalized crop
              recommendations tailored to your specific conditions.
            </p>
          </div>

          <Card className="mx-auto max-w-[650px] w-full border border-primary/10 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-3">
                  <Label
                    htmlFor="location"
                    className="text-soil-dark font-medium"
                  >
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      className="pl-10 border-primary/20 focus-visible:ring-primary"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="date" className="text-soil-dark font-medium">
                    Planting Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="border-primary/20 focus-visible:ring-primary"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <Collapsible className="w-full mt-2">
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-primary/20 px-4 py-3 font-medium text-sm hover:bg-primary/5">
                    <span className="flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-primary" />
                      Advanced Soil Parameters
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-5 pt-2 px-1">
                    {/* Soil Type */}
                    <div className="grid gap-2">
                      <Label className="text-soil-dark font-medium">
                        Soil Type
                      </Label>
                      <Select
                        value={formData.soil_type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, soil_type: value })
                        }
                      >
                        <SelectTrigger className="border-primary/20 focus-visible:ring-primary">
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Franco">Franco</SelectItem>
                          <SelectItem value="Arcilloso">Arcilloso</SelectItem>
                          <SelectItem value="Arenoso">Arenoso</SelectItem>
                          <SelectItem value="Rojo">Rojo</SelectItem>
                          <SelectItem value="Negro">Negro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Advanced Parameters */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label className="text-soil-dark font-medium flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-primary" />
                          Temperature (°C)
                        </Label>
                        <Input
                          type="number"
                          name="temperature"
                          placeholder="Enter temperature"
                          className="border-primary/20 focus-visible:ring-primary"
                          value={formData.temperature}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              temperature: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-soil-dark font-medium flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          Humidity (%)
                        </Label>
                        <Input
                          type="number"
                          name="humidity"
                          placeholder="Enter humidity"
                          className="border-primary/20 focus-visible:ring-primary"
                          value={formData.humidity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              humidity: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-soil-dark font-medium flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          Soil Moisture (%)
                        </Label>
                        <Input
                          type="number"
                          name="moisture"
                          placeholder="Enter soil moisture"
                          className="border-primary/20 focus-visible:ring-primary"
                          value={formData.moisture}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              moisture: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-soil-dark font-medium flex items-center gap-2">
                          <TestTube className="h-4 w-4 text-primary" />
                          Nitrogen (kg/ha)
                        </Label>
                        <Input
                          type="number"
                          name="nitrogen"
                          placeholder="Enter nitrogen level"
                          className="border-primary/20 focus-visible:ring-primary"
                          value={formData.nitrogen}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nitrogen: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-soil-dark font-medium flex items-center gap-2">
                          <TestTube className="h-4 w-4 text-primary" />
                          Potassium (kg/ha)
                        </Label>
                        <Input
                          type="number"
                          name="potassium"
                          placeholder="Enter potassium level"
                          className="border-primary/20 focus-visible:ring-primary"
                          value={formData.potassium}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              potassium: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label className="text-soil-dark font-medium flex items-center gap-2">
                          <TestTube className="h-4 w-4 text-primary" />
                          Phosphorus (kg/ha)
                        </Label>
                        <Input
                          type="number"
                          name="phosphorus"
                          placeholder="Enter phosphorus level"
                          className="border-primary/20 focus-visible:ring-primary"
                          value={formData.phosphorus}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phosphorus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Button
                  type="submit"
                  className="mt-2 bg-primary hover:bg-primary/90 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Recommendations...
                    </>
                  ) : (
                    <>
                      <Sprout className="mr-2 h-5 w-5" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mx-auto max-w-[900px] w-full mt-8">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border border-primary/10 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sun className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-medium text-soil-dark mb-2">
                    Weather Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Get detailed weather forecasts to plan your planting
                    schedule effectively.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-primary/10 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-medium text-soil-dark mb-2">
                    Crop Recommendations
                  </h3>
                  <p className="text-muted-foreground">
                    Receive personalized crop suggestions based on your specific
                    conditions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-primary/10 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Droplets className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-medium text-soil-dark mb-2">
                    Soil Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Understand your soil conditions and optimize your growing
                    environment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-soil-dark">
              CropAdvisor
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 CropAdvisor. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
