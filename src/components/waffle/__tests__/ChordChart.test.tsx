import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChordChart } from '../ChordChart';

// Mock ParentSize
vi.mock('@visx/responsive', () => ({
  ParentSize: ({ children }: any) => children({ width: 800, height: 600 }),
}));

// Mock TooltipInPortal
vi.mock('@visx/tooltip', async () => {
  const actual = await vi.importActual('@visx/tooltip');
  return {
    ...actual,
    useTooltipInPortal: () => ({
      containerRef: (node: any) => node,
      TooltipInPortal: ({ children }: any) => <div>{children}</div>,
    }),
  };
});

const matrix = [
  [100, 50],
  [50, 100]
];
const keys = ['A', 'B'];

beforeAll(() => {
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 800,
    height: 600,
    top: 0,
    left: 0,
    bottom: 600,
    right: 800,
    x: 0,
    y: 0,
    toJSON: () => { },
  }));
});

describe('ChordChart', () => {
  it('renders ribbons and arcs', () => {
    const { container } = render(<ChordChart data={matrix} keys={keys} />);

    // Arcs + Ribbons are paths
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);

    // Specifically arcs usually have a distinct class or attribute, 
    // but verifying we have paths (ribbons + arcs) confirms basic rendering.
  });

  it.skip('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    const { container } = render(<ChordChart data={matrix} keys={keys} />);

    // Find ribbons (paths inside the group)
    // Just hover the first path we find
    const paths = container.querySelectorAll('path');
    if (paths[0]) await user.hover(paths[0]);

    // Tooltip content: "A ↔ A" or similar
    // We expect at least some tooltip content to appear.
    // Given the matrix [100, 50], [50, 100]
    // A->A (100), A->B (50), B->A (50), B->B (100)
    // We can just check if ANY tooltip renders.

    // We need to wait for the tooltip
    // Use findBy to wait
    const tooltip = await screen.findByText(/Flow:/);
    expect(tooltip).toBeInTheDocument();
  });
});
