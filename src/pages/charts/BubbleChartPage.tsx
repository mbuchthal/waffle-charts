import { BubbleChart } from "../../components/waffle/BubbleChart";
import { ComponentPreview } from "../../components/ComponentPreview";

const mockData = [
  { x: 10, y: 30, z: 20 },
  { x: 40, y: 80, z: 80 },
  { x: 80, y: 10, z: 40 },
  { x: 20, y: 50, z: 50 },
  { x: 60, y: 40, z: 30 },
  { x: 90, y: 90, z: 10 },
  { x: 30, y: 20, z: 90 },
];

const codeString = `import { BubbleChart } from "waffle-charts";

const data = [
  { x: 10, y: 30, z: 20 },
  { x: 40, y: 80, z: 80 },
  { x: 80, y: 10, z: 40 },
  { x: 20, y: 50, z: 50 },
  { x: 60, y: 40, z: 30 },
  { x: 90, y: 90, z: 10 },
  { x: 30, y: 20, z: 90 },
];

export function BubbleChartDemo() {
  return (
    <div className="h-[300px] w-full">
      <BubbleChart 
        data={data}
        xKey="x"
        yKey="y"
        zKey="z"
        pointClassName="fill-indigo-500/60"
      />
    </div>
  );
}`;

export function BubbleChartPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Bubble Chart</h1>
        <p className="text-xl text-muted-foreground">
          Scatter plot with a third dimension represented by circle size.
        </p>
      </div>

      <ComponentPreview code={codeString}>
        <div className="h-[350px] w-full">
          <BubbleChart
            data={mockData}
            xKey="x"
            yKey="y"
            zKey="z"
            pointClassName="fill-indigo-500/60"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
