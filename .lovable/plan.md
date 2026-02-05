

# Plano: Sistema de Gestão de Leads

## Objetivo
Criar um sistema completo para capturar, armazenar e visualizar todas as solicitações de contato e revendedores, permitindo que você entre em contato com os clientes.

---

## O Que Será Criado

### 1. Banco de Dados para Armazenar Leads

Duas tabelas para organizar os diferentes tipos de solicitação:

**Tabela `contact_leads`** (Formulário de Contato)
- Nome, email, telefone
- Assunto e mensagem
- Data/hora de envio
- Status (novo, em andamento, concluído)

**Tabela `reseller_leads`** (Formulário de Revendedor)
- Dados pessoais (nome, email, telefone)
- Dados da empresa (nome, cidade, CNPJ)
- Respostas do quiz (segmento, tempo de mercado, volume de vendas, prioridades)
- Data/hora de envio
- Status do lead

---

### 2. Atualização dos Formulários

**Formulário de Contato**
- Modificar a edge function para salvar no banco de dados (além de logar)

**Formulário de Revendedor**
- Criar nova edge function `reseller-form`
- Conectar o formulário para enviar os dados

---

### 3. Painel Administrativo

Uma página protegida (`/admin/leads`) onde você poderá:

- Ver todos os leads de contato e revendedores
- Filtrar por tipo (contato/revendedor) e status
- Marcar leads como "em andamento" ou "concluído"
- Ver detalhes completos de cada solicitação
- Ordenar por data (mais recentes primeiro)

---

## Segurança

- Painel administrativo protegido por senha
- Apenas usuários autorizados podem acessar os leads
- Dados dos clientes protegidos no banco de dados

---

## Resultado Final

Após a implementação:
1. Cliente preenche formulário → Dados salvos automaticamente
2. Você acessa `/admin/leads` → Vê todos os leads organizados
3. Clica em um lead → Vê todos os detalhes para entrar em contato
4. Marca como "concluído" → Lead sai da lista principal

---

## Detalhes Técnicos

### Estrutura do Banco de Dados

```text
+------------------+          +-------------------+
|  contact_leads   |          |  reseller_leads   |
+------------------+          +-------------------+
| id               |          | id                |
| nome             |          | nome              |
| email            |          | email             |
| telefone         |          | telefone          |
| assunto          |          | empresa           |
| mensagem         |          | cidade            |
| status           |          | cnpj              |
| created_at       |          | segmento          |
+------------------+          | outro_segmento    |
                              | tempo_mercado     |
                              | volume_vendas     |
                              | prioridade        |
                              | status            |
                              | created_at        |
                              +-------------------+
```

### Arquivos a Serem Criados/Modificados

1. **Migração SQL** - Criar as tabelas `contact_leads` e `reseller_leads`
2. **Edge Function** - `supabase/functions/reseller-form/index.ts`
3. **Edge Function** - Atualizar `contact-form` para salvar no banco
4. **Página Admin** - `src/pages/admin/Leads.tsx`
5. **Atualizar rotas** - Adicionar rota `/admin/leads`
6. **Atualizar Revendedor** - Conectar formulário à edge function

### Autenticação Simples

Para começar rapidamente, implementaremos uma autenticação simples:
- Login com email/senha para acessar o painel admin
- Você criará uma conta de administrador
- Depois podemos evoluir para algo mais robusto se necessário

