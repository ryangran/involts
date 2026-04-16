import { Printer, Monitor, Gamepad2, Speaker, Wifi, Smartphone, Microwave } from 'lucide-react';
import protetorDigitalImg from '@/assets/protetor-digital.png';
import terraLuxImg from '@/assets/products/terra-lux.png';
import autoTransformadorImg from '@/assets/products/auto-transformador.png';
import filtroLinhaAbsImg from '@/assets/products/filtro-linha-abs.png';
import filtroMetalicoImg from '@/assets/products/filtro-metalico.png';
import protetorMultifuncionalImg from '@/assets/products/protetor-multifuncional.png';
import protetorBivoltImg from '@/assets/products/protetor-bivolt.png';
import moduloIsoladorImg from '@/assets/products/modulo-isolador.png';

export interface ProductIdeal {
  icon: string;
  label: string;
}

export interface ProductModel {
  name: string;
  type: 'mono' | 'bivolt';
}

export interface ProductSpecSheet {
  label: string;
  url: string;
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
  specSheets?: ProductSpecSheet[];
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
    image: terraLuxImg,
    gallery: [
      terraLuxImg,
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
    specSheet: undefined,
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
    image: autoTransformadorImg,
    gallery: [
      autoTransformadorImg,
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
    specSheet: '/autotransformador.pdf',
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
    image: filtroLinhaAbsImg,
    gallery: [
      filtroLinhaAbsImg,
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
    specSheet: '/filtro-linha-abs.pdf',
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
    image: filtroMetalicoImg,
    gallery: [
      filtroMetalicoImg,
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
    image: protetorMultifuncionalImg,
    gallery: [
      protetorMultifuncionalImg,
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
    specSheets: [
      { label: 'Lâmina 330 / 500 VA', url: '/protetor-multifuncional-330-500.pdf' },
      { label: 'Lâmina 600M / 600B', url: '/protetor-multifuncional-600.pdf' },
      { label: 'Lâmina 1000 VA', url: '/protetor-multifuncional-1000va.pdf' },
    ],
    highlight: true,
  },
  {
    id: 'protetor-bivolt',
    slug: 'protetor-bivolt',
    category: 'Protetores',
    categorySlug: 'protetores',
    name: 'Protetor Bivolt',
    subtitle: 'Bivolt Universal',
    description: 'Protetor eletrônico bivolt com tecnologia SMD para máxima proteção em 110V e 220V',
    fullDescription: 'O Protetor Bivolt Involts oferece proteção completa contra surtos, sobretensão e variações de rede em qualquer tensão. Com tecnologia SMD e detecção automática de voltagem, protege seus equipamentos sem necessidade de ajuste manual.',
    image: protetorBivoltImg,
    gallery: [protetorBivoltImg],
    features: ['Bivolt Automático', 'Tecnologia SMD', 'DPS Integrado'],
    characteristics: [
      'Detecção automática de tensão 110V/220V',
      'Proteção contra surtos e descargas atmosféricas',
      'Tecnologia SMD para maior durabilidade',
      'Indicador luminoso de operação',
      'Proteção contra sobrecorrente e sobrecarga',
      'Tomadas padrão NBR 14136',
    ],
    idealFor: [
      { icon: 'monitor', label: 'Computadores' },
      { icon: 'printer', label: 'Impressoras' },
      { icon: 'wifi', label: 'Modem e Roteador' },
      { icon: 'smartphone', label: 'Celular e Telefones' },
      { icon: 'gamepad', label: 'Games' },
    ],
    models: [
      { name: '1000B', type: 'bivolt' },
      { name: '1500B', type: 'bivolt' },
      { name: '2000B', type: 'bivolt' },
    ],
    specSheet: '/protetor-bivolt-lamina-tecnica.pdf',
    highlight: true,
  },
  {
    id: 'modulo-isolador',
    slug: 'modulo-isolador',
    category: 'Transformadores',
    categorySlug: 'autotransformadores',
    name: 'Módulo Isolador',
    subtitle: 'Isolamento Total',
    description: 'Módulo isolador para separação galvânica e proteção contra ruídos e interferências elétricas',
    fullDescription: 'O Módulo Isolador Involts garante isolamento galvânico total entre a rede elétrica e os equipamentos conectados, eliminando ruídos, interferências e protegendo contra choques elétricos. Disponível em 110V e 220V para atender toda instalação.',
    image: moduloIsoladorImg,
    gallery: [moduloIsoladorImg],
    features: ['Isolamento Galvânico', '110V e 220V', 'Anti-Ruído'],
    characteristics: [
      'Isolamento galvânico total',
      'Eliminação de ruídos e interferências RFI/EFI',
      'Proteção contra choques elétricos',
      'Núcleo de ferro silício de alta permeabilidade',
      'Bobinas com fio de cobre eletrolítico',
      'Protetor térmico contra sobrecarga',
    ],
    idealFor: [
      { icon: 'monitor', label: 'Equipamentos Médicos' },
      { icon: 'printer', label: 'Equipamentos Industriais' },
      { icon: 'speaker', label: 'Áudio Profissional' },
      { icon: 'wifi', label: 'Telecomunicações' },
    ],
    models: [
      { name: '500B 110V', type: 'mono' },
      { name: '500B 220V', type: 'mono' },
      { name: '1000B 110V', type: 'mono' },
      { name: '1000B 220V', type: 'mono' },
    ],
    specSheet: undefined,
    highlight: false,
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
    specSheet: '/protetor-digital.pdf',
    highlight: true,
  },
];

export const getProductBySlug = (slug: string): ProductData | undefined => {
  return productsData.find(p => p.slug === slug);
};

export const getRelatedProducts = (currentSlug: string, limit: number = 3): ProductData[] => {
  return productsData.filter(p => p.slug !== currentSlug).slice(0, limit);
};
