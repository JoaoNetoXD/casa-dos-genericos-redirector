# 📊 Meta Pixel - Configuração e Implementação

## 🎯 Visão Geral
O Meta Pixel (Facebook Pixel) foi implementado com sucesso no projeto Casa dos Genéricos para rastreamento avançado de conversões, engajamento e otimização de campanhas publicitárias.

**Pixel ID:** `1163973502302306`

## 📁 Arquivos Modificados/Criados

### 1. **index.html**
- ✅ Código base do Meta Pixel adicionado no `<head>`
- ✅ Script de inicialização e tag noscript implementados
- ✅ Rastreamento automático de PageView configurado

### 2. **src/utils/analytics.ts**
- ✅ Integração com sistema de analytics existente
- ✅ Eventos do Meta Pixel adicionados a todas as funções de tracking
- ✅ Verificação de disponibilidade do fbq implementada

### 3. **src/utils/metaPixel.ts** (NOVO)
- ✅ Arquivo dedicado para eventos personalizados
- ✅ Funções específicas para diferentes tipos de conversão
- ✅ Eventos automáticos (scroll profundo, tempo na página)

### 4. **src/App.tsx**
- ✅ Inicialização automática dos eventos do Meta Pixel
- ✅ Configuração de eventos globais da aplicação

### 5. **src/pages/Index.tsx**
- ✅ Rastreamento de visualização de conteúdo
- ✅ Eventos de conclusão do contador
- ✅ Tracking de redirecionamentos (automático/manual)
- ✅ Conversões de Lead e CompleteRegistration

### 6. **src/pages/Dashboard.tsx**
- ✅ Rastreamento de acesso ao dashboard
- ✅ Eventos de visualização de analytics
- ✅ Tracking de ações administrativas

## 🎯 Eventos Implementados

### **Eventos Padrão do Meta Pixel**
| Evento | Descrição | Localização |
|--------|-----------|-------------|
| `PageView` | Visualização de página | Automático + Index |
| `Lead` | Lead gerado (acesso ao grupo) | Index (redirecionamento) |
| `CompleteRegistration` | Registro completo | Index (botão manual) |
| `ViewContent` | Visualização de conteúdo | Index + Dashboard |
| `Contact` | Contato iniciado | Disponível para uso |

### **Eventos Personalizados**
| Evento | Descrição | Parâmetros |
|--------|-----------|------------|
| `ButtonClick` | Clique em botões | `button_type`, `content_name` |
| `AutoRedirect` | Redirecionamento automático | `redirect_type`, `content_name` |
| `CountdownComplete` | Contador finalizado | `timing_value`, `event_category` |
| `WhatsAppRedirect` | Redirecionamento WhatsApp | `redirect_type`, `content_category` |
| `ButtonInteraction` | Interação com botões | `button_type`, `event_category` |
| `PageEngagement` | Engajamento na página | `time_on_page`, `event_category` |
| `DeepScroll` | Scroll profundo (>75%) | `scroll_percent`, `event_category` |
| `DashboardAccess` | Acesso ao dashboard | `content_category`, `event_category` |
| `AnalyticsView` | Visualização de analytics | `analytics_section`, `event_category` |

## 🔧 Funcionalidades Técnicas

### **Verificação de Disponibilidade**
```typescript
const isFbqAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};
```

### **Eventos Automáticos**
- ✅ **Tempo na Página:** Rastreado automaticamente (>10s)
- ✅ **Scroll Profundo:** Ativado quando usuário rola >75% da página
- ✅ **Saída da Página:** Captura tempo total de engajamento

### **Parâmetros Personalizados**
Todos os eventos incluem metadados relevantes:
- `content_name`: Nome descritivo do conteúdo
- `content_category`: Categoria do evento
- `event_category`: Tipo de evento para segmentação
- `value` e `currency`: Para eventos de conversão

## 📈 Métricas Rastreadas

### **Funil de Conversão**
1. **PageView** → Visitante chegou à página
2. **ViewContent** → Visualizou o conteúdo principal
3. **ButtonInteraction** → Interagiu com elementos
4. **Lead** → Gerou lead (redirecionamento automático)
5. **CompleteRegistration** → Conversão completa (clique manual)

### **Engajamento**
- Tempo na página
- Profundidade de scroll
- Interações com botões
- Acesso a seções específicas

### **Analytics Administrativos**
- Acesso ao dashboard
- Visualização de métricas
- Ações de administração

## 🎨 Integração com Sistema Existente

O Meta Pixel foi integrado de forma **não-invasiva** com o sistema de analytics local:

```typescript
export const trackGroupAccess = (): void => {
  const analytics = getAnalytics();
  analytics.groupAccess += 1;
  saveAnalytics(analytics);
  
  // Meta Pixel - Evento de conversão
  if (isFbqAvailable()) {
    window.fbq('track', 'Lead', {
      content_name: 'Casa dos Genéricos - Acesso ao Grupo WhatsApp',
      content_category: 'WhatsApp Group',
      value: 1,
      currency: 'BRL'
    });
  }
};
```

## 🔍 Monitoramento e Debug

### **Verificação no Facebook**
1. Acesse **Events Manager** no Facebook Business
2. Selecione o Pixel ID: `1163973502302306`
3. Monitore eventos em tempo real na aba **Test Events**

### **Debug Local**
```javascript
// Console do navegador
console.log('fbq disponível:', typeof window.fbq === 'function');

// Verificar eventos
window.fbq('track', 'PageView'); // Teste manual
```

### **Facebook Pixel Helper**
- Instale a extensão **Facebook Pixel Helper** no Chrome
- Verifique se o pixel está disparando corretamente
- Monitore parâmetros dos eventos personalizados

## 🚀 Otimizações Implementadas

### **Performance**
- ✅ Verificação de disponibilidade antes de cada evento
- ✅ Carregamento assíncrono do script
- ✅ Fallback gracioso se o pixel não carregar

### **Segurança**
- ✅ Verificação de `window` object
- ✅ Type safety com TypeScript
- ✅ Tratamento de erros silencioso

### **Manutenibilidade**
- ✅ Código modular e reutilizável
- ✅ Documentação inline
- ✅ Separação de responsabilidades

## 📊 Próximos Passos

### **Campanhas Publicitárias**
1. Criar **Custom Audiences** baseadas nos eventos
2. Configurar **Lookalike Audiences**
3. Otimizar campanhas para eventos de conversão específicos

### **Análise de Dados**
1. Configurar **Conversions API** para dados server-side
2. Implementar **Enhanced Matching** para melhor atribuição
3. Criar dashboards personalizados no Facebook Analytics

### **Testes A/B**
1. Testar diferentes tempos de contador
2. Otimizar copy dos botões
3. Experimentar diferentes fluxos de conversão

## ✅ Status da Implementação

- ✅ **Pixel Base:** Implementado e funcionando
- ✅ **Eventos Padrão:** PageView, Lead, CompleteRegistration, ViewContent
- ✅ **Eventos Personalizados:** 9 eventos específicos implementados
- ✅ **Integração Analytics:** Sistema local + Meta Pixel sincronizados
- ✅ **Eventos Automáticos:** Scroll, tempo na página, saída
- ✅ **Documentação:** Completa e atualizada
- ✅ **Testes:** Prontos para validação

---

**🎯 O Meta Pixel está 100% implementado e pronto para otimizar suas campanhas publicitárias!**