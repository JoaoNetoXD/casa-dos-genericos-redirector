// Meta Pixel - Eventos Personalizados
// Arquivo dedicado para gerenciar eventos específicos do Meta Pixel

declare global {
  interface Window {
    fbq: any;
  }
}

// Função auxiliar para verificar se o Facebook Pixel está disponível
const isFbqAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

// Eventos de Conversão
export const trackLead = (eventData?: any): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'Lead', {
      content_name: 'Casa dos Genéricos - Lead Gerado',
      content_category: 'WhatsApp Group',
      value: 1,
      currency: 'BRL',
      ...eventData
    });
  }
};

export const trackCompleteRegistration = (eventData?: any): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Casa dos Genéricos - Registro Completo',
      content_category: 'WhatsApp Group',
      value: 1,
      currency: 'BRL',
      ...eventData
    });
  }
};

// Eventos de Engajamento
export const trackViewContent = (contentName: string, contentCategory?: string): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: contentCategory || 'Website',
      content_type: 'product'
    });
  }
};

export const trackContact = (method: string = 'whatsapp'): void => {
  if (isFbqAvailable()) {
    window.fbq('track', 'Contact', {
      content_name: 'Casa dos Genéricos - Contato',
      content_category: 'Communication',
      method: method
    });
  }
};

// Eventos Personalizados
export const trackCountdownComplete = (): void => {
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'CountdownComplete', {
      content_name: 'Casa dos Genéricos - Contador Finalizado',
      event_category: 'Engagement',
      timing_value: 10
    });
  }
};

export const trackWhatsAppRedirect = (redirectType: 'automatic' | 'manual' = 'automatic'): void => {
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'WhatsAppRedirect', {
      content_name: 'Casa dos Genéricos - Redirecionamento WhatsApp',
      redirect_type: redirectType,
      content_category: 'WhatsApp Group'
    });
  }
};

export const trackButtonInteraction = (buttonType: string, buttonText?: string): void => {
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'ButtonInteraction', {
      content_name: `Casa dos Genéricos - ${buttonText || 'Botão'}`,
      button_type: buttonType,
      event_category: 'UI Interaction'
    });
  }
};

export const trackPageEngagement = (timeOnPage: number): void => {
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'PageEngagement', {
      content_name: 'Casa dos Genéricos - Engajamento na Página',
      time_on_page: timeOnPage,
      event_category: 'Engagement'
    });
  }
};

// Eventos de Analytics Dashboard
export const trackDashboardAccess = (): void => {
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'DashboardAccess', {
      content_name: 'Casa dos Genéricos - Acesso ao Dashboard',
      content_category: 'Analytics',
      event_category: 'Admin'
    });
  }
};

export const trackAnalyticsView = (section: string): void => {
  if (isFbqAvailable()) {
    window.fbq('trackCustom', 'AnalyticsView', {
      content_name: `Casa dos Genéricos - Visualização ${section}`,
      analytics_section: section,
      event_category: 'Analytics'
    });
  }
};

// Função para inicializar eventos automáticos
export const initMetaPixelEvents = (): void => {
  // Rastrear tempo na página
  let startTime = Date.now();
  
  // Rastrear quando o usuário sai da página
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    if (timeOnPage > 10) { // Só rastrear se ficou mais de 10 segundos
      trackPageEngagement(timeOnPage);
    }
  });
  
  // Rastrear scroll profundo (mais de 75% da página)
  let deepScrollTracked = false;
  window.addEventListener('scroll', () => {
    if (!deepScrollTracked) {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 75) {
        deepScrollTracked = true;
        if (isFbqAvailable()) {
          window.fbq('trackCustom', 'DeepScroll', {
            content_name: 'Casa dos Genéricos - Scroll Profundo',
            scroll_percent: Math.round(scrollPercent),
            event_category: 'Engagement'
          });
        }
      }
    }
  });
};