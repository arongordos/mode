import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import z from 'zod';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const server = new McpServer({
  name: 'issue-server',
  version: '1.0.0',
});

server.registerTool(
  'issue-create',
  {
    title: 'Create issue',
    description: 'Create a new issue',
    inputSchema: {
      title: z.string().describe('Issue title'),
      description: z.string().describe('Issue description'),
      status: z
        .enum(['todo', 'in_progress', 'done'])
        .optional()
        .describe('Issue status'),
      priority: z
        .enum(['low', 'medium', 'high'])
        .optional()
        .describe('Issue priority'),
    },
  },
  async (params) => {
    try {
      if (!AUTH_TOKEN) throw new Error('Missing AUTH_TOKEN');

      const response = await fetch(`${API_BASE_URL}/issues`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `auth_token=${AUTH_TOKEN}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${JSON.stringify(data)}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Error creating issue: ${error instanceof Error ? error.message : error}`,
          },
        ],
      };
    }
  },
);

server.registerTool(
  'get-issues',
  {
    title: 'Get issues',
    description: 'Get all issues',
  },
  async () => {
    try {
      if (!AUTH_TOKEN) throw new Error('Missing AUTH_TOKEN');

      const response = await fetch(`${API_BASE_URL}/issues`, {
        method: 'GET',
        headers: {
          Cookie: `auth_token=${AUTH_TOKEN}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${JSON.stringify(data)}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Error getting issues: ${error instanceof Error ? error.message : error}`,
          },
        ],
      };
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
