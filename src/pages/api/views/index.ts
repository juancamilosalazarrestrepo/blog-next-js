// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'

import db from "../../../../lib/firebase.js"
// @ts-ignore - módulo JS sin tipos
import { checkRateLimit } from "../../../../lib/rateLimit.js"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Este endpoint lee la colección completa: rate limit + cache para contener costos de Firestore.
  const { success } = await checkRateLimit(req, "views-index");
  if (!success) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const snapshot = (await db.collection("views").get()).docs
  const views = snapshot.map((snap: QueryDocumentSnapshot) => {
    return snap.data().value;
  })

  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");

  if(!views.length){
    return res.status(200).json({
        total:0,
    })
  }

  return res.status(200).json({
    total: views.reduce((a: number, b: number)=>{
        return a+b;
    }),
  })
}
