/**
 * Integration tests for feature flag tools
 */

import {
  handleListFeatureFlags,
  handleGetFeatureFlag,
  handleListFeatureFlagVariantsById,
  handleListFeatureFlagVariantsByName,
  handleGetFeatureFlagErrorOverview,
  handleGetVariantErrorOverview,
} from '../../../src/tools/feature_flags';
import {
  featureFlagsFixture,
  featureFlagDetailFixture,
  featureFlagVariantsFixture,
  featureFlagErrorOverviewFixture,
  variantErrorOverviewFixture,
} from '../../fixtures/feature_flags';
import { jest, describe, it, expect } from '@jest/globals';

describe('Feature Flag Tools', () => {
  it('should have list feature flags handler function', () => {
    expect(typeof handleListFeatureFlags).toBe('function');
  });

  it('should have get feature flag handler function', () => {
    expect(typeof handleGetFeatureFlag).toBe('function');
  });

  it('should have list feature flag variants by id handler function', () => {
    expect(typeof handleListFeatureFlagVariantsById).toBe('function');
  });

  it('should have list feature flag variants by name handler function', () => {
    expect(typeof handleListFeatureFlagVariantsByName).toBe('function');
  });

  it('should have get feature flag error overview handler function', () => {
    expect(typeof handleGetFeatureFlagErrorOverview).toBe('function');
  });

  it('should have get variant error overview handler function', () => {
    expect(typeof handleGetVariantErrorOverview).toBe('function');
  });
});
