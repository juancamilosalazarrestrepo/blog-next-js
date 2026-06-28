// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import db from "../../../../lib/firebase.js"
import { isValidSlug } from "../../../../lib/validSlugs.js"

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
        const docRef = db.collection("views").doc(slug);
        const document = await docRef.get();

        if (!document.data()?.value) {
            await docRef.set({ value: 1 });
        } else {
            await db.runTransaction(async (transaction) => {
                return transaction.get(docRef).then((doc) => {
                    transaction.update(docRef, {
                        value: Number(doc.data()?.value || 0) + 1,
                    })
                })
            })
        }

        const getCurrentViews = (await docRef.get()).data()


        return res.status(200).json({ total:getCurrentViews?.value })
    }


    if (req.method === "GET") {
        const snapshot = await db.collection("views").doc(slug).get();

        const views = snapshot.data()?.value;

        return res.status(200).json({ total: views || 0 })
    }

    return res.status(400).send("Method no allowed")
}

