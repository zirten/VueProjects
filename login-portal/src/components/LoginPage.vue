<template>
  <div class="login-page">
    <transition name="fade">
      <div
        :class="[registerActive ? 'wallpaper-register' : 'wallpaper-login']"
      ></div>
    </transition>
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div v-if="!registerActive" class="card login">
            <h1 v-if="loggedIn" class="form-group text-center">
              Successfully Logged In with email: {{ emailLogin }}
            </h1>
            <form v-else class="form-group">
              <h1>Log In</h1>
              <div>
                <input
                  type="text"
                  :class="getEmailClassesLogin"
                  v-model="emailLogin"
                  placeholder="Enter Email"
                  required
                  @keyup="emailLoginValid()"
                />
                <div class="invalid-feedback">invalid Email Id</div>
              </div>
              <div>
                <input
                  type="password"
                  :class="getPasswordClassesLogin"
                  v-model="passwordLogin"
                  placeholder="Enter Password"
                  required
                  @keyup="passwordLoginValid()"
                />
                <div class="invalid-feedback">
                  Password should be greater than 6 characters
                </div>
              </div>
              <input
                type="submit"
                @click="doLogin()"
                :class="[
                  'btn',
                  'btn-primary',
                  { disabled: !(isEmailLoginValid && isPasswordLoginValid) },
                ]"
              />
              <p>
                Don't have an account?
                <a href="#" @click="registerToggle">Sign up here</a>
              </p>
              <p><a href="#">Forgot your password?</a></p>
            </form>
          </div>
          <div v-else class="card register">
            <h1 v-if="loggedIn" class="form-group text-center">
              Successfully Registered with email: {{ emailReg }}
            </h1>
            <form v-else class="form-group">
              <h1>Sign Up</h1>
              <div>
                <input
                  type="email"
                  :class="getEmailClassesRegister"
                  v-model="emailReg"
                  placeholder="Email"
                  required
                  @keyup="emailRegValid()"
                />
                <div class="invalid-feedback">invalid Email Id</div>
              </div>
              <div>
                <input
                  type="password"
                  :class="getPasswordClassesRegister"
                  v-model="passwordReg"
                  placeholder="Password"
                  required
                  @keyup="validateConfirmPassword()"
                />
                <input
                  type="password"
                  :class="getPasswordClassesRegister"
                  v-model="confirmReg"
                  placeholder="Confirm Password"
                  required
                  @keyup="validateConfirmPassword()"
                />
                <div class="invalid-feedback">
                  Passwords Should Match and length should be greater than 6
                </div>
              </div>
              <input
                type="submit"
                @click="doRegister()"
                :class="[
                  'btn',
                  'btn-primary',
                  { disabled: !(isEmailRegValid && doesPasswordMatch) },
                ]"
              />
              <p>
                Already have an account?
                <a href="#" @click="registerToggle">Sign in here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginPage",
   data() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
      isEmailLoginValid: true,
      isPasswordLoginValid: true,
      isEmailRegValid: true,
      doesPasswordMatch: true,
      loginEmailUntouched: true,
      loginPasswordUntouched: true,
      registerEmailUntouched: true,
      registerPasswordUntouched: true,
      loggedIn: false
    };
  },
  computed: {
    getEmailClassesLogin() {
      if (this.loginEmailUntouched) {
        return "form-control";
      }
      return [
        this.isEmailLoginValid
          ? "form-control is-valid"
          : "form-control is-invalid",
      ];
    },
    getPasswordClassesLogin() {
      if (this.loginPasswordUntouched) {
        return "form-control";
      }
      return [
        this.isPasswordLoginValid
          ? "form-control is-valid"
          : "form-control is-invalid",
      ];
    },
    getEmailClassesRegister() {
      if (this.registerEmailUntouched) {
        return "form-control";
      }
      return [
        this.isEmailRegValid
          ? "form-control is-valid"
          : "form-control is-invalid",
      ];
    },
    getPasswordClassesRegister() {
      if (this.registerPasswordUntouched) {
        return "form-control";
      }
      return [
        this.doesPasswordMatch
          ? "form-control is-valid"
          : "form-control is-invalid",
      ];
    },
  },
    watch: {
    confirmReg() {
      this.registerPasswordUntouched = false;
    },
  },
  methods: {
    emailLoginValid() {
      this.loginEmailUntouched = false;
      var email = event.target.value;
      this.isEmailLoginValid = this.validateEmail(email);
    },
    passwordLoginValid() {
      this.loginPasswordUntouched = false;
      this.isPasswordLoginValid = this.validatePwdLength(this.passwordLogin);
    },
    emailRegValid() {
      var email = event.target.value;
      this.registerEmailUntouched = false;
      this.isEmailRegValid = this.validateEmail(email);
    },
    validateEmail(email) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    validatePwdLength(password) {
      return password.length > 5;
    },
    validateConfirmPassword() {
      if (
        this.registerPasswordUntouched === "" ||
        this.registerPasswordUntouched
      ) {
        this.doesPasswordMatch = true;
      } else {
        this.registerPasswordUntouched = false;
        this.doesPasswordMatch =
          this.passwordReg === this.confirmReg &&
          this.validatePwdLength(this.passwordReg);
      }
    },
    registerToggle() {
      this.registerActive = !this.registerActive;
      this.reset();
    },
    reset() {
      this.emailLogin = "";
      this.emailReg = "";
      this.passwordLogin = "";
      this.passwordReg = "";
      this.confirmReg = "";
      this.isEmailLoginValid = true;
      this.isPasswordLoginValid = true;
      this.isEmailRegValid = true;
      this.doesPasswordMatch = true;
      this.loginEmailUntouched = true;
      this.loginPasswordUntouched = true;
      this.registerEmailUntouched = true;
      this.registerPasswordUntouched = true;
    },
    doLogin() {
      event.preventDefault();
      if (this.emailLogin === "" || this.passwordLogin === "") {
        console.log("empty fields");
      } else if (this.isEmailLoginValid && this.isPasswordLoginValid) {
        if (this.checkCredentials(this.emailLogin, this.passwordLogin)) {
            this.loggedIn=true;
        } else {
          alert("Email Id/Password is wrong check it");
        }
      }
    },
    doRegister() {
        event.preventDefault();
        if (
        this.emailReg === "" ||
        this.passwordReg === "" ||
        this.confirmReg === ""
      ) {
        this.emptyFields = true;
      } else if (this.doesPasswordMatch && this.emailRegValid) {
        console.log(this.emailReg)
        this.loggedIn=true;
      }
    },
    checkCredentials(email, password) {
      return email === "hari@kumaran.com" && password == "pass123";
    },
  },

};
</script>

<style></style>
