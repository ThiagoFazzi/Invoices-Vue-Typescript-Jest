<template>
  <div>
    <button @click="showModal = true">Add Line Item</button>
    <EditLineItemModal
      v-if="showModal"
      :item="newLineItem()"
      mode="create"
      @update="addLineItem"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import Decimal from 'decimal.js';
import EditLineItemModal from '@/components/EditLineItemModal.vue';
import { LineItem as TypeLineItem } from '@/Types/invoice';

@Component({
  components: {
    EditLineItemModal,
  },
})

export default class AddLineItem extends Vue {
  showModal = false

  static newLineItem(): Partial<TypeLineItem> {
    return {
      product: null,
      rate: new Decimal(0),
      quantity: 0,
    };
  }

  @Emit('add')
  addLineItem(lineItem: TypeLineItem) : TypeLineItem {
    this.showModal = false;
    return lineItem;
  }
}
</script>
