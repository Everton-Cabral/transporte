<template>
    <div class="container">
        <div class="q-pa-md">
   

    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Dados da Solicitação"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
      <dadosSolicitacao 
        :dados = solicitacaoFinalizar
        />
      

        <q-stepper-navigation>
          <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Dados do Motorista"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <cadMotorista 
        :idSolicitacao="solicitacaoFinalizar._id "
        />
       

        <q-stepper-navigation>
          <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Concluir Solicitação"
        icon="add_comment"
        :header-nav="step > 3"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn color="primary" @click="done3 = true" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
      
       
      
       
       

    </div>
</template>

<script>
import { mapState } from "vuex";
import dadosSolicitacao from "../components/dadosSolicitacao.vue"
import cadMotorista from "../components/cadMotorista.vue"
import { ref } from 'vue'
export default {
    components:{dadosSolicitacao, cadMotorista},
    data(){
        return{
            step: ref(1)
        }
    },

computed:{
    ...mapState(["solicitacaoFinalizar"])
},

mounted(){
    this.$store.dispatch("getIdSolicitacao")
}
}
</script>

<style scoped>
.botao-aceitar{
    display: flex;
    justify-content: center;
}

</style>
