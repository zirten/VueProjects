<template>
  <LoginPage/>
</template>

<script>
import LoginPage from './components/LoginPage.vue'

export default {
  name: 'App',
  components: {
    LoginPage
  }
}
</script>

<style>
p {
  line-height: 1rem;
}
.card {
  padding: 20px;
}
.form-group input {
  margin-top: 20px;
  transition: 0.2s;
}
.invalid-feedback {
  transition: 2s;
}
.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}
.login-page p {
  margin-top: 20px;
}
.login-page .wallpaper-register {
  background: url(https://d514028df6.clvaw-cdnwnd.com/d90feed27d01289489f89dd80d448162/200000020-1d2051d206/abstract-banner-design-template-black-glossy-with-gold-line-and-lighting-effect-on-dark-background-and-texture-vector.jpg?ph=d514028df6)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
  transition: 0.5s;
}
.login-page .wallpaper-login {
  background: url(https://learn.knowledge-pillars.com/wp-content/uploads/2022/05/Course-Background-scaled.jpg)
    no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  transition: 0.5s;
}
.login-page .fade-enter-active,
.login-page .fade-leave-active {
  transition: opacity 0.5s;
}
.login-page .fade-enter,
.login-page .fade-leave-to {
  opacity: 0;
}
.login-page h1 {
  margin-top: 1.5rem;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
