import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { BrazilMap } from '@/components/BrazilMap';
import { MapPin, Phone, Clock, Navigation, Search, Building2, Wrench, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Dados fictícios de assistências técnicas por estado
const assistenciasData: Record<string, Array<{
  nome: string;
  endereco: string;
  cidade: string;
  telefone: string;
  horario: string;
  certificada: boolean;
}>> = {
  'AC': [
    { nome: 'Rio Branco Eletro Service', endereco: 'Av. Ceará, 1500 - Centro', cidade: 'Rio Branco', telefone: '(68) 3223-4567', horario: '08h às 17h', certificada: true },
  ],
  'AL': [
    { nome: 'Maceió Tech Assistência', endereco: 'Av. Fernandes Lima, 800', cidade: 'Maceió', telefone: '(82) 3336-7890', horario: '08h às 18h', certificada: true },
  ],
  'AP': [
    { nome: 'Macapá Eletro Fix', endereco: 'Av. FAB, 1200 - Centro', cidade: 'Macapá', telefone: '(96) 3223-4567', horario: '08h às 17h', certificada: true },
  ],
  'AM': [
    { nome: 'Manaus Tech Service', endereco: 'Av. Eduardo Ribeiro, 500 - Centro', cidade: 'Manaus', telefone: '(92) 3234-5678', horario: '08h às 18h', certificada: true },
    { nome: 'Amazonas Eletro Assistência', endereco: 'Av. Djalma Batista, 1000', cidade: 'Manaus', telefone: '(92) 3456-7890', horario: '09h às 17h', certificada: false },
  ],
  'BA': [
    { nome: 'Salvador Eletro Service', endereco: 'Av. Sete de Setembro, 1500', cidade: 'Salvador', telefone: '(71) 3456-7890', horario: '08h às 17h', certificada: true },
    { nome: 'Feira Tech Fix', endereco: 'Av. Getúlio Vargas, 800', cidade: 'Feira de Santana', telefone: '(75) 3221-4567', horario: '08h às 18h', certificada: true },
  ],
  'CE': [
    { nome: 'Fortaleza Eletro Assistência', endereco: 'Av. Beira Mar, 1000', cidade: 'Fortaleza', telefone: '(85) 3456-7890', horario: '08h às 17h', certificada: true },
    { nome: 'Ceará Tech Service', endereco: 'Av. Dom Luís, 500', cidade: 'Fortaleza', telefone: '(85) 3234-5678', horario: '09h às 18h', certificada: true },
  ],
  'DF': [
    { nome: 'Brasília Eletro Fix', endereco: 'SCS Quadra 1, Bloco A', cidade: 'Brasília', telefone: '(61) 3456-7890', horario: '08h às 18h', certificada: true },
    { nome: 'Taguatinga Tech Service', endereco: 'QNA 15, Loja 30', cidade: 'Taguatinga', telefone: '(61) 3352-4567', horario: '08h às 17h', certificada: true },
  ],
  'ES': [
    { nome: 'Vitória Eletro Assistência', endereco: 'Av. Nossa Senhora da Penha, 1500', cidade: 'Vitória', telefone: '(27) 3345-6789', horario: '08h às 18h', certificada: true },
    { nome: 'Vila Velha Tech Fix', endereco: 'Av. Champagnat, 800', cidade: 'Vila Velha', telefone: '(27) 3229-4567', horario: '08h às 17h', certificada: true },
  ],
  'GO': [
    { nome: 'Goiânia Tech Service', endereco: 'Av. 85, 500 - Setor Marista', cidade: 'Goiânia', telefone: '(62) 3456-7890', horario: '08h às 18h', certificada: true },
    { nome: 'Anápolis Eletro Fix', endereco: 'Av. Brasil, 1200', cidade: 'Anápolis', telefone: '(62) 3321-4567', horario: '08h às 17h', certificada: true },
  ],
  'MA': [
    { nome: 'São Luís Eletro Service', endereco: 'Av. Colares Moreira, 500', cidade: 'São Luís', telefone: '(98) 3235-6789', horario: '08h às 17h', certificada: true },
  ],
  'MT': [
    { nome: 'Cuiabá Tech Assistência', endereco: 'Av. do CPA, 1000', cidade: 'Cuiabá', telefone: '(65) 3624-5678', horario: '08h às 18h', certificada: true },
    { nome: 'Rondonópolis Eletro Fix', endereco: 'Av. Lions Internacional, 800', cidade: 'Rondonópolis', telefone: '(66) 3423-4567', horario: '08h às 17h', certificada: true },
  ],
  'MS': [
    { nome: 'Campo Grande Eletro Service', endereco: 'Av. Afonso Pena, 2000', cidade: 'Campo Grande', telefone: '(67) 3325-6789', horario: '08h às 18h', certificada: true },
    { nome: 'Dourados Tech Fix', endereco: 'Av. Marcelino Pires, 1500', cidade: 'Dourados', telefone: '(67) 3421-4567', horario: '08h às 17h', certificada: true },
  ],
  'MG': [
    { nome: 'BH Eletro Service', endereco: 'Av. Afonso Pena, 1500 - Centro', cidade: 'Belo Horizonte', telefone: '(31) 3456-7890', horario: '08h às 18h', certificada: true },
    { nome: 'Uberlândia Tech Fix', endereco: 'Av. Rondon Pacheco, 800', cidade: 'Uberlândia', telefone: '(34) 3234-5678', horario: '08h às 17h', certificada: true },
    { nome: 'Juiz de Fora Eletro', endereco: 'Av. Rio Branco, 2000', cidade: 'Juiz de Fora', telefone: '(32) 3215-4567', horario: '09h às 18h', certificada: true },
  ],
  'PA': [
    { nome: 'Belém Eletro Assistência', endereco: 'Av. Presidente Vargas, 1000', cidade: 'Belém', telefone: '(91) 3224-5678', horario: '08h às 17h', certificada: true },
    { nome: 'Santarém Tech Fix', endereco: 'Av. Rui Barbosa, 500', cidade: 'Santarém', telefone: '(93) 3522-4567', horario: '08h às 17h', certificada: true },
  ],
  'PB': [
    { nome: 'João Pessoa Eletro Service', endereco: 'Av. Epitácio Pessoa, 1500', cidade: 'João Pessoa', telefone: '(83) 3244-5678', horario: '08h às 18h', certificada: true },
    { nome: 'Campina Grande Tech', endereco: 'Av. Floriano Peixoto, 800', cidade: 'Campina Grande', telefone: '(83) 3321-4567', horario: '08h às 17h', certificada: true },
  ],
  'PR': [
    { nome: 'Curitiba Tech Service', endereco: 'Rua XV de Novembro, 1000', cidade: 'Curitiba', telefone: '(41) 3234-5678', horario: '08h às 17h', certificada: true },
    { nome: 'Londrina Eletro Fix', endereco: 'Av. Higienópolis, 300', cidade: 'Londrina', telefone: '(43) 3322-4455', horario: '09h às 18h', certificada: true },
    { nome: 'Maringá Tech Assistência', endereco: 'Av. Brasil, 2000', cidade: 'Maringá', telefone: '(44) 3225-6789', horario: '08h às 18h', certificada: true },
  ],
  'PE': [
    { nome: 'Recife Tech Fix', endereco: 'Av. Boa Viagem, 500', cidade: 'Recife', telefone: '(81) 3456-7890', horario: '08h às 18h', certificada: true },
    { nome: 'Caruaru Eletro Service', endereco: 'Av. Agamenon Magalhães, 1000', cidade: 'Caruaru', telefone: '(81) 3721-4567', horario: '08h às 17h', certificada: true },
  ],
  'PI': [
    { nome: 'Teresina Eletro Assistência', endereco: 'Av. Frei Serafim, 1500', cidade: 'Teresina', telefone: '(86) 3221-5678', horario: '08h às 17h', certificada: true },
  ],
  'RJ': [
    { nome: 'Rio Eletro Assistência', endereco: 'Rua da Assembleia, 100 - Centro', cidade: 'Rio de Janeiro', telefone: '(21) 2345-6789', horario: '08h às 17h', certificada: true },
    { nome: 'Niterói Tech Service', endereco: 'Av. Amaral Peixoto, 300', cidade: 'Niterói', telefone: '(21) 2622-3456', horario: '09h às 18h', certificada: true },
    { nome: 'Campos dos Goytacazes Eletro', endereco: 'Av. 28 de Março, 800', cidade: 'Campos dos Goytacazes', telefone: '(22) 2733-4567', horario: '08h às 17h', certificada: true },
  ],
  'RN': [
    { nome: 'Natal Eletro Service', endereco: 'Av. Engenheiro Roberto Freire, 1000', cidade: 'Natal', telefone: '(84) 3211-5678', horario: '08h às 18h', certificada: true },
    { nome: 'Mossoró Tech Fix', endereco: 'Av. Presidente Dutra, 500', cidade: 'Mossoró', telefone: '(84) 3315-4567', horario: '08h às 17h', certificada: true },
  ],
  'RS': [
    { nome: 'Porto Alegre Eletro', endereco: 'Av. Borges de Medeiros, 500', cidade: 'Porto Alegre', telefone: '(51) 3456-7890', horario: '08h às 18h', certificada: true },
    { nome: 'Caxias do Sul Tech', endereco: 'Rua Sinimbu, 1000', cidade: 'Caxias do Sul', telefone: '(54) 3221-4567', horario: '08h às 17h', certificada: true },
    { nome: 'Pelotas Eletro Fix', endereco: 'Av. Bento Gonçalves, 800', cidade: 'Pelotas', telefone: '(53) 3225-6789', horario: '09h às 18h', certificada: true },
  ],
  'RO': [
    { nome: 'Porto Velho Eletro Service', endereco: 'Av. Sete de Setembro, 1500', cidade: 'Porto Velho', telefone: '(69) 3224-5678', horario: '08h às 17h', certificada: true },
  ],
  'SC': [
    { nome: 'Floripa Assistência Técnica', endereco: 'Av. Beira Mar Norte, 800', cidade: 'Florianópolis', telefone: '(48) 3456-7890', horario: '08h às 18h', certificada: true },
    { nome: 'Joinville Tech Service', endereco: 'Rua do Príncipe, 500', cidade: 'Joinville', telefone: '(47) 3433-4567', horario: '08h às 17h', certificada: true },
    { nome: 'Blumenau Eletro Fix', endereco: 'Rua XV de Novembro, 1000', cidade: 'Blumenau', telefone: '(47) 3322-6789', horario: '09h às 18h', certificada: true },
  ],
  'SP': [
    { nome: 'TechFix São Paulo Centro', endereco: 'Av. Paulista, 1000 - Bela Vista', cidade: 'São Paulo', telefone: '(11) 3456-7890', horario: '08h às 18h', certificada: true },
    { nome: 'Eletro Service Campinas', endereco: 'Rua Barão de Jaguara, 500', cidade: 'Campinas', telefone: '(19) 3234-5678', horario: '08h às 17h', certificada: true },
    { nome: 'Involts Assistência Ribeirão', endereco: 'Av. Francisco Junqueira, 1200', cidade: 'Ribeirão Preto', telefone: '(16) 3621-4567', horario: '09h às 18h', certificada: true },
    { nome: 'Santos Tech Fix', endereco: 'Av. Ana Costa, 800', cidade: 'Santos', telefone: '(13) 3219-4567', horario: '08h às 17h', certificada: true },
    { nome: 'Sorocaba Eletro', endereco: 'Av. General Carneiro, 500', cidade: 'Sorocaba', telefone: '(15) 3233-6789', horario: '08h às 18h', certificada: true },
  ],
  'SE': [
    { nome: 'Aracaju Eletro Assistência', endereco: 'Av. Beira Mar, 1000', cidade: 'Aracaju', telefone: '(79) 3211-5678', horario: '08h às 17h', certificada: true },
  ],
  'TO': [
    { nome: 'Palmas Tech Service', endereco: 'Av. JK, Quadra 104 Sul', cidade: 'Palmas', telefone: '(63) 3215-4567', horario: '08h às 18h', certificada: true },
  ],
};

const estadosNomes: Record<string, string> = {
  AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia',
  CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás',
  MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
  PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
  RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul',
  RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
  SE: 'Sergipe', TO: 'Tocantins'
};

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-primary/20 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 40 - 20],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const Assistencia = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredEstado, setHoveredEstado] = useState<string | null>(null);

  const assistencias = estadoSelecionado ? assistenciasData[estadoSelecionado] || [] : [];
  const statesWithData = Object.keys(assistenciasData);

  const filteredAssistencias = assistencias.filter(a => 
    a.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAssistencias = Object.values(assistenciasData).flat().length;
  const estadosAtendidos = Object.keys(assistenciasData).length;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ left: `${10 + i * 12}%`, top: '60%' }} className="absolute">
                <FloatingParticle delay={i * 0.3} />
              </div>
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm">Cobertura Nacional</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground mb-6">
                Rede de{' '}
                <span className="text-gradient">Assistência</span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-12">
                Selecione o estado no mapa interativo e encontre a assistência técnica 
                autorizada Involts mais próxima de você.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {[
                  { value: `${totalAssistencias}+`, label: 'Assistências', icon: Building2 },
                  { value: `${estadosAtendidos}`, label: 'Estados', icon: MapPin },
                  { value: '24h', label: 'Resposta Média', icon: Clock },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <stat.icon className="w-5 h-5 text-primary" />
                      <span className="text-3xl md:text-4xl font-display font-bold text-foreground">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-sm text-foreground/50">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Interactive Map */}
              <AnimatedSection animation="slideLeft">
                <div className="relative">
                  <div className="bg-card border border-border rounded-3xl p-6 md:p-8 relative overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                    
                    <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                      <Navigation className="w-6 h-6 text-primary" />
                      Selecione seu Estado
                    </h2>

                    {/* Brazil Map */}
                    <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl overflow-hidden" style={{ minHeight: '400px' }}>
                      <BrazilMap
                        onStateClick={setEstadoSelecionado}
                        selectedState={estadoSelecionado}
                        hoveredState={hoveredEstado}
                        onStateHover={setHoveredEstado}
                        statesWithData={statesWithData}
                      />
                      
                      {/* Tooltip for hovered state */}
                      <AnimatePresence>
                        {hoveredEstado && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background border border-border rounded-xl px-4 py-2 shadow-xl z-20"
                          >
                            <p className="text-sm font-medium text-foreground">{estadosNomes[hoveredEstado]}</p>
                            {statesWithData.includes(hoveredEstado) ? (
                              <p className="text-xs text-primary">
                                {assistenciasData[hoveredEstado]?.length || 0} assistência(s)
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">Em breve</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary" />
                        <span className="text-sm text-foreground/60">Com assistência</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-muted" />
                        <span className="text-sm text-foreground/60">Em breve</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Results Panel */}
              <AnimatedSection animation="slideRight">
                <div className="bg-card border border-border rounded-3xl overflow-hidden sticky top-24">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-display font-bold text-primary-foreground">
                          {estadoSelecionado 
                            ? `Assistências em ${estadosNomes[estadoSelecionado]}` 
                            : 'Selecione um Estado'}
                        </h3>
                        <p className="text-primary-foreground/80 text-sm mt-1">
                          {estadoSelecionado 
                            ? `${filteredAssistencias.length} resultado(s) encontrado(s)`
                            : 'Clique em um estado no mapa'}
                        </p>
                      </div>
                      {estadoSelecionado && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        >
                          <span className="text-2xl font-display font-bold text-primary-foreground">
                            {estadoSelecionado}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Search */}
                    {estadoSelecionado && assistencias.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 relative"
                      >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                        <Input
                          placeholder="Buscar por cidade ou nome..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Results List */}
                  <div className="p-6 max-h-[500px] overflow-y-auto">
                    <AnimatePresence mode="wait">
                      {!estadoSelecionado ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-12"
                        >
                          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-10 h-10 text-primary" />
                          </div>
                          <p className="text-foreground/60">
                            Selecione um estado no mapa para ver as assistências disponíveis
                          </p>
                        </motion.div>
                      ) : filteredAssistencias.length === 0 ? (
                        <motion.div
                          key="no-results"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-12"
                        >
                          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Wrench className="w-10 h-10 text-muted-foreground" />
                          </div>
                          <p className="text-foreground/60 mb-4">
                            {searchTerm 
                              ? 'Nenhuma assistência encontrada para sua busca'
                              : 'Em breve teremos assistências neste estado!'
                            }
                          </p>
                          <Button variant="outline" onClick={() => setEstadoSelecionado(null)}>
                            Selecionar outro estado
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="results"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                        >
                          {filteredAssistencias.map((assistencia, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              className="group bg-background border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {assistencia.nome}
                                    </h4>
                                    {assistencia.certificada && (
                                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 text-xs font-medium px-2 py-0.5 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Certificada
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-foreground/60">{assistencia.cidade}</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span>{assistencia.endereco}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span>{assistencia.telefone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span>{assistencia.horario}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          
          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Não encontrou uma assistência próxima?
              </h2>
              <p className="text-foreground/60 mb-8">
                Entre em contato conosco e te ajudaremos a encontrar a melhor solução para seu atendimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Phone className="w-5 h-5 mr-2" />
                  Fale Conosco
                </Button>
                <Button size="lg" variant="outline">
                  Seja uma Assistência Autorizada
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Assistencia;
