import { BarChart } from '../../components/waffle/BarChart';
import { ComponentPreview } from '../../components/ComponentPreview';
// @ts-ignore
import BarChartSource from '../../components/waffle/BarChart.tsx?raw';

const data = [
  { letter: 'A', frequency: 100 },
  { letter: 'B', frequency: 200 },
  { letter: 'C', frequency: 150 },
  { letter: 'D', frequency: 300 },
  { letter: 'E', frequency: 250 },
  { letter: 'F', frequency: 180 },
];

export function BarChartPage() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold">Bar Chart</h1>
        <p className="text-muted-foreground mt-2">Vertical bar chart for categorical data.</p>
      </div>

      <ComponentPreview
        title="Interactive Bar Chart"
        description="A simple bar chart with tooltips and hover effects."
        code={BarChartSource}
      >
        <BarChart
          data={data}
          xKey="letter"
          yKey="frequency"
        />
      </ComponentPreview>

      <div className="p-6 border rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Custom Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BarChart
            data={data.slice(0, 4)}
            xKey="letter"
            yKey="frequency"
            barColor="fill-indigo-500"
          />
          <BarChart
            data={data.slice(0, 4)}
            xKey="letter"
            yKey="frequency"
            barColor="fill-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
