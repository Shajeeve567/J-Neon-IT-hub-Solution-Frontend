import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { getPortfolioItems, deletePortfolioItem } from '../../services/portfolioService';
import styles from './adminPortfolioList.module.css';

export default function AdminPortfolioList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            // Check if backend provides mock data initially
            const data = await getPortfolioItems();
            setProjects(data || []);
        } catch (error) {
            console.error("Failed to load projects", error);
            // Fallback mock data if backend not connected yet
            setProjects([
                {
                    id: 1,
                    title: 'E-Commerce Platform',
                    clientName: 'TechStore Inc',
                    category: 'Web Development',
                    description: 'A full-stack e-commerce solution with payment integration and inventory management.',
                    imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60',
                    projectUrl: '#',
                    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe']
                },
                {
                    id: 2,
                    title: 'Brand Refresh',
                    clientName: 'Creative Agency',
                    category: 'UI/UX Design',
                    description: 'Complete brand overhaul including website redesign and marketing materials.',
                    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60',
                    projectUrl: '#',
                    technologies: ['Figma', 'Adobe CC']
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deletePortfolioItem(id);
                setProjects(projects.filter(p => p.id !== id));
            } catch (error) {
                alert("Failed to delete the project.");
                // Optimistic UI update in case backend fails
                setProjects(projects.filter(p => p.id !== id));
            }
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Portfolio Management</h1>
                    <p className={styles.subtitle}>Showcase your best work</p>
                </div>
                <button
                    className={styles.addBtn}
                    onClick={() => navigate('/admin/portfolio/create')}
                >
                    <Plus size={18} /> Add Project
                </button>
            </header>

            {loading ? (
                <div className={styles.loading}>Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className={styles.emptyState}>No projects found. Click "Add Project" to start.</div>
            ) : (
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div key={project.id || project.title} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={project.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
                                    alt={project.title}
                                    className={styles.projectImage}
                                />
                                <span className={styles.categoryBadge}>{project.category}</span>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.clientName}>{project.clientName}</p>
                                <p className={styles.description}>{project.description}</p>

                                <div className={styles.techTags}>
                                    {(project.technologies || []).slice(0, 3).map((tech, index) => (
                                        <span key={index} className={styles.techTag}>{tech}</span>
                                    ))}
                                    {(project.technologies?.length > 3) && (
                                        <span className={styles.techTag}>+{project.technologies.length - 3}</span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                <button
                                    className={styles.actionBtn}
                                    onClick={() => navigate(`/admin/portfolio/edit/${project.id}`)}
                                    title="Edit"
                                >
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button
                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                    onClick={() => handleDelete(project.id)}
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.actionBtn} ${styles.viewBtn}`}
                                    title="View Live"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
