import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

// Mock react-router-dom hooks
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
        useLocation: vi.fn()
    };
});

describe('AdminLayout Component', () => {
    it('renders the sidebar and children elements properly', () => {
        vi.mocked(useLocation).mockReturnValue({ pathname: '/admin/dashboard' });
        
        render(
            <MemoryRouter>
                <AdminLayout>
                    <div data-testid="test-child">Child Content</div>
                </AdminLayout>
            </MemoryRouter>
        );

        expect(screen.getByText('J-NEON')).toBeInTheDocument();
        expect(screen.getByText('ADMIN')).toBeInTheDocument();
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Admin User')).toBeInTheDocument();
    });

    it('navigates to home when logout button is clicked', () => {
        const mockNavigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        vi.mocked(useLocation).mockReturnValue({ pathname: '/admin/dashboard' });

        render(
            <MemoryRouter>
                <AdminLayout>
                    <div />
                </AdminLayout>
            </MemoryRouter>
        );

        const logoutButton = screen.getByLabelText('Logout');
        fireEvent.click(logoutButton);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
