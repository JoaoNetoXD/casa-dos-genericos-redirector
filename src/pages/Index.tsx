import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logoCdg from "@/assets/logo-cdg.png";
import { trackVisit, trackButtonClick, trackRedirect, trackGroupAccess } from "@/utils/analytics";

const Index = () => {
  const [countdown, setCountdown] = useState(5);
  const whatsappGroupLink = "https://chat.whatsapp.com/G13Eb4jIgssEA7BbqaWhRi?mode=wwt";

  useEffect(() => {
    // Track visit when component mounts
    trackVisit();
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          trackRedirect();
          trackGroupAccess();
          window.location.href = whatsappGroupLink;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleJoinNow = () => {
    trackButtonClick();
    trackGroupAccess();
    window.location.href = whatsappGroupLink;
  };
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-6 md:p-10 shadow-xl animate-in fade-in duration-700 border-0">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoCdg} alt="Casa dos Genéricos" className="w-full max-w-md h-auto" />
        </div>

        {/* Countdown */}
        <div className="text-center mb-6 p-4 bg-white rounded-lg animate-in slide-in-from-top duration-500">
          <p className="text-sm text-card-foreground mb-1">
            Você será redirecionada em
          </p>
          <p className="text-4xl font-bold text-primary">
            {countdown}
          </p>
          <p className="text-sm text-card-foreground mt-1">
            segundos...
          </p>
        </div>

        {/* Título */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-3 text-foreground bg-white py-2 rounded-lg">
          Comunidade das Mães Inteligentes 💚
        </h1>

        {/* Mensagem de Boas-Vindas */}
        <p className="text-center text-sm md:text-base mb-6 text-foreground bg-white py-2 rounded-lg">
          Ofertas exclusivas, promoções e novidades direto no seu WhatsApp!
        </p>

        {/* Descrição do Grupo */}
        <div className="bg-white rounded-xl p-5 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="text-sm md:text-base text-card-foreground">
                  <strong className="font-semibold">Ofertas exclusivas</strong> antecipadas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💊</span>
              <div>
                <p className="text-sm md:text-base text-card-foreground">
                  <strong className="font-semibold">Promoções especiais</strong> Casa dos Genéricos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📌</span>
              <div>
                <p className="text-sm md:text-base text-card-foreground">
                  <strong className="font-semibold">Dicas de saúde</strong> e economia para sua família
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regras do Grupo */}
        

        {/* Botão de Ação */}
        <Button onClick={handleJoinNow} className="w-full text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-primary text-white" size="lg">
          Quero Participar Agora! 🚀
        </Button>

        {/* Rodapé */}
        <p className="text-center text-xs text-foreground bg-white py-2 px-4 rounded-lg mt-5 inline-block mx-auto">
          🔒 Suas informações são seguras e protegidas
        </p>
      </Card>
    </div>;
};
export default Index;