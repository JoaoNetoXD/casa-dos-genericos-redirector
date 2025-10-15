# Deploy na Vercel - Casa dos Genéricos

Este guia explica como fazer o deploy do projeto na Vercel.

## Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Projeto no GitHub, GitLab ou Bitbucket
3. Node.js instalado localmente (para testes)

## Passos para Deploy

### 1. Preparar o Projeto

O projeto já está configurado com:
- ✅ `vercel.json` - Configurações de deploy
- ✅ Scripts de build no `package.json`
- ✅ Configurações de roteamento SPA
- ✅ Variáveis de ambiente de exemplo

### 2. Fazer Upload para Git

```bash
git init
git add .
git commit -m "Initial commit - Casa dos Genéricos Redirector"
git branch -M main
git remote add origin <SEU_REPOSITORIO_GIT>
git push -u origin main
```

### 3. Deploy na Vercel

#### Opção A: Via Dashboard da Vercel
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Conecte seu repositório Git
4. Selecione o repositório do projeto
5. Configure as seguintes opções:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Opção B: Via CLI da Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. Configurar Variáveis de Ambiente (Opcional)

No dashboard da Vercel, vá em:
1. Settings → Environment Variables
2. Adicione as variáveis necessárias:
   - `VITE_WHATSAPP_GROUP_URL`
   - `VITE_ANALYTICS_ENABLED`

### 5. Configurações Importantes

O arquivo `vercel.json` já inclui:
- Redirecionamento SPA para React Router
- Headers de segurança
- Configurações de cache

## Funcionalidades do Projeto

### Página Principal (`/`)
- Redirecionamento automático para WhatsApp
- Contador regressivo
- Design responsivo
- Rastreamento de analytics

### Dashboard de Analytics (`/dashboard`)
- Visualização de métricas
- Total de visitas
- Taxa de conversão
- Cliques no botão
- Redirecionamentos automáticos

### Analytics Implementados
- **Visitas**: Contabiliza cada acesso à página
- **Cliques no Botão**: Rastreia cliques manuais
- **Redirecionamentos**: Conta redirecionamentos automáticos
- **Acesso ao Grupo**: Rastreia quantos chegaram ao WhatsApp
- **Armazenamento**: Local Storage (persiste entre sessões)

## URLs Importantes

Após o deploy, você terá:
- **Página Principal**: `https://seu-projeto.vercel.app/`
- **Dashboard**: `https://seu-projeto.vercel.app/dashboard`

## Monitoramento

Para acessar o dashboard de analytics:
1. Acesse `https://seu-projeto.vercel.app/dashboard`
2. Visualize as métricas em tempo real
3. Use o botão "Atualizar" para refresh dos dados
4. Use "Limpar Dados" para resetar as estatísticas

## Customizações Futuras

Para personalizar o projeto:
1. **Link do WhatsApp**: Edite em `src/pages/Index.tsx`
2. **Tempo do contador**: Modifique `useState(5)` em `Index.tsx`
3. **Cores e design**: Ajuste em `src/index.css`
4. **Analytics**: Adicione novos eventos em `src/utils/analytics.ts`

## Suporte

Em caso de problemas:
1. Verifique os logs no dashboard da Vercel
2. Teste localmente com `npm run build && npm run preview`
3. Verifique se todas as dependências estão instaladas
4. Confirme se o `vercel.json` está configurado corretamente

## Estrutura de Arquivos

```
src/
├── pages/
│   ├── Index.tsx          # Página principal
│   ├── Dashboard.tsx      # Painel de analytics
│   └── NotFound.tsx       # Página 404
├── utils/
│   └── analytics.ts       # Funções de rastreamento
├── components/ui/         # Componentes do shadcn/ui
└── assets/               # Imagens e recursos
```

---

**Projeto pronto para produção! 🚀**