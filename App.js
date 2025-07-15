import React, { useRef, useCallback, useMemo } from 'react';
import './App.css';
import { DashboardProvider } from './DashboardContext';
import { useUI, useForms, useApp, useData } from './DashboardHooks';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  DollarSign,
  Calendar,
  BookOpen,
  Settings,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Package,
  Scissors,
  Shirt,
  Palette,
  Edit3,
  Printer,
  CheckCircle,
  Clock,
  Filter,
  Plus,
  Edit,
  Trash2,
  List,
  CalendarDays,
  Search,
  Bell,
  User,
  Eye,
  EyeOff,
  Upload,
  X,
  Save,
  Copy,
  Grid3X3,
  BarChart3,
  ShoppingCart,
  RefreshCw,
  AlertTriangle,
  CheckSquare,
  Star,
  Heart,
  Share2,
  Download,
  FileText,
  Camera,
  Tags,
  Zap,
  Target,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data expandido
const salesData = [
  { month: 'Jan', vendas: 65000, pedidos: 145 },
  { month: 'Fev', vendas: 78000, pedidos: 178 },
  { month: 'Mar', vendas: 92000, pedidos: 203 },
  { month: 'Abr', vendas: 88000, pedidos: 189 },
  { month: 'Mai', vendas: 105000, pedidos: 234 },
  { month: 'Jun', vendas: 125000, pedidos: 276 }
];

const financialData = [
  { month: 'Jan', receitas: 75000, despesas: 45000 },
  { month: 'Fev', receitas: 88000, despesas: 52000 },
  { month: 'Mar', receitas: 102000, despesas: 48000 },
  { month: 'Abr', receitas: 98000, despesas: 51000 },
  { month: 'Mai', receitas: 115000, despesas: 56000 },
  { month: 'Jun', receitas: 135000, despesas: 62000 }
];

const orderStatusData = [
  { status: 'Pedir Tecido', count: 12, color: '#ef4444' },
  { status: 'Corte', count: 8, color: '#f97316' },
  { status: 'Costura', count: 15, color: '#eab308' },
  { status: 'Silk', count: 6, color: '#06b6d4' },
  { status: 'Bordado', count: 4, color: '#8b5cf6' },
  { status: 'Sublimação', count: 3, color: '#ec4899' },
  { status: 'Fazer Layout', count: 9, color: '#84cc16' },
  { status: 'Pago', count: 18, color: '#10b981' },
  { status: 'Finalizado', count: 25, color: '#059669' }
];

// Dados mais realistas baseados no arquivo original
const mockProducts = [
  { id: 1, nome: 'Camiseta Tradicional', categoria: 'Camisetas', preco: 25.00, estoque: 45, vendidos: 120, imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', codigo: 'CT001', custo: 15.00 },
  { id: 2, nome: 'Baby Look', categoria: 'Camisetas', preco: 23.00, estoque: 2, vendidos: 200, imagem: 'https://images.unsplash.com/photo-1573070735055-92be4321c988?w=300&h=300&fit=crop', codigo: 'BL001', custo: 14.00 },
  { id: 3, nome: 'Moletom com Capuz', categoria: 'Moletons', preco: 45.00, estoque: 25, vendidos: 80, imagem: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', codigo: 'ML001', custo: 28.00 },
  { id: 4, nome: 'Polo', categoria: 'Polos', preco: 35.00, estoque: 1, vendidos: 45, imagem: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', codigo: 'PL001', custo: 22.00 },
  { id: 5, nome: 'Calça de Brim', categoria: 'Calças', preco: 55.00, estoque: 15, vendidos: 30, imagem: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', codigo: 'CB001', custo: 35.00 }
];

const mockCategories = [
  { id: 1, nome: 'Camisetas', produtos: 18, cor: '#10b981' },
  { id: 2, nome: 'Moletons', produtos: 8, cor: '#06b6d4' },
  { id: 3, nome: 'Polos', produtos: 12, cor: '#8b5cf6' },
  { id: 4, nome: 'Calças', produtos: 6, cor: '#f59e0b' },
  { id: 5, nome: 'Infantil', produtos: 15, cor: '#ef4444' }
];

// Dados adaptados do arquivo original
const modelos = ['Camiseta Tradicional', 'Baby Look', 'Infantil', 'Calça de Brim', 'Moletom', 'Polo'];
const tecidos = ['PV', 'Algodão', 'Dryfit', 'Piquet'];
const personalizacoes = ['Silk Screen', 'Sublimação Total', 'Bordado'];
const posicoes = ['Frente', 'Costas', 'Manga Esquerda', 'Manga Direita', 'Lateral Esquerda', 'Lateral Direita', 'Barra'];
const statusOptions = ['Fazer Mockup', 'Aguardando Cliente', 'Aprovado', 'Pedir Tecido', 'Corte', 'Costura', 'Bordado', 'Silk', 'Sublimação', 'Concluído', 'Entregue', 'Pago'];

// Tamanhos específicos por categoria (do arquivo original)
const tamanhosPorCategoria = {
  'Infantil': ['01', '02', '04', '06', '08', '10', '12', '14'],
  'Baby Look': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Camiseta Tradicional': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Calça de Brim': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Moletom': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Polo': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida']
};

// Tamanhos que têm valor adicional
const tamanhosComValorAdicional = ['EGG', 'EGG1', 'EGG2', 'Sob Medida'];

const mockOrders = [
  { 
    id: 1, 
    cliente: 'Empresa ABC', 
    cliente_empresa: 'Empresa ABC Ltda',
    modelo: 'Camiseta Tradicional', 
    quantidade: 50, 
    cor: 'Azul', 
    tamanhos: {P: 5, M: 15, G: 20, GG: 10}, 
    precoUnitario: 25.00, 
    total: 1250.00, 
    valor_total: 1250.00,
    entrada_paga: 625.00,
    saldo_restante: 625.00,
    status: 'Corte', 
    dataEntrega: '2025-07-13', 
    dataPedido: '2025-07-01',
    itens: [{
      modelo: 'Camiseta Tradicional',
      tecido: 'PV',
      cor: 'Azul',
      tamanhos: {P: 5, M: 15, G: 20, GG: 10},
      personalizacao: 'Silk Screen',
      posicoes: ['Frente', 'Costas'],
      valor_unitario: 25.00,
      quantidade_total: 50
    }],
    observacoes: 'Pedido para evento corporativo'
  },
  { 
    id: 2, 
    cliente: 'Loja XYZ', 
    cliente_empresa: 'Loja XYZ',
    modelo: 'Baby Look', 
    quantidade: 100, 
    cor: 'Branco', 
    tamanhos: {P: 10, M: 30, G: 40, GG: 20}, 
    precoUnitario: 23.00, 
    total: 2300.00, 
    valor_total: 2300.00,
    entrada_paga: 1150.00,
    saldo_restante: 1150.00,
    status: 'Silk', 
    dataEntrega: '2025-07-20', 
    dataPedido: '2025-07-02',
    itens: [{
      modelo: 'Baby Look',
      tecido: 'Algodão',
      cor: 'Branco',
      tamanhos: {P: 10, M: 30, G: 40, GG: 20},
      personalizacao: 'Sublimação Total',
      posicoes: ['Frente'],
      valor_unitario: 23.00,
      quantidade_total: 100
    }]
  },
  { 
    id: 3, 
    cliente: 'Escola São João', 
    cliente_empresa: 'Escola São João',
    modelo: 'Polo', 
    quantidade: 75, 
    cor: 'Verde', 
    tamanhos: {P: 15, M: 25, G: 25, GG: 10}, 
    precoUnitario: 35.00, 
    total: 2625.00, 
    valor_total: 2625.00,
    entrada_paga: 1000.00,
    saldo_restante: 1625.00,
    status: 'Costura', 
    dataEntrega: '2025-07-14', 
    dataPedido: '2025-07-03',
    itens: [{
      modelo: 'Polo',
      tecido: 'Piquet',
      cor: 'Verde',
      tamanhos: {P: 15, M: 25, G: 25, GG: 10},
      personalizacao: 'Bordado',
      posicoes: ['Frente'],
      valor_unitario: 35.00,
      quantidade_total: 75
    }]
  }
];

const mockClients = [
  { 
    id: 1, 
    empresa: 'Empresa ABC Ltda', 
    contato: 'João Silva', 
    telefone: '(11) 98765-4321', 
    endereco: 'Rua das Flores, 123 - São Paulo, SP',
    email: 'joao@empresaabc.com',
    totalCompras: 15250.00,
    ultimaCompra: '2025-07-10',
    pedidosTotal: 8
  },
  { 
    id: 2, 
    empresa: 'Loja XYZ', 
    contato: 'Maria Santos', 
    telefone: '(11) 99876-5432', 
    endereco: 'Av. Paulista, 456 - São Paulo, SP',
    email: 'maria@lojaxyz.com',
    totalCompras: 8900.00,
    ultimaCompra: '2025-07-08',
    pedidosTotal: 5
  },
  { 
    id: 3, 
    empresa: 'Escola São João', 
    contato: 'Pedro Costa', 
    telefone: '(11) 97654-3210', 
    endereco: 'Rua da Escola, 789 - São Paulo, SP',
    email: 'pedro@escolasaojoao.edu.br',
    totalCompras: 22300.00,
    ultimaCompra: '2025-07-03',
    pedidosTotal: 12
  }
];

let mockTransactions = [
  { id: 1, descricao: 'Venda - Empresa ABC', valor: 1250.00, tipo: 'receita', data: '2025-07-10', categoria: 'Vendas' },
  { id: 2, descricao: 'Compra Tecido', valor: -450.00, tipo: 'despesa', data: '2025-07-09', categoria: 'Materiais' },
  { id: 3, descricao: 'Venda - Loja XYZ', valor: 1800.00, tipo: 'receita', data: '2025-07-08', categoria: 'Vendas' },
  { id: 4, descricao: 'Aluguel Loja', valor: -2500.00, tipo: 'despesa', data: '2025-07-05', categoria: 'Fixos' },
  { id: 5, descricao: 'Energia Elétrica', valor: -320.00, tipo: 'despesa', data: '2025-07-04', categoria: 'Fixos' },
  { id: 6, descricao: 'Venda - Escola São João', valor: 4400.00, tipo: 'receita', data: '2025-07-03', categoria: 'Vendas' }
];

let mockAgenda = [
  { id: 1, titulo: 'Entrega - Empresa ABC', data: '2025-07-13', hora: '14:00', tipo: 'entrega', cliente: 'Empresa ABC', status: 'pendente' },
  { id: 2, titulo: 'Reunião - Novo Cliente', data: '2025-07-16', hora: '10:30', tipo: 'reuniao', cliente: 'Cliente Potencial', status: 'confirmado' },
  { id: 3, titulo: 'Produção - Pedido 150 peças', data: '2025-07-17', hora: '08:00', tipo: 'producao', cliente: 'Loja XYZ', status: 'pendente' },
  { id: 4, titulo: 'Aniversário - Maria Santos', data: '2025-07-20', hora: '00:00', tipo: 'aniversario', cliente: 'Maria Santos', status: 'lembrete' }
];

function Dashboard() {
  // Using centralized state hooks instead of individual useState calls
  const ui = useUI();
  const forms = useForms();
  const app = useApp();
  const data = useData();

  const fileInputRef = useRef(null);

  // Função para upload da logo
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        ui.setLogoUrl(e.target.result);
        localStorage.setItem('logoEmpresa', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Carregar logo do localStorage
  React.useEffect(() => {
    const logoSalva = localStorage.getItem('logoEmpresa');
    if (logoSalva) {
      ui.setLogoUrl(logoSalva);
    }
  }, [ui]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'catalogo', label: 'Catálogo', icon: BookOpen },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  // Funções para calcular notificações baseadas nas datas de entrega
  const getNotifications = useMemo(() => {
    const hoje = new Date();
    const notifications = [];

    data.orders.forEach(order => {
      if (order.dataEntrega && order.status !== 'Pago' && order.status !== 'Entregue') {
        const dataEntrega = new Date(order.dataEntrega);
        const diffTime = dataEntrega - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          notifications.push({
            id: `entrega-hoje-${order.id}`,
            tipo: 'urgente',
            titulo: 'Entrega hoje!',
            mensagem: `Pedido de ${order.cliente_empresa} deve ser entregue hoje`,
            pedidoId: order.id
          });
        } else if (diffDays === 1) {
          notifications.push({
            id: `entrega-amanha-${order.id}`,
            tipo: 'alerta',
            titulo: 'Entrega amanhã',
            mensagem: `Pedido de ${order.cliente_empresa} deve ser entregue amanhã`,
            pedidoId: order.id
          });
        } else if (diffDays === 2) {
          notifications.push({
            id: `entrega-2dias-${order.id}`,
            tipo: 'aviso',
            titulo: 'Entrega em 2 dias',
            mensagem: `Pedido de ${order.cliente_empresa} deve ser entregue em 2 dias`,
            pedidoId: order.id
          });
        } else if (diffDays === 3) {
          notifications.push({
            id: `entrega-3dias-${order.id}`,
            tipo: 'info',
            titulo: 'Entrega em 3 dias',
            mensagem: `Pedido de ${order.cliente_empresa} deve ser entregue em 3 dias`,
            pedidoId: order.id
          });
        } else if (diffDays < 0) {
          notifications.push({
            id: `entrega-atrasada-${order.id}`,
            tipo: 'urgente',
            titulo: 'Entrega atrasada!',
            mensagem: `Pedido de ${order.cliente_empresa} está ${Math.abs(diffDays)} dia(s) atrasado`,
            pedidoId: order.id
          });
        }
      }
    });

    return notifications;
  }, [data.orders]);

  // Função para calcular valor com adicional (do arquivo original)
  const calcularValorComAdicional = useCallback((valorUnitario, tamanhos) => {
    let valorTotal = 0;
    let quantidadeTotal = 0;
    let valorAdicional = 0;
    
    Object.entries(tamanhos || {}).forEach(([tamanho, qtd]) => {
      const quantidade = parseInt(qtd) || 0;
      if (quantidade > 0) {
        quantidadeTotal += quantidade;
        
        if (tamanhosComValorAdicional.includes(tamanho)) {
          const valorComAdicional = valorUnitario + 5.00;
          valorTotal += quantidade * valorComAdicional;
          valorAdicional += quantidade * 5.00;
        } else {
          valorTotal += quantidade * valorUnitario;
        }
      }
    });
    
    return { valorTotal, quantidadeTotal, valorAdicional };
  }, []);

  // Função para calcular quantidade total
  const calcularQuantidadeTotal = useCallback((tamanhos) => {
    return Object.values(tamanhos).reduce((total, qtd) => total + (parseInt(qtd) || 0), 0);
  }, []);

  // Função para filtrar pedidos por status e ir para aba pedidos
  const filtrarPedidosPorStatus = useCallback((status) => {
    const filtered = data.orders.filter(order => order.status === status);
    app.setFilteredOrders(filtered);
    app.setOrderFilter(`Status: ${status}`);
    ui.setActiveMenu('pedidos');
  }, [data.orders, app, ui]);

  // Função para filtrar pedidos com saldo a receber e ir para aba pedidos
  const filtrarPedidosAReceber = useCallback(() => {
    const filtered = data.orders
      .filter(order => order.saldo_restante > 0 && order.status !== 'Pago')
      .sort((a, b) => new Date(a.dataEntrega) - new Date(b.dataEntrega));
    app.setFilteredOrders(filtered);
    app.setOrderFilter('A Receber (ordenado por data de entrega)');
    ui.setActiveMenu('pedidos');
  }, [data.orders, app, ui]);

  const openModal = useCallback((type) => {
    ui.openModal(type);
  }, [ui]);

  const closeModal = useCallback(() => {
    ui.closeModal();
  }, [ui]);

  // FUNÇÕES PARA CLIENTES (otimizadas para evitar re-renderizações)
  const criarCliente = useCallback(async (e) => {
    e.preventDefault();
    app.setLoading(true);
    
    try {
      const novoClienteData = {
        id: Date.now(),
        ...forms.clientForm,
        email: `${forms.clientForm.contato.toLowerCase().replace(' ', '.')}@${forms.clientForm.empresa.toLowerCase().replace(' ', '')}.com`,
        totalCompras: 0,
        ultimaCompra: null,
        pedidosTotal: 0
      };
      
      data.addClient(novoClienteData);
      closeModal();
      alert('Cliente criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      alert('Erro ao criar cliente');
    } finally {
      app.setLoading(false);
    }
  }, [forms.clientForm, app, data, closeModal]);

  const excluirCliente = useCallback((clienteId, empresaCliente) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente "${empresaCliente}"?`)) {
      data.deleteClient(clienteId);
      alert('Cliente excluído com sucesso!');
    }
  }, [data]);

  const iniciarEdicaoCliente = useCallback((cliente) => {
    app.setEditingClient(cliente.id);
    forms.updateClientForm({
      empresa: cliente.empresa,
      contato: cliente.contato,
      telefone: cliente.telefone,
      endereco: cliente.endereco
    });
  }, [app, forms]);

  const salvarEdicaoCliente = useCallback(() => {
    data.updateClient(app.editingClient, forms.clientForm);
    app.setEditingClient(null);
    forms.resetClientForm();
    alert('Cliente atualizado com sucesso!');
  }, [app.editingClient, forms.clientForm, data, app, forms]);

  const cancelarEdicaoCliente = useCallback(() => {
    app.setEditingClient(null);
    forms.resetClientForm();
  }, [app, forms]);

  const StatusIcon = ({ status }) => {
    switch(status) {
      case 'Pedir Tecido': return <Package className="w-4 h-4" />;
      case 'Corte': return <Scissors className="w-4 h-4" />;
      case 'Costura': return <Shirt className="w-4 h-4" />;
      case 'Silk': return <Palette className="w-4 h-4" />;
      case 'Bordado': return <Edit3 className="w-4 h-4" />;
      case 'Sublimação': return <Printer className="w-4 h-4" />;
      case 'Fazer Layout': return <Edit className="w-4 h-4" />;
      case 'Pago': return <DollarSign className="w-4 h-4" />;
      case 'Finalizado': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const Modal = ({ children }) => {
    if (!ui.showModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">
              {ui.modalType === 'produto' && 'Novo Produto'}
              {ui.modalType === 'categoria' && 'Nova Categoria'}
              {ui.modalType === 'pedido' && 'Novo Pedido'}
              {ui.modalType === 'cliente' && 'Novo Cliente'}
              {ui.modalType === 'receita' && 'Nova Receita'}
              {ui.modalType === 'despesa' && 'Nova Despesa'}
              {ui.modalType === 'compromisso' && 'Novo Compromisso'}
            </h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // COMPONENTE DE FORMULÁRIO DE CLIENTE OTIMIZADO
  const ClienteForm = React.memo(() => (
    <form onSubmit={criarCliente} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-2">Nome da Empresa *</label>
          <input 
            type="text" 
            value={forms.clientForm.empresa}
            onChange={(e) => forms.updateClientForm({empresa: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Nome do Contato *</label>
          <input 
            type="text" 
            value={forms.clientForm.contato}
            onChange={(e) => forms.updateClientForm({contato: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Telefone/WhatsApp *</label>
          <input 
            type="text" 
            value={forms.clientForm.telefone}
            onChange={(e) => forms.updateClientForm({telefone: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Endereço *</label>
          <input 
            type="text" 
            value={forms.clientForm.endereco}
            onChange={(e) => forms.updateClientForm({endereco: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={app.loading}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          {app.loading ? 'Salvando...' : 'Salvar Cliente'}
        </button>
        <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
          Cancelar
        </button>
      </div>
    </form>
  ));

  // RENDERIZAÇÃO DAS SEÇÕES
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Resumo de Vendas */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Resumo de Vendas no Mês</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Pedidos</p>
                <p className="text-2xl font-bold text-white">{data.orders.length}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors" onClick={filtrarPedidosAReceber}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">A Receber</p>
                <p className="text-2xl font-bold text-white">
                  R$ {data.orders.reduce((sum, order) => sum + (order.saldo_restante || 0), 0).toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-1">Clique para ver detalhes</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Faturamento Total</p>
                <p className="text-2xl font-bold text-white">
                  R$ {data.orders.reduce((sum, order) => sum + (order.valor_total || 0), 0).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="vendas" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Resumo Financeiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Receitas</p>
                <p className="text-2xl font-bold text-emerald-500">
                  R$ {data.transactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Despesas</p>
                <p className="text-2xl font-bold text-red-500">
                  R$ {Math.abs(data.transactions.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0)).toFixed(2)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Saldo</p>
                <p className="text-2xl font-bold text-emerald-500">
                  R$ {data.transactions.reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="receitas" fill="#10b981" />
              <Bar dataKey="despesas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status dos Pedidos - CLICÁVEIS */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Status dos Pedidos (Clique para filtrar)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statusOptions.map((status) => {
            const count = data.orders.filter(o => o.status === status).length;
            return (
              <div 
                key={status} 
                className="bg-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-600 transition-colors"
                onClick={() => filtrarPedidosPorStatus(status)}
              >
                <div className="flex items-center justify-center mb-2">
                  <StatusIcon status={status} />
                </div>
                <p className="text-gray-400 text-xs mb-1">{status}</p>
                <p className="text-lg font-bold text-white">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderPedidos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Pedidos</h2>
        <button 
          onClick={() => openModal('pedido')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Pedido
        </button>
      </div>

      {/* Mostrar filtro ativo */}
      {app.orderFilter && (
        <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-blue-400 font-medium">Filtro Ativo: {app.orderFilter}</p>
            <p className="text-blue-300 text-sm">{app.filteredOrders.length} pedido(s) encontrado(s)</p>
          </div>
          <button 
            onClick={() => {
              app.setFilteredOrders([]);
              app.setOrderFilter('');
            }}
            className="text-blue-400 hover:text-blue-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Buscar pedidos..." 
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600">
              <option>Todos os status</option>
              {statusOptions.map((status, idx) => (
                <option key={idx}>{status}</option>
              ))}
            </select>
            <input type="date" className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          {(app.filteredOrders.length > 0 ? app.filteredOrders : data.orders).map((order) => (
            <div key={order.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold text-lg">{order.cliente_empresa}</h3>
                  <p className="text-gray-400 text-sm">Pedido: {order.dataPedido}</p>
                  <p className="text-gray-400 text-sm">Status: 
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                      order.status === 'Pago' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'Atrasado' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  {order.dataEntrega && <p className="text-gray-400 text-sm">Entrega: {order.dataEntrega}</p>}
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">R$ {order.valor_total.toFixed(2)}</p>
                  <p className="text-green-400 text-sm">Entrada: R$ {order.entrada_paga.toFixed(2)}</p>
                  <p className="text-orange-400 text-sm">A receber: R$ {order.saldo_restante.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Detalhes dos itens */}
              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="text-white font-medium mb-2">Itens:</h4>
                {order.itens?.map((item, idx) => (
                  <div key={idx} className="bg-gray-600 p-3 rounded mb-2 text-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div>
                        <span className="text-gray-300 font-medium">Modelo:</span>
                        <p className="text-white">{item.modelo}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">Cor:</span>
                        <p className="text-white">{item.cor}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">Qtd:</span>
                        <p className="text-white">{item.quantidade_total}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">Personalização:</span>
                        <p className="text-white">{item.personalizacao}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="text-blue-400 hover:text-blue-300 bg-blue-900/20 px-3 py-1 rounded">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Editar
                </button>
                <button className="text-red-400 hover:text-red-300 bg-red-900/20 px-3 py-1 rounded">
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {(app.filteredOrders.length === 0 && app.orderFilter === '') && data.orders.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Nenhum pedido encontrado. Clique em "Novo Pedido" para começar.
          </div>
        )}

        {app.filteredOrders.length === 0 && app.orderFilter !== '' && (
          <div className="text-center py-8 text-gray-400">
            Nenhum pedido encontrado para o filtro aplicado.
          </div>
        )}
      </div>
    </div>
  );

  const renderClientes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Clientes</h2>
        <button 
          onClick={() => openModal('cliente')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Buscar clientes..." 
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Empresa</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Contato</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Telefone</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Endereço</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <tr key={client.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    {app.editingClient === client.id ? (
                      <input
                        type="text"
                        value={forms.clientForm.empresa}
                        onChange={(e) => forms.updateClientForm({empresa: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-white font-medium">{client.empresa}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {app.editingClient === client.id ? (
                      <input
                        type="text"
                        value={forms.clientForm.contato}
                        onChange={(e) => forms.updateClientForm({contato: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-gray-300">{client.contato}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {app.editingClient === client.id ? (
                      <input
                        type="text"
                        value={forms.clientForm.telefone}
                        onChange={(e) => forms.updateClientForm({telefone: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-gray-300">{client.telefone}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {app.editingClient === client.id ? (
                      <input
                        type="text"
                        value={forms.clientForm.endereco}
                        onChange={(e) => forms.updateClientForm({endereco: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-gray-300">{client.endereco}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {app.editingClient === client.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={salvarEdicaoCliente}
                          className="text-green-400 hover:text-green-300 bg-green-900/20 px-2 py-1 rounded"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelarEdicaoCliente}
                          className="text-gray-400 hover:text-gray-300 bg-gray-900/20 px-2 py-1 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => iniciarEdicaoCliente(client)}
                          className="text-blue-400 hover:text-blue-300 bg-blue-900/20 px-2 py-1 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => excluirCliente(client.id, client.empresa)}
                          className="text-red-400 hover:text-red-300 bg-red-900/20 px-2 py-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.clients.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Nenhum cliente encontrado. Clique em "Novo Cliente" para começar.
          </div>
        )}
      </div>
    </div>
  );

  const renderFinanceiro = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Filtrar por:</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => openModal('receita')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Receita
          </button>
          <button 
            onClick={() => openModal('despesa')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Despesa
          </button>
          <button 
            onClick={() => ui.setShowFilters(!ui.showFilters)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Mostrar Filtros
          </button>
        </div>
      </div>

      {ui.showFilters && (
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => ui.setFilterPeriod('7dias')}
              className={`p-3 rounded-lg transition-colors ${ui.filterPeriod === '7dias' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Últimos 7 Dias
            </button>
            <button 
              onClick={() => ui.setFilterPeriod('30dias')}
              className={`p-3 rounded-lg transition-colors ${ui.filterPeriod === '30dias' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Últimos 30 Dias
            </button>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Data Inicial</label>
              <input type="date" className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Data Final</label>
              <input type="date" className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Saldo Atual</p>
              <p className="text-2xl font-bold text-emerald-500">
                R$ {data.transactions.reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receitas Totais</p>
              <p className="text-2xl font-bold text-green-500">
                R$ {data.transactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Despesas Totais</p>
              <p className="text-2xl font-bold text-red-500">
                R$ {Math.abs(data.transactions.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0)).toFixed(2)}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-500">
                R$ {data.orders.reduce((sum, order) => sum + (order.saldo_restante || 0), 0).toFixed(2)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Fluxograma de Caixa</h3>
            <button className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Atualizar
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transações Recentes</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.transactions.slice(-10).reverse().map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white text-sm">{transaction.descricao}</p>
                  <p className="text-gray-400 text-xs">{transaction.data} • {transaction.categoria}</p>
                </div>
                <p className={`font-medium ${transaction.tipo === 'receita' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.tipo === 'receita' ? '+' : ''}R$ {Math.abs(transaction.valor).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgenda = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Agenda</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => openModal('compromisso')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Compromisso
          </button>
          <button 
            onClick={() => ui.setAgendaViewType(ui.agendaViewType === 'lista' ? 'calendario' : 'lista')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            {ui.agendaViewType === 'lista' ? <CalendarDays className="w-4 h-4" /> : <List className="w-4 h-4" />}
            {ui.agendaViewType === 'lista' ? 'Calendário' : 'Lista'}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'hoje', label: 'Hoje' },
            { id: 'semana', label: 'Esta Semana' },
            { id: 'mes', label: 'Este Mês' },
            { id: 'aniversarios', label: 'Aniversários' }
          ].map((view) => (
            <button 
              key={view.id}
              onClick={() => ui.setAgendaView(view.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                ui.agendaView === view.id ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-lg text-center">
            <p className="text-sm">Concluídos (Mês)</p>
            <p className="text-lg font-bold">25</p>
          </div>
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">
            <p className="text-sm">Atrasados</p>
            <p className="text-lg font-bold">3</p>
          </div>
          <div className="bg-green-500/20 text-green-400 p-3 rounded-lg text-center">
            <p className="text-sm">Entregues</p>
            <p className="text-lg font-bold">22</p>
          </div>
          <div className="bg-yellow-500/20 text-yellow-400 p-3 rounded-lg text-center">
            <p className="text-sm">Próximas Entregas</p>
            <p className="text-lg font-bold">8</p>
          </div>
        </div>

        {ui.agendaViewType === 'lista' ? (
          <div className="space-y-3">
            {data.agenda.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.tipo === 'entrega' ? 'bg-blue-500' : 
                    item.tipo === 'reuniao' ? 'bg-green-500' : 
                    item.tipo === 'producao' ? 'bg-yellow-500' : 'bg-pink-500'
                  }`}></div>
                  <div>
                    <p className="text-white font-medium">{item.titulo}</p>
                    <p className="text-gray-400 text-sm">{item.cliente} • {item.data} às {item.hora}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'confirmado' ? 'bg-green-500/20 text-green-400' :
                    item.status === 'pendente' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {item.status}
                  </span>
                  <button className="text-gray-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <CalendarDays className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Visualização de Calendário</h3>
            <p className="text-gray-400 text-sm">
              A visualização de calendário será implementada em futuras versões.
              Por enquanto, use a visualização em lista.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCatalogo = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Catálogo Digital</h2>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
            Visualizar Catálogo
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Configurações do Catálogo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Catálogo Ativo</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={forms.catalogConfig.ativo}
                  onChange={(e) => forms.updateCatalogConfig({ativo: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Nome da Loja</label>
              <input 
                type="text" 
                value={forms.catalogConfig.nome}
                onChange={(e) => forms.updateCatalogConfig({nome: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Descrição</label>
              <textarea 
                rows="3"
                value={forms.catalogConfig.descricao}
                onChange={(e) => forms.updateCatalogConfig({descricao: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Endereço Personalizado</label>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm">sellvibe.store/</span>
                <input 
                  type="text" 
                  value={forms.catalogConfig.endereco}
                  onChange={(e) => forms.updateCatalogConfig({endereco: e.target.value})}
                  className="flex-1 bg-gray-700 text-white rounded-r-lg px-3 py-2 border border-gray-600 border-l-0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Telefone/WhatsApp</label>
              <input 
                type="text" 
                value={forms.catalogConfig.telefone}
                onChange={(e) => forms.updateCatalogConfig({telefone: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Cor Principal</label>
                <input 
                  type="color" 
                  value={forms.catalogConfig.corPrincipal}
                  onChange={(e) => forms.updateCatalogConfig({corPrincipal: e.target.value})}
                  className="w-full h-10 bg-gray-700 rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Cor do Texto</label>
                <input 
                  type="color" 
                  value={forms.catalogConfig.corTexto}
                  onChange={(e) => forms.updateCatalogConfig({corTexto: e.target.value})}
                  className="w-full h-10 bg-gray-700 rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg">
            Salvar Configurações
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Produtos no Catálogo</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={product.imagem} alt={product.nome} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-white font-medium">{product.nome}</p>
                    <p className="text-emerald-500 text-sm">R$ {product.preco.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Preview do Catálogo</h3>
        <div 
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
          style={{ backgroundColor: forms.catalogConfig.corPrincipal + '10', borderColor: forms.catalogConfig.corPrincipal }}
        >
          <div className="max-w-sm mx-auto">
            <h4 className="text-xl font-bold mb-2" style={{ color: forms.catalogConfig.corPrincipal }}>
              {forms.catalogConfig.nome}
            </h4>
            <p className="text-gray-400 text-sm mb-4">{forms.catalogConfig.descricao}</p>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-white text-sm">sellvibe.store/{forms.catalogConfig.endereco}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfiguracoes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Configurações</h2>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Informações da Empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Nome da Empresa</label>
            <input 
              type="text" 
              defaultValue="Ideal Silk Screen"
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Telefone</label>
            <input 
              type="text" 
              defaultValue="(11) 99999-9999"
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">País</label>
            <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-emerald-500 focus:outline-none">
              <option>Brasil</option>
              <option>Argentina</option>
              <option>Chile</option>
            </select>
          </div>
        </div>
        <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors">
          Salvar Informações
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Alterar Senha</h3>
        <div className="space-y-4 max-w-md">
          <div className="relative">
            <label className="block text-gray-400 text-sm mb-1">Nova Senha</label>
            <input 
              type={ui.showPassword ? "text" : "password"}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 pr-10 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
            <button 
              onClick={() => ui.togglePassword()}
              className="absolute right-3 top-8 text-gray-400 hover:text-white"
            >
              {ui.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-gray-400 text-sm mb-1">Confirmar Nova Senha</label>
            <input 
              type={ui.showConfirmPassword ? "text" : "password"}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 pr-10 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
            <button 
              onClick={() => ui.toggleConfirmPassword()}
              className="absolute right-3 top-8 text-gray-400 hover:text-white"
            >
              {ui.showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors">
          Alterar Senha
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Suporte</h3>
        <p className="text-gray-400 mb-2">Para suporte técnico, entre em contato:</p>
        <p className="text-emerald-500">contato@idealsilkscreen.com.br</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(ui.activeMenu) {
      case 'dashboard': return renderDashboard();
      case 'pedidos': return renderPedidos();
      case 'clientes': return renderClientes();
      case 'financeiro': return renderFinanceiro();
      case 'agenda': return renderAgenda();
      case 'catalogo': return renderCatalogo();
      case 'configuracoes': return renderConfiguracoes();
      default: return renderDashboard();
    }
  };

  const renderModalContent = () => {
    switch(ui.modalType) {
      case 'cliente': return <ClienteForm />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          {/* Logo upload como estava originalmente acima do menu lateral */}
          <div className="flex items-center gap-3 mb-8">
            <div 
              className="w-[120px] h-[120px] bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 cursor-pointer hover:border-emerald-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {ui.logoUrl ? (
                <img src={ui.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-400 text-xs">Upload Logo<br/>120x120</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = ui.activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => ui.setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-emerald-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-white capitalize">{ui.activeMenu}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 text-sm border border-gray-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              
              {/* Sistema de Notificações */}
              <div className="relative">
                <button 
                  className="relative text-gray-400 hover:text-white"
                  onClick={() => ui.toggleNotifications()}
                >
                  <Bell className="w-5 h-5" />
                  {getNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {getNotifications.length}
                    </span>
                  )}
                </button>
                
                {ui.showNotifications && (
                  <div className="absolute right-0 top-8 w-80 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-600">
                      <h3 className="text-white font-medium">Notificações</h3>
                    </div>
                    {getNotifications.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {getNotifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-gray-700 hover:bg-gray-700">
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.tipo === 'urgente' ? 'bg-red-500' :
                                notification.tipo === 'alerta' ? 'bg-orange-500' :
                                notification.tipo === 'aviso' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                  notification.tipo === 'urgente' ? 'text-red-400' :
                                  notification.tipo === 'alerta' ? 'text-orange-400' :
                                  notification.tipo === 'aviso' ? 'text-yellow-400' : 'text-blue-400'
                                }`}>
                                  {notification.titulo}
                                </p>
                                <p className="text-gray-300 text-xs mt-1">{notification.mensagem}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nenhuma notificação</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-white text-sm">Roger</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Modal */}
      <Modal>
        {renderModalContent()}
      </Modal>
    </div>
  );
}

// Main App component that provides context and initial data
function App() {
  // Initial data for the context
  const initialData = {
    clients: mockClients,
    orders: mockOrders,
    products: mockProducts,
    categories: mockCategories,
    transactions: mockTransactions,
    agenda: mockAgenda
  };

  return (
    <DashboardProvider initialData={initialData}>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;