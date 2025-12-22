import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AreaChart } from '../AreaChart';

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
  { date: '2024-01-01', a: 100, b: 200 },
  { date: '2024-01-02', a: 150, b: 250 },
  { date: '2024-01-03', a: 200, b: 300 },
];

describe('AreaChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AreaChart
        data={mockData}
        xKey="date"
        keys={['a', 'b']}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders stack paths', () => {
    const { container } = render(
      <AreaChart
        data={mockData}
        xKey="date"
        keys={['a', 'b']}
      />
    );
    // Area chart renders paths for stacks
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  it('applies custom color classes', () => {
    const { container } = render(
      <AreaChart
        data={mockData}
        xKey="date"
        keys={['a', 'b']}
        colors={['text-red-500', 'text-blue-500']}
      />
    );
    const paths = container.querySelectorAll('path');
    // Check for classes
    const hasRed = Array.from(paths).some(p => p.classList.contains('text-red-500'));
    const hasBlue = Array.from(paths).some(p => p.classList.contains('text-blue-500'));

    expect(hasRed).toBe(true);
    expect(hasBlue).toBe(true);
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AreaChart
        data={mockData}
        xKey="date"
        keys={['a', 'b']}
      />
    );

    // Find overlay rect (fill transparent)
    const rects = container.querySelectorAll('rect');
    const overlay = Array.from(rects).find(r => r.getAttribute('fill') === 'transparent');

    if (overlay) {
      await user.hover(overlay);

      // Tooltip should show values for a and b
      // We can search for known values like "150" or "250" (middle point values)
      // or check for keys "a:" "b:"

      const labelA = await screen.findAllByText("a:");
      const labelB = await screen.findAllByText("b:");

      expect(labelA.length).toBeGreaterThan(0);
      expect(labelB.length).toBeGreaterThan(0);
    } else {
      throw new Error("Overlay rect not found");
    }
  });
});
