import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Limita peticiones por IP usando Upstash Redis.
// Si las variables de entorno no están configuradas, no se aplica límite
// (útil en desarrollo local), pero se registra una advertencia.

let ratelimit = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // 5 envíos por minuto y por IP.
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
    prefix: "ratelimit:forms",
  });
} else {
  console.warn(
    "[rateLimit] UPSTASH_REDIS_REST_URL/TOKEN no configurados: rate limiting deshabilitado."
  );
}

// Obtiene la IP real del cliente respetando los headers de proxy de Vercel.
export function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

// Devuelve { success: true } si se permite la petición.
// Si Upstash no está configurado, permite siempre (fail-open en dev).
export async function checkRateLimit(req, identifierSuffix = "") {
  if (!ratelimit) return { success: true };
  const ip = getClientIp(req);
  const { success, limit, remaining, reset } = await ratelimit.limit(
    `${ip}${identifierSuffix ? ":" + identifierSuffix : ""}`
  );
  return { success, limit, remaining, reset };
}
