<script>
import { mapActions } from 'vuex'
export default {
  computed:{
  isFormInvoiceOpen() {
      return this.$store.getters.isFormInvoiceOpen;
    },
    isBaseDialogClosed() {
      return this.$store.getters.isBaseDialogClosed;
    },
  },
  methods:{
    ...mapActions(['closeFormInvoice',"closeBaseDialog"]),
    close(){
      this.isFormInvoiceOpen&&this.closeFormInvoice();
      !this.isBaseDialogClosed&&this.closeBaseDialog({isClosed:true});
    }
    
  }
}
</script>
<template>
  <div class="backdrop" @click="close"></div>
</template>
<style lang="scss" scoped>
@import  "../styles/base";
.backdrop{
    position:fixed;
    background: rgba(black,.7);
    width: 100%;
    height: 100%;
    top:0;
    z-index:10
}
</style>