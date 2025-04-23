import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:5000/api/items');
            setItems(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des données');
            console.error('Error fetching items:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await axios.put(`http://localhost:5000/api/items/${editingItem._id}`, formData);
                setEditingItem(null);
            } else {
                await axios.post('http://localhost:5000/api/items', formData);
            }
            setFormData({ name: '', description: '' });
            fetchItems();
        } catch (err) {
            setError('Erreur lors de la sauvegarde');
            console.error('Error saving item:', err);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ name: item.name, description: item.description });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            try {
                await axios.delete(`http://localhost:5000/api/items/${id}`);
                fetchItems();
            } catch (err) {
                setError('Erreur lors de la suppression');
                console.error('Error deleting item:', err);
            }
        }
    };

    const handleCancel = () => {
        setEditingItem(null);
        setFormData({ name: '', description: '' });
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Chargement en cours...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error">{error}</div>
                <button onClick={fetchItems} className="retry-button">
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Gestion des éléments</h1>
            
            <form onSubmit={handleSubmit} className="item-form">
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        {editingItem ? 'Modifier' : 'Ajouter'}
                    </button>
                    {editingItem && (
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Annuler
                        </button>
                    )}
                </div>
            </form>

            {items.length === 0 ? (
                <p className="no-items">Aucun élément à afficher</p>
            ) : (
                <ul className="items-list">
                    {items.map((item) => (
                        <li key={item._id} className="item-card">
                            <div className="item-content">
                                <strong>{item.name}</strong>
                                <p>{item.description}</p>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(item)} className="edit-button">
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="delete-button">
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;