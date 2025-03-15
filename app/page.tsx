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
import { Loader2 } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    date: "",
    soil_type: "None",
    temperature: "",
    humidity: "",
    moisture: "",
    nitrogen: "",
    potassium: "",
    phosphorus: "",
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
            ? parseFloat(formData.temperature)
            : null,
          humidity: formData.humidity ? parseFloat(formData.humidity) : null,
          moisture: formData.moisture ? parseFloat(formData.moisture) : null,
          nitrogen: formData.nitrogen ? parseFloat(formData.nitrogen) : null,
          potassium: formData.potassium ? parseFloat(formData.potassium) : null,
          phosphorus: formData.phosphorus
            ? parseFloat(formData.phosphorus)
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
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center">
          <h1 className="text-2xl font-bold tracking-tight">CropAdvisor</h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mx-auto flex max-w-[600px] flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Find the Perfect Crops
            </h2>
          </div>

          <Card className="mx-auto max-w-[600px] w-full">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* Planting Date */}
                <div className="grid gap-2">
                  <Label>Planting Date</Label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Soil Type */}
                <div className="grid gap-2">
                  <Label>Soil Type</Label>
                  <Select
                    value={formData.soil_type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, soil_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Franco">Franco</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Arcilloso">Arcilloso</SelectItem>
                      <SelectItem value="Arenoso">Arenoso</SelectItem>
                      <SelectItem value="Rojo">Rojo</SelectItem>
                      <SelectItem value="Negro">Negro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Advanced Parameters */}
                <div className="grid gap-4">
                  {[
                    "temperature",
                    "humidity",
                    "moisture",
                    "nitrogen",
                    "potassium",
                    "phosphorus",
                  ].map((field) => (
                    <div key={field} className="grid gap-2">
                      <Label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                      <Input
                        type="number"
                        name={field}
                        placeholder={`Enter ${field}`}
                        value={formData[field]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Get Recommendations
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
