"use client";
import Link from "next/link";
import {
  Thermometer,
  Droplets,
  Droplet,
  Leaf,
  MapPin,
  FlaskConical,
  TestTube,
  ChevronDown,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

export default function Home() {
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
              Find the perfect crops for your location
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Enter your location and planting date to get personalized crop recommendations.
            </p>
          </div>
          <Card className="mx-auto max-w-[600px] w-full">
            <CardContent className="pt-6">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter your location"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Planting Date</Label>
                  <Input id="date" type="date" />
                </div>
                <Collapsible className="w-full mt-2">
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-2 font-medium text-sm">
                    <span>Advanced Soil Parameters (Optional)</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="soil-type">Soil Type (Optional)</Label>
                      <Select>
                        <SelectTrigger id="soil-type">
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Franco">Franco</SelectItem>
                          <SelectItem value="Rojo">Rojo</SelectItem>
                          <SelectItem value="Arcilloso">Arcilloso</SelectItem>
                          <SelectItem value="Negro">Negro</SelectItem>
                          <SelectItem value="Arenoso">Arenoso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="temperature">Temperature (in C°)</Label>
                      <div className="relative">
                        <Thermometer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="temperature"
                          placeholder="Enter temperature"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="humidity">Humidity</Label>
                      <div className="relative">
                        <Droplets className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="humidity"
                          placeholder="Enter humidity percentage"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="moisture">Moisture</Label>
                      <div className="relative">
                        <Droplet className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="moisture"
                          placeholder="Enter soil moisture level"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="nitrogen">Nitrogen</Label>
                      <div className="relative">
                        <FlaskConical className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="nitrogen"
                          placeholder="Enter nitrogen level"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="potassium">Potassium</Label>
                      <div className="relative">
                        <TestTube className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="potassium"
                          placeholder="Enter potassium level"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phosphorus">Phosphorus</Label>
                      <div className="relative">
                        <Leaf className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phosphorus"
                          placeholder="Enter phosphorus level"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h1 className="text-2xl font-bold tracking-tight">
                        CropAdvisor
                      </h1>
                      <Button variant="ghost" asChild>
                        <Link href="/weather">Weather</Link>
                      </Button>
                    </div>
                  </div>
                </header>

                <Button className="mt-2" size="lg" asChild>
                  <Link href="/results?location=San+Francisco&date=2023-10-15&soil=loamy">
                    Get Recommendations
                  </Link>
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
