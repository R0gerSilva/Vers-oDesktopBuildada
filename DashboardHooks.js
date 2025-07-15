import { useDashboard, DASHBOARD_ACTIONS } from './DashboardContext';

// Custom hooks for specific functionality areas

// UI-related hooks
export const useUI = () => {
  const { state, dispatch } = useDashboard();
  
  return {
    // State getters
    activeMenu: state.ui.activeMenu,
    showFilters: state.ui.showFilters,
    filterPeriod: state.ui.filterPeriod,
    showPassword: state.ui.showPassword,
    showConfirmPassword: state.ui.showConfirmPassword,
    showModal: state.ui.showModal,
    modalType: state.ui.modalType,
    searchTerm: state.ui.searchTerm,
    selectedCategory: state.ui.selectedCategory,
    agendaView: state.ui.agendaView,
    agendaViewType: state.ui.agendaViewType,
    showNotifications: state.ui.showNotifications,
    logoUrl: state.ui.logoUrl,
    
    // Action dispatchers
    setActiveMenu: (menu) => dispatch({ type: DASHBOARD_ACTIONS.SET_ACTIVE_MENU, payload: menu }),
    toggleFilters: () => dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_FILTERS }),
    setFilterPeriod: (period) => dispatch({ type: DASHBOARD_ACTIONS.SET_FILTER_PERIOD, payload: period }),
    togglePassword: () => dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_PASSWORD }),
    toggleConfirmPassword: () => dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_CONFIRM_PASSWORD }),
    openModal: (type) => dispatch({ type: DASHBOARD_ACTIONS.SET_MODAL, payload: type }),
    closeModal: () => dispatch({ type: DASHBOARD_ACTIONS.CLOSE_MODAL }),
    setSearchTerm: (term) => dispatch({ type: DASHBOARD_ACTIONS.SET_SEARCH_TERM, payload: term }),
    setSelectedCategory: (category) => dispatch({ type: DASHBOARD_ACTIONS.SET_SELECTED_CATEGORY, payload: category }),
    setAgendaView: (view) => dispatch({ type: DASHBOARD_ACTIONS.SET_AGENDA_VIEW, payload: view }),
    setAgendaViewType: (type) => dispatch({ type: DASHBOARD_ACTIONS.SET_AGENDA_VIEW_TYPE, payload: type }),
    toggleNotifications: () => dispatch({ type: DASHBOARD_ACTIONS.TOGGLE_NOTIFICATIONS }),
    setLogoUrl: (url) => dispatch({ type: DASHBOARD_ACTIONS.SET_LOGO_URL, payload: url })
  };
};

// Forms-related hooks
export const useForms = () => {
  const { state, dispatch } = useDashboard();
  
  return {
    // State getters
    clientForm: state.forms.clientForm,
    orderForm: state.forms.orderForm,
    transactionForm: state.forms.transactionForm,
    appointmentForm: state.forms.appointmentForm,
    catalogConfig: state.forms.catalogConfig,
    clientSearch: state.forms.clientSearch,
    
    // Action dispatchers
    updateClientForm: (data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_CLIENT_FORM, payload: data }),
    resetClientForm: () => dispatch({ type: DASHBOARD_ACTIONS.RESET_CLIENT_FORM }),
    updateOrderForm: (data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_ORDER_FORM, payload: data }),
    resetOrderForm: () => dispatch({ type: DASHBOARD_ACTIONS.RESET_ORDER_FORM }),
    updateTransactionForm: (data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_TRANSACTION_FORM, payload: data }),
    resetTransactionForm: () => dispatch({ type: DASHBOARD_ACTIONS.RESET_TRANSACTION_FORM }),
    updateAppointmentForm: (data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_APPOINTMENT_FORM, payload: data }),
    resetAppointmentForm: () => dispatch({ type: DASHBOARD_ACTIONS.RESET_APPOINTMENT_FORM }),
    updateCatalogConfig: (data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_CATALOG_CONFIG, payload: data }),
    updateClientSearch: (data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_CLIENT_SEARCH, payload: data })
  };
};

// App-related hooks
export const useApp = () => {
  const { state, dispatch } = useDashboard();
  
  return {
    // State getters
    editingClient: state.app.editingClient,
    loading: state.app.loading,
    filteredOrders: state.app.filteredOrders,
    orderFilter: state.app.orderFilter,
    
    // Action dispatchers
    setEditingClient: (clientId) => dispatch({ type: DASHBOARD_ACTIONS.SET_EDITING_CLIENT, payload: clientId }),
    setLoading: (loading) => dispatch({ type: DASHBOARD_ACTIONS.SET_LOADING, payload: loading }),
    setFilteredOrders: (orders) => dispatch({ type: DASHBOARD_ACTIONS.SET_FILTERED_ORDERS, payload: orders }),
    setOrderFilter: (filter) => dispatch({ type: DASHBOARD_ACTIONS.SET_ORDER_FILTER, payload: filter })
  };
};

// Data-related hooks
export const useData = () => {
  const { state, dispatch } = useDashboard();
  
  return {
    // State getters
    clients: state.data.clients,
    orders: state.data.orders,
    products: state.data.products,
    categories: state.data.categories,
    transactions: state.data.transactions,
    agenda: state.data.agenda,
    
    // Action dispatchers
    setClients: (clients) => dispatch({ type: DASHBOARD_ACTIONS.SET_CLIENTS, payload: clients }),
    addClient: (client) => dispatch({ type: DASHBOARD_ACTIONS.ADD_CLIENT, payload: client }),
    updateClient: (id, data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_CLIENT, payload: { id, data } }),
    deleteClient: (id) => dispatch({ type: DASHBOARD_ACTIONS.DELETE_CLIENT, payload: id }),
    setOrders: (orders) => dispatch({ type: DASHBOARD_ACTIONS.SET_ORDERS, payload: orders }),
    addOrder: (order) => dispatch({ type: DASHBOARD_ACTIONS.ADD_ORDER, payload: order }),
    updateOrder: (id, data) => dispatch({ type: DASHBOARD_ACTIONS.UPDATE_ORDER, payload: { id, data } }),
    deleteOrder: (id) => dispatch({ type: DASHBOARD_ACTIONS.DELETE_ORDER, payload: id }),
    setProducts: (products) => dispatch({ type: DASHBOARD_ACTIONS.SET_PRODUCTS, payload: products }),
    setCategories: (categories) => dispatch({ type: DASHBOARD_ACTIONS.SET_CATEGORIES, payload: categories }),
    setTransactions: (transactions) => dispatch({ type: DASHBOARD_ACTIONS.SET_TRANSACTIONS, payload: transactions }),
    addTransaction: (transaction) => dispatch({ type: DASHBOARD_ACTIONS.ADD_TRANSACTION, payload: transaction }),
    setAgenda: (agenda) => dispatch({ type: DASHBOARD_ACTIONS.SET_AGENDA, payload: agenda }),
    addAgendaItem: (item) => dispatch({ type: DASHBOARD_ACTIONS.ADD_AGENDA_ITEM, payload: item })
  };
};

// Combined hook for commonly used state and actions
export const useDashboardActions = () => {
  const { state } = useDashboard();
  const ui = useUI();
  const forms = useForms();
  const app = useApp();
  const data = useData();
  
  return {
    // All state
    state,
    // Grouped actions
    ui,
    forms,
    app,
    data
  };
};