import nodemailer from 'nodemailer';
import { escapeHtml, stripNewlines } from '../../../lib/sanitize';
import { checkRateLimit } from '../../../lib/rateLimit';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { success } = await checkRateLimit(req, 'hoteles');
    if (!success) {
        return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' });
    }

    const { hotel, name, email, whatsapp, rooms, pms, challenge } = req.body || {};

    // Obligatorios: hotel, nombre y correo. El resto es opcional para no subir la fricción.
    if (!hotel || !hotel.trim()) {
        return res.status(400).json({ error: 'El nombre del hotel es obligatorio.' });
    }

    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Tu nombre es obligatorio.' });
    }

    if (!email || !email.trim()) {
        return res.status(400).json({ error: 'El correo electrónico es obligatorio.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El correo electrónico no es válido.' });
    }

    // Límites de longitud (evita payloads abusivos)
    if (hotel.length > 200 || name.length > 200 || email.length > 320 ||
        (whatsapp && whatsapp.length > 40) || (rooms && rooms.length > 50) ||
        (pms && pms.length > 200) || (challenge && challenge.length > 5000)) {
        return res.status(400).json({ error: 'Alguno de los campos excede la longitud permitida.' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('Faltan variables de entorno GMAIL_USER / GMAIL_APP_PASSWORD');
        return res.status(500).json({ error: 'El servidor de correo no está configurado.' });
    }

    // Versiones escapadas para interpolar de forma segura en el HTML/subject
    const safeHotel = escapeHtml(hotel);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeWhatsapp = escapeHtml(whatsapp);
    const safeRooms = escapeHtml(rooms);
    const safePms = escapeHtml(pms);
    const safeChallenge = escapeHtml(challenge);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const emptyTag = '<span style="color:#555;">No proporcionado</span>';

    // Cada dato del lead se pinta como una tarjeta con su color de acento.
    const field = (label, value, accent) => `
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                                    <tr>
                                        <td style="padding:16px 20px; background-color:#1a1a2e; border-radius:10px; border-left:4px solid ${accent};">
                                            <p style="margin:0 0 4px; color:#8b8ba3; font-size:12px; text-transform:uppercase; letter-spacing:1px;">${label}</p>
                                            <p style="margin:0; color:#e2e2f0; font-size:16px; font-weight:600; line-height:1.6;">${value}</p>
                                        </td>
                                    </tr>
                                </table>`;

    const htmlBody = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background-color:#0a0a0f; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f; padding:40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111118; border-radius:16px; overflow:hidden; border:1px solid #1e1e2e;">
                        <!-- Header -->
                        <tr>
                            <td style="background:linear-gradient(135deg,#0f766e,#0284c7); padding:32px 40px;">
                                <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700;">
                                    🏨 Nuevo Lead — Agentes IA para Hoteles
                                </h1>
                                <p style="margin:8px 0 0; color:#a5f3fc; font-size:14px;">
                                    Recibido el ${new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:32px 40px;">
${field('Hotel', safeHotel, '#0d9488')}
${field('Persona de contacto', safeName, '#0284c7')}
${field('Correo electrónico', `<a href="mailto:${safeEmail}" style="color:#60a5fa; text-decoration:none;">${safeEmail}</a>`, '#2563eb')}
${field('WhatsApp', whatsapp ? `<a href="https://wa.me/${encodeURIComponent(stripNewlines(whatsapp).replace(/[^\d]/g, ''))}" style="color:#4ade80; text-decoration:none;">${safeWhatsapp}</a>` : emptyTag, '#25D366')}
${field('Número de habitaciones', rooms ? safeRooms : emptyTag, '#f59e0b')}
${field('PMS / Channel manager actual', pms ? safePms : emptyTag, '#a855f7')}
${field('Reto principal', challenge ? safeChallenge : emptyTag, '#ef4444')}
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding:20px 40px 28px; border-top:1px solid #1e1e2e;">
                                <p style="margin:0; color:#555; font-size:12px; text-align:center;">
                                    Enviado desde el formulario de /agentes-ia-hoteles.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        replyTo: email,
        to: process.env.GMAIL_USER,
        subject: `[Hoteles] 🏨 ${stripNewlines(hotel)} — ${stripNewlines(name)}`,
        html: htmlBody,
        text: `Nuevo lead de Agentes IA para Hoteles\n\nHotel: ${hotel}\nContacto: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp || 'No proporcionado'}\nHabitaciones: ${rooms || 'No proporcionado'}\nPMS: ${pms || 'No proporcionado'}\nReto principal: ${challenge || 'No proporcionado'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending hoteles email:', error);
        return res.status(500).json({ error: 'Error al enviar el correo. Intenta de nuevo.' });
    }
}
