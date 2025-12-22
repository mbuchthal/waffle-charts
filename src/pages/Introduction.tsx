export function IntroductionPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="space-y-4 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Introduction</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Beautiful, headless, copy-pasteable charts for React.
          Built with <span className="text-foreground font-medium">Visx</span> power and <span className="text-foreground font-medium">Tailwind CSS</span> simplicity.
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Why WaffleCharts?</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground">
          <p className="leading-7">
            Building charts in React often forces a difficult choice: use a high-level library that's easy to start but hard to customize,
            or build from scratch with low-level primitives.
          </p>
          <p className="leading-7">
            WaffleCharts bridges this gap. It's not a library you install; it's a collection of <strong>copy-pasteable primitives</strong>.
            You get the full power of D3 and Visx for the math, but the DOM structure and styling live directly in your codebase.
          </p>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Completely Headless</h3>
          <p className="text-sm text-muted-foreground">
            You own the rendered markup. No more fighting with library-specific prop names to change a simple SVG attribute.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Tailwind Native</h3>
          <p className="text-sm text-muted-foreground">
            Style everything with utility classes. Context-aware hover states, dark mode, and responsive designs just work.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">TypeScript First</h3>
          <p className="text-sm text-muted-foreground">
            Written in strict TypeScript. Generics allow your data shape to drive the chart's type safety from top to bottom.
          </p>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Use Cases</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Perfect For */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <span className="text-green-500">✓</span> Perfect For
            </h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
              <li>
                <strong className="text-foreground">Design Systems:</strong> When your charts need to match your specific brand guidelines, font stacks, and border radii exactly.
              </li>
              <li>
                <strong className="text-foreground">Dashboard Applications:</strong> When you need charts that interact seamlessly with other UI elements (tooltips, state, filters).
              </li>
              <li>
                <strong className="text-foreground">Unique Visualizations:</strong> When "out of the box" charts get you 90% of the way there, but that last 10% is impossible to implement.
              </li>
            </ul>
          </div>

          {/* Not Ideal For */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <span className="text-red-500">✕</span> Not Ideal For
            </h3>
            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
              <li>
                <strong className="text-foreground">Rapid Prototyping:</strong> If you just need to throw a chart on a page in 30 seconds and don't care how it looks, use Recharts or Chart.js.
              </li>
              <li>
                <strong className="text-foreground">Massive Datasets:</strong> For visualizing millions of points, you likely need a WebGL-based solution like Deck.gl.
              </li>
              <li>
                <strong className="text-foreground">Non-React Environments:</strong> WaffleCharts relies heavily on React's component model and state management.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Getting Started</h2>
        <p className="text-muted-foreground text-lg">
          Since WaffleCharts is a copy-paste library, installation just means adding the core dependencies that the components utilize.
        </p>

        <div className="mt-6">
          <h3 className="text-base font-medium mb-3">1. Install Dependencies</h3>
          <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto border">
            <code>
              npm install @visx/shape @visx/group @visx/scale @visx/responsive @visx/tooltip @visx/axis @visx/grid @visx/curve @visx/event @visx/glyph d3-array clsx tailwind-merge lucide-react
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-medium mb-3">2. Choose a Component</h3>
          <p className="text-muted-foreground">
            Navigate to any chart in the sidebar (e.g., <a href="/docs/bar-chart" className="text-primary hover:underline">Bar Chart</a>),
            copy the code into your project, and start customizing.
          </p>
        </div>
      </div>
    </div>
  );
}
