/**
 * Tool handlers for Bugsnag operations
 */

import { handleListOrganizations } from './organizations.js';
import { handleListProjects } from './projects.js';
import { handleListErrors, handleViewError, handleSearchIssues } from './errors.js';
import {
  handleListErrorEvents,
  handleViewLatestEvent,
  handleViewEvent,
  handleViewStacktrace,
  handleViewExceptionChain,
  handleViewTabs,
} from './events.js';
import { handleListIssues, handleViewIssue } from './issues.js';
import { handleListReleaseGroups, handleViewReleaseGroup } from './release_groups.js';

// Export all tool handlers
export {
  handleListOrganizations,
  handleListProjects,
  handleListErrors,
  handleViewError,
  handleListErrorEvents,
  handleViewLatestEvent,
  handleViewEvent,
  handleViewStacktrace,
  handleViewExceptionChain,
  handleListIssues,
  handleViewIssue,
  handleSearchIssues,
  handleViewTabs,
  handleListReleaseGroups,
  handleViewReleaseGroup,
};

// Tool definitions for registration
export const toolDefinitions = [
  {
    name: 'list_organizations',
    description: 'List available Bugsnag organizations',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'list_projects',
    description: 'List projects in an organization',
    inputSchema: {
      type: 'object',
      properties: {
        organization_id: {
          type: 'string',
          description: 'Bugsnag organization ID',
        },
      },
      required: ['organization_id'],
    },
  },
  {
    name: 'list_errors',
    description: 'List errors in a project with filtering options',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        status: {
          type: 'string',
          enum: ['open', 'fixed', 'ignored'],
          description: 'Filter by error status',
        },
        sort: {
          type: 'string',
          enum: ['newest', 'oldest', 'priority'],
          description: 'Sort order for errors',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of errors to return',
        },
      },
      required: ['project_id'],
    },
  },
  {
    name: 'view_error',
    description: 'Get detailed information about a specific error',
    inputSchema: {
      type: 'object',
      properties: {
        error_id: {
          type: 'string',
          description: 'Bugsnag error ID',
        },
      },
      required: ['error_id'],
    },
  },
  {
    name: 'list_error_events',
    description: 'List events (occurrences) for a specific error',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        error_id: {
          type: 'string',
          description: 'Bugsnag error ID',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of events to return',
        },
      },
      required: ['project_id', 'error_id'],
    },
  },
  {
    name: 'view_latest_event',
    description: 'View the latest event for an error',
    inputSchema: {
      type: 'object',
      properties: {
        error_id: {
          type: 'string',
          description: 'Bugsnag error ID',
        },
      },
      required: ['error_id'],
    },
  },
  {
    name: 'view_event',
    description: 'View detailed information about a specific event',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        event_id: {
          type: 'string',
          description: 'Bugsnag event ID',
        },
      },
      required: ['project_id', 'event_id'],
    },
  },
  {
    name: 'view_stacktrace',
    description: 'Extract and format stacktrace information from an event',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        event_id: {
          type: 'string',
          description: 'Bugsnag event ID',
        },
        include_code: {
          type: 'boolean',
          description: 'Include source code context if available',
        },
      },
      required: ['project_id', 'event_id'],
    },
  },
  {
    name: 'view_exception_chain',
    description: 'View the full chain of exceptions for an event',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        event_id: {
          type: 'string',
          description: 'Bugsnag event ID',
        },
      },
      required: ['project_id', 'event_id'],
    },
  },
  {
    name: 'search_issues',
    description: 'Search for issues using various criteria',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        query: {
          type: 'string',
          description: 'Search query',
        },
        error_class: {
          type: 'string',
          description: 'Filter by error class',
        },
        app_version: {
          type: 'string',
          description: 'Filter by app version',
        },
      },
      required: ['project_id'],
    },
  },
  {
    name: 'view_tabs',
    description:
      'View all event data tabs including app, device, user, request, breadcrumbs, metadata, and stacktrace',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        event_id: {
          type: 'string',
          description: 'Bugsnag event ID',
        },
        include_code: {
          type: 'boolean',
          description: 'Include source code context in stacktrace if available',
        },
      },
      required: ['project_id', 'event_id'],
    },
  },
  {
    name: 'list_release_groups',
    description: 'List release groups for a project (grouped by release stage and app version)',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        release_stage_name: {
          type: 'string',
          description: 'Release stage to list release groups for (e.g., production)',
        },
        sort: {
          type: 'string',
          description: 'Sort order for release groups',
        },
        top_only: {
          type: 'boolean',
          description: 'Return only the top release groups',
        },
        visible_only: {
          type: 'boolean',
          description: 'Return only visible release groups',
        },
        per_page: {
          type: 'number',
          description: 'How many results to return per page',
        },
        page_token: {
          type: 'string',
          description: 'Pagination token from Link header',
        },
      },
      required: ['project_id', 'release_stage_name'],
    },
  },
  {
    name: 'view_release_group',
    description: 'Retrieve a specific release group by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Release group ID',
        },
      },
      required: ['id'],
    },
  },
];
