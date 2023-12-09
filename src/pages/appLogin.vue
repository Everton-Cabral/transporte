<template>
    <div class="login">
        <q-layout view="lHh Lpr lFf">
            <q-page-container>
                <q-page class="flex flex-center bg-grey-2">
                    <q-card class="q-pa-md shadow-2 my_card" bordered>
                        <q-card-section class="text-center">
                            <div class="text-grey-9 text-h5 text-weight-bold">Login</div>
                            <div class="text-grey-8">Faça login abaixo para acessar sua conta</div>
                        </q-card-section>
                        <q-card-section>
                            <q-input dense outlined v-model="email" label="Email" ></q-input>
                            <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
                        </q-card-section>
                        <q-card-section>
                            <q-btn style="
                                border-radius: 8px;" 
                                color="dark" 
                                rounded size="md" 
                                label="Entrar" 
                                no-caps 
                                class="full-width"
                                @click="verificacao()"
                                >
                            </q-btn>
                        </q-card-section>
                        <q-card-section class="text-center q-pt-none">
                            <div class="text-grey-8">
                                Não tem uma conta ainda?
                            <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Suporte</a></div>
                        </q-card-section>
                    </q-card>
                </q-page>
            </q-page-container>
         </q-layout>

    </div>
</template>

<script>
export default {
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        verificacao(){
            if(this.email==="cliente@gmail.com" && this.password ==="1234"){
                this.$router.push('/solicitacao');
            } else if(this.email==="adm@gmail.com" && this.password==="1234"){
                this.$router.push('/app');
            } else {
                alert('dados incorretos')
            }
        }
           
    }
}
</script>

<style scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
