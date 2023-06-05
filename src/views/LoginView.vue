<template>
  <div class="login-signup__bg">
    <div class="login-signup">
      <img class="login-signup__logo" alt="Groupmania logo" src="../assets/icon-above-font.svg">
      <h2>
        Welcome to our Social Network
      </h2>
      <LoginForm/>
    </div>

  </div>
</template>


<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
}
</script>

<style lang="scss">
  .login-signup {
    margin: auto;
    box-sizing: border-box;
    width: 100%;
    max-width: 600px;
    height: 100vh;
    background-color: white;
    box-shadow: 0 0 6px 0 var(--sec-color);

    &__bg {
      $sec-color: #D14C56;
      background-color: lighten($sec-color, 30%);
      background-image: url('@/assets/social-media.png');
      background-blend-mode: luminosity; //multiply
      background-position: center; 
      background-size: cover;
      
    }

    &__logo {
      width: 30%;
      min-width: 200px;
    }
  }
</style>