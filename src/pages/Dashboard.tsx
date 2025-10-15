import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MousePointer, Users, ArrowRight, BarChart3, RefreshCw } from "lucide-react";
import { trackDashboardAccess, trackAnalyticsView, trackViewContent } from "@/utils/metaPixel";

interface Analytics {
  totalVisits: number;
  redirectClicks: number;
  groupAccess: number;
  buttonClicks: number;
  lastVisit: string;
}

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalVisits: 0,
    redirectClicks: 0,
    groupAccess: 0,
    buttonClicks: 0,
    lastVisit: "Nunca"
  });

  const loadAnalytics = () => {
    const data = localStorage.getItem('analytics');
    if (data) {
      setAnalytics(JSON.parse(data));
    }
    
    // Track analytics view
    trackAnalyticsView('Dashboard Principal');
  };

  const clearAnalytics = () => {
    localStorage.removeItem('analytics');
    setAnalytics({
      totalVisits: 0,
      redirectClicks: 0,
      groupAccess: 0,
      buttonClicks: 0,
      lastVisit: "Nunca"
    });
    
    // Track analytics clear action
    trackAnalyticsView('Limpeza de Dados');
  };

  useEffect(() => {
    // Track dashboard access
    trackDashboardAccess();
    trackViewContent("Casa dos Genéricos - Dashboard Analytics", "Analytics");
    
    loadAnalytics();
  }, []);

  const conversionRate = analytics.totalVisits > 0 ? 
    ((analytics.groupAccess / analytics.totalVisits) * 100).toFixed(1) : 0;

  const clickRate = analytics.totalVisits > 0 ? 
    ((analytics.buttonClicks / analytics.totalVisits) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard de Analytics
            </h1>
            <p className="text-slate-600 mt-3 text-lg font-medium">
              Acompanhe o desempenho da sua página de redirecionamento
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={loadAnalytics} 
              variant="outline" 
              size="sm"
              className="bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 text-blue-700 shadow-md"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button 
              onClick={clearAnalytics} 
              variant="destructive" 
              size="sm"
              className="bg-red-500 hover:bg-red-600 shadow-md"
            >
              Limpar Dados
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Total de Visitas</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{analytics.totalVisits}</div>
              <p className="text-xs text-slate-500">
                Visitantes únicos na página
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Cliques no Botão</CardTitle>
              <MousePointer className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{analytics.buttonClicks}</div>
              <p className="text-xs text-slate-500">
                Taxa de clique: {clickRate}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Redirecionamentos</CardTitle>
              <ArrowRight className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{analytics.redirectClicks}</div>
              <p className="text-xs text-slate-500">
                Redirecionamentos automáticos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Acesso ao Grupo</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{analytics.groupAccess}</div>
              <p className="text-xs text-slate-500">
                Taxa de conversão: {conversionRate}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Resumo de Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Taxa de Conversão</span>
                <span className="text-sm font-bold text-blue-600">{conversionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Taxa de Clique</span>
                <span className="text-sm font-bold text-blue-600">{clickRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Última Visita</span>
                <span className="text-sm text-slate-500">{analytics.lastVisit}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-700">Informações do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Status</span>
                <span className="text-sm font-bold text-green-600">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Armazenamento</span>
                <span className="text-sm text-slate-500">Local Storage</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Versão</span>
                <span className="text-sm text-slate-500">1.0.0</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-slate-50 text-slate-700 shadow-md"
          >
            Voltar para a Página Principal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;