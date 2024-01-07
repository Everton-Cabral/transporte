<template>
    <div class="container">
  
          <div class="titulo">Materiais a ser Transportados</div>
         
     
      
        <div class="form-materiais">
          <q-input filled outlined v-model="codSap" label="Código SAP"  style="margin: 5px;"/>
          <q-input filled outlined v-model="descricao" label="Descrição" style="margin: 5px; width: 250px;"/>
          <q-input filled outlined v-model="qtd" label="Qtd" style="margin: 5px; width: 80px;"/>
          <q-select filled outlined v-model="unidade" :options="optionsUnidade" label="Unidade" style="margin: 5px;"/>
          <q-input filled outlined v-model="comprimento" label="Comprimento  (m)" style="margin: 5px; width: 140px;"/>
          <q-input filled outlined v-model="largura" label="Largura (m)" style="margin: 5px; width: 120px;"/>
          <q-input filled outlined v-model="altura" label="Altura  (m)" style="margin: 5px; width: 120px;"/>
          <q-input filled outlined v-model="peso" label="Peso (Kg)" style="margin: 5px; width: 80px;"/>
          <q-select filled outlined v-model="estivacao" :options="optionsEstivacao" label="Estivação" style="margin: 5px; width: 220px;"/>
          <q-btn  color="secondary" label="Adicionar" style="margin: 5px; height: 40px;" @click="addMaterial()"/>
        </div>

        <div  class="tabela">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Código Sap</th>
                <th class="text-right">Descrição</th>
                <th class="text-right">Qtd</th>
                <th class="text-right">Unidade</th>
                <th class="text-right">Comprimento (m)</th>
                <th class="text-right">Altura (m)</th>
                <th class="text-right">Largura (m)</th>
                <th class="text-right">Volume (m³)</th>
                <th class="text-right">Peso (Kg)</th>
                <th class="text-right">Peso Total (Kg)</th>
                <th class="text-right">Estivação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(material, i) in materiais" :key="i">
                <td class="text-left">{{ material.codSap }}</td>
                <td class="text-right">{{ material.descricao }}</td>
                <td class="text-right">{{ material.qtd }}</td>
                <td class="text-right">{{ material.unidade }}</td>
                <td class="text-right">{{ material.comprimento }}</td>
                <td class="text-right">{{ material.largura }}</td>
                <td class="text-right">{{ material.altura }}</td>
                <td class="text-right">{{ material.volume }}</td>
                <td class="text-right">{{ material.peso }}</td>
                <td class="text-right">{{ material.pesoTotal }}</td>
                <td class="text-right">{{ material.estivacao }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div >
        <div class="botao-concluir">
          <q-btn  color="primary" label="Concluir Solicitação" style="margin: 5px; height: 40px; width:280px" @click="enviarSolicitacao()"/>
        </div>
        

    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
data(){
    return{
      codSap: '',
      descricao:'',
      qtd:'',
      unidade: 'Unidade',
      optionsUnidade: ['Unidade', 'Caixa','Fardo'],
      comprimento:'',
      largura: '',
      altura: '',
      peso:'',
      estivacao:'Selecione',
      optionsEstivacao: ['Apenas Carregamento', 'Apenas Descarregamento', 'Carregamento e Descarregamento', 'N/D'],
      materiais:[]
    }
},
computed:{
    
},
methods:{
    addMaterial(){
      const novoMaterial = {
        codSap: this.codSap,
        descricao: this.descricao,
        qtd: this.qtd,
        unidade: this.unidade,
        comprimento: this.comprimento,
        largura: this.largura,
        altura: this.altura,
        volume: this.comprimento * this.largura * this.altura,
        peso: this.peso,
        pesoTotal: this.qtd * this.peso,
        estivacao: this.estivacao,
      }
      this.materiais.push(novoMaterial)
      this.codSap = ""
      this.descricao = ""
      this.qtd = ""
      this.unidade = "Unidade"
      this.comprimento = ""
      this.largura = ""
      this.altura = ""
     this.estivacao = ""
     this.peso = ""
    },
    async enviarSolicitacao(){
      await this.$store.commit("dadosMateriais", this.materiais)
      await this.$store.dispatch("cadastrarSolicitacao")
      this.$router.push('/solicitacao')
    }
}
}
</script>

<style scoped>
.container{
    display: flex;
   justify-content: center;
    flex-direction: column;
}
.titulo{
    font-size: 40px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.form-materiais{
    display: flex;
    justify-content: center;
}
.tabela{

  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.botao-concluir{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
