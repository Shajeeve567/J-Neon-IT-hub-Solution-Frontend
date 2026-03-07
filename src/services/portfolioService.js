import axios from 'axios';

// Ensure this matches your backend endpoint
const API_URL = 'http://localhost:8080/api/portfolio-items';

export const getPortfolioItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio items", error);
        throw error;
    }
};

export const getPortfolioItemById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching portfolio item with id ${id}`, error);
        throw error;
    }
};

export const createPortfolioItem = async (portfolioData) => {
    try {
        const response = await axios.post(API_URL, portfolioData);
        return response.data;
    } catch (error) {
        console.error("Error creating portfolio item", error);
        throw error;
    }
};

export const updatePortfolioItem = async (id, portfolioData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, portfolioData);
        return response.data;
    } catch (error) {
        console.error(`Error updating portfolio item with id ${id}`, error);
        throw error;
    }
};

export const deletePortfolioItem = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting portfolio item with id ${id}`, error);
        throw error;
    }
};
