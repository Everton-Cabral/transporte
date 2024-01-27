<template>
    <div class="container">
        <h4>Dados da Solicitação</h4>
    
        <div class="dados-solicitacao">
            <div class="info-item">
                <div class="label">Nome:</div>
                <div class="value">{{ dados.nome }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Email:</div>
                <div class="value">{{ dados.email }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Orgão:</div>
                <div class="value">{{ dados.orgao }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Telefone:</div>
                <div class="value">{{ dados.telefone }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Urgente:</div>
                <div class="value">{{ dados.urgente }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Data Reservada:</div>
                <div class="value">{{ dados.diaReserva }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Data Limite:</div>
                <div class="value">{{ dados.diaLimite }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Endereço de Partida:</div>
                <div class="value">{{ dados.enderecoPartida }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Endereço de Destino:</div>
                <div class="value">{{ dados.enderecoDestino }}</div>
            </div>
        
            <div class="info-item">
                <div class="label">Distância:</div>
                <div class="value">{{ dados.distancia }}</div>
            </div>
        </div>
        <div class="q-pa-md">
                <q-table
                    style="height: 400px;"
                    flat bordered
                    title="Materiais"
                    :rows="dados.materiais"
                    :columns="columns"
                    row-key="_id"
                    virtual-scroll
                
                />
        </div>
        
    </div>
  </template>
  
  <script>
  export default {
    props: {
      dados: Object,
    },
    data(){
        return{
            columns:[
            { align: 'center', label: 'Código Sap', field:'codSap'},
            { align: 'center', label: 'Descrição', field:'descricao'},
            { align: 'center', label: 'Qtd', field:'qtd'},
            { align: 'center', label: 'Unidade', field:'unidade'},
            { align: 'center', label: 'Comprimento (m)', field:'comprimento'},
            { align: 'center', label: 'Altura (m)', field:'altura'},
            { align: 'center', label: 'Largura (m)', field:'largura'},
            { align: 'center', label: 'Volume (m³)', field:'volume'},
            { align: 'center', label: 'Peso (Kg)', field:'peso'},
            { align: 'center', label: 'Peso Total (Kg)', field:'codSap'},
            { align: 'center', label: 'Estivação', field:'estivacao'},
            ],
        }
    }
  };
  </script>
  
  <style scoped>
  .dados-solicitacao {
    background-color: #fff; /* Fundo branco da div pai */
    color: #333; /* Cor do texto */
    border: 1px solid #ccc; /* Borda cinza claro */
    border-radius: 8px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin: 0px 15px 0px 15px;
  }
  
  .info-item {
    padding: 15px;
    background-color: #f0f0f0; /* Cor de fundo cinza claro */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Efeito de sombra para profundidade */
    border-radius: 4px;
  }
  
  .label {
    font-weight: bold;
  }
  
  .value {
    margin-top: 5px;
  }
  </style>
  