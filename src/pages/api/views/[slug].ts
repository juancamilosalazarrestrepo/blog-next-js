// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Transaction, DocumentReference } from 'firebase-admin/firestore'

import db from "../../../../lib/firebase.js"
import { isValidSlug } from "../../../../lib/validSlugs.js"
// @ts-ignore - módulo JS sin tipos
import { checkRateLimit } from "../../../../lib/rateLimit.js"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const slug = req.query.slug as string;

    // Solo se permiten slugs de posts existentes para evitar escritura arbitraria en Firestore.
    if (!isValidSlug(slug)) {
        return res.status(404).json({ error: "Not found" });
    }

    if (req.method === "POST") {
        // Limita la inflación artificial de contadores de vistas.
        const { success } = await checkRateLimit(req, "views-post");
        if (!success) {
            return res.status(429).json({ error: "Too many requests" });
        }
        const docRef: DocumentReference = db.collection("views").doc(slug);
        const document = await docRef.get();

        if (!document.data()?.value) {
            await docRef.set({ value: 1 });
        } else {
            await db.runTransaction(async (transaction: Transaction) => {
                const doc = await transaction.get(docRef);
                transaction.update(docRef, {
                    value: Number(doc.data()?.value || 0) + 1,
                })
            })
        }

        const getCurrentViews = (await docRef.get()).data()


        return res.status(200).json({ total:getCurrentViews?.value })
    }


    if (req.method === "GET") {
        const snapshot = await db.collection("views").doc(slug).get();

        const views = snapshot.data()?.value;

        // El CDN de Vercel absorbe el tráfico y reduce lecturas de Firestore.
        res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
        return res.status(200).json({ total: views || 0 })
    }

    return res.status(400).send("Method no allowed")
}

