<template>
  <div class="line-item">
    <div class="product-name">{{ item.product.name }}</div>
    <div class="rate">$ {{ item.rate }}</div>
    <div class="quantity">{{ item.quantity }}</div>
    <div class="line-total">$ {{ lineItemTotal }}</div>
    <div class="actions">
      <a href="#" @click.prevent="showEditModal = true">Edit</a>
      <br />
      <a href="#" @click.prevent="removeLineItem">Delete</a>
    </div>
    <EditLineItemModal
      v-if="showEditModal"
      :item="item"
      mode="edit"
      @close="showEditModal = false"
      @update="updateLineItem"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Decimal from 'decimal.js';
import EditLineItemModal from '@/components/EditLineItemModal.vue';
import { LineItem as TypeLIneItem } from '@/Types/invoice';
import LineItemModule from '@/modules/lineItem';

@Component({ components: { EditLineItemModal } })
export default class LineItemComp extends Vue {
  @Prop({ required: true, type: Object })
  item!: TypeLIneItem

  @Prop({ required: true, type: Number })
  index!: number

  mounted() : void {
    console.log('LineItemComp', this.item);
  }

  showEditModal = false;

  get lineItemTotal() : Decimal {
    return LineItemModule.calculateLineTotal(this.item);
  }

  removeLineItem() : void {
    this.$emit('remove', this.index);
  }
}
</script>

<style scoped>
.line-item {
  display: grid;
  grid-template-columns: 1fr 50px 50px 50px auto;
  gap: 10px;
}
.product-name {
  text-align: left;
}
.rate,
.quantity,
.line-total {
  text-align: right;
}
</style>
