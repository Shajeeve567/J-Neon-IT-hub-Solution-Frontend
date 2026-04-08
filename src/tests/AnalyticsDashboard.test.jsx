import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import AnalyticsDashboard from '../pages/AnalyticsDashboard';
import { renderWithRouter } from './utils/renderWithRouter';

// Mock Data
const mockTotalViews = { totalViews: 1250 };
const mockPortfolioViews = [
  { id: '1', title: 'Cyber Defense', views: 450 },
  { id: '2', title: 'Cloud Migration', views: 300 },
  { id: '3', title: 'Digital Studio', views: 500 },
];
const mockDailyStats = [
  { date: '2026-04-01', views: 100 },
  { date: '2026-04-02', views: 150 },
  { date: '2026-04-03', views: 200 },
];

// MSW Server Setup
const server = setupServer(
  http.get('*/api/analytics/total-views', () => {
    return HttpResponse.json(mockTotalViews);
  }),
  http.get('*/api/analytics/portfolio-views', () => {
    return HttpResponse.json(mockPortfolioViews);
  }),
  http.get('*/api/analytics/daily-stats', () => {
    return HttpResponse.json(mockDailyStats);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('AnalyticsDashboard Integration Tests', () => {
  test('renders the analytics dashboard with total views', async () => {
    renderWithRouter(<AnalyticsDashboard />);

    // Check for "Analytics Dashboard" heading
    expect(screen.getByText(/analytics dashboard/i)).toBeInTheDocument();

    // Wait for the total views to be displayed
    await waitFor(() => {
      expect(screen.getByText(/1,250/)).toBeInTheDocument();
    });
  });

  test('renders portfolio view distribution chart/table', async () => {
    renderWithRouter(<AnalyticsDashboard />);

    // Wait for data to load and check for portfolio items
    await waitFor(() => {
      expect(screen.getByText(/Cyber Defense/i)).toBeInTheDocument();
      expect(screen.getByText(/450/i)).toBeInTheDocument();
      expect(screen.getByText(/Digital Studio/i)).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    // Override handler for this specific test
    server.use(
      http.get('*/api/analytics/total-views', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithRouter(<AnalyticsDashboard />);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/Failed to load analytics data/i)).toBeInTheDocument();
    });
  });

  test('renders daily statistics trends', async () => {
    renderWithRouter(<AnalyticsDashboard />);

    // Check if the aggregated stats are present
    await waitFor(() => {
      expect(screen.getByText(/Daily Traffic Trends/i)).toBeInTheDocument();
    });
  });
});
