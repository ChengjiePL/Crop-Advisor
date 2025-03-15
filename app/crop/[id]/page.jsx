import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Droplets, SproutIcon as Seedling, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Detailed crop data
const cropDetailsData = {
  tomatoes: {
    name: "Tomatoes",
    scientificName: "Solanum lycopersicum",
    suitability: "Excellent",
    growthPeriod: "60-80 days",
    waterNeeds: "Medium",
    sunlight: "Full sun (6-8 hours daily)",
    soilPreference: "Well-drained, slightly acidic soil (pH 6.0-6.8)",
    description:
      "Tomatoes are warm-season plants that thrive in well-drained soil with consistent moisture. They are one of the most popular garden vegetables due to their versatility and flavor.",
    plantingInstructions:
      "Plant seedlings after the last frost when soil temperatures reach at least 60°F (16°C). Space plants 18-36 inches apart depending on variety. Provide support with cages or stakes for indeterminate varieties.",
    careInstructions:
      "Water deeply and consistently, about 1-2 inches per week. Mulch to retain moisture and prevent soil-borne diseases. Prune suckers for indeterminate varieties to improve air circulation and fruit production.",
    harvestingTips:
      "Harvest when fruits are firm and fully colored. For best flavor, pick tomatoes in the morning when temperatures are cooler. Gently twist or cut fruits from the vine.",
    commonProblems: [
      "Blossom end rot (calcium deficiency)",
      "Early blight (fungal disease)",
      "Tomato hornworms (insect pests)",
      "Cracking (inconsistent watering)",
    ],
    companionPlants: [
      "Basil (repels pests, improves flavor)",
      "Marigolds (repel nematodes)",
      "Carrots (share space efficiently)",
      "Garlic (repels spider mites)",
    ],
    avoidPlanting: [
      "Potatoes (share diseases)",
      "Corn (attracts same pests)",
      "Fennel (inhibits growth)",
      "Brassicas like cabbage and broccoli (compete for nutrients)",
    ],
    nutritionalValue:
      "Rich in vitamins A and C, potassium, and the antioxidant lycopene. Low in calories and carbohydrates.",
    culinaryUses: "Fresh eating, sauces, salads, soups, stews, roasting, canning, and preserving.",
  },
  lettuce: {
    name: "Lettuce",
    scientificName: "Lactuca sativa",
    suitability: "Very Good",
    growthPeriod: "45-60 days",
    waterNeeds: "Medium-High",
    sunlight: "Partial sun to full sun (4-6 hours daily)",
    soilPreference: "Rich, well-drained soil with high organic matter (pH 6.0-7.0)",
    description:
      "Lettuce is a cool-season crop that grows quickly and provides fresh greens for salads and sandwiches. It comes in many varieties including loose-leaf, butterhead, romaine, and crisphead types.",
    plantingInstructions:
      "Sow seeds directly in the garden as soon as soil can be worked in spring. Plant seeds 1/4 inch deep and thin seedlings to appropriate spacing (8-12 inches for heading varieties, 4-6 inches for leaf varieties).",
    careInstructions:
      "Keep soil consistently moist but not waterlogged. Mulch to keep soil cool and retain moisture. Provide afternoon shade in hot weather to prevent bolting.",
    harvestingTips:
      "Harvest in the morning when leaves are crisp. For loose-leaf varieties, pick outer leaves as needed. For heading varieties, harvest the entire plant when the head is firm.",
    commonProblems: [
      "Bolting (premature flowering due to heat)",
      "Aphids (insect pests)",
      "Slugs and snails (especially in wet conditions)",
      "Tip burn (calcium deficiency)",
    ],
    companionPlants: [
      "Radishes (mark rows and mature quickly)",
      "Carrots (share space efficiently)",
      "Onions (deter pests)",
      "Strawberries (ground cover relationship)",
    ],
    avoidPlanting: ["Broccoli (competes for nutrients)", "Sunflowers (inhibit growth)", "Celery (attract same pests)"],
    nutritionalValue: "Good source of vitamins A, K, and folate. Contains fiber and is low in calories.",
    culinaryUses: "Salads, sandwiches, wraps, garnishes, and as a bed for other foods.",
  },
  "bell-peppers": {
    name: "Bell Peppers",
    scientificName: "Capsicum annuum",
    suitability: "Good",
    growthPeriod: "60-90 days",
    waterNeeds: "Medium",
    sunlight: "Full sun (6-8 hours daily)",
    soilPreference: "Well-drained, fertile soil rich in organic matter (pH 6.0-6.8)",
    description:
      "Bell peppers are warm-season vegetables that come in various colors including green, red, yellow, orange, and purple. They are sweet rather than hot and are valued for their crisp texture and versatility.",
    plantingInstructions:
      "Start seeds indoors 8-10 weeks before last frost or purchase seedlings. Transplant after danger of frost when soil temperatures reach at least 65°F (18°C). Space plants 18-24 inches apart.",
    careInstructions:
      "Water consistently, providing 1-2 inches per week. Mulch to retain moisture and suppress weeds. Support plants with stakes or cages if needed, especially when bearing fruit.",
    harvestingTips:
      "Harvest when peppers reach full size and desired color. Green peppers will eventually ripen to red, yellow, or orange depending on variety. Cut peppers from the plant with scissors or pruners to avoid damaging the plant.",
    commonProblems: [
      "Blossom end rot (calcium deficiency)",
      "Aphids (insect pests)",
      "Sunscald (excessive sun exposure)",
      "Bacterial leaf spot (disease)",
    ],
    companionPlants: [
      "Basil (improves flavor and growth)",
      "Onions (deter pests)",
      "Spinach (ground cover relationship)",
      "Tomatoes (share growing conditions)",
    ],
    avoidPlanting: [
      "Fennel (inhibits growth)",
      "Beans (compete for nutrients)",
      "Brassicas like cabbage and broccoli (compete for nutrients)",
    ],
    nutritionalValue: "Excellent source of vitamins C and A. Contains antioxidants and is low in calories.",
    culinaryUses: "Raw in salads, stuffed, roasted, grilled, sautéed, and used in a wide variety of dishes.",
  },
  carrots: {
    name: "Carrots",
    scientificName: "Daucus carota",
    suitability: "Good",
    growthPeriod: "70-80 days",
    waterNeeds: "Medium",
    sunlight: "Full sun to partial shade (4-6 hours daily)",
    soilPreference: "Loose, sandy soil free from rocks and clods (pH 6.0-6.8)",
    description:
      "Carrots are cool-season root vegetables known for their sweet flavor and nutritional value. They come in various colors including orange, purple, red, white, and yellow.",
    plantingInstructions:
      "Sow seeds directly in the garden 2-3 weeks before last frost. Plant seeds 1/4 inch deep and thin seedlings to 2-3 inches apart. Keep soil consistently moist until germination.",
    careInstructions:
      "Water regularly, providing about 1 inch per week. Thin seedlings to prevent crowding. Mulch to retain moisture, keep soil cool, and prevent green shoulders (exposure to sun).",
    harvestingTips:
      "Harvest when roots reach desired size, typically when the top of the root is 3/4 to 1 inch in diameter. Loosen soil with a garden fork before pulling to avoid breaking the carrot.",
    commonProblems: [
      "Forking (caused by rocks or heavy soil)",
      "Carrot rust fly (insect pest)",
      "Alternaria leaf blight (fungal disease)",
      "Cracking (inconsistent watering)",
    ],
    companionPlants: [
      "Onions (deter carrot rust fly)",
      "Rosemary (repels carrot fly)",
      "Lettuce (shares space efficiently)",
      "Tomatoes (provide shade in hot weather)",
    ],
    avoidPlanting: [
      "Dill (inhibits growth)",
      "Parsnips (compete for nutrients and attract same pests)",
      "Coriander/Cilantro (can cross-pollinate)",
    ],
    nutritionalValue: "Rich in beta-carotene (vitamin A), fiber, vitamin K, potassium, and antioxidants.",
    culinaryUses: "Raw snacking, salads, soups, stews, roasting, juicing, and baking.",
  },
  zucchini: {
    name: "Zucchini",
    scientificName: "Cucurbita pepo",
    suitability: "Excellent",
    growthPeriod: "45-55 days",
    waterNeeds: "Medium",
    sunlight: "Full sun (6-8 hours daily)",
    soilPreference: "Rich, well-drained soil with high organic matter (pH 6.0-7.5)",
    description:
      "Zucchini is a summer squash that grows on bushy plants. It's known for its prolific production and versatility in the kitchen. The dark green fruits grow quickly and can be harvested when small for the best flavor.",
    plantingInstructions:
      "Sow seeds directly in the garden after all danger of frost has passed and soil temperatures reach at least 60°F (16°C). Plant seeds 1 inch deep in hills or rows, with 2-3 feet between plants.",
    careInstructions:
      "Water deeply and consistently, providing 1-2 inches per week. Mulch to retain moisture and suppress weeds. Watch for powdery mildew in humid conditions.",
    harvestingTips:
      "Harvest when fruits are 6-8 inches long for best flavor and texture. Check plants daily during peak season as zucchini grow rapidly. Use a knife to cut fruits from the plant, leaving a short stem attached.",
    commonProblems: [
      "Powdery mildew (fungal disease)",
      "Squash vine borers (insect pests)",
      "Blossom end rot (calcium deficiency)",
      "Cucumber beetles (insect pests)",
    ],
    companionPlants: [
      "Nasturtiums (trap crop for aphids)",
      "Marigolds (repel pests)",
      "Beans (fix nitrogen in soil)",
      "Mint (deters squash bugs)",
    ],
    avoidPlanting: ["Potatoes (compete for nutrients)", "Other squash varieties (cross-pollination and shared pests)"],
    nutritionalValue: "Good source of vitamins A and C, potassium, and manganese. Low in calories and carbohydrates.",
    culinaryUses:
      "Grilling, sautéing, roasting, stuffing, baking in breads and muffins, spiralizing as noodles, and pickling.",
  },
  basil: {
    name: "Basil",
    scientificName: "Ocimum basilicum",
    suitability: "Very Good",
    growthPeriod: "50-75 days",
    waterNeeds: "Medium",
    sunlight: "Full sun (6-8 hours daily)",
    soilPreference: "Rich, well-drained soil (pH 6.0-7.0)",
    description:
      "Basil is an aromatic annual herb in the mint family, prized for its flavorful leaves. It comes in many varieties with different flavors, including sweet basil, Thai basil, lemon basil, and purple basil.",
    plantingInstructions:
      "Start seeds indoors 6-8 weeks before last frost or sow directly in the garden after all danger of frost has passed. Plant seeds 1/4 inch deep and thin seedlings to 6-12 inches apart depending on variety.",
    careInstructions:
      "Water regularly, keeping soil consistently moist but not waterlogged. Pinch off flower buds as they appear to encourage leaf production and prevent the plant from becoming woody.",
    harvestingTips:
      "Begin harvesting when plants have several sets of leaves. Pinch off leaves from the top to encourage bushier growth. Harvest in the morning when oil content is highest for best flavor.",
    commonProblems: [
      "Downy mildew (fungal disease)",
      "Aphids (insect pests)",
      "Japanese beetles (insect pests)",
      "Fusarium wilt (fungal disease)",
    ],
    companionPlants: [
      "Tomatoes (improves flavor and growth, repels pests)",
      "Peppers (improves growth and flavor)",
      "Asparagus (repels asparagus beetles)",
      "Marigolds (repel nematodes)",
    ],
    avoidPlanting: ["Rue (inhibits growth)", "Sage (competes for resources)"],
    nutritionalValue: "Contains vitamin K, vitamin A, manganese, and antioxidants. Has anti-inflammatory properties.",
    culinaryUses:
      "Fresh in salads, pesto, pasta dishes, pizza, tomato dishes, infused oils and vinegars, and as a garnish.",
  },
  default: {
    name: "Unknown Crop",
    scientificName: "Not available",
    suitability: "Unknown",
    growthPeriod: "Not available",
    waterNeeds: "Not available",
    sunlight: "Not available",
    soilPreference: "Not available",
    description: "Information about this crop is not available.",
    plantingInstructions: "Not available",
    careInstructions: "Not available",
    harvestingTips: "Not available",
    commonProblems: [],
    companionPlants: [],
    avoidPlanting: [],
    nutritionalValue: "Not available",
    culinaryUses: "Not available",
  },
}

export default function CropDetailsPage({ params, searchParams }) {
  const cropId = params.id
  const cropDetails = cropDetailsData[cropId] || cropDetailsData.default

  // Get search params for navigation back to results
  const location = searchParams.location || "San Francisco"
  const date = searchParams.date || "2023-10-15"
  const soil = searchParams.soil || "loamy"

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
      <main className="flex-1">
        <section className="container grid items-start gap-6 pb-8 pt-6 md:py-10">
          <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
            <div>
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={`/placeholder.svg?height=500&width=500&text=${cropDetails.name}`}
                  alt={cropDetails.name}
                  width={500}
                  height={500}
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
                  {cropDetails.suitability} Match
                </Badge>
              </div>
              <p className="text-muted-foreground italic">{cropDetails.scientificName}</p>
              <p className="text-base/relaxed">{cropDetails.description}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Sun className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Sunlight</h4>
                      <p className="text-sm">{cropDetails.sunlight}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Droplets className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Water Needs</h4>
                      <p className="text-sm">{cropDetails.waterNeeds}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Growth Period</h4>
                      <p className="text-sm">{cropDetails.growthPeriod}</p>
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
              </div>
            </div>
          </div>

          <Tabs defaultValue="growing" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="growing">Growing Guide</TabsTrigger>
              <TabsTrigger value="problems">Common Problems</TabsTrigger>
              <TabsTrigger value="companions">Companion Plants</TabsTrigger>
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
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Planting Instructions</h3>
                    <p>{cropDetails.plantingInstructions}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Care Instructions</h3>
                    <p>{cropDetails.careInstructions}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Harvesting Tips</h3>
                    <p>{cropDetails.harvestingTips}</p>
                  </div>
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
                  {cropDetails.commonProblems.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {cropDetails.commonProblems.map((problem, index) => (
                        <li key={index}>{problem}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No common problems listed for this crop.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="companions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Companion Planting</CardTitle>
                  <CardDescription>
                    Plants that grow well with {cropDetails.name.toLowerCase()} and those to avoid
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Good Companions</h3>
                    {cropDetails.companionPlants.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {cropDetails.companionPlants.map((plant, index) => (
                          <li key={index}>{plant}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No companion plants listed for this crop.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Plants to Avoid</h3>
                    {cropDetails.avoidPlanting.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {cropDetails.avoidPlanting.map((plant, index) => (
                          <li key={index}>{plant}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No plants to avoid listed for this crop.</p>
                    )}
                  </div>
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
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Nutritional Value</h3>
                    <p>{cropDetails.nutritionalValue}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Culinary Uses</h3>
                    <p>{cropDetails.culinaryUses}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}

