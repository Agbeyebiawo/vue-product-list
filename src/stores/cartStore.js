import { reactive , computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    const cart = reactive({
      items: [],
      quantity:0,
      confirmOrder: false
    })
    function addItem(product) {
      const itemExist = cart.items.find((item)=> item.name === product.name)
      if(!itemExist){
        product.quantity = 1
        cart.items.push(product)
      }else{
        itemExist.quantity +=1
      }
      cart.quantity +=1

    }
    function removeItem(product){
      const itemExist = cart.items.find((item)=> item.name === product.name)
      if(!itemExist){
        return
      }else{
        cart.items.splice(cart.items.indexOf(itemExist),1)
        cart.quantity -= itemExist.quantity
      }
    }
    function incrementItem(product) {
      const itemExist = cart.items.find((item)=> item.name === product.name)
      if(!itemExist){
        product.quantity = 1
        cart.items.push(product)
      }else{
        itemExist.quantity +=1
      }
      cart.quantity +=1

    }
    function decrementItem(product) {
      const itemExist = cart.items.find((item)=> item.name === product.name)
      if(itemExist && itemExist.quantity === 1){
        itemExist.quantity -= 1
        cart.quantity -= 1

        if(itemExist.quantity === 0){
          cart.items.splice(cart.items.indexOf(itemExist),1)
        }
      }else{
        itemExist.quantity -= 1
        cart.quantity -= 1

      }
      return
      // if(!itemExist){
      //   return
      //   // product.quantity = 1
      //   // cart.items.push(product)
      // }else{
      //   itemExist.quantity -=1
      // }
      // cart.quantity -=1

    }
    function confirmOrders(){
      if(cart.confirmOrder){
        cart.confirmOrder = false
        const emptyCart = cart.items.filter(item=>item.name === '')
        cart.items = emptyCart
        cart.quantity = 0
      }else{
        cart.confirmOrder = true
      }
    }
    function checkOut(){
      cart.items = []
      cart.confirmOrder = false
    }
  
    return { cart, addItem, removeItem, decrementItem, incrementItem, confirmOrders, checkOut }
  })
  