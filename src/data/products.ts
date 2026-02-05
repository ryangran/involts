import { Printer, Monitor, Gamepad2, Speaker, Wifi, Smartphone, Microwave } from 'lucide-react';
import protetorDigitalImg from '@/assets/protetor-digital.png';

export interface ProductIdeal {
  icon: string;
  label: string;
}

export interface ProductModel {
  name: string;
  type: 'mono' | 'bivolt';
}

export interface ProductData {
  id: string;
  slug: string;
  category: string;
  categorySlug: string;
  name: string;
  subtitle: string;
  description: string;
  fullDescription?: string;
  image: string;
  gallery: string[];
  features: string[];
  characteristics: string[];
  idealFor: ProductIdeal[];
  models?: ProductModel[];
  specSheet?: string;
  highlight?: boolean;
}

export const productsData: ProductData[] = [
  {
    id: 'terra-lux',
    slug: 'terra-lux',
    category: 'Aterramento',
    categorySlug: 'aterramento',
    name: 'Terra Lux',
    subtitle: 'Aterramento Involts',
    description: 'Sistema de aterramento inteligente para proteção completa dos seus equipamentos eletrônicos',
    fullDescription: 'O Terra Lux é a solução definitiva em aterramento para seus equipamentos eletrônicos. Desenvolvido com tecnologia de ponta, oferece proteção completa contra surtos e interferências, garantindo a longevidade dos seus dispositivos.',
    image: 'https://involtsbrasil.com.br/images/two-power-plug.png',
    gallery: [
      'https://involtsbrasil.com.br/images/two-power-plug.png',
    ],
    features: ['Proteção Completa', 'Fácil Instalação', 'Certificado INMETRO'],
    characteristics: [
      'Filtro de Linha integrado',
      'Protetor de surtos',
      'Sensor de Terra',
      'Indicador de rede presente',
    ],
    idealFor: [
      { icon: 'printer', label: 'Impressoras' },
      { icon: 'monitor', label: 'Computadores' },
      { icon: 'gamepad', label: 'Games' },
      { icon: 'speaker', label: 'Sons/Amplificadores' },
      { icon: 'wifi', label: 'Modem e Roteador' },
      { icon: 'smartphone', label: 'Celular e Telefones' },
    ],
    specSheet: 'https://involtsbrasil.com.br/files/terralux.jpg',
    highlight: true,
  },
  {
    id: 'auto-transformador',
    slug: 'auto-transformador',
    category: 'Transformadores',
    categorySlug: 'autotransformadores',
    name: 'Auto Transformador',
    subtitle: 'Linha Premium',
    description: 'Conversão de voltagem com máxima eficiência e proteção térmica integrada',
    fullDescription: 'O Auto Transformador Involts oferece conversão de voltagem segura e eficiente, disponível em modelos de 100 a 5000 VA. Ideal para equipamentos que necessitam de tensão diferente da rede elétrica local.',
    image: 'https://involtsbrasil.com.br/images/produto3.png',
    gallery: [
      'https://involtsbrasil.com.br/images/produto3.png',
    ],
    features: ['100 a 5000 VA', '110V/220V', 'Proteção Térmica'],
    characteristics: [
      'Protetor térmico de sobrecarga',
      'Bivolt Universal 115 ou 220 Vac',
      'Caneca de Proteção em ABS anti-chama',
      'Cabos e Tomadas padrão NBR 14136',
      'Tomada bipolar ou tripolar',
    ],
    idealFor: [
      { icon: 'printer', label: 'Impressoras' },
      { icon: 'monitor', label: 'Computadores' },
      { icon: 'microwave', label: 'Eletrodomésticos' },
    ],
    specSheet: 'https://involtsbrasil.com.br/files/autotrasnformador.jpg',
    highlight: false,
  },
  {
    id: 'filtro-linha-abs',
    slug: 'filtro-linha-abs',
    category: 'Filtros de Linha',
    categorySlug: 'filtro-de-linha',
    name: 'Filtro de Linha ABS',
    subtitle: 'Proteção Essencial',
    description: 'Proteção inteligente contra surtos com design moderno e compacto',
    fullDescription: 'O Filtro de Linha ABS oferece proteção completa contra surtos de tensão e interferências eletromagnéticas. Disponível em modelos de 3, 4, 5, 6 e 10 tomadas para atender todas as suas necessidades.',
    image: 'https://involtsbrasil.com.br/images/filtro-normal.png',
    gallery: [
      'https://involtsbrasil.com.br/images/filtro-normal.png',
    ],
    features: ['3 a 10 Tomadas', 'Proteção DPS', 'Design Moderno'],
    characteristics: [
      'Protetor contra surtos de tensão e filtro contra RFI/EFI',
      'Fabricado em plástico ABS autoimpacto',
      'Porta fusível externo',
      'Indicador luminoso de filtro em operação',
      'Cabos e Tomadas padrão NBR 14136',
      'Chave liga/desliga',
    ],
    idealFor: [
      { icon: 'printer', label: 'Impressoras' },
      { icon: 'monitor', label: 'Computadores' },
      { icon: 'smartphone', label: 'Eletrônicos' },
    ],
    specSheet: 'https://involtsbrasil.com.br/files/filtro-de-linha.jpg',
    highlight: true,
  },
  {
    id: 'filtro-metalico-20a',
    slug: 'filtro-metalico-20a',
    category: 'Filtros de Linha',
    categorySlug: 'filtro-de-linha',
    name: 'Filtro Metálico 20A',
    subtitle: 'Alta Potência',
    description: 'Estrutura robusta em metal para ambientes profissionais e alta demanda',
    fullDescription: 'O Filtro Metálico 20A foi projetado para ambientes que exigem alta potência e durabilidade. Com estrutura totalmente metálica, oferece proteção profissional para seus equipamentos.',
    image: 'https://involtsbrasil.com.br/images/filtrometal.png',
    gallery: [
      'https://involtsbrasil.com.br/images/filtrometal.png',
    ],
    features: ['20A', '5 Tomadas', 'Estrutura Metálica'],
    characteristics: [
      'Estrutura metálica resistente',
      'Capacidade de 20 Amperes',
      '5 tomadas padrão NBR 14136',
      'Ideal para uso profissional',
      'Proteção contra surtos',
    ],
    idealFor: [
      { icon: 'monitor', label: 'Equipamentos Profissionais' },
      { icon: 'printer', label: 'Impressoras' },
    ],
    highlight: false,
  },
  {
    id: 'protetor-multifuncional',
    slug: 'protetor-multifuncional',
    category: 'Protetores',
    categorySlug: 'protetores',
    name: 'Protetor Multifuncional',
    subtitle: 'Proteção Total',
    description: 'Proteção completa contra surtos, raios e oscilações de energia',
    fullDescription: 'O Protetor Multifuncional foi desenvolvido e testado em laboratório para garantir qualidade e fornecimento confiável de energia elétrica protegida e filtrada, aumentando assim a vida útil dos equipamentos a ele conectados.',
    image: 'https://involtsbrasil.com.br/images/a9d35e8e2616ac9f7bcf689276694614493.png',
    gallery: [
      'https://involtsbrasil.com.br/images/a9d35e8e2616ac9f7bcf689276694614493.png',
    ],
    features: ['Multifuncional', 'DPS Integrado', 'Indicador LED'],
    characteristics: [
      'Proteger contra curto circuito na saída',
      'Proteger contra surtos e tensão',
      'Proteger de sobre corrente',
      'Proteger de sobre aquecimento',
      'Proteger contra descargas atmosféricas',
    ],
    idealFor: [
      { icon: 'printer', label: 'Impressoras' },
      { icon: 'monitor', label: 'Computadores' },
      { icon: 'wifi', label: 'Modem e Roteador' },
      { icon: 'smartphone', label: 'Celular e Telefones' },
    ],
    models: [
      { name: '330 Mono 110V', type: 'mono' },
      { name: '330 Mono 220V', type: 'mono' },
      { name: '500 Mono 110V', type: 'mono' },
      { name: '500 Mono 220V', type: 'mono' },
      { name: '1000 Mono 110V', type: 'mono' },
      { name: '1000 Mono 220V', type: 'mono' },
      { name: '330 Bivolt', type: 'bivolt' },
      { name: '500 Bivolt', type: 'bivolt' },
      { name: '600 Bivolt', type: 'bivolt' },
    ],
    specSheet: 'https://involtsbrasil.com.br/files/protetor-multi.jpeg',
    highlight: true,
  },
  {
    id: 'protetor-digital',
    slug: 'protetor-digital',
    category: 'Protetores',
    categorySlug: 'protetores',
    name: 'Protetor Digital',
    subtitle: 'Controle Inteligente',
    description: 'Protetor com delay ajustável e controle digital de tensão para máxima segurança',
    fullDescription: 'O Protetor Digital oferece controle preciso com delay ajustável de 5 a 999 segundos e ajuste de sub e sobre tensão. Ideal para equipamentos sensíveis que necessitam de proteção personalizada contra variações de energia.',
    image: protetorDigitalImg,
    gallery: [
      protetorDigitalImg,
    ],
    features: ['Delay 5-999s', 'Ajuste de Tensão', 'Display Digital'],
    characteristics: [
      'Delay ajustável de 5 a 999 segundos',
      'Ajuste de sub tensão configurável',
      'Ajuste de sobre tensão configurável',
      'Display digital para monitoramento',
      'Proteção contra variações de energia',
      'Design compacto e moderno',
    ],
    idealFor: [
      { icon: 'monitor', label: 'Computadores' },
      { icon: 'printer', label: 'Impressoras' },
      { icon: 'microwave', label: 'Eletrodomésticos' },
      { icon: 'wifi', label: 'Modem e Roteador' },
    ],
    models: [
      { name: '110V', type: 'mono' },
      { name: '220V', type: 'mono' },
    ],
    highlight: true,
  },
];

export const getProductBySlug = (slug: string): ProductData | undefined => {
  return productsData.find(p => p.slug === slug);
};

export const getRelatedProducts = (currentSlug: string, limit: number = 3): ProductData[] => {
  return productsData.filter(p => p.slug !== currentSlug).slice(0, limit);
};
