<template>
    <div class="container">
    
        <div class="q-pa-md">
            <q-table
            style="height: 600px"
            flat bordered
            title="Solicitações Pendentes"
            :rows="solicitacoes"
            :columns="columns"
            row-key="_id"
            virtual-scroll
            :pagination="false"
            :rows-per-page-options="[solicitacoes.length]"
        >
        <template v-slot:body-cell-acoes="props">
          <q-td :props="props">
            <q-btn icon="folder" style="color: rgb(173, 168, 168);" @click="escolherSolicitacao(props.row)" />
          </q-td>
        </template>
        </q-table>
        </div>
      

    </div>
</template>

<script>
import { mapState } from "vuex";

export default {


data(){
    return{
        columns:[
        { align: 'center', label: 'AÇÕES', field: 'acoes', name: 'acoes', 'body-style': 'max-width: 80px;' },
        { align: 'center', label: 'NOME', field:'nome'},
        { align: 'center', label: 'ORGÃO', field:'orgao' },
        { align: 'center', label: 'URGENTE', field:'urgente' },
        { align: 'center', label: 'DATA RESERVADA', field: row => this.formatarDataEntrada(row.diaReserva)},
        { align: 'center', label: 'DATA LIMITE', field:row => this.formatarDataEntrada(row.diaLimite)},
        { align: 'center', label: 'ENDEREÇO PARTIDA',   style: 'font-size: 10px;', field:'enderecoPartida'},
        { align: 'center', label: 'ENDEREÇO DESTINO', style: 'font-size: 10px;', field:'enderecoDestino'},
        ],
      
    }
},
computed:{
    ...mapState(["solicitacoes"])
},
methods:{
    async escolherSolicitacao(params){
        await this.$store.commit("setIdSolicitacaoFinalizar", params._id)
        this.$router.push('/finalizarsolicitacao');
    },
    formatarDataEntrada(data) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC",
      };
      return new Date(data).toLocaleDateString("pt-BR", options);
    },
},

mounted(){
    this.$store.dispatch("getSolicitacoes")
},
}
</script>

<style>

</style>
