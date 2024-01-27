<template>
    <div class="container">
        <h4>Dados do Motorista</h4>
        <div class="form">
            <q-file filled bottom-slots
                 v-model="crlv" 
                 label="CRLV do Veículo" 
                 @change="handleChangeCrlv" 
                 ref="fileCrlv"
                >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop.prevent="crlv = null" class="cursor-pointer" />
        </template>
      </q-file>
      <button @click="enviarCrlv">Enviar</button>

            <div>
                ANTT 
                <input type="file" @change="uploadFile('antt', $event)" />
            </div>
            <div>
                CNH do Motorista
                <input type="file" @change="uploadFile('cnhMotorista', $event)" />
            </div>
            <div>
                CNH do Proprietário do Veículo
                <input type="file" @change="uploadFile('cnhProprietario', $event)" />
            </div>
            <div>
                Comprovante de Residência
                <input type="file" @change="uploadFile('comprovanteResidencia', $event)" />
            </div>

        </div>

    </div>
</template>

<script>


export default {
    props:{
        idSolicitacao: String,
    },
    data(){
        return{
            crlv:''
        }
    },
    methods:{
       async enviarCrlv(){
        try{
            const formData = new FormData();
            formData.append("file", this.crlv);
            console.log("Arquivo anexado ao FormData:", formData.get("file"));
            

        }
       

        
       }
    }
}
</script>

<style scoped>

</style>
