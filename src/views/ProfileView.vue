<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <div class="body">
      <ProfileComponent/>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import ProfileComponent from '@/components/ProfileComponent.vue'
export default {
  name: 'ProfileView',
  components: {
    HomeHeader,
    ProfileComponent
  }
}
</script>


<style lang="scss">
  .body {
    margin-top: 80px;
  }
</style>