// src/store/index.js
import { store } from "quasar/wrappers";
import { createStore } from "vuex";

export default store(function () {
  return createStore({
    state: {
      solicitacao:{
        nome: '',
        email: '',
        telefone: '',
        orgao: '',
        urgente: '',
        numeroDocumento: '',
        centroCusto: '',
        diaReserva: '',
        diaLimite: '',
        enderecoPartida: '',
        enderecoDestino: '',
        distancia: '',
        materiais:[],
      },
      solicitacoes:"",
      idSolicitacaoFinalizar:"",
      solicitacaoFinalizar:[],
    
    },
    mutations: {
      dadosSolicitacao(state, params) {
        state.solicitacao.nome = params.nome;
        state.solicitacao.email = params.email;
        state.solicitacao.telefone = params.telefone;
        state.solicitacao.orgao = params.orgao;
        state.solicitacao.urgente = params.urgente;
        state.solicitacao.numeroDocumento = params.numeroDocumento;
        state.solicitacao.centroCusto = params.centroCusto;
        state.solicitacao.diaReserva = params.diaReserva;
        state.solicitacao.diaLimite = params.diaLimite;
        state.solicitacao.enderecoPartida = params.enderecoPartida;
        state.solicitacao.enderecoDestino = params.enderecoDestino;
        state.solicitacao.distancia = params.distancia
      },
      dadosMateriais(state, params){
        state.solicitacao.materiais = params
      },
      setIdSolicitacaoFinalizar(state,params){
        state.idSolicitacaoFinalizar = params
      }

    },
    actions: {
      cadastrarSolicitacao(context){
        fetch(`http://localhost:3000/solicitacao/cadastro`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(context.state.solicitacao),
        })
        .then((response) => response.json())
        .catch((error) => console.error("Erro ao criar carro:", error));
      },

      getSolicitacoes(context){
       
        fetch(" http://localhost:3000/solicitacao/consulta")
          .then((response) => response.json())
          .then((data) => (context.state.solicitacoes = data))
          .catch((error) => console.error("Erro ao buscar Solicitações", error))
      },

      getIdSolicitacao(context){
        fetch(`http://localhost:3000/solicitacao/consultaId/${context.state.idSolicitacaoFinalizar}`)
          .then((response) => response.json())
          .then((data) => (context.state.solicitacaoFinalizar = data))
          .catch((error) => console.error("Erro ao buscar Solicitação", error))
      }
    },
    getters: {
      // Seus getters aqui
    },
  });
});

// chave api googledrive AIzaSyAX7YGBGQvUiKfG2BFRdP4D4xtaL_0QMlo