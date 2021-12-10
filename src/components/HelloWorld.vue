<template>
  <div class="hello" style="width: 400px; margin: auto">
    <invoice-component v-model="invoice" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Invoice as TypeInvoice } from '@/Types/invoice';
import { User as TypeUser } from '@/Types/user';
import UserModule from '@/modules/user';
import InvoiceModule from '@/modules/invoice';
import InvoiceComponent from '@/components/Invoice.vue';

@Component({
  components: {
    InvoiceComponent,
  },
})
export default class HelloWorld extends Vue {
  // eslint-disable-next-line class-methods-use-this
  get currentUser(): TypeUser {
    return UserModule.create('Thiago', 'ThiagoPhoto');
  }

  invoice: TypeInvoice = InvoiceModule.create(this.currentUser);
}
</script>
