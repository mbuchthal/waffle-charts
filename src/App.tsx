import { BarChart } from './components/waffle/BarChart';
import { LineChart } from './components/waffle/LineChart';

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Waffle Charts</h1>
      <p className="text-muted-foreground mb-8">
        Shadcn-style graphics built with Visx.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Revenue</h3>
          <BarChart
            data={mockData}
            xKey="month"
            yKey="value"
          />
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Users</h3>
          <BarChart
            data={mockData}
            xKey="month"
            yKey="value"
            barColor="fill-blue-500"
          />
        </div>
        <div className="p-6 border rounded-lg shadow-sm col-span-1 md:col-span-2">
          <h3 className="font-semibold mb-4">Growth Trend</h3>
          <LineChart
            data={lineData}
            xKey="date"
            yKey="value"
          />
        </div>
      </div>
    </div>
  )
}

const mockData = [
  { month: 'Jan', value: 50 },
  { month: 'Feb', value: 100 },
  { month: 'Mar', value: 150 },
  { month: 'Apr', value: 100 },
  { month: 'May', value: 80 },
  { month: 'Jun', value: 120 },
];

const lineData = [
  { date: '2023-01-01', value: 10 },
  { date: '2023-02-01', value: 20 },
  { date: '2023-03-01', value: 15 },
  { date: '2023-04-01', value: 35 },
  { date: '2023-05-01', value: 50 },
  { date: '2023-06-01', value: 65 },
  { date: '2023-07-01', value: 55 },
  { date: '2023-08-01', value: 80 },
];

export default App
