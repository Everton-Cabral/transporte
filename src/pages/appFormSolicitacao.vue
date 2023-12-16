<template>
  <div class="solicitacao">
   
      <h2>Solicitação de Transporte</h2>
      <div class="container-solicitacao">

    
        <div class="form-step1">
          <q-input filled 
              v-model="nome" 
              label="Nome Completo"
          />
          <q-input filled 
              v-model="email"
              label="Email" 
              type="email"
          />
          <q-input filled 
              v-model="orgao" 
              label="Orgão"
          />
          <q-input filled
              v-model="telefone"
              label="Telefone"
              mask="(##) ##### - ####"
          />
          <q-input filled 
              v-model="numeroDocumento" 
              label="Nº Documento Material (MIGO)"
          />
          <q-input filled 
              v-model="centroCusto" 
              label="Centro de Custo ou PEP"
          />

          <div class="q-pa-md q-gutter-sm">
              <q-toggle
                  label="Urgente"
                  v-model="urgente"
                  checked-icon="check"
                  color="green"
                  unchecked-icon="clear"
              /> 
            </div>

            
        </div>
        <div class="form-step2">
          <q-input filled 
              v-model="dataReservada"
              label="Dia da Reserva" 
              type="date"
          />
          <q-input filled 
              v-model="dataLimite"
              label="Dia Limite de Entrega" 
              type="date"
          />

          <q-input
            filled
            v-model="enderecoPartida"
            label="Endereço de Partida"
            ref="inputPartida"
          />
        
        
          <q-input
            filled
            v-model="enderecoDestino"
            label="Endereço de Destino"
            ref="inputDestino"
          />

          <q-btn @click="calcularRota" class="button" label="Calcular Rota" color="primary" />

          <!-- Exibir informações sobre a rota -->
          <div v-if="rota">
            <p>Distância: {{ rota.distancia }}</p>
            <p>Tempo estimado: {{ rota.tempo }}</p>
          </div>

        </div>
        <div id="map"></div>
       
      </div>
      <div class="materiais">
        <div class="form-materiais">
          <q-input rounded outlined v-model="codSap" label="Código SAP"  style="margin: 5px;"/>
          <q-input rounded outlined v-model="descricao" label="Descrição" style="margin: 5px;"/>
          <q-input rounded outlined v-model="qtd" label="Qtd" style="margin: 5px; width: 80px;"/>
          <q-select rounded outlined v-model="unidade" :options="optionsUnidade" label="Unidade" style="margin: 5px;"/>
          <q-input rounded outlined v-model="comprimento" label="Comprimento  (m)" style="margin: 5px; width: 80px;"/>
          <q-input rounded outlined v-model="largura" label="Largura (m)" style="margin: 5px; width: 80px;"/>
          <q-input rounded outlined v-model="altura" label="Altura  (m)" style="margin: 5px; width: 80px;"/>
          <q-input rounded outlined v-model="peso" label="Peso (Kg)" style="margin: 5px; width: 80px;"/>
          <q-select rounded outlined v-model="estivacao" :options="optionsEstivacao" label="Estivação" style="margin: 5px;"/>
          <q-btn round color="secondary" icon="add" style="margin: 5px; width: 60px;" @click="addMaterial()"/>
        </div>
      </div>

      <div class="container-tabela">
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
  </div>
      
  </div>
</template>

<script>
export default {
  mounted() {
    this.inicializarMapa();
  },

  data() {
    return {
      nome: '',
      email: '',
      telefone: '',
      orgao: '',
      urgente: false,
      numeroDocumento: '',
      centroCusto: '',
      dataReservada: '',
      dataLimite: '',
      enderecoPartida: '',
      enderecoDestino: '',
      autocompletePartida: null,
      autocompleteDestino: null,
      rota: null,
      marcadores: {
        partida: null,
        destino: null,
      },
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
      
    };
  },
  watch: {
    enderecoPartida: function(newValue) {
      this.atualizarAutocomplete('partida', newValue);
    },
    enderecoDestino: function(newValue) {
      this.atualizarAutocomplete('destino', newValue);
    }
  },
  methods: {
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
    inicializarMapa() {
      const recife = { lat: -8.047562, lng: -34.877044 };

      this.mapa = new google.maps.Map(document.getElementById('map'), {
        center: recife,
        zoom: 8
      });

      this.autocompletePartida = new google.maps.places.Autocomplete(
        this.$refs.inputPartida.$el.querySelector('input')
      );
      this.autocompleteDestino = new google.maps.places.Autocomplete(
        this.$refs.inputDestino.$el.querySelector('input')
      );
    },

    atualizarAutocomplete(tipo, evento) {

      const autocomplete = tipo === 'partida' ? this.autocompletePartida : this.autocompleteDestino;
    

      // Conecte o autocomplete ao campo de entrada
      autocomplete.bindTo('bounds', this.mapa);

      // Ouça o evento 'place_changed'
      autocomplete.addListener('place_changed', () => {
        
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          // Usuário inseriu um lugar que não retornou resultados
          return;
        }

        // Atualize as coordenadas no mapa, se necessário
        this.mapa.setCenter(place.geometry.location);
        this.mapa.setZoom(14); // Ajuste o zoom conforme necessário
      
        if (tipo === 'partida') {
          this.enderecoPartida = place.formatted_address;
          } else {
          this.enderecoDestino = place.formatted_address;
        }

      });
    },

    calcularRota() {
      const request = {
      origin: this.enderecoPartida,
      destination: this.enderecoDestino,
      travelMode: 'DRIVING',
    };

  const directionsService = new google.maps.DirectionsService();

  // Crie uma Promise para aguardar a conclusão da execução assíncrona
  const rotaPromise = new Promise((resolve, reject) => {
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        resolve(response);
      } else {
        reject(status);
      }
    });
  });

  rotaPromise.then((response) => {
    // Limpe a rota anterior
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }

    // Renderize a nova rota
    this.directionsRenderer = new google.maps.DirectionsRenderer({ map: this.mapa });
    this.directionsRenderer.setDirections(response);

    const rota = response.routes[0].legs[0];
    this.rota = {
      distancia: rota.distance.text,
      tempo: rota.duration.text,
    };

    // Adicione marcadores para a partida e destino
    this.adicionarMarcador('partida', rota.start_location, 'Partida');
    this.adicionarMarcador('destino', rota.end_location, 'Destino');
    }).catch((status) => {
      console.error('Erro ao calcular a rota:', status);
    });
},

    adicionarMarcador(tipo, localizacao, titulo) {
      // Remova o marcador existente se houver
      if (this.marcadores[tipo]) {
        this.marcadores[tipo].setMap(null);
      }

      // Adicione um novo marcador
      this.marcadores[tipo] = new google.maps.Marker({
        position: localizacao,
        map: this.mapa,
        title: titulo,
      });
    },
  },
};
</script>

<style>
.solicitacao{
  display: flex;
  flex-direction: column;
  align-items: center;

}
.container-solicitacao{
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: center;
}
.form-step1{
  width: 35%;
  margin: 0px 10px 5px 10px;
}
.form-step2{
  width: 35%;
  margin: 0px 20px 5px 10px;
}
#map {
  height: 400px;
  width: 25%;
}
.button{
  margin-top: 5px;
}
.materiais{
  background-color: rgb(235, 235, 235);
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-materiais{
  display: flex;
  justify-content: center;
  
 
}
.container-tabela{
  width: 95%;
  margin: 10px;

}
@media (max-width: 1000px) {
    h2{
      font-size: 30px;
    }
    .container-solicitacao{
      flex-direction: column;
    }
    .form-step1, .form-step2, #map{
      width: 100%;
      margin: 0px;
    }
    #map{
      margin-top: 10px;
    }
    .materiais{
      height: auto;
    }
    .form-materiais{
      flex-wrap: wrap;
    }
    .container-tabela{
      width: 95%;
    }
}

</style>
