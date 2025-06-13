// Analytics utility for tracking map engagement and unlock events
import { track } from '@vercel/analytics';

// Campaign configuration
export const CAMPAIGN_CONFIG = {
  // Campaign runs from June 23 - August 4, 2025 (6 weeks)
  startDate: new Date('2025-06-23'), // June 23, 2025
  weeks: [
    { week: 1, kingdom: 'grivoss', unlockDate: new Date('2025-06-23') },
    { week: 2, kingdom: 'zalos', unlockDate: new Date('2025-06-30') },
    { week: 3, kingdom: 'evermere', unlockDate: new Date('2025-07-07') },
    { week: 4, kingdom: 'scarto', unlockDate: new Date('2025-07-14') },
    { week: 5, kingdom: 'tsunareth', unlockDate: new Date('2025-07-21') },
    { week: 6, kingdom: 'dragons', unlockDate: new Date('2025-07-28') }
  ],
  endDate: new Date('2025-08-04') // Campaign end date (August 4, 2025)
};

// Development override for testing different unlock states
const DEV_OVERRIDES = {
  // Set to true to enable all kingdoms for testing
  UNLOCK_ALL: import.meta.env.DEV && false,
  
  // Override specific week for testing (1-6)
  FORCE_WEEK: import.meta.env.DEV ? null : null,
  
  // Override specific kingdoms for testing
  FORCE_UNLOCKED: import.meta.env.DEV ? [] : []
};

// Get current campaign week and unlock status
export const getCampaignStatus = () => {
  const now = new Date();
  const startDate = CAMPAIGN_CONFIG.startDate;
  
  // Development overrides
  if (DEV_OVERRIDES.UNLOCK_ALL) {
    return {
      week: 6,
      unlockedKingdoms: ['grivoss', 'zalos', 'evermere', 'scarto', 'tsunareth', 'dragons'],
      nextUnlock: null,
      isActive: true,
      isComplete: true
    };
  }
  
  if (DEV_OVERRIDES.FORCE_WEEK) {
    const forceWeek = DEV_OVERRIDES.FORCE_WEEK;
    const unlockedKingdoms = CAMPAIGN_CONFIG.weeks
      .filter(unlock => unlock.week <= forceWeek)
      .map(unlock => unlock.kingdom);
    
    return {
      week: forceWeek,
      unlockedKingdoms,
      nextUnlock: CAMPAIGN_CONFIG.weeks.find(unlock => unlock.week > forceWeek),
      isActive: true,
      isComplete: forceWeek >= 6
    };
  }
  
  if (now < startDate) {
    return { 
      week: 0, 
      unlockedKingdoms: [...DEV_OVERRIDES.FORCE_UNLOCKED], 
      nextUnlock: CAMPAIGN_CONFIG.weeks[0],
      isActive: false 
    };
  }
  
  const weeksSinceStart = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000));
  const currentWeek = Math.min(weeksSinceStart + 1, 6);
  
  const unlockedKingdoms = CAMPAIGN_CONFIG.weeks
    .filter(unlock => now >= unlock.unlockDate)
    .map(unlock => unlock.kingdom)
    .concat(DEV_OVERRIDES.FORCE_UNLOCKED);
  
  const nextUnlock = CAMPAIGN_CONFIG.weeks
    .find(unlock => now < unlock.unlockDate);
  
  return {
    week: currentWeek,
    unlockedKingdoms: [...new Set(unlockedKingdoms)], // Remove duplicates
    nextUnlock,
    isActive: true,
    isComplete: currentWeek >= 6
  };
};

// Track map interactions
export const trackMapEvent = (eventName, properties = {}) => {
  const campaignStatus = getCampaignStatus();
  
  track(eventName, {
    ...properties,
    campaign_week: campaignStatus.week,
    unlocked_kingdoms: campaignStatus.unlockedKingdoms.join(','),
    is_campaign_active: campaignStatus.isActive,
    timestamp: new Date().toISOString()
  });
};

// Specific tracking functions
export const trackKingdomUnlock = (kingdom) => {
  trackMapEvent('kingdom_unlocked', {
    kingdom,
    unlock_method: 'scheduled'
  });
};

export const trackKingdomClick = (kingdom, isUnlocked) => {
  trackMapEvent('kingdom_clicked', {
    kingdom,
    is_unlocked: isUnlocked,
    interaction_type: isUnlocked ? 'explore' : 'locked_attempt'
  });
};

export const trackMapInteraction = (action, details = {}) => {
  trackMapEvent('map_interaction', {
    action, // 'zoom', 'pan', 'reset', 'tour_start', 'tour_complete'
    ...details
  });
};

export const trackSubRegionUnlock = () => {
  trackMapEvent('sub_regions_unlocked', {
    unlock_week: 6
  });
};

export const trackTourEvent = (action, step = null) => {
  trackMapEvent('tour_interaction', {
    action, // 'started', 'completed', 'skipped', 'advanced'
    step,
    tour_type: 'full_map'
  });
};

// Track engagement patterns
export const trackPageView = (pageName) => {
  const campaignStatus = getCampaignStatus();
  
  track('page_view', {
    page: pageName,
    campaign_week: campaignStatus.week,
    available_kingdoms: campaignStatus.unlockedKingdoms.length,
    is_campaign_active: campaignStatus.isActive
  });
};

// Track newsletter/marketing funnel
export const trackEmailSignup = (source, context = {}) => {
  trackMapEvent('email_signup', {
    source, // 'map_unlock', 'kingdom_page', 'general'
    ...context
  });
};

// Analytics dashboard data
export const getAnalyticsData = () => {
  const status = getCampaignStatus();
  
  return {
    campaignWeek: status.week,
    unlockedCount: status.unlockedKingdoms.length,
    totalKingdoms: 5,
    progressPercentage: (status.unlockedKingdoms.length / 5) * 100,
    nextUnlockDate: status.nextUnlock?.unlockDate,
    isComplete: status.isComplete
  };
}; 