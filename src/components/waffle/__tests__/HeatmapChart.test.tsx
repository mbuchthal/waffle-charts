import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { HeatmapChart } from '../HeatmapChart';

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

// Mock data: 2 columns, each with 2 rows = 4 cells
const mockData = [
  { bin: 0, bins: [{ bin: 0, count: 10 }, { bin: 1, count: 20 }] },
  { bin: 1, bins: [{ bin: 0, count: 30 }, { bin: 1, count: 40 }] }
];

describe('HeatmapChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <HeatmapChart data={mockData} />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders correct number of cells', () => {
    const { container } = render(
      <HeatmapChart data={mockData} />
    );
    // We expect 4 rects (2x2)
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBe(4);
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <HeatmapChart data={mockData} />
    );

    const rects = container.querySelectorAll('rect');
    // Hover first cell (count 10)
    await user.hover(rects[0]);

    // Expect tooltip with value "10"
    const tooltip = await screen.findByText('Value: 10');
    expect(tooltip).toBeVisible();
  });
});
