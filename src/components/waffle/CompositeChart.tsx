import { Group } from '@visx/group';
import { Bar, LinePath } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisRight, AxisBottom } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { ParentSize } from '@visx/responsive';
import { curveMonotoneX } from '@visx/curve';
import { localPoint } from '@visx/event';
import { cn } from '../../lib/utils';
import React, { useMemo } from 'react';

// Types
export type CompositeChartProps<T> = {
  data: T[];
  xKey: keyof T;
  barKey: keyof T;
  lineKey: keyof T;
  width?: number;
  height?: number;
  className?: string;
  barColor?: string;
  lineColor?: string;
};

type CompositeChartContentProps<T> = CompositeChartProps<T> & {
  width: number;
  height: number;
};

function CompositeChartContent<T>({
  data,
  xKey,
  barKey,
  lineKey,
  width,
  height,
  className,
  barColor = '#3b82f6', // blue-500
  lineColor = '#ef4444', // red-500
}: CompositeChartContentProps<T>) {
  const margin = { top: 40, right: 50, bottom: 50, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Accessors
  const getX = (d: T) => d[xKey] as unknown as string;
  const getBarValue = (d: T) => d[barKey] as unknown as number;
  const getLineValue = (d: T) => d[lineKey] as unknown as number;

  // Scales
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, innerWidth],
        domain: data.map(getX),
        padding: 0.4,
      }),
    [innerWidth, data, getX]
  );

  const y1Scale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: [0, Math.max(...data.map(getBarValue)) * 1.1], // 10% headroom
      }),
    [innerHeight, data, getBarValue]
  );

  const y2Scale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: [0, Math.max(...data.map(getLineValue)) * 1.1],
      }),
    [innerHeight, data, getLineValue]
  );

  // Tooltip
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<{ x: string; barVal: number; lineVal: number }>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  const handleTooltip = (event: React.MouseEvent | React.TouchEvent) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = x - margin.left;
    const bandWidth = xScale.step();
    const index = Math.floor(x0 / bandWidth);

    if (index >= 0 && index < data.length) {
      const d = data[index];
      const barVal = getBarValue(d);
      const lineVal = getLineValue(d);
      const xVal = getX(d);

      const barX = xScale(xVal) ?? 0;

      showTooltip({
        tooltipData: { x: xVal, barVal, lineVal },
        tooltipLeft: barX + xScale.bandwidth() / 2 + margin.left,
        tooltipTop: y1Scale(barVal) + margin.top, // Snap to bar top or mouse Y
      });
    }
  };

  if (width < 50) return null;

  return (
    <div className={cn("relative font-sans", className)}>
      <svg
        ref={containerRef}
        width={width}
        height={height}
        className="overflow-visible"
        onMouseMove={handleTooltip}
        onMouseLeave={() => hideTooltip()}
        onTouchMove={handleTooltip}
      >
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={y1Scale} width={innerWidth} strokeDasharray="3,3" strokeOpacity={0.2} />

          {/* Bars (Primary Axis) */}
          {data.map((d) => {
            const xVal = getX(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - (y1Scale(getBarValue(d)) ?? 0);
            const barX = xScale(xVal);
            const barY = innerHeight - barHeight;
            return (
              <Bar
                key={`bar-${xVal}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={barColor}
                rx={4}
                opacity={0.8}
              />
            );
          })}

          {/* Line (Secondary Axis) */}
          <LinePath
            data={data}
            x={(d) => (xScale(getX(d)) ?? 0) + xScale.bandwidth() / 2}
            y={(d) => y2Scale(getLineValue(d)) ?? 0}
            stroke={lineColor}
            strokeWidth={3}
            curve={curveMonotoneX}
          />
          {/* Line Points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(xScale(getX(d)) ?? 0) + xScale.bandwidth() / 2}
              cy={y2Scale(getLineValue(d)) ?? 0}
              r={4}
              fill={lineColor}
              stroke="white"
              strokeWidth={2}
            />
          ))}

          {/* Axes */}
          <AxisBottom
            scale={xScale}
            top={innerHeight}
            stroke="hsl(var(--muted-foreground))"
            tickStroke="hsl(var(--muted-foreground))"
            tickLabelProps={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 11,
              textAnchor: 'middle',
            }}
          />
          <AxisLeft
            scale={y1Scale}
            stroke="hsl(var(--muted-foreground))"
            tickStroke="hsl(var(--muted-foreground))"
            tickLabelProps={{
              fill: barColor, // Color match axis to data
              fontSize: 11,
              textAnchor: 'end',
              dx: -4,
              dy: 2,
            }}
          />
          <AxisRight
            scale={y2Scale}
            left={innerWidth}
            stroke="hsl(var(--muted-foreground))"
            tickStroke="hsl(var(--muted-foreground))"
            tickLabelProps={{
              fill: lineColor, // Color match axis to data
              fontSize: 11,
              textAnchor: 'start',
              dx: 4,
              dy: 2,
            }}
          />
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={{ ...defaultStyles, padding: 0, borderRadius: 0, boxShadow: 'none', background: 'transparent' }}
        >
          <div className="rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
            <span className="font-semibold block mb-1">{tooltipData.x}</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ background: barColor }}></span>
              <span>Bar: {tooltipData.barVal}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ background: lineColor }}></span>
              <span>Line: {tooltipData.lineVal}</span>
            </div>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}

export function CompositeChart<T>(props: CompositeChartProps<T>) {
  return (
    <div className="w-full h-[400px]">
      <ParentSize>
        {({ width, height }) => <CompositeChartContent {...props} width={width} height={height} />}
      </ParentSize>
    </div>
  );
}
