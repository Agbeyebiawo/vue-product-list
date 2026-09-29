<script setup>
import itemData from './data.json'
import { ref } from 'vue'
import Cart from './components/Cart.vue'
import FoodCard from './components/FoodCard.vue'

const data = ref(itemData)
</script>

<template>
  <section class="container my-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-if="data" class="col-span-2 row-span-4">
        <h1 class="text-3xl font-bold mb-8">Desserts</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(item, index) in data" :key="index">
            <FoodCard :item="item" />
          </div>
        </div>
      </div>
      <Cart />
    </div>
  </section>
</template>
<!-- <template>
  <section class="container my-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-if="data" class="col-span-2 row-span-4">
        <h1 class="text-3xl font-bold mb-8">Desserts</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="item in data">
            <FoodCard :item="item" />
          </div>
        </div>
      </div>
      <Cart />
    </div>
  </section>
</template> -->
