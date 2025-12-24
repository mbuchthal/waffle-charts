import { CompositeChart } from "../../components/waffle/CompositeChart";
import { ComponentPreview } from "../../components/ComponentPreview";

const revenueData = [
  { month: 'Jan', revenue: 12000, margin: 15 },
  { month: 'Feb', revenue: 19000, margin: 18 },
  { month: 'Mar', revenue: 15000, margin: 12 },
  { month: 'Apr', revenue: 25000, margin: 22 },
  { month: 'May', revenue: 32000, margin: 25 },
  { month: 'Jun', revenue: 28000, margin: 20 },
];

const codeString = `import { CompositeChart } from "waffle-charts";

const data = [
  { month: 'Jan', revenue: 12000, margin: 15 },
  { month: 'Feb', revenue: 19000, margin: 18 },
  { month: 'Mar', revenue: 15000, margin: 12 },
  { month: 'Apr', revenue: 25000, margin: 22 },
  { month: 'May', revenue: 32000, margin: 25 },
  { month: 'Jun', revenue: 28000, margin: 20 },
];

export function CompositeChartDemo() {
  return (
    <div className="h-[400px] w-full">
      <CompositeChart 
        data={data}
        xKey="month"
        barKey="revenue"
        lineKey="margin"
        barColor="#3b82f6"
        lineColor="#ef4444"
      />
    </div>
  );
}`;

export function CompositeChartPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Composite Chart</h1>
        <p className="text-xl text-muted-foreground">
          Combines a Bar Chart and a Line Chart with dual axes. Perfect for comparing metrics with different scales (e.g., Revenue vs Margin).
        </p>
      </div>

      <ComponentPreview code={codeString}>
        <div className="h-[400px] w-full">
          <CompositeChart
            data={revenueData}
            xKey="month"
            barKey="revenue"
            lineKey="margin"
          />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">npm install @visx/shape @visx/scale @visx/axis @visx/grid @visx/group @visx/responsive @visx/tooltip @visx/curve @visx/event</code>
        </div>
      </div>
    </div>
  );
}
