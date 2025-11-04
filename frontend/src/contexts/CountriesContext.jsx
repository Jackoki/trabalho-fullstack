import { createContext, useReducer } from "react";

// Estado inicial do contexto
const initialState = {
  countries: [], // Lista de países que será preenchida com os dados da API ou de outra fonte
  query: "",     // Texto da pesquisa para filtrar países
  loading: false, // Indicador de carregamento (true enquanto dados estão sendo buscados)
  error: null,    // Armazena mensagem de erro, caso ocorra algum problema na requisição
};

// Função reducer para atualizar o estado com base nas ações disparadas
function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      // Atualiza a query de pesquisa
      return { ...state, query: action.payload };

    case "SET_LOADING":
      // Sinaliza que está carregando dados e reseta qualquer erro anterior
      return { ...state, loading: true, error: null };

    case "SET_COUNTRIES":
      // Atualiza a lista de países com os dados recebidos e finaliza o carregamento
      return { ...state, countries: action.payload, loading: false, error: null };

    case "SET_ERROR":
      // Em caso de erro, limpa a lista de países, finaliza carregamento e armazena o erro
      return { ...state, countries: [], loading: false, error: action.payload };

    default:
      // Retorna o estado atual se a ação não for reconhecida
      return state;
  }
}

// Cria o contexto que será compartilhado entre componentes
export const CountriesContext = createContext();

// Provider que envolve os componentes que precisarão acessar o estado do contexto
export function CountriesProvider({ children }) {
  // useReducer é usado para gerenciar o estado complexo com várias ações
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CountriesContext.Provider value={{ state, dispatch }}>
      {children} {/* Renderiza os componentes filhos */}
    </CountriesContext.Provider>
  );
}
