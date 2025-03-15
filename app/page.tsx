"use client"; // Next.js App Router necesita esto para ejecutar hooks en el cliente
import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redireccionar

export default function Home() {
  const [formData, setFormData] = useState({
    date: "",
    soil_type: "",
    temperature: "",
    humidity: "",
    moisture: "",
    nitrogen: "",
    potassium: "",
    phosphorus: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar datos al backend
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
          date: formData.date,
          soil_type: formData.soil_type,
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

      // Convertir los datos a string para pasarlos en la URL
      const encodedResults = encodeURIComponent(JSON.stringify(data));

      // Redirigir a la página de resultados
      router.push(`/results?data=${encodedResults}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-lg">
      <h2 className="text-3xl font-bold text-center my-6">
        Find the Perfect Crops
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label>
          Planting Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Soil Type:
          <input
            type="text"
            name="soil_type"
            value={formData.soil_type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Temperature (°C):
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
          />
        </label>
        <label>
          Humidity (%):
          <input
            type="number"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
          />
        </label>
        <label>
          Moisture:
          <input
            type="number"
            name="moisture"
            value={formData.moisture}
            onChange={handleChange}
          />
        </label>
        <label>
          Nitrogen:
          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
          />
        </label>
        <label>
          Potassium:
          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
          />
        </label>
        <label>
          Phosphorus:
          <input
            type="number"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>
    </div>
  );
}
