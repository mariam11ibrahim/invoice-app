<script>
import LogoutDialog from "@/components/LogoutDialog.vue";
import { validateInputs } from "@/config/formUtils";
export default {
  components: { LogoutDialog },
  data() {
    return {
      formData: { email: "demo@gmail.com", password: "789632145" },
      isLogin: true,
      isSubmitButtonClicked: false,
      inputvalidationMap: {
        email: true,
        password: true,
      },
      isFormValid: true,
    };
  },
  computed: {
    currentFormName() {
      return this.isLogin ? "Log in" : "Sign up";
    },
    SubmitButtonName() {
      return this.isLogin ? "login" : "signup";
    },
    switchButtonName() {
      return this.isLogin ? "create a new account" : "already has an account";
    },
    isUserAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    moodIcon() {
      return this.$store.getters.theme == "light" ? "moon" : "sun";
    },
  },

  methods: {
    getInputValue(inputName, inputData) {
      this.formData[inputName] = inputData.value;
      this.inputvalidationMap[inputName] = inputData.isValid;
      this.isFormValid = validateInputs(this.inputvalidationMap);
    },
    toggleButton() {
      this.isLogin = !this.isLogin;
    },
    handleIsSubmitButtonClicked() {
      this.isSubmitButtonClicked = true;
    },
    handleAuth(e) {
      e.preventDefault();
      if (this.isLogin) {
        this.$store.dispatch("auth/login", {
          email: this.formData.email,
          password: this.formData.password,
        });
      } else {
        this.$store.dispatch("auth/signup", {
          email: this.formData.email,
          password: this.formData.password,
        });
      }
    },
    toInvoices() {
      this.$router.push("/invoices");
    },
    showLogoutDialog() {
      this.$store.dispatch("closeBaseDialog", {
        isClosed: false,
        dialogRole: "logout",
      });
    },
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
  },
};
</script>
<template>
  <section class="landing-page">
    <div class="content">
      <div class="content__action content__action--logout">
        <BaseButton
          v-if="isUserAuthenticated"
          type="button"
          name="logout"
          color="dark"
          @click="showLogoutDialog"
        />
      </div>
      <div class="content__action content__action--mood">
        <div class="round-border">
          <BaseIcon :name="moodIcon" size="medium" @click="toggleTheme" />
        </div>
      </div>
      <div class="content__left-side">
        <img class="logo" src="../assets/logo.svg" alt="" />
        <header class="left-side__header">
          <h1>Invoice App</h1>
          <p>Store your invoices and track your payments now.</p>
        </header>
      </div>
      <div class="content__right-side">
        <Transition name="auth-form">
          <div class="right-side__auth-form" v-if="!isUserAuthenticated">
            <h2 class="right-side__header">{{ currentFormName }}</h2>
            <form @submit="handleAuth">
              <BaseInput
                type="email"
                label="Email"
                :isSubmitButtonClicked="isSubmitButtonClicked"
                @get-value="getInputValue('email', $event)"
                :isWhiteInput="true"
                value="demo@gmail.com"
                errorMessage="ivalid email"
              />

              <BaseInput
                type="password"
                label="Password"
                :isSubmitButtonClicked="isSubmitButtonClicked"
                @get-value="getInputValue('password', $event)"
                :isWhiteInput="true"
                value="789632145"
                errorMessage="password must be at least 7 numbers"
              />
              <div class="auth-form__actions">
                <BaseButton
                  type="button"
                  :name="switchButtonName"
                  color="transparent"
                  size="medium"
                  @click="toggleButton"
                />
                <BaseButton
                  type="submit"
                  :name="SubmitButtonName"
                  color="purple"
                  size="medium"
                  @click="handleIsSubmitButtonClicked"
                  :disabled="!isFormValid"
                />
              </div>
            </form>
          </div>
        </Transition>
        <Transition name="toInvoices">
          <div class="content__toInvoice" v-if="isUserAuthenticated">
            <div class="toInvoice__message">
              <h2 class="right-side__header">Welcome 😃</h2>

              <p>
                You registered successfully.
                <br />
                <br />
                Go and check your invoices now.
              </p>
            </div>
            <div class="toInvoice__action">
              <BaseButton
                type="submit"
                name="My invoices"
                color="purple"
                size="medium"
                @click="toInvoices"
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <LogoutDialog />
  </section>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.shape {
  left: 0;
  background-image: url(../assets/shape4.svg);
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: cover;
  z-index: 0;
  color: var(--color-primary-2);

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--color-primary-rgb), 0.8);
  }
}
.landing-page {
  width: 100%;
  // height: 100%;

  @extend .shape;

  @extend .page-padding;

  @media (max-width: 769px) {
    padding: 5rem 0;
  }

  .content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 9rem 1fr 9rem;
    padding: 0rem 5rem;
    position: relative;
    z-index: 9;
    @media (max-width: 1000px) {
      grid-template-rows: 6rem 20rem 1fr 6rem;
    }
    @media (max-width: 400px) {
      grid-template-rows: auto 20rem 1fr 6rem;
    }
    &__action {
      width: 40rem;
      grid-row: 1 / 2;
      justify-self: center;
      &--logout {
        grid-column: 2 / 3;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        @media (max-width: 1000px) {
          width: auto;
        }
        @media (max-width: 769px) {
          grid-column: 2/3;
          width: auto;
          justify-self: end;
        }
        @media (max-width: 400px) {
          justify-content: flex-end;
        }
      }
      &--mood {
        .round-border {
          width: 5rem;
          height: 5rem;
          border: 1px dashed $color-purple-light;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--color-primary);
        }

        grid-row: 1 / 2;
        grid-column: 1 / 2;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        @media (max-width: 769px) {
          justify-self: start;
          grid-column: 1/2;
          width: auto;
        }
      }

      .base-icon {
        border: 1px dashed $color-purple-light;
        border-radius: 50%;
      }
    }

    &__left-side {
      align-self: center;
      justify-self: center;
      grid-column: 1/2;
      grid-row: 2/3;
      @media (max-width: 1000px) {
        grid-column: 1/3;
        grid-row: 2/3;
        text-align: center;
      }

      @media (max-width: 796px) {
        grid-column: 1/3;
        grid-row: 2/3;
        justify-content: center;
        align-self: center;
      }
      .logo {
        width: 5rem;
        height: 5rem;
        margin: 0rem;
      }
    }
    .left-side {
      &__header {
        @media (max-width: 1000px) {
          text-align: center;
        }
        h1 {
          font-size: $header;
          font-size: 3rem;
          font-weight: $bold;

          margin: 3rem 0;
          @media (max-width: 1000px) {
            margin: 1rem 0;
          }
        }
        p {
          font-size: $title;
        }
      }
    }

    &__right-side {
      height: 46rem;
      align-self: center;
      justify-self: center;

      grid-column: 2/3;
      grid-row: 2/3;

      @media (max-width: 1000px) {
        grid-column: 1/3;
        grid-row: 3/4;
        justify-content: center;
        align-self: start;
      }
      @media (max-width: 796px) {
        grid-column: 1/3;
        grid-row: 3/4;
        justify-content: center;
        align-self: center;
      }
    }
    .dashed-border {
      border: 1px dashed var(--color-secondary-2);
      border-radius: 20px;
    }
    .right-side {
      &__header {
        text-align: center;
        margin-bottom: 5rem;

        margin-top: 1rem;

        font-size: $title;
        font-weight: $bold;
      }
      &__auth-form {
        background: var(--color-primary);
        @extend .dashed-border;
        padding: 5rem;

        align-self: start;
        justify-self: center;
        width: 40rem;

        @media (max-width: 400px) {
          width: 30rem;
        }
        .auth-form {
          &__actions {
            margin: 3rem 0;
            display: flex;
          }
        }
      }
    }

    &__toInvoice {
      @extend .dashed-border;
      background: var(--color-primary);

      align-self: start;
      justify-self: center;
      padding: 5rem;

      @media (max-width: 400px) {
        width: 30rem;
      }
      .toInvoice {
        &__message {
          font-size: $title;
          font-weight: $regular;
          margin: 10rem 0;
          margin-top: 5rem;

          text-align: center;

          @media (max-width: 1000px) {
            margin-top: 0rem;
            margin-bottom: 7rem;
          }
        }
        &__action {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
.toInvoices-enter-to,
.auth-form-enter-to {
  transform: scale(1);
  opacity: 1;
}
.toInvoices-enter-from,
.auth-form-enter-from,
.toInvoices-leave-to,
.auth-form-leave-to,
.toInvoices-leave-from,
.auth-form-leave-from {
  transform: scale(0);
  opacity: 0;
}
.auth-form-enter-active,
.toInvoices-enter-active {
  transition: all 1s ease;
}
.auth-form-leave-active,
.toInvoices-leave-active {
  transition: all 0.1s ease;
}
</style>
