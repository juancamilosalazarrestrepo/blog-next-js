// pages/api/contact.js

import nodemailer from 'nodemailer';
import { stripNewlines } from '../../../lib/sanitize';
import { checkRateLimit } from '../../../lib/rateLimit';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { success } = await checkRateLimit(req, 'contact');
    if (!success) {
        return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' });
    }

    const { name, email, message } = req.body || {};

    // Validación
    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }
    if (!email || !email.trim()) {
        return res.status(400).json({ error: 'El correo electrónico es obligatorio.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El correo electrónico no es válido.' });
    }
    if (!message || !message.trim()) {
        return res.status(400).json({ error: 'El mensaje es obligatorio.' });
    }
    // Límites de longitud (evita payloads abusivos)
    if (name.length > 200 || email.length > 320 || message.length > 5000) {
        return res.status(400).json({ error: 'Alguno de los campos excede la longitud permitida.' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('Faltan variables de entorno GMAIL_USER / GMAIL_APP_PASSWORD');
        return res.status(500).json({ error: 'El servidor de correo no está configurado.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        replyTo: email,
        to: process.env.GMAIL_USER,
        subject: `Contact form submission from ${stripNewlines(name)}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}
