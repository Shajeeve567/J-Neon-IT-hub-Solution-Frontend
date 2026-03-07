import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trash2, Plus } from 'lucide-react';
import { getPortfolioItemById, createPortfolioItem, updatePortfolioItem } from '../../services/portfolioService';
import styles from './adminPortfolioForm.module.css';

export default function AdminPortfolioForm({ isEdit = false }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        clientName: '',
        category: '',
        completedDate: '',
        description: '',
        imageUrl: '',
        projectUrl: '',
        technologies: []
    });

    const [newTech, setNewTech] = useState('');

    useEffect(() => {
        if (isEdit && id) {
            fetchProject();
        }
    }, [isEdit, id]);

    const fetchProject = async () => {
        try {
            const data = await getPortfolioItemById(id);
            setFormData(data);
        } catch (error) {
            console.error("Error fetching project for edit:", error);
            // Fallback for mocked UI if backend isn't ready
            setFormData({
                title: 'E-Commerce Platform',
                clientName: 'TechStore Inc',
                category: 'Web Development',
                completedDate: '2023-10-15',
                description: 'A full-stack e-commerce solution with payment integration and inventory management.',
                imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60',
                projectUrl: '#',
                technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe']
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addTechnology = () => {
        if (newTech.trim()) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, newTech.trim()]
            }));
            setNewTech('');
        }
    };

    const removeTechnology = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (isEdit) {
                await updatePortfolioItem(id, formData);
            } else {
                await createPortfolioItem(formData);
            }
            navigate('/admin/portfolio');
        } catch (error) {
            console.error("Failed to save project:", error);
            alert("Failed to save the project. " + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading project details...</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{isEdit ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h1>
                <p className={styles.subtitle}>Enter the details below to {isEdit ? 'update' : 'create'} the project.</p>
            </header>

            <form onSubmit={handleSubmit} className={styles.form}>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Project Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. E-Commerce Platform"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="clientName">Client Name</label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            placeholder="e.g. TechStore Inc"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="e.g. Web Development"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="completedDate">Completed Date</label>
                        <input
                            type="date"
                            id="completedDate"
                            name="completedDate"
                            value={formData.completedDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className={styles.formGroupFull}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Briefly describe the project scope and outcomes..."
                        required
                    />
                </div>

                <div className={styles.formGroupFull}>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className={styles.formGroupFull}>
                    <label htmlFor="projectUrl">Project URL</label>
                    <input
                        type="url"
                        id="projectUrl"
                        name="projectUrl"
                        value={formData.projectUrl}
                        onChange={handleInputChange}
                        placeholder="https://example-project.com"
                    />
                </div>

                <div className={styles.techSection}>
                    <div className={styles.techHeader}>
                        <label>Technologies Used</label>
                        <div className={styles.techInputGroup}>
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                placeholder="e.g. React"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTechnology();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className={styles.addTechBtn}
                                onClick={addTechnology}
                            >
                                <Plus size={16} /> Add
                            </button>
                        </div>
                    </div>

                    {formData.technologies.length > 0 && (
                        <div className={styles.techList}>
                            {formData.technologies.map((tech, index) => (
                                <div key={index} className={styles.techItem}>
                                    <span>{tech}</span>
                                    <button
                                        type="button"
                                        className={styles.removeTechBtn}
                                        onClick={() => removeTechnology(index)}
                                        aria-label="Remove"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={() => navigate('/admin/portfolio')}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={submitting}
                    >
                        {submitting ? 'Saving...' : (isEdit ? 'Update Project' : 'Save Project')}
                    </button>
                </div>

            </form>
        </div>
    );
}
