<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <div class="body">
      <PostsList :key="postsKey"></PostsList>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import PostsList from '@/components/PostsList.vue'
export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    PostsList,
  },
  computed: {
    postsKey() {
      return this.$store.state.postsKey
    },
    component() {
      return this.$route.name;
    }
  }
}
</script>

<style lang="scss">
  .body {
    margin-top: 80px;
  }
</style>