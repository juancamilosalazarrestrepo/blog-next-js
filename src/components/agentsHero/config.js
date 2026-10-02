// Datos compartidos entre la escena 3D y el componente React del hero.
// Este archivo no importa three, para que el componente pueda usarlo sin cargar WebGL.

// Órbitas inclinadas alrededor del núcleo (radio en unidades del mundo, velocidad en rad/s).
export const HERO_ORBITS = [
  { radius: 2.3, tilt: [1.15, 0, 0.35], speed: 0.3 },
  { radius: 2.95, tilt: [1.4, 0, -0.5], speed: -0.21 },
  { radius: 3.45, tilt: [0.95, 0.5, 0.85], speed: 0.16 },
];

// Cada agente orbita el núcleo y entrega datos a un módulo de software a medida.
export const HERO_AGENTS = [
  { key: "sales", color: "#38bdf8", orbit: 0, phase: 0, module: "crm" },
  { key: "support", color: "#4ade80", orbit: 1, phase: 0.6, module: "web" },
  { key: "bookings", color: "#a78bfa", orbit: 2, phase: 2.2, module: "erp" },
  { key: "analytics", color: "#fbbf24", orbit: 0, phase: Math.PI, module: "api" },
  { key: "ops", color: "#f472b6", orbit: 1, phase: Math.PI + 0.6, module: "erp" },
];

// Módulos de software a medida, fijos alrededor del sistema.
export const HERO_MODULES = [
  { key: "crm", position: [3.4, 1.95, -1.2] },
  { key: "erp", position: [-3.6, -1.5, 0.4] },
  { key: "api", position: [3.35, -1.6, 1.0] },
  { key: "web", position: [-3.15, 2.1, -1.4] },
];

// Por debajo de este ancho el hero se apila: escena arriba, texto abajo.
export const HERO_STACK_BREAKPOINT = 900;
