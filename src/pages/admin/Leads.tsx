import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Filter, 
  RefreshCw, 
  LogOut,
  Mail,
  Phone,
  Calendar,
  Building2,
  MapPin,
  FileText,
  ChevronDown,
  X,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.svg';

type LeadStatus = 'novo' | 'em_andamento' | 'concluido';

interface ContactLead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
  status: LeadStatus;
  created_at: string;
}

interface ResellerLead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string | null;
  cidade: string | null;
  cnpj: string | null;
  segmento: string | null;
  outro_segmento: string | null;
  tempo_mercado: string | null;
  volume_vendas: string | null;
  prioridade: string | null;
  status: LeadStatus;
  created_at: string;
}

const statusConfig = {
  novo: { label: 'Novo', color: 'bg-blue-500', icon: AlertCircle },
  em_andamento: { label: 'Em Andamento', color: 'bg-yellow-500', icon: Clock },
  concluido: { label: 'Concluído', color: 'bg-green-500', icon: CheckCircle },
};

export default function AdminLeads() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'contact' | 'reseller'>('contact');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [resellerLeads, setResellerLeads] = useState<ResellerLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<ContactLead | ResellerLead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchLeads();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }

    // Check admin role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate('/admin/login');
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const [contactRes, resellerRes] = await Promise.all([
        supabase
          .from('contact_leads')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('reseller_leads')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (contactRes.data) setContactLeads(contactRes.data as ContactLead[]);
      if (resellerRes.data) setResellerLeads(resellerRes.data as ResellerLead[]);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar leads',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: LeadStatus, type: 'contact' | 'reseller') => {
    const table = type === 'contact' ? 'contact_leads' : 'reseller_leads';
    
    const { error } = await supabase
      .from(table)
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar status',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Sucesso',
      description: 'Status atualizado com sucesso',
    });

    fetchLeads();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredContactLeads = statusFilter === 'all' 
    ? contactLeads 
    : contactLeads.filter(l => l.status === statusFilter);

  const filteredResellerLeads = statusFilter === 'all' 
    ? resellerLeads 
    : resellerLeads.filter(l => l.status === statusFilter);

  const openLeadDetail = (lead: ContactLead | ResellerLead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Involts" className="h-8" />
            <span className="text-lg font-display font-bold text-foreground">
              Painel de Leads
            </span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-muted-foreground text-sm">Contatos</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{contactLeads.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-sm">Revendedores</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{resellerLeads.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-muted-foreground text-sm">Novos</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {contactLeads.filter(l => l.status === 'novo').length + resellerLeads.filter(l => l.status === 'novo').length}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-muted-foreground text-sm">Concluídos</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {contactLeads.filter(l => l.status === 'concluido').length + resellerLeads.filter(l => l.status === 'concluido').length}
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'contact' ? 'default' : 'outline'}
              onClick={() => setActiveTab('contact')}
              className="gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Contatos ({filteredContactLeads.length})
            </Button>
            <Button
              variant={activeTab === 'reseller' ? 'default' : 'outline'}
              onClick={() => setActiveTab('reseller')}
              className="gap-2"
            >
              <Users className="w-4 h-4" />
              Revendedores ({filteredResellerLeads.length})
            </Button>
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as LeadStatus | 'all')}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="novo">Novos</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluídos</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={fetchLeads} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {activeTab === 'contact' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContactLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum lead de contato encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContactLeads.map((lead) => (
                    <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openLeadDetail(lead)}>
                      <TableCell className="font-medium">{lead.nome}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.telefone}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{lead.assunto}</TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[lead.status].color} text-white`}>
                          {statusConfig[lead.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(lead.created_at)}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={lead.status}
                          onValueChange={(v) => updateLeadStatus(lead.id, v as LeadStatus, 'contact')}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="novo">Novo</SelectItem>
                            <SelectItem value="em_andamento">Em Andamento</SelectItem>
                            <SelectItem value="concluido">Concluído</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResellerLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum lead de revendedor encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResellerLeads.map((lead) => (
                    <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openLeadDetail(lead)}>
                      <TableCell className="font-medium">{lead.nome}</TableCell>
                      <TableCell>{lead.empresa || '-'}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.cidade || '-'}</TableCell>
                      <TableCell>{lead.segmento === 'outro' ? lead.outro_segmento : lead.segmento || '-'}</TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[lead.status].color} text-white`}>
                          {statusConfig[lead.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(lead.created_at)}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={lead.status}
                          onValueChange={(v) => updateLeadStatus(lead.id, v as LeadStatus, 'reseller')}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="novo">Novo</SelectItem>
                            <SelectItem value="em_andamento">Em Andamento</SelectItem>
                            <SelectItem value="concluido">Concluído</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      {/* Lead Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {activeTab === 'contact' ? <MessageSquare className="w-5 h-5" /> : <Users className="w-5 h-5" />}
              Detalhes do Lead
            </DialogTitle>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedLead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{selectedLead.telefone}</p>
                  </div>
                </div>
              </div>

              {/* Additional Info for Contact Lead */}
              {'assunto' in selectedLead && (
                <>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <FileText className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assunto</p>
                      <p className="font-medium">{selectedLead.assunto}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Mensagem</p>
                    <p className="whitespace-pre-wrap">{selectedLead.mensagem}</p>
                  </div>
                </>
              )}

              {/* Additional Info for Reseller Lead */}
              {'empresa' in selectedLead && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Empresa</p>
                        <p className="font-medium">{selectedLead.empresa || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Cidade</p>
                        <p className="font-medium">{selectedLead.cidade || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Segmento</p>
                      <p className="font-medium text-sm">
                        {selectedLead.segmento === 'outro' ? selectedLead.outro_segmento : selectedLead.segmento || '-'}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Tempo de Mercado</p>
                      <p className="font-medium text-sm">{selectedLead.tempo_mercado || '-'}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Volume Vendas</p>
                      <p className="font-medium text-sm">{selectedLead.volume_vendas || '-'}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Prioridade</p>
                      <p className="font-medium text-sm">{selectedLead.prioridade || '-'}</p>
                    </div>
                  </div>

                  {selectedLead.cnpj && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">CNPJ</p>
                      <p className="font-medium">{selectedLead.cnpj}</p>
                    </div>
                  )}
                </>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedLead.created_at)}
                </div>
                <Badge className={`${statusConfig[selectedLead.status].color} text-white`}>
                  {statusConfig[selectedLead.status].label}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
