import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { RadarChart } from '../RadarChart';

// Mocks
class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
vi.stubGlobal('ResizeObserver', ResizeObserver);

vi.mock('@visx/responsive', () => ({
  ParentSize: ({ children }: { children: (args: { width: number; height: number }) => React.ReactNode }) =>
    children({ width: 500, height: 300 }),
}));

const mockData = [
  { subject: 'Math', score: 100 },
  { subject: 'Science', score: 80 },
  { subject: 'Art', score: 90 },
];

describe('RadarChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <RadarChart
        data={mockData}
        radiusKey="score"
        angleKey="subject"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders grid polygons', () => {
    const { container } = render(
      <RadarChart
        data={mockData}
        radiusKey="score"
        angleKey="subject"
      />
    );
    // Radar chart uses polygons for grid
    const polygons = container.querySelectorAll('polygon');
    expect(polygons.length).toBeGreaterThan(0);
  });

  it('renders axis labels', () => {
    const { getByText } = render(
      <RadarChart
        data={mockData}
        radiusKey="score"
        angleKey="subject"
      />
    );
    expect(getByText('Math')).toBeInTheDocument();
    expect(getByText('Science')).toBeInTheDocument();
  });

  it('applies custom polygon color', () => {
    const { container } = render(
      <RadarChart
        data={mockData}
        radiusKey="score"
        angleKey="subject"
        polygonColor="fill-green-500"
      />
    );
    const polygons = container.querySelectorAll('polygon');
    // The main radar polygon should have this class.
    // It's the one that is NOT the grid (grid usually transparent fill or stroke only).
    // Or simpler: check if any polygon has the class.
    const hasGreen = Array.from(polygons).some(p => p.classList.contains('fill-green-500'));
    expect(hasGreen).toBe(true);
  });
});
