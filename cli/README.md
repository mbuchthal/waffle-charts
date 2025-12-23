# WaffleCharts CLI 🧇

The official CLI for [WaffleCharts](https://mbuchthal.github.io/waffle-charts).

> Beautiful, headless, copy-pasteable charts for React. Built with Visx and Tailwind CSS.

## Usage

Run the `add` command to interactively select charts to add to your project:

```bash
npx waffle-charts-cli add
```

Or add a specific chart directly:

```bash
npx waffle-charts-cli add bar-chart
```

## What it does

1.  **Checks dependencies**: Detects if you have the necessary `@visx` packages and installs them if missing.
2.  **Copies code**: Downloads (or copies) the component source code directly into your project's component directory.

## License

MIT © [WaffleCharts](https://github.com/mbuchthal/waffle-charts)
