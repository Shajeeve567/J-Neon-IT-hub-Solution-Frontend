import { useState } from 'react'
import { Link } from 'react-router-dom'

const services = [
    {
        name: 'WEB DEVELOPMENT',
        tag: 'UI/UX & Branding',
        stat: { value: '200+', label: 'Sites Launched' },
        desc: 'Scalable platforms engineered for performance. Responsive, modern web architectures built to convert and retain users.',
        path: '/services/web-development',
    },
    {
        name: 'DIGITAL MARKETING',
        tag: 'Growth & Reach',
        stat: { value: '99.99%', label: 'Uptime Guaranteed' },
        desc: 'Data-driven campaigns that grow your reach. SEO, SEM, social media and content strategies tailored to your market.',
        path: '/services/digital-marketing',
    },
    {
        name: 'DATA ANALYTICS',
        tag: 'BI & Insights',
        stat: { value: '+127%', label: 'Total Growth' },
        desc: 'Turn raw data into decisions. Business intelligence dashboards, predictive modeling, and KPI tracking for every team.',
        path: '/services',
    },
    {
        name: 'MOBILE DEV',
        tag: 'iOS & Android',
        stat: { value: '50+', label: 'Apps Shipped' },
        desc: 'Native and cross-platform mobile apps. From MVP to production — beautiful, fast, and reliable on every device.',
        path: '/services',
    },
]
import useServices from '../hooks/useServices'

function ServiceRow({ service }) {
    const [open, setOpen] = useState(false)

    return (
        <div className={`service-row ${open ? 'active' : ''}`}>
            <div className="service-row__header" onClick={() => setOpen(o => !o)}>
                <span className="service-row__name">{service.name}</span>
                <div className="service-row__meta">
                    <span className="service-row__tag">{service.tag}</span>
                    <div className="service-row__icon">
                        {open ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M18 12H6" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M12 6v12M6 12h12" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>

            <div className="service-row__panel">
                <div className="service-row__panel-inner">
                    <div className="service-row__panel-card">
                        <div className="service-panel-dots">
                            <span /><span /><span />
                        </div>
                        <p className="service-panel-desc">{service.desc}</p>
                        <Link to={service.path} className="service-panel-link">View Details →</Link>
                    </div>
                    <div className="service-panel-stat">
                        <span className="service-panel-stat__value">{service.stat.value}</span>
                        <span className="service-panel-stat__label">{service.stat.label}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Services({ limit, showViewAll }) {
    const displayed = limit ? services.slice(0, limit) : services

    return (
        <section className="services" id="services">
            <div className="services__container">
                <div className="services__header fade-in">
                    <h2 className="services__title">
                        OUR <span>SERVICES</span>
                    </h2>
                    <p className="services__subtitle">
                        We offer comprehensive services that help businesses scale, secure, and optimize their digital infrastructure.
                    </p>
                </div>

                <div className="fade-in" style={{ transitionDelay: '0.15s' }}>
                    {displayed.map((s, i) => (
                        <ServiceRow key={i} service={s} />
                    ))}
                </div>

                {showViewAll && (
                {loading ? (
                    <div className="fade-in services-loading">
                        <div className="services-spinner"></div>
                        <p>Loading services...</p>
                    </div>
                ) : error ? (
                    <div className="fade-in services-error">
                        <p>{error}</p>
                        <button onClick={refetch} className="retry-button">
                            Try Again
                        </button>
                    </div>
                ) : services.length === 0 ? (
                    <div className="fade-in" style={{ padding: '40px 0', textAlign: 'center' }}>
                        <p>No services found</p>
                    </div>
                ) : (
                    <div className="fade-in" style={{ transitionDelay: '0.15s' }}>
                        {displayed.map((s) => (
                            <ServiceRow key={s.id} service={s} />
                        ))}
                    </div>
                )}

                {showViewAll && !loading && !error && services.length > 0 && (
                    <div className="view-all-row fade-in">
                        <Link to="/services" className="view-all-btn">
                            VIEW ALL SERVICES
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
