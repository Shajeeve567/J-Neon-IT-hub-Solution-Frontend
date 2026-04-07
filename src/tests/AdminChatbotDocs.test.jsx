import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminChatbotDocs from '../pages/admin/AdminChatbotDocs';
import { chatbotService } from '../services/chatbotService';

// Mock the chatbotService
vi.mock('../services/chatbotService', () => ({
    chatbotService: {
        getDocuments: vi.fn(),
        uploadDocument: vi.fn()
    }
}));

describe('AdminChatbotDocs Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders the title and empty state correctly', async () => {
        chatbotService.getDocuments.mockResolvedValue([]);

        await act(async () => {
            render(<AdminChatbotDocs />);
        });

        expect(screen.getByText('Chatbot Documents')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/No documents found/i)).toBeInTheDocument();
        });
    });

    it('renders the list of documents', async () => {
        const mockDocs = [
            { id: '1', filename: 'test1.pdf', upload_timestamp: '2024-03-31T12:00:00Z' },
            { id: '2', filename: 'test2.pdf', upload_timestamp: '2024-03-31T12:30:00Z' }
        ];
        chatbotService.getDocuments.mockResolvedValue(mockDocs);

        await act(async () => {
            render(<AdminChatbotDocs />);
        });

        await waitFor(() => {
            expect(screen.getByText('test1.pdf')).toBeInTheDocument();
            expect(screen.getByText('test2.pdf')).toBeInTheDocument();
        });
    });

    it('shows error when non-PDF file is selected', async () => {
        chatbotService.getDocuments.mockResolvedValue([]);
        await act(async () => {
            render(<AdminChatbotDocs />);
        });

        // Wait for initial load to finish
        await waitFor(() => {
            expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
        });

        const fileInput = screen.getByLabelText(/Select PDF File/i);
        const file = new File(['hello'], 'hello.js', { type: 'text/javascript' });

        await act(async () => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        });

        expect(screen.getByText(/Only PDF files are allowed/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Upload/i })).toBeDisabled();
    });

    it('enables upload button for PDF files', async () => {
        chatbotService.getDocuments.mockResolvedValue([]);
        await act(async () => {
            render(<AdminChatbotDocs />);
        });

        await waitFor(() => {
            expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
        });

        const fileInput = screen.getByLabelText(/Select PDF File/i);
        const file = new File(['dummy content'], 'manual.pdf', { type: 'application/pdf' });

        await act(async () => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        });

        expect(screen.queryByText(/Only PDF files are allowed/i)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Upload/i })).not.toBeDisabled();
    });
});
