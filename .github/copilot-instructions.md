# Copilot Instructions

## Build and Run

```bash
npm run build        # Compile TypeScript (tsc)
npm run start        # Run compiled app (node dist/index.js)
```

There are no tests or linters configured.

## Important Notes

Always check that the names of the datadog metrics and tags match the ones already available on the server. If available, use the datadog MCP tool to check. Do this check when asked to perform any code reviews or any other validation of the code. If you find any mismatch, report it and ask for clarification before proceeding with the review or validation.

If the MCP server is not available, finish quickly.

We need a VERY fast review. Just check that the metric name and tags are correct. Absolutely nothing else needs to be checked.

## Conventions

- CommonJS module output (not ESM)
- Lazy-initialized singleton pattern for the `MetricsApi` client
- Environment variables loaded via side-effect import (`import "dotenv/config"`)
