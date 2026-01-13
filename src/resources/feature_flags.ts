/**
 * Feature flag resource handlers
 */

import { AxiosInstance } from 'axios';
import { ResourceHandler } from '../types/index.js';

/**
 * Handle feature flag resources
 * Supports URIs like: bugsnag://feature_flag/{project_id}/{flag_id}
 */
export const handleFeatureFlagResource: ResourceHandler = async (uri, client) => {
  const featureFlagMatch = uri.match(/^bugsnag:\/\/feature_flag\/([^/]+)\/(.+)$/);
  if (!featureFlagMatch) {
    return null;
  }

  const projectId = featureFlagMatch[1];
  const flagId = featureFlagMatch[2];
  const response = await client.get(`/projects/${projectId}/feature_flags/${flagId}`);

  return {
    uri,
    mimeType: 'application/json',
    text: JSON.stringify(response.data, null, 2),
  };
};
