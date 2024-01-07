<template>
    <div class="container">
        <h2>Finalizar Solicitação</h2>
        {{ idSolicitacaoFinalizar }}

    </div>
</template>

<script>
import { mapState } from "vuex";
export default {

computed:{
    ...mapState(["idSolicitacaoFinalizar"])
}
}
</script>

<style>

</style>
