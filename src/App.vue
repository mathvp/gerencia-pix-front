<template>
  <div id="q-app">
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
      appear
      :duration="300"
    >
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
