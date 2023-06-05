<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <div class="body">
      <CreatePost></CreatePost>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import CreatePost from '@/components/CreatePost.vue'
export default {
  name: 'CreatePostView',
  components: {
    HomeHeader,
    CreatePost
  }
}
</script>

<style lang="scss">
  .body {
    margin-top: 80px;
  }
</style>