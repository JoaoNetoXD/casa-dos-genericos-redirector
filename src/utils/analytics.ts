interface Analytics {
  totalVisits: number;
  redirectClicks: number;
  groupAccess: number;
  buttonClicks: number;
  lastVisit: string;
}

const ANALYTICS_KEY = 'analytics';

export const getAnalytics = (): Analytics => {
  const data = localStorage.getItem(ANALYTICS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return {
    totalVisits: 0,
    redirectClicks: 0,
    groupAccess: 0,
    buttonClicks: 0,
    lastVisit: "Nunca"
  };
};

export const saveAnalytics = (analytics: Analytics): void => {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
};

export const trackVisit = (): void => {
  const analytics = getAnalytics();
  analytics.totalVisits += 1;
  analytics.lastVisit = new Date().toLocaleString('pt-BR');
  saveAnalytics(analytics);
};

export const trackButtonClick = (): void => {
  const analytics = getAnalytics();
  analytics.buttonClicks += 1;
  saveAnalytics(analytics);
};

export const trackRedirect = (): void => {
  const analytics = getAnalytics();
  analytics.redirectClicks += 1;
  saveAnalytics(analytics);
};

export const trackGroupAccess = (): void => {
  const analytics = getAnalytics();
  analytics.groupAccess += 1;
  saveAnalytics(analytics);
};

export const clearAnalytics = (): void => {
  localStorage.removeItem(ANALYTICS_KEY);
};