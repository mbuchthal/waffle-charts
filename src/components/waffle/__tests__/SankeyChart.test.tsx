import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SankeyChart } from '../SankeyChart';

// Mock ParentSize to provide strict dimensions
vi.mock('@visx/responsive', () => ({
  ParentSize: ({ children }: any) => children({ width: 800, height: 600 }),
  parentSize: ({ children }: any) => children({ width: 800, height: 600 }),
}));

// Mock TooltipInPortal to render directly in DOM for testing
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

const sampleData = {
  nodes: [
    { name: 'Source A' },
    { name: 'Source B' },
    { name: 'Target' }
  ],
  links: [
    { source: 0, target: 2, value: 50 },
    { source: 1, target: 2, value: 30 }
  ]
};

// Mock getBoundingClientRect for SVG elements to enable hover detection
beforeAll(() => {
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 100,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => { },
  }));
});

describe('SankeyChart', () => {

  it('renders without crashing', () => {
    // Basic render test
    const { container } = render(<SankeyChart data={sampleData} />);
    // Check for SVG
    expect(container.querySelector('svg')).toBeInTheDocument();
    // Check for nodes (3 rects)
    expect(container.querySelectorAll('rect')).toHaveLength(3);
    // Check for links (2 paths)
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('shows tooltip on hover over a node', async () => {
    const user = userEvent.setup();
    render(<SankeyChart data={sampleData} />);

    // In SankeyChart, nodes render a <rect> where the title isn't directly usable as text query
    // But we render <text> labels if sufficient height.
    // "Source A" should be visible as a text label.
    const nodeLabel = screen.getByText('Source A');
    expect(nodeLabel).toBeInTheDocument();

    // Hover over the first node (Source A is index 0)
    // We can find the rect associated with it. 
    // Usually finding by text is easiest if the label is part of the interactive group.
    // Our SankeyChart structure:
    // <Group> <rect (interactive)/> <text (visible)/> </Group>
    // So hovering the text might not trigger it if pointer-events-none.
    // Let's find rendering rects.
    // We can rely on querySelectorAll to find rects
    // The rects are nodes. Paths are links.

    // Actually, let's just use the container querySelector.
    // The rects are: Source A, Source B, Target. Order depends on Visx layout but typically stable.
    const nodeRects = document.querySelectorAll('rect');

    // Hover first node
    await user.hover(nodeRects[0]);

    // Tooltip should appear
    // The chart ALREADY has a text label "Source A". 
    // The tooltip will ADD another "Source A".
    // So we should expect 2 elements, or look for the one in the tooltip container.
    // Our mocked TooltipInPortal renders a simple div.

    // Let's check for the "Value: 50" text which is likely unique to the tooltip
    expect(await screen.findByText(/Value: 50/i)).toBeInTheDocument();
  });
});
