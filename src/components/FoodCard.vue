<script setup>
import { useCartStore } from '../stores/cartStore.js'

const { addItem, decrementItem, incrementItem } = useCartStore()

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
<!-- :src="item.image.desktop" -->
<template>
  <div class="item mb-2">
    <div class="cart-img w-full h-1/2">
      <picture>
        <!-- Use responsive sources -->
        <source :srcset="item.image.mobile" media="(max-width: 640px)" />
        <source :srcset="item.image.tablet" media="(max-width: 1024px)" />
        <source :srcset="item.image.desktop" media="(min-width: 1025px)" />
        <!-- Fallback for unsupported browsers -->
        <img :src="item.image.desktop" :alt="item.name" class="w-full h-auto rounded-md" />
      </picture>

      <div
        v-if="item.quantity > 0"
        class="cart-controls m-auto w-1/2 flex flex-row justify-between items-center bg-orange-600 py-2 px-3 rounded-full hover:bg-orange-700"
      >
        <button class="border py-2 px-1 border-white rounded-full" @click="decrementItem(item)">
          <img src="/images/icon-decrement-quantity.svg" alt="" />
        </button>
        <span class="text-white">
          {{ item.quantity }}
        </span>
        <button class="border p-1 border-white rounded-full" @click="incrementItem(item)">
          <img src="/images/icon-increment-quantity.svg" alt="" />
        </button>
      </div>

      <button
        v-else
        @click="addItem(item)"
        class="add-to-cart m-auto flex flex-row items-center gap-2 hover:border-orange-700 hover:text-orange-700 bg-white rounded-full border py-2 px-6"
      >
        <img src="/images/icon-add-to-cart.svg" alt="" />
        <span>Add to cart</span>
      </button>
    </div>

    <div class="card-content mt-8">
      <p class="text-sm text-stone-500">{{ item.category }}</p>
      <p class="text-lg">{{ item.name }}</p>
      <p class="text-red-700 font-semibold" v-if="String(item.price).length === 1">
        {{ `$${item.price}.00` }}
      </p>
      <p class="text-red-700 font-semibold" v-else>{{ `$${item.price}0` }}</p>
    </div>
  </div>
</template>

<style>
.cart-img {
  position: relative;
}

.card-active {
  border-radius: 8px;
  border: 2px solid orangered;
  object-fit: contain;
}

.cart-controls {
  position: absolute;
  left: 60px;
  bottom: -20px;
}

.add-to-cart {
  position: absolute;
  left: 60px;
  bottom: -20px;
}
</style>
