import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const imgCctv = "http://localhost:3845/assets/e4615309020baa67a681be5c16d027096ace2563.png"
const imgEllipse = "http://localhost:3845/assets/97babc3bf3f3aaaa2b79cf994bc3ff37ecc0651f.svg"
const imgArrow = "http://localhost:3845/assets/9fbe661eeb6153bbfebd28fc81f8f3a1e8bb3f66.svg"

const serviceCards = [
    {
        title: 'CCTV Installation',
        desc: 'Professional CCTV installation and maintenance service with custom plan and 2 years warranty for each camera. High quality cameras for best value.',
        path: '/services/web-development',
        icon: imgCctv,
    },
    {
        title: 'CCTV Maintenance',
        desc: 'Expert CCTV maintenance service with custom plan and 2 years warranty. Ensuring your security systems remain operational at all times.',
        path: '/services/web-development',
        icon: imgCctv,
    },
    {
        title: 'Cloud Infrastructure',
        desc: 'Scalable cloud solutions for businesses of all sizes. Reliable, secure, and always available. Migration, management and maintenance.',
        path: '/services/digital-marketing',
        icon: imgCctv,
    },
    {
        title: 'Web Development',
        desc: 'Full-stack web development services for modern businesses. From landing pages to enterprise platforms, built with performance in mind.',
        path: '/services/digital-marketing',
        icon: imgCctv,
    },
]

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main className="page">
                {/* ── Hero ── */}
                <section className="services-page-hero">
                    <div className="services-page-hero__content">
                        <h1 className="services-page-hero__title">
                            OUR <span>SERVICES</span>
                        </h1>
                        <p className="services-page-hero__subtitle">
                            Choose from our range of hardware solutions. Each plan comes
                            with flexible pricing options.
                        </p>
                    </div>
                </section>

                {/* ── Tagline ── */}
                <div className="services-page-tagline">
                    <h2 className="services-page-tagline__heading">
                        Choose what's <span className="gradient-text">best</span> for you
                    </h2>
                    <p className="services-page-tagline__sub">
                        Flexible packages designed for startups, growing businesses, and enterprise-grade applications.
                    </p>
                </div>

                {/* ── Service Cards Grid ── */}
                <section className="services-page-grid">
                    <div className="services-page-grid__container">
                        {serviceCards.map((card, i) => (
                            <div key={i} className="svc-card">
                                <div className="svc-card__ellipse" style={{ backgroundImage: `url(${imgEllipse})` }} />
                                <div className="svc-card__icon-wrap">
                                    <img src={card.icon} alt={card.title} className="svc-card__icon" />
                                </div>
                                <div className="svc-card__body">
                                    <h3 className="svc-card__title">{card.title}</h3>
                                    <p className="svc-card__desc">{card.desc}</p>
                                    <Link to={card.path} className="svc-card__cta">
                                        Get Your Quote
                                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                            <path d="M4 10h12M10 4l6 6-6 6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
