<script setup>
import { useCartStore } from '../stores/cartStore.js'

const { cart, confirmOrders } = useCartStore()

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
  <div v-if="cart.confirmOrder" class="confirm-order">
    <div class="content rounded-lg p-6">
      <img src="../assets/images/icon-order-confirmed.svg" class="mb-3" alt="" srcset="" />
      <h3 class="text-2xl font-bold">Order Confirmed</h3>
      <p class="text-sm mb-6">We hope you enjoy your food!</p>
      <ul class="bg-stone-100 p-3 rounded-lg">
        <div v-for="item in cart.items">
          <li class="border-b-2 pb-3 my-2">
            <div class="flex gap-2 items-center">
              <img :src="item.image.thumbnail" alt="" class="w-8 h-8 rounded-md" />
              <p>{{ item.name }}</p>
            </div>
            <div class="flex fle-row justify-between items-baseline">
              <div class="flex flex-row gap-2 items-baseline">
                <span class="text-red-400">{{ `${item.quantity}x` }}</span>
                <span class="text-stone-500" v-if="String(item.price).includes('.')">{{
                  `@$${item.price}0`
                }}</span>
                <span class="text-stone-500" v-else>{{ `$${item.price}.00` }}</span>
                <span
                  class="text-stone-500"
                  v-if="String(item.price * item.quantity).includes('.')"
                  >{{ `@$${item.price * item.quantity}0` }}</span
                >
                <span class="text-stone-500" v-else>{{
                  `@$${item.price * item.quantity}.00`
                }}</span>
              </div>
            </div>
          </li>
        </div>
      </ul>
      <p class="flex flex-row justify-between items-center">
        <span>Order Total</span>
        <span class="text-lg font-bold" v-if="String(getTotal(cart.items)).includes('.')">{{
          `$${getTotal(cart.items)}0`
        }}</span>
        <span class="text-lg font-bold" v-else>{{ `$${getTotal(cart.items)}.00` }}</span>
      </p>
      <button
        @click="confirmOrders()"
        class="w-full bg-orange-600 rounded-full text-white py-2 hover:bg-orange-700"
      >
        Start New Order
      </button>
    </div>
  </div>
</template>

<style>
.confirm-order {
  top: 0%;
  left: 0%;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.333);
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-order .content {
  width: 30%;
  background-color: white;
}

@media not all and (min-width: 640px) {
  .confirm-order {
    display: flex;
    align-items: end;
    justify-content: end;
  }

  .confirm-order .content {
    width: 100%;
    height: 80vh;
  }
}
</style>
