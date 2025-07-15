import React, { createContext, useContext, useReducer } from 'react';

// Initial state structure
const initialState = {
  // UI-related states
  ui: {
    activeMenu: 'dashboard',
    showFilters: false,
    filterPeriod: '30dias',
    showPassword: false,
    showConfirmPassword: false,
    showModal: false,
    modalType: '',
    searchTerm: '',
    selectedCategory: '',
    agendaView: 'hoje',
    agendaViewType: 'lista',
    showNotifications: false,
    logoUrl: null
  },
  // Form-related states
  forms: {
    clientForm: {
      empresa: '',
      contato: '',
      telefone: '',
      endereco: ''
    },
    orderForm: {
      cliente_id: '',
      cliente_empresa: '',
      itens: [{
        modelo: '',
        tecido: '',
        cor: '',
        tamanhos: {},
        personalizacao: '',
        posicoes: [],
        valor_unitario: 0,
        quantidade_total: 0,
        valor_adicional: 0
      }],
      previsao_entrega: '',
      observacoes: '',
      layout_images: []
    },
    transactionForm: {
      descricao: '',
      valor: '',
      categoria: ''
    },
    appointmentForm: {
      titulo: '',
      tipo: 'entrega',
      data: '',
      hora: '',
      cliente: ''
    },
    catalogConfig: {
      ativo: true,
      nome: 'Ideal SilkScreen',
      descricao: 'Serigrafia e bordados personalizados',
      endereco: 'idealsilkscreen',
      telefone: '(11) 99999-9999',
      corPrincipal: '#10b981',
      corTexto: '#ffffff'
    },
    clientSearch: {
      buscaCliente: '',
      clientesFiltrados: [],
      mostrarFormularioCliente: false
    }
  },
  // Application-related states
  app: {
    editingClient: null,
    loading: false,
    filteredOrders: [],
    orderFilter: ''
  },
  // Data-related states (will be initialized with mock data)
  data: {
    clients: [],
    orders: [],
    products: [],
    categories: [],
    transactions: [],
    agenda: []
  }
};

// Action types
export const DASHBOARD_ACTIONS = {
  // UI Actions
  SET_ACTIVE_MENU: 'SET_ACTIVE_MENU',
  TOGGLE_FILTERS: 'TOGGLE_FILTERS',
  SET_FILTER_PERIOD: 'SET_FILTER_PERIOD',
  TOGGLE_PASSWORD: 'TOGGLE_PASSWORD',
  TOGGLE_CONFIRM_PASSWORD: 'TOGGLE_CONFIRM_PASSWORD',
  SET_MODAL: 'SET_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_AGENDA_VIEW: 'SET_AGENDA_VIEW',
  SET_AGENDA_VIEW_TYPE: 'SET_AGENDA_VIEW_TYPE',
  TOGGLE_NOTIFICATIONS: 'TOGGLE_NOTIFICATIONS',
  SET_LOGO_URL: 'SET_LOGO_URL',

  // Form Actions
  UPDATE_CLIENT_FORM: 'UPDATE_CLIENT_FORM',
  RESET_CLIENT_FORM: 'RESET_CLIENT_FORM',
  UPDATE_ORDER_FORM: 'UPDATE_ORDER_FORM',
  RESET_ORDER_FORM: 'RESET_ORDER_FORM',
  UPDATE_TRANSACTION_FORM: 'UPDATE_TRANSACTION_FORM',
  RESET_TRANSACTION_FORM: 'RESET_TRANSACTION_FORM',
  UPDATE_APPOINTMENT_FORM: 'UPDATE_APPOINTMENT_FORM',
  RESET_APPOINTMENT_FORM: 'RESET_APPOINTMENT_FORM',
  UPDATE_CATALOG_CONFIG: 'UPDATE_CATALOG_CONFIG',
  UPDATE_CLIENT_SEARCH: 'UPDATE_CLIENT_SEARCH',

  // App Actions
  SET_EDITING_CLIENT: 'SET_EDITING_CLIENT',
  SET_LOADING: 'SET_LOADING',
  SET_FILTERED_ORDERS: 'SET_FILTERED_ORDERS',
  SET_ORDER_FILTER: 'SET_ORDER_FILTER',

  // Data Actions
  SET_CLIENTS: 'SET_CLIENTS',
  ADD_CLIENT: 'ADD_CLIENT',
  UPDATE_CLIENT: 'UPDATE_CLIENT',
  DELETE_CLIENT: 'DELETE_CLIENT',
  SET_ORDERS: 'SET_ORDERS',
  ADD_ORDER: 'ADD_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  DELETE_ORDER: 'DELETE_ORDER',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  SET_AGENDA: 'SET_AGENDA',
  ADD_AGENDA_ITEM: 'ADD_AGENDA_ITEM'
};

// Reducer function
const dashboardReducer = (state, action) => {
  switch (action.type) {
    // UI Actions
    case DASHBOARD_ACTIONS.SET_ACTIVE_MENU:
      return {
        ...state,
        ui: { ...state.ui, activeMenu: action.payload }
      };

    case DASHBOARD_ACTIONS.TOGGLE_FILTERS:
      return {
        ...state,
        ui: { ...state.ui, showFilters: !state.ui.showFilters }
      };

    case DASHBOARD_ACTIONS.SET_FILTER_PERIOD:
      return {
        ...state,
        ui: { ...state.ui, filterPeriod: action.payload }
      };

    case DASHBOARD_ACTIONS.TOGGLE_PASSWORD:
      return {
        ...state,
        ui: { ...state.ui, showPassword: !state.ui.showPassword }
      };

    case DASHBOARD_ACTIONS.TOGGLE_CONFIRM_PASSWORD:
      return {
        ...state,
        ui: { ...state.ui, showConfirmPassword: !state.ui.showConfirmPassword }
      };

    case DASHBOARD_ACTIONS.SET_MODAL:
      return {
        ...state,
        ui: { 
          ...state.ui, 
          showModal: true, 
          modalType: action.payload 
        }
      };

    case DASHBOARD_ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        ui: { 
          ...state.ui, 
          showModal: false, 
          modalType: '' 
        },
        forms: {
          ...state.forms,
          clientForm: initialState.forms.clientForm,
          orderForm: initialState.forms.orderForm,
          transactionForm: initialState.forms.transactionForm,
          appointmentForm: initialState.forms.appointmentForm,
          clientSearch: initialState.forms.clientSearch
        }
      };

    case DASHBOARD_ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        ui: { ...state.ui, searchTerm: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_SELECTED_CATEGORY:
      return {
        ...state,
        ui: { ...state.ui, selectedCategory: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_AGENDA_VIEW:
      return {
        ...state,
        ui: { ...state.ui, agendaView: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_AGENDA_VIEW_TYPE:
      return {
        ...state,
        ui: { ...state.ui, agendaViewType: action.payload }
      };

    case DASHBOARD_ACTIONS.TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        ui: { ...state.ui, showNotifications: !state.ui.showNotifications }
      };

    case DASHBOARD_ACTIONS.SET_LOGO_URL:
      return {
        ...state,
        ui: { ...state.ui, logoUrl: action.payload }
      };

    // Form Actions
    case DASHBOARD_ACTIONS.UPDATE_CLIENT_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          clientForm: { ...state.forms.clientForm, ...action.payload }
        }
      };

    case DASHBOARD_ACTIONS.RESET_CLIENT_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          clientForm: initialState.forms.clientForm
        }
      };

    case DASHBOARD_ACTIONS.UPDATE_ORDER_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          orderForm: { ...state.forms.orderForm, ...action.payload }
        }
      };

    case DASHBOARD_ACTIONS.RESET_ORDER_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          orderForm: initialState.forms.orderForm
        }
      };

    case DASHBOARD_ACTIONS.UPDATE_TRANSACTION_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          transactionForm: { ...state.forms.transactionForm, ...action.payload }
        }
      };

    case DASHBOARD_ACTIONS.RESET_TRANSACTION_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          transactionForm: initialState.forms.transactionForm
        }
      };

    case DASHBOARD_ACTIONS.UPDATE_APPOINTMENT_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          appointmentForm: { ...state.forms.appointmentForm, ...action.payload }
        }
      };

    case DASHBOARD_ACTIONS.RESET_APPOINTMENT_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          appointmentForm: initialState.forms.appointmentForm
        }
      };

    case DASHBOARD_ACTIONS.UPDATE_CATALOG_CONFIG:
      return {
        ...state,
        forms: {
          ...state.forms,
          catalogConfig: { ...state.forms.catalogConfig, ...action.payload }
        }
      };

    case DASHBOARD_ACTIONS.UPDATE_CLIENT_SEARCH:
      return {
        ...state,
        forms: {
          ...state.forms,
          clientSearch: { ...state.forms.clientSearch, ...action.payload }
        }
      };

    // App Actions
    case DASHBOARD_ACTIONS.SET_EDITING_CLIENT:
      return {
        ...state,
        app: { ...state.app, editingClient: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_LOADING:
      return {
        ...state,
        app: { ...state.app, loading: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_FILTERED_ORDERS:
      return {
        ...state,
        app: { ...state.app, filteredOrders: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_ORDER_FILTER:
      return {
        ...state,
        app: { ...state.app, orderFilter: action.payload }
      };

    // Data Actions
    case DASHBOARD_ACTIONS.SET_CLIENTS:
      return {
        ...state,
        data: { ...state.data, clients: action.payload }
      };

    case DASHBOARD_ACTIONS.ADD_CLIENT:
      return {
        ...state,
        data: { 
          ...state.data, 
          clients: [...state.data.clients, action.payload] 
        }
      };

    case DASHBOARD_ACTIONS.UPDATE_CLIENT:
      return {
        ...state,
        data: {
          ...state.data,
          clients: state.data.clients.map(client =>
            client.id === action.payload.id ? { ...client, ...action.payload.data } : client
          )
        }
      };

    case DASHBOARD_ACTIONS.DELETE_CLIENT:
      return {
        ...state,
        data: {
          ...state.data,
          clients: state.data.clients.filter(client => client.id !== action.payload)
        }
      };

    case DASHBOARD_ACTIONS.SET_ORDERS:
      return {
        ...state,
        data: { ...state.data, orders: action.payload }
      };

    case DASHBOARD_ACTIONS.ADD_ORDER:
      return {
        ...state,
        data: { 
          ...state.data, 
          orders: [...state.data.orders, action.payload] 
        }
      };

    case DASHBOARD_ACTIONS.UPDATE_ORDER:
      return {
        ...state,
        data: {
          ...state.data,
          orders: state.data.orders.map(order =>
            order.id === action.payload.id ? { ...order, ...action.payload.data } : order
          )
        }
      };

    case DASHBOARD_ACTIONS.DELETE_ORDER:
      return {
        ...state,
        data: {
          ...state.data,
          orders: state.data.orders.filter(order => order.id !== action.payload)
        }
      };

    case DASHBOARD_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        data: { ...state.data, products: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        data: { ...state.data, categories: action.payload }
      };

    case DASHBOARD_ACTIONS.SET_TRANSACTIONS:
      return {
        ...state,
        data: { ...state.data, transactions: action.payload }
      };

    case DASHBOARD_ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        data: { 
          ...state.data, 
          transactions: [...state.data.transactions, action.payload] 
        }
      };

    case DASHBOARD_ACTIONS.SET_AGENDA:
      return {
        ...state,
        data: { ...state.data, agenda: action.payload }
      };

    case DASHBOARD_ACTIONS.ADD_AGENDA_ITEM:
      return {
        ...state,
        data: { 
          ...state.data, 
          agenda: [...state.data.agenda, action.payload] 
        }
      };

    default:
      return state;
  }
};

// Context creation
const DashboardContext = createContext();

// Context provider component
export const DashboardProvider = ({ children, initialData = {} }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    ...initialState,
    data: { ...initialState.data, ...initialData }
  });

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardContext;