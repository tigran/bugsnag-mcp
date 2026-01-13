/**
 * Feature flag-related tool handlers
 */

import { initApiClient } from '../api/client.js';
import { ToolHandler } from '../types/index.js';

/**
 * Handle the list_feature_flags tool
 * Lists feature flags on a project
 */
export const handleListFeatureFlags: ToolHandler = async args => {
  const projectId = args.project_id;
  const releaseStageName = args.release_stage_name;
  const perPage = args.per_page || 30;
  const starredAtTop = args.starred_at_top || false;
  const includeVariantSummary = args.include_variant_summary || false;
  const sort = args.sort || 'name';
  const direction = args.direction || 'asc';
  const q = args.q;
  const firstSeen = args.first_seen || 'all';
  const includeInactive = args.include_inactive || false;

  const params: any = {
    release_stage_name: releaseStageName,
    per_page: perPage,
    starred_at_top: starredAtTop,
    include_variant_summary: includeVariantSummary,
    sort,
    direction,
    first_seen: firstSeen,
    include_inactive: includeInactive,
  };

  if (q) params.q = q;

  const client = initApiClient();
  const response = await client.get(`/projects/${projectId}/feature_flags`, { params });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
};

/**
 * Handle the get_feature_flag tool
 * Gets a specific feature flag by ID
 */
export const handleGetFeatureFlag: ToolHandler = async args => {
  const projectId = args.project_id;
  const id = args.id;
  const releaseStageName = args.release_stage_name;
  const includeVariantSummary = args.include_variant_summary || false;

  const params: any = {
    release_stage_name: releaseStageName,
    include_variant_summary: includeVariantSummary,
  };

  const client = initApiClient();
  const response = await client.get(`/projects/${projectId}/feature_flags/${id}`, { params });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
};

/**
 * Handle the list_feature_flag_variants_by_id tool
 * Lists variants on a feature flag by ID
 */
export const handleListFeatureFlagVariantsById: ToolHandler = async args => {
  const projectId = args.project_id;
  const id = args.id;
  const releaseStageName = args.release_stage_name;
  const q = args.q;
  const perPage = args.per_page || 30;

  const params: any = { per_page: perPage };
  if (releaseStageName) params.release_stage_name = releaseStageName;
  if (q) params.q = q;

  const client = initApiClient();
  const response = await client.get(`/projects/${projectId}/feature_flags/${id}/variants`, {
    params,
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
};

/**
 * Handle the list_feature_flag_variants_by_name tool
 * Lists variants on a feature flag by name
 */
export const handleListFeatureFlagVariantsByName: ToolHandler = async args => {
  const projectId = args.project_id;
  const name = args.name;
  const releaseStageName = args.release_stage_name;
  const q = args.q;
  const perPage = args.per_page || 30;

  const params: any = { per_page: perPage };
  if (releaseStageName) params.release_stage_name = releaseStageName;
  if (q) params.q = q;

  const client = initApiClient();
  const response = await client.get(
    `/projects/${projectId}/feature_flags/by_name/${encodeURIComponent(name)}/variants`,
    { params }
  );

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
};

/**
 * Handle the get_feature_flag_error_overview tool
 * Gets a feature flag's error overview
 */
export const handleGetFeatureFlagErrorOverview: ToolHandler = async args => {
  const projectId = args.project_id;
  const id = args.id;
  const releaseStageName = args.release_stage_name;

  const params: any = {
    release_stage_name: releaseStageName,
  };

  const client = initApiClient();
  const response = await client.get(`/projects/${projectId}/feature_flags/${id}/error_overview`, {
    params,
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
};

/**
 * Handle the get_variant_error_overview tool
 * Gets a feature flag variant's error overview
 */
export const handleGetVariantErrorOverview: ToolHandler = async args => {
  const projectId = args.project_id;
  const id = args.id;
  const variantIds = args.variant_ids;
  const releaseStageName = args.release_stage_name;

  const params: any = {
    variant_ids: variantIds,
    release_stage_name: releaseStageName,
  };

  const client = initApiClient();
  const response = await client.get(
    `/projects/${projectId}/feature_flags/${id}/variants/error_overview`,
    { params }
  );

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
};
