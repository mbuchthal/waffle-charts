import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ScatterChart } from '../ScatterChart';

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
  { x: 10, y: 55 },
  { x: 20, y: 66 },
];

describe('ScatterChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ScatterChart
        data={mockData}
        xKey="x"
        yKey="y"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('applies custom point class', () => {
    const { container } = render(
      <ScatterChart
        data={mockData}
        xKey="x"
        yKey="y"
        pointClassName="fill-purple-500"
      />
    );
    const circles = container.querySelectorAll('circle');
    // Check if any circle has the class
    const hasPurple = Array.from(circles).some(c => c.classList.contains('fill-purple-500'));
    expect(hasPurple).toBe(true);
  });

  it('shows tooltip on point hover', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ScatterChart
        data={mockData}
        xKey="x"
        yKey="y"
      />
    );

    const circles = container.querySelectorAll('circle');
    // Hover the first circle (x:10, y:55)
    await user.hover(circles[0]);

    // Tooltip should show 55
    const tooltipValue = await screen.findByText("55");
    expect(tooltipValue).toBeVisible();
  });
});
