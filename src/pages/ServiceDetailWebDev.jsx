import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const imgCctv = "http://localhost:3845/assets/e4615309020baa67a681be5c16d027096ace2563.png"
const imgLine = "http://localhost:3845/assets/08b4f1ac92af14156aab55d0d5cad7c8909b045b.svg"

const plans = [
    {
        tier: 'Basic',
        forText: 'For Personal Use',
        price: '$20',
        features: ['Responsive Website', 'Up to 5 Pages', 'Basic SEO', 'Contact Form'],
    },
    {
        tier: 'Standard',
        forText: 'For Growing Businesses',
        price: '$100',
        features: ['Custom Design & CMS', 'Up to 15 Pages', 'Advanced SEO', 'E-commerce Ready'],
    },
    {
        tier: 'Premium',
        forText: 'For Enterprise',
        price: '$200',
        features: ['Full-Stack Development', 'Unlimited Pages', 'Priority Support', 'Analytics Dashboard'],
    },
]

export default function ServiceDetailWebDev() {

    const { slug } = useParams() // /services/:slug
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:8080/api/services/slug/${slug}`)
            .then(res => res.json())
            .then(data => {
                setService(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [slug])

    if (loading) return <p>Loading...</p>
    if (!service) return <p>Service not found</p>

    return (
        <>
            <Navbar />

            <main className="page">

                {/* ── Hero ── */}
                <section className="svc-detail-hero">
                    <h1 className="svc-detail-hero__title">
                        <span>{service.title.toUpperCase()}</span>
                    </h1>
                    <p className="svc-detail-hero__desc">
                        {service.shortDescription}
                    </p>
                </section>

                {/* ── Pricing Plans (Static for now) ── */}
                <section className="svc-detail-plans">
                    <div className="svc-detail-plans__tagline">
                        <h2 className="svc-detail-plans__heading">
                            Choose what's <span className="gradient-text">best</span> for you
                        </h2>
                        <p className="svc-detail-plans__sub">
                            Flexible packages designed for startups, growing businesses, and enterprise-grade applications.
                        </p>
                    </div>

                    <div className="svc-detail-plans__grid">
                        {plans.map((plan, i) => (
                            <div key={i} className="plan-card">
                                <div className="plan-card__icon-wrap">
                                    <img src={imgCctv} alt={plan.tier} className="plan-card__icon" />
                                </div>
                                <div className="plan-card__tier">{plan.tier}</div>
                                <div className="plan-card__for">{plan.forText}</div>
                                <div className="plan-card__price">{plan.price}</div>

                                <Link 
                                    to={`/contact?service=${service.slug}`} 
                                    className="plan-card__cta"
                                >
                                    Get Your Quote
                                </Link>

                                <div className="plan-card__divider">
                                    <img src={imgLine} alt="" />
                                </div>

                                <p className="plan-card__what">What you'll get</p>

                                <ul className="plan-card__features">
                                    {plan.features.map((f, j) => (
                                        <li key={j}>{'> '}{f}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}