/**
 * Test fixtures for feature flags
 */

export const featureFlagsFixture = [
  {
    id: 'ff_12345',
    name: 'share_ios_photo_sharing_button',
    first_seen: '2023-01-01T00:00:00.000Z',
    is_starred: true,
    is_active: true,
    variant_summary: {
      variant_count: 3,
      first_variant_name: 'blue_button',
    },
  },
  {
    id: 'ff_67890',
    name: 'dark_mode_experiment',
    first_seen: '2023-02-15T00:00:00.000Z',
    is_starred: false,
    is_active: true,
    variant_summary: {
      variant_count: 2,
      first_variant_name: 'control',
    },
  },
];

export const featureFlagDetailFixture = {
  id: 'ff_12345',
  name: 'share_ios_photo_sharing_button',
  first_seen: '2023-01-01T00:00:00.000Z',
  is_starred: true,
  is_active: true,
  variant_summary: {
    variant_count: 3,
    first_variant_name: 'blue_button',
  },
};

export const featureFlagVariantsFixture = [
  {
    id: 'variant_001',
    name: 'blue_button',
    first_seen: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'variant_002',
    name: 'green_button',
    first_seen: '2023-01-02T00:00:00.000Z',
  },
  {
    id: 'variant_003',
    name: 'control',
    first_seen: '2023-01-03T00:00:00.000Z',
  },
];

export const featureFlagErrorOverviewFixture = {
  errors_seen: 42,
  exclusive_errors: 15,
  last_seen: '2023-03-01T12:30:00.000Z',
};

export const variantErrorOverviewFixture = [
  {
    variant_id: 'variant_001',
    errors_seen: 20,
    exclusive_errors: 8,
    last_seen: '2023-03-01T12:30:00.000Z',
  },
  {
    variant_id: 'variant_002',
    errors_seen: 15,
    exclusive_errors: 5,
    last_seen: '2023-02-28T10:15:00.000Z',
  },
];
