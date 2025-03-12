import Image from "next/image";
import styles from "../styles/Portfolio.module.css";

import shop1 from "../../public/images/shop1.png";
import shop2 from "../../public/images/shop2.png";
import shop3 from "../../public/images/shop3.png";

const Portfolio = () => {
    const projects = [
        { image: shop1, title: "Tienda de Ropa", description: "Desarrollo de una tienda Shopify para una marca de ropa." },
        { image: shop2, title: "E-commerce de Electrónica", description: "Optimización y rediseño para mejorar la conversión." },
        { image: shop3, title: "Tienda de Accesorios", description: "Integración con pasarelas de pago y sistemas de envíos." }
    ];

    const testimonials = [
        { name: "Carlos Ramírez", text: "Excelente trabajo, mi tienda en Shopify ahora vende el doble." },
        { name: "María Gómez", text: "Muy profesional, hizo todo el proceso fácil y rápido." }
    ];

    const experience = [
        { company: "Teleperformance", period: "Abr 2023 – Presente", description: "Desarrollo de aplicaciones con Next.js, React, Node.js, .NET y Azure." },
        { company: "B2B TIC", period: "Jul 2022 – Mar 2023", description: "Frontend con React para Teleperformance, cambios en UI y soporte backend." },
        { company: "Avant Assurance", period: "Sep 2021 – Jun 2022", description: "Desarrollo de plataformas web en WordPress y diseño publicitario." },
        { company: "AWM Colombia", period: "Jun 2014 – Mar 2019", description: "Desarrollo web con Joomla, WordPress y diseño gráfico." }
    ];

    return (
        <section className={styles.portfolioContainer}>
            <h2 className={styles.sectionTitle}>Portfolio y Ejemplos de Trabajos</h2>

            {/* Sección de Proyectos */}
            <div className={styles.projectsGrid}>
                {projects.map((project, index) => (
                    <div key={index} className={styles.projectCard}>
                        <Image src={project.image} alt={project.title} className={styles.projectImage} width={400} height={250} />
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.projectDescription}>{project.description}</p>
                    </div>
                ))}
            </div>

            {/* Sección de Testimonios */}
            <div className={styles.testimonialsSection}>
                <h3 className={styles.subTitle}>Testimonios de Clientes</h3>
                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={styles.testimonialCard}>
                            <p className={styles.testimonialText}>“{testimonial.text}”</p>
                            <h4 className={styles.testimonialAuthor}>{testimonial.name}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sección de Experiencia */}
            <div className={styles.experienceSection}>
                <h3 className={styles.subTitle}>Casos de Estudio y Experiencia</h3>
                <div className={styles.experienceGrid}>
                    {experience.map((exp, index) => (
                        <div key={index} className={styles.experienceCard}>
                            <h4 className={styles.experienceCompany}>{exp.company}</h4>
                            <p className={styles.experiencePeriod}>{exp.period}</p>
                            <p className={styles.experienceDescription}>{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
