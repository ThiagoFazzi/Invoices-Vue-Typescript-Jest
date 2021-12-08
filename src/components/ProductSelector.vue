<template>
  <Select v-model="selectedProduct">
    <template v-for="(product, i) in Products">
      <option :value="product" :key="i">{{ product.name }}</option>
    </template>
  </Select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Product as TypeProduct } from '@/Types/product';

@Component({})

export default class ProductSelector extends Vue {
  @Prop({ required: false, type: Object, default: null })
  value!: TypeProduct | null

  products: TypeProduct[] = [
    { name: 'Product 01', description: 'prod 01 description' },
    { name: 'Product 02', description: 'prod 02 description' },
  ]

  get selectedProduct() : TypeProduct | null {
    return this.value;
  }

  set selectedProduct(val: TypeProduct | null) {
    this.$emit('input', val);
  }
}
</script>
