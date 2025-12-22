import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { LineChart } from '../LineChart';

// 1. Mock ResizeObserver
class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
vi.stubGlobal('ResizeObserver', ResizeObserver);

// 2. Mock ParentSize
vi.mock('@visx/responsive', () => ({
  ParentSize: ({ children }: { children: (args: { width: number; height: number }) => React.ReactNode }) =>
    children({ width: 500, height: 300 }),
}));

const mockData = [
  { date: '2024-01-01', value: 100 },
  { date: '2024-01-02', value: 200 },
  { date: '2024-01-03', value: 300 },
];

describe('LineChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <LineChart
        data={mockData}
        xKey="date"
        yKey="value"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders SVG elements', () => {
    const { container } = render(
      <LineChart
        data={mockData}
        xKey="date"
        yKey="value"
      />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '500');
  });
});
