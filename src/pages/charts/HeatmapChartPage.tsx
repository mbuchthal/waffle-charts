import { HeatmapChart } from "../../components/waffle/HeatmapChart";
import { ComponentPreview } from "../../components/ComponentPreview";
import { genBin } from '@visx/mock-data';

// Generate mock data: 20 bins, containing 10 bins each
const mockData = genBin(20, 10, (i) => i).map(d => ({
  bin: d.bin,
  bins: d.bins.map(b => ({ bin: b.bin, count: b.count * 100 }))
}));

const codeString = `import { HeatmapChart } from "waffle-charts";
import { genBin } from '@visx/mock-data';

const data = genBin(20, 10, (i) => i).map(d => ({
    bin: d.bin,
    bins: d.bins.map(b => ({ bin: b.bin, count: b.count * 100 }))
}));

export function HeatmapDemo() {
  return (
    <div className="h-[300px] w-full">
      <HeatmapChart 
        data={data}
        colorRange={['#f1f5f9', '#3b82f6']} // slate-100 to blue-500
      />
    </div>
  );
}`;

export function HeatmapChartPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Heatmap</h1>
        <p className="text-xl text-muted-foreground">
          Visualizes data density or intensity across a matrix.
        </p>
      </div>

      <ComponentPreview code={codeString}>
        <div className="h-[350px] w-full">
          <HeatmapChart
            data={mockData}
            colorRange={['hsl(var(--muted))', 'hsl(var(--primary))']}
          />
        </div>
      </ComponentPreview>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="rounded-md bg-muted p-4">
          <code className="text-sm">npm install @visx/heatmap</code>
        </div>
      </div>
    </div>
  );
}
