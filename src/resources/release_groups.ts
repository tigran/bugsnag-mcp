/**
 * Release group resource handlers
 */

import { ResourceHandler } from '../types/index.js';

/**
 * Handle release group resources
 * URI formats supported:
 * - bugsnag://release_group/{id}
 */
export const handleReleaseGroupResource: ResourceHandler = async (uri, client) => {
  const match = uri.match(/^bugsnag:\/\/release_group\/(.+)$/);
  if (!match) {
    return null;
  }

  const id = match[1];
  const response = await client.get(`/release_groups/${id}`);

  return {
    uri,
    mimeType: 'application/json',
    text: JSON.stringify(response.data, null, 2),
  };
};
