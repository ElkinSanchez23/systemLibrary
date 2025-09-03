import { useEffect, useState } from "react";
import { listarPrestamos } from "../../services/prestamoService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./estadisticas.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Prestamo {
  id: number;
  libro: { id: number; titulo: string };
  usuario: { id: number; nombre: string; email: string };
  fechaPrestamo: string;
  fechaDevolucion: string;
}

export default function Estadisticas() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Prestamo[] = await listarPrestamos();
        setPrestamos(data);
      } catch (error) {
        console.error("Error al cargar préstamos", error);
      }
    };
    fetchData();
  }, []);

  const prestamosPorMes: Record<string, number> = {};
  prestamos.forEach((p) => {
    const mes = new Date(p.fechaPrestamo).toLocaleString("default", {
      month: "short",
    });
    prestamosPorMes[mes] = (prestamosPorMes[mes] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(prestamosPorMes),
    datasets: [
      {
        label: "Préstamos",
        data: Object.values(prestamosPorMes),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="main-content no-sidebar">
      <div className="chart-wrapper full">
        <h3 className="chart-title">Préstamos por Mes</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
}
