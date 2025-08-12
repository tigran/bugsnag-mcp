/**
 * Release group-related tool handlers
 */

import { initApiClient } from '../api/client.js';
import { ToolHandler } from '../types/index.js';

/**
 * Handle the list_release_groups tool
 */
export const handleListReleaseGroups: ToolHandler = async args => {
  const projectId = args.project_id;
  const releaseStageName = args.release_stage_name;
  const topOnly = args.top_only;
  const visibleOnly = args.visible_only;
  const perPage = args.per_page;
  const pageToken = args.page_token;
  const sort = args.sort;

  const params: Record<string, any> = {
    release_stage_name: releaseStageName,
  };

  if (typeof topOnly === 'boolean') params.top_only = topOnly;
  if (typeof visibleOnly === 'boolean') params.visible_only = visibleOnly;
  if (typeof perPage === 'number') params.per_page = perPage;
  if (typeof pageToken === 'string') params.page_token = pageToken;
  if (typeof sort === 'string') params.sort = sort;

  const client = initApiClient();
  const response = await client.get(`/projects/${projectId}/release_groups`, { params });

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
 * Handle the view_release_group tool
 */
export const handleViewReleaseGroup: ToolHandler = async args => {
  const id = args.id;

  const client = initApiClient();
  const response = await client.get(`/release_groups/${id}`);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
};
