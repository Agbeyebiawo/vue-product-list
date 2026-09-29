<script setup>
import { useCartStore } from '../stores/cartStore.js'
import ConfirmOrder from './ConfirmOrder.vue'

const { cart, removeItem, confirmOrders } = useCartStore()

function getTotal(stuff) {
  let total = 0
  if (!stuff) {
    total = 0
  } else {
    let itemPrices = stuff.map((item) => item.price * item.quantity)
    itemPrices.forEach((element) => {
      total += element
    })
    return total
  }
}
</script>

<template>
  <div class="cart mb-2 p-6 rounded-lg bg-white">
    <h2 class="text-orange-700 font-bold text-xl mb-6">Your Cart ({{ cart.quantity }})</h2>
    <div v-if="cart.items.length !== 0">
      <ul v-for="item in cart.items" class="mb-4">
        <li class="border-b-2">
          <p>{{ item.name }}</p>
          <div class="flex fle-row justify-between items-baseline py-2">
            <div class="flex flex-row gap-4 items-baseline">
              <span class="text-red-700">{{ `${item.quantity}x` }}</span>
              <span class="text-stone-500" v-if="String(item.price).includes('.')">{{
                `@$${item.price}0`
              }}</span>
              <span class="text-stone-500" v-else>{{ `$${item.price}.00` }}</span>
              <span
                class="text-stone-500"
                v-if="String(item.price * item.quantity).includes('.')"
                >{{ `$${item.price * item.quantity}0` }}</span
              >
              <span class="text-stone-500" v-else>{{ `$${item.price * item.quantity}.00` }}</span>
            </div>

            <button class="border p-1 border-gray-500 rounded-full" @click="removeItem(item)">
              <img src="/images/icon-remove-item.svg" alt="" srcset="" />
            </button>
          </div>
        </li>
      </ul>
      <p class="flex flex-row justify-between items-center mb-3">
        <span>Order Total</span>
        <span class="text-2xl font-bold" v-if="String(getTotal(cart.items)).includes('.')">{{
          `$${getTotal(cart.items)}0`
        }}</span>
        <span class="text-2xl font-bold" v-else>{{ `$${getTotal(cart.items)}.00` }}</span>
      </p>
      <div
        class="bg-stone-100 text-stone-500 mb-4 py-2 px-3 flex flex-row items-start rounded-lg gap-3"
      >
        <img src="../assets/images/icon-carbon-neutral.svg" alt="" />
        <span>This is a <span class="text-black font-semibold">carbon-neutral</span> delivery</span>
      </div>
      <button
        @click="confirmOrders()"
        class="w-full bg-orange-600 rounded-full text-white p-2 hover:bg-orange-700"
      >
        Confirm Order
      </button>
    </div>

    <div v-else>
      <img src="/images/illustration-empty-cart.svg" class="m-auto" alt="" />
      <p class="text-center">Your added items will appear here</p>
    </div>

    <ConfirmOrder />
  </div>
</template>
