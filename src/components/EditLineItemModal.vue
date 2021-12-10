<template>
  <SimpleModal class="edit-line-item">
    <h3 slot="header">{{ title }}</h3>
    <div slot="body" class="edit-line-item-body">
      <label>
        Product<br />
        <ProductSelector v-model="localLineItem.product" />
      </label>
      <label for="rate">
        Rate<br />
        <input
          name="rate"
          type="number"
          placeholder="Rate"
          v-model="rate"
          class="number-imput"
        />
      </label>
      <label for="quantity">
        Quantity <br />
        <input
          type="number"
          placeholder="Quantity"
          v-model.number="localLineItem.quantity"
          class="number-imput"
        />
      </label>
    </div>
    <div slot="footer">
      <button @click="updateLineItem" :disabled="!isValidLineItem">Ok</button>
      <button @click="$emit('close')">Cancel</button>
    </div>
  </SimpleModal>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';
import Decimal from 'decimal.js';
import { LineItem as TypeLineItem } from '@/Types/invoice';
import { Partial as TypePartial } from '@/Types/utils';
import SimpleModal from '@/components/SimpleModal.vue';
import ProductSelector from '@/components/ProductSelector.vue';

@Component({
  components: {
    SimpleModal,
    ProductSelector,
  },
})

export default class EditLineItemModal extends Vue {
  @Prop({ required: true, type: Object })
  item!: TypePartial<TypeLineItem>

  @Prop({ type: String, default: 'edit' })
  mode!: 'edit' | 'create'

  mounted() : void {
    console.log(this.item);
  }

  localLineItem: TypePartial<TypeLineItem> = {
    product: null,
    rate: null,
    quantity: 0,
  }

  get title() : string {
    return this.mode === 'edit' ? 'Edit Line Item' : 'Add Line Item';
  }

  get rate() : number | null{
    const { rate } = this.localLineItem;
    console.log(rate);
    return rate ? Number(rate) : null;
  }

  set rate(val: number | null) {
    this.localLineItem.rate = val ? new Decimal(val) : null;
  }

  @Watch('value', { immediate: true, deep: true })
  valueChangeHandler() : void {
    console.log(this.item);
    this.localLineItem = JSON.parse(JSON.stringify(this.item));
  }

  updateLineItem(): void {
    this.$emit('update', this.localLineItem);
  }

  get isValidLineItem() : boolean {
    return (
      !!this.localLineItem.product
      && !!this.localLineItem.rate
      && typeof this.localLineItem.quantity === 'number'
    );
  }
}
</script>

<style scoped>
.edit-line-item {
  text-align: left;
}
.edit-line-item-body {
  display: grid;
  grid-template-columns: 1fr 100px 100px;
}
.number-input {
  width: 60px;
}
</style>
