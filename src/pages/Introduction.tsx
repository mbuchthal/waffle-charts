export function IntroductionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Beautiful, headless, copy-pasteable charts for React. Built with Visx and Tailwind CSS.
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h3>Philosophy</h3>
        <p>
          WaffleCharts is not a library you install. It's a collection of primitives you copy into your project.
          It solves the gap between "easy but rigid" (Recharts) and "powerful but hard" (Visx).
        </p>

        <h3>Installation</h3>
        <p>Since this is a "copy-paste" library, you just need the base dependencies:</p>
        <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
          <code>
            npm install @visx/shape @visx/group @visx/scale @visx/responsive @visx/tooltip @visx/axis @visx/grid @visx/curve @visx/event @visx/glyph d3-array clsx tailwind-merge lucide-react
          </code>
        </pre>
      </div>
    </div>
  );
}
