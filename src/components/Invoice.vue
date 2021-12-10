<template>
  <div>
    <div class="heading">
      <div>Invoice #123</div>
      <div>Due Dec 08, 2021</div>
    </div>
    <div class="line-items">
      <template v-for="(lineItem, index) in value.lineItems">
        <LineItem
          :item="lineItem"
          :index="index"
          :key="index"
          @update="editLineItem"
          @remove="removeLineItem"
        />
      </template>
      <p v-if="value.lineItems.length === 0">
        No line items
      </p>
    </div>
    <div class="footer">
      <AddLineItem @add="addLineItem" />
      Total: ${{ value.totalAmount }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
} from 'vue-property-decorator';
import { Invoice as TypeInvoice, LineItem as TypeLineItem } from '@/Types/invoice';
import InvoiceModule from '@/modules/invoice';
import LineItem from '@/components/LineItem.vue';
import AddLineItem from '@/components/AddLineItem.vue';

@Component({
  components: {
    LineItem,
    AddLineItem,
  },
})

export default class Invoice extends Vue {
  @Prop({ required: true, type: Object })
  value!: TypeInvoice

  mounted() : void {
    console.log(this.value);
  }

  @Emit('input')
  addLineItem(newLineItem: TypeLineItem) : TypeInvoice {
    return InvoiceModule.addLineItem(this.value, newLineItem);
  }

  @Emit('input')
  editLineItem(index: number, newLineItem: TypeLineItem) : TypeInvoice {
    return InvoiceModule.changeLineItem(this.value, index, newLineItem);
  }

  @Emit('input')
  removeLineItem(index: number) : TypeInvoice {
    return InvoiceModule.removeLineItem(this.value, index);
  }
}
</script>

<style scoped>
.heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  margin-bottom: 5px;
}
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
