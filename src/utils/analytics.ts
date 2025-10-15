interface Analytics {
  totalVisits: number;
  redirectClicks: number;
  groupAccess: number;
  buttonClicks: number;
  lastVisit: string;
}

const ANALYTICS_KEY = 'analytics';

// Declaração global do Facebook Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

// Função auxiliar para verificar se o Facebook Pixel está disponível
const isFbqAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

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
  
  // Enviar evento para Facebook Pixel
  if (isFbqAvailable()) {
    window.fbq('track', 'PageView');
  }
};

export const trackButtonClick = (): void => {
  const analytics = getAnalytics();
  analytics.buttonClicks += 1;
  saveAnalytics(analytics);
  
  // Enviar evento personalizado para Facebook Pixel
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'ButtonClick', {
      button_type: 'join_now',
      content_name: 'Casa dos Genéricos - Botão Entrar Agora'
    });
  }
};

export const trackRedirect = (): void => {
  const analytics = getAnalytics();
  analytics.redirectClicks += 1;
  saveAnalytics(analytics);
  
  // Enviar evento personalizado para Facebook Pixel
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'AutoRedirect', {
      redirect_type: 'automatic',
      content_name: 'Casa dos Genéricos - Redirecionamento Automático'
    });
  }
};

export const trackGroupAccess = (): void => {
  const analytics = getAnalytics();
  analytics.groupAccess += 1;
  saveAnalytics(analytics);
  
  // Enviar evento de conversão para Facebook Pixel
  if (isFbqAvailable()) {
    window.fbq('track', 'Lead', {
      content_name: 'Casa dos Genéricos - Acesso ao Grupo WhatsApp',
      content_category: 'WhatsApp Group',
      value: 1,
      currency: 'BRL'
    });
  }
};

export const clearAnalytics = (): void => {
  localStorage.removeItem(ANALYTICS_KEY);
};