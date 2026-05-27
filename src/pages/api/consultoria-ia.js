import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { name, email, website, bottleneck } = req.body;

    // Basic validation
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

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "juancamilosalazarrestrepo@gmail.com",
            pass: "bwii cjeq dicq pfqg",
        },
    });

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
                            <td style="background:linear-gradient(135deg,#6d28d9,#2563eb); padding:32px 40px;">
                                <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700;">
                                    🚀 Nueva Solicitud de Consultoría IA
                                </h1>
                                <p style="margin:8px 0 0; color:#c4b5fd; font-size:14px;">
                                    Recibida el ${new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:32px 40px;">
                                <!-- Name -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                                    <tr>
                                        <td style="padding:16px 20px; background-color:#1a1a2e; border-radius:10px; border-left:4px solid #6d28d9;">
                                            <p style="margin:0 0 4px; color:#8b8ba3; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Nombre</p>
                                            <p style="margin:0; color:#e2e2f0; font-size:16px; font-weight:600;">${name}</p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Email -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                                    <tr>
                                        <td style="padding:16px 20px; background-color:#1a1a2e; border-radius:10px; border-left:4px solid #2563eb;">
                                            <p style="margin:0 0 4px; color:#8b8ba3; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Correo electrónico</p>
                                            <a href="mailto:${email}" style="color:#60a5fa; font-size:16px; font-weight:600; text-decoration:none;">${email}</a>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Website -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                                    <tr>
                                        <td style="padding:16px 20px; background-color:#1a1a2e; border-radius:10px; border-left:4px solid #10b981;">
                                            <p style="margin:0 0 4px; color:#8b8ba3; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Sitio web / Empresa</p>
                                            <p style="margin:0; color:#e2e2f0; font-size:16px; font-weight:600;">${website ? website : '<span style="color:#555;">No proporcionado</span>'}</p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Bottleneck -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                                    <tr>
                                        <td style="padding:16px 20px; background-color:#1a1a2e; border-radius:10px; border-left:4px solid #f59e0b;">
                                            <p style="margin:0 0 8px; color:#8b8ba3; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Mayor cuello de botella</p>
                                            <p style="margin:0; color:#e2e2f0; font-size:15px; line-height:1.6;">${bottleneck ? bottleneck : '<span style="color:#555;">No proporcionado</span>'}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding:20px 40px 28px; border-top:1px solid #1e1e2e;">
                                <p style="margin:0; color:#555; font-size:12px; text-align:center;">
                                    Este mensaje fue enviado desde el formulario de consultoría IA en tu landing page.
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
        from: email,
        to: "juancamilosalazarrestrepo@gmail.com",
        subject: `🚀 Nueva Solicitud de Consultoría IA - ${name}`,
        html: htmlBody,
        text: `Nueva Solicitud de Consultoría IA\n\nNombre: ${name}\nEmail: ${email}\nSitio web: ${website || 'No proporcionado'}\nCuello de botella: ${bottleneck || 'No proporcionado'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending consultoria-ia email:', error);
        return res.status(500).json({ error: 'Error al enviar el correo. Intenta de nuevo.' });
    }
}
