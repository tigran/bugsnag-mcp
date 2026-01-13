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
import {
  handleListFeatureFlags,
  handleGetFeatureFlag,
  handleListFeatureFlagVariantsById,
  handleListFeatureFlagVariantsByName,
  handleGetFeatureFlagErrorOverview,
  handleGetVariantErrorOverview,
} from './feature_flags.js';

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
  handleListFeatureFlags,
  handleGetFeatureFlag,
  handleListFeatureFlagVariantsById,
  handleListFeatureFlagVariantsByName,
  handleGetFeatureFlagErrorOverview,
  handleGetVariantErrorOverview,
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
  {
    name: 'list_feature_flags',
    description: 'List feature flags on a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        release_stage_name: {
          type: 'string',
          description: 'Release stage name to get the feature flags for (e.g., production)',
        },
        starred_at_top: {
          type: 'boolean',
          description: 'Whether to return starred Feature Flags at the top of the list',
        },
        include_variant_summary: {
          type: 'boolean',
          description: 'Whether to include a summary of the Variants for each Feature Flag',
        },
        q: {
          type: 'string',
          description: 'Search for feature flags with a name matching this query',
        },
        first_seen: {
          type: 'string',
          enum: ['all', 'this_week', 'today'],
          description: 'Filter to Feature Flags first seen within the specified time frame',
        },
        include_inactive: {
          type: 'boolean',
          description: 'Whether to include inactive Feature Flags',
        },
        sort: {
          type: 'string',
          enum: ['name', 'first_seen'],
          description: 'Which field to sort on',
        },
        direction: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sort direction',
        },
        per_page: {
          type: 'number',
          description: 'How many results to return per page',
        },
      },
      required: ['project_id', 'release_stage_name'],
    },
  },
  {
    name: 'get_feature_flag',
    description: 'Get a specific feature flag by ID',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        id: {
          type: 'string',
          description: 'Feature flag ID',
        },
        release_stage_name: {
          type: 'string',
          description: 'Release stage name to get the feature flag for (e.g., production)',
        },
        include_variant_summary: {
          type: 'boolean',
          description: 'Whether to include a summary of the Variants for the Feature Flag',
        },
      },
      required: ['project_id', 'id', 'release_stage_name'],
    },
  },
  {
    name: 'list_feature_flag_variants_by_id',
    description: 'List variants on a feature flag by ID',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        id: {
          type: 'string',
          description: 'Feature flag ID',
        },
        release_stage_name: {
          type: 'string',
          description: 'Release stage name to get the variants for',
        },
        q: {
          type: 'string',
          description: 'Search for variants with a name matching this query',
        },
        per_page: {
          type: 'number',
          description: 'How many results to return per page',
        },
      },
      required: ['project_id', 'id'],
    },
  },
  {
    name: 'list_feature_flag_variants_by_name',
    description: 'List variants on a feature flag by name',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        name: {
          type: 'string',
          description: 'Feature flag name (case-sensitive)',
        },
        release_stage_name: {
          type: 'string',
          description: 'Release stage name to get the variants for',
        },
        q: {
          type: 'string',
          description: 'Search for variants with a name matching this query',
        },
        per_page: {
          type: 'number',
          description: 'How many results to return per page',
        },
      },
      required: ['project_id', 'name'],
    },
  },
  {
    name: 'get_feature_flag_error_overview',
    description: "Get a feature flag's error overview",
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        id: {
          type: 'string',
          description: 'Feature flag ID',
        },
        release_stage_name: {
          type: 'string',
          description: 'Release stage name to get the error overview for',
        },
      },
      required: ['project_id', 'id', 'release_stage_name'],
    },
  },
  {
    name: 'get_variant_error_overview',
    description: "Get a feature flag variant's error overview",
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'Bugsnag project ID',
        },
        id: {
          type: 'string',
          description: 'Feature flag ID',
        },
        variant_ids: {
          type: 'array',
          items: { type: 'string' },
          description: 'IDs of the feature flag variants',
        },
        release_stage_name: {
          type: 'string',
          description: 'Release stage name to get the error overview for',
        },
      },
      required: ['project_id', 'id', 'variant_ids', 'release_stage_name'],
    },
  },
];
