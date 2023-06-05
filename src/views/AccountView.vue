<template>
  <div>
    <HomeHeader></HomeHeader>
    <div class="body">
      <h1>Account</h1>
    </div>
    <div>
      <AccountComponent></AccountComponent>
    </div>   
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import AccountComponent from '@/components/AccountComponent.vue'
export default {
  name: 'AccountView',
  components: {
    HomeHeader,
    AccountComponent
  }
}
</script>

<style>
  .body {
    margin-top: 80px;
  }
</style>
