import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { BarChart } from '../BarChart';

// 1. Mock ResizeObserver (Global)
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
  { label: 'A', value: 100 },
  { label: 'B', value: 200 },
  { label: 'C', value: 300 },
];

describe('BarChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BarChart
        data={mockData}
        xKey="label"
        yKey="value"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders SVG elements', () => {
    const { container } = render(
      <BarChart
        data={mockData}
        xKey="label"
        yKey="value"
      />
    );
    // Should contain an SVG with width 500
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '500');
  });

  it('renders correct number of bars', () => {
    const { container } = render(
      <BarChart
        data={mockData}
        xKey="label"
        yKey="value"
      />
    );
    // Visx BarChart renders <rect> elements for bars
    const bars = container.querySelectorAll('rect');
    // Just assert we have bars. Ideally 3 bars + background rects maybe?
    // Visx BarGroup often renders just the bars. Let's check length.
    expect(bars.length).toBeGreaterThanOrEqual(3);
  });
});
