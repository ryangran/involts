# CLAUDE.md — Involts Brasil

## Regra obrigatória: sempre fazer commit + push após qualquer alteração

Após **qualquer modificação** nos arquivos do projeto, execute obrigatoriamente:

```bash
git add <arquivos alterados>
git commit -m "descrição da alteração"
git push origin main
```

**Por quê:** O projeto está hospedado no Lovable (lovable.dev), que sincroniza diretamente com o repositório GitHub `ryangran/involts`. Sem o push, as mudanças ficam apenas na máquina local e **não aparecem no Lovable**.

---

## Stack do projeto

- **Framework:** React 18 + Vite + TypeScript
- **Estilização:** Tailwind CSS v3 + classes customizadas em `src/index.css`
- **Animações:** Framer Motion v12
- **Componentes UI:** shadcn/ui (Radix UI)
- **Roteamento:** React Router DOM v6
- **Backend:** Supabase (leads de revendedores)
- **Gerenciador de pacotes:** npm (tem `bun.lockb` mas usar npm)

## Design System — "Industrial Grid"

### Paleta de cores (CSS vars em `src/index.css`)
- **Background:** `hsl(220, 40%, 5%)` — azul-preto naval, não puro preto
- **Card:** `hsl(220, 32%, 8%)`
- **Primary (laranja industrial):** `hsl(22, 76%, 42%)` — saturação ≤ 80%
- **Secondary (âmbar):** `hsl(36, 64%, 48%)`
- **Foreground:** `hsl(210, 22%, 90%)` — branco frio
- **Muted foreground:** `hsl(215, 14%, 48%)`

### Tipografia
- **Display/Headings:** `Barlow Condensed` (classe Tailwind: `font-display`)
- **Body:** `DM Sans` (classe Tailwind: `font-sans`)
- **Mono/Números/Specs:** `JetBrains Mono` (classe Tailwind: `font-mono`)
- **NUNCA usar:** Inter, Space Grotesk, Arial, Roboto

### Classes utilitárias customizadas (`src/index.css`)
- `.circuit-grid` — padrão de grid técnico para backgrounds
- `.glass-panel` — glassmorphism com refração interna
- `.tech-badge` — badge monospace para labels técnicos
- `.btn-primary` / `.btn-secondary` — botões do sistema (não usar `rounded-full`)
- `.section-label` — rótulo de seção em monospace uppercase
- `.stat-number` — números de métricas em JetBrains Mono
- `.product-card` — card de produto estilo industrial
- `.animate-marquee` — ticker/marquee infinito
- `.animate-pulse-dot` — ponto pulsante (status ativo)

### Anti-padrões proibidos
- **NÃO** usar floating orbs / gradiente radial genérico como fundo
- **NÃO** usar `box-shadow` externo brilhante em botões (glow)
- **NÃO** usar grid de 3 ou 4 colunas **iguais** para features/cards
- **NÃO** usar hero section 100% centralizado (usar split-screen)
- **NÃO** usar `h-screen` — sempre `min-h-[100dvh]`
- **NÃO** usar `Math.random()` em animações de componentes React
- **NÃO** usar ChevronDown bouncing como scroll indicator

## Estrutura de arquivos importantes

```
src/
├── components/
│   ├── CustomCursor.tsx    # Cursor crosshair de precisão
│   ├── Header.tsx          # Header com glass + active route
│   ├── HeroSection.tsx     # Split-screen 58/42 com vídeo
│   ├── ProductsSection.tsx # Carousel infinito de produtos
│   ├── FeaturesSection.tsx # Stats 2x2 + ticker de certificações
│   ├── CTASection.tsx      # Layout assimétrico 60/40
│   ├── Footer.tsx          # Footer técnico com links animados
│   └── AnimatedSection.tsx # Wrapper de animações scroll
├── assets/
│   ├── logo.svg / logo-2.svg
│   ├── protetor-eletronico-involts.mp4  # Vídeo do hero
│   └── products/*.png                   # Imagens dos produtos
├── data/products.ts         # Dados dos 6 produtos
├── pages/
│   ├── Index.tsx            # Home (inclui CustomCursor)
│   ├── Produtos.tsx         # Catálogo com filtro por categoria
│   ├── ProductDetail.tsx    # Detalhe de produto
│   ├── Assistencia.tsx      # Rede de assistência técnica
│   ├── Contato.tsx          # Formulário de contato
│   ├── Revendedor.tsx       # Formulário seja revendedor
│   └── SobreNos.tsx         # Sobre a empresa
└── index.css               # Design tokens + classes customizadas
```

## Rotas disponíveis
- `/` — Home
- `/sobre` — Sobre a Involts
- `/produtos` — Catálogo (suporta `?categoria=protetores|filtro-de-linha|autotransformadores|aterramento`)
- `/produto/:slug` — Detalhe do produto
- `/assistencia` — Rede de assistência
- `/contato` — Contato
- `/revendedor` — Seja Revendedor
- `/admin/login` e `/admin/leads` — Painel administrativo (Supabase)

## Produtos cadastrados
1. Terra Lux (Aterramento)
2. Auto Transformador (Transformadores)
3. Filtro de Linha ABS (Filtros de Linha)
4. Filtro Metálico 20A (Filtros de Linha)
5. Protetor Multifuncional (Protetores)
6. Protetor Digital (Protetores)

## Comandos úteis
```bash
npm run dev      # Servidor local (porta 8080)
npm run build    # Build de produção
npx tsc --noEmit # Verificar erros TypeScript
```
