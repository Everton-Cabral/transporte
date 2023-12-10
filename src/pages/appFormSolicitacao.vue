<template>
  <div class="solicitacao">
    <div class="q-pa-md" style="max-width: 600px">
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

      <q-btn @click="calcularRota" label="Calcular Rota" color="primary" />

      <!-- Exibir informações sobre a rota -->
      <div v-if="rota">
        <p>Distância: {{ rota.distancia }}</p>
        <p>Tempo estimado: {{ rota.tempo }}</p>
      </div>

      <div id="map"></div>
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
#map {
  height: 400px;
  width: 100%;
}
</style>
