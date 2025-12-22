import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PieChart } from '../PieChart';

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
  { label: 'Slice A', value: 100 },
  { label: 'Slice B', value: 200 },
];

describe('PieChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PieChart
        data={mockData}
        labelKey="label"
        valueKey="value"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders donut text when provided', () => {
    render(
      <PieChart
        data={mockData}
        labelKey="label"
        valueKey="value"
        innerRadius={50}
        centerText={{ title: "Donut", subtitle: "Chart" }}
      />
    );
    expect(screen.getByText("Donut")).toBeInTheDocument();
    expect(screen.getByText("Chart")).toBeInTheDocument();
  });

  it('shows tooltip on slice hover', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PieChart
        data={mockData}
        labelKey="label"
        valueKey="value"
      />
    );

    // Pie slices are paths
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);

    // Hover first slice
    await user.hover(paths[0]);

    // Tooltip should contain label or value
    // Expect 'Slice A' or '100'
    const tooltipValue = await screen.findByText('100');
    expect(tooltipValue).toBeVisible();
  });
});
