<script>
import LogoutDialog from "./LogoutDialog.vue";
export default {
  components: { LogoutDialog },
  computed: {
    moodIcon() {
      return this.$store.getters.theme == "light" ? "moon" : "sun";
    },
  },
  methods: {
    gotToLandingPage() {
      this.$router.replace("/");
    },

    showBaseDialog() {
      this.$store.dispatch("closeFormInvoice");
      this.$store.dispatch("closeBaseDialog", {
        isClosed: false,
        dialogRole: "logout",
      });
    },
    navigateToLandingPage() {
      setTimeout(() => this.gotToLandingPage(), 1000);
    },
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
  },
};
</script>
<template>
  <aside class="side-bar">
    <div class="logo" @click="gotToLandingPage">
      <div class="logo__layer"></div>
      <img class="logo__img" src="../assets/circle.png" alt="logo" />
    </div>
    <div>
      <div class="side-bar__actions">
        <div class="mood">
          <BaseIcon :name="moodIcon" size="medium" @click="toggleTheme" />
        </div>
        <div class="logout" @click="showBaseDialog">
          <BaseIcon name="logout" size="big" />
        </div>
      </div>
    </div>
    <LogoutDialog @loggedout="navigateToLandingPage" />
  </aside>
</template>

<style lang="scss" scoped>
@import "./../styles/base";
.side-bar {
  background-color: var(--color-secondary);
  position: sticky;
  top: 0;
  width: 9rem;
  height: 100vh;
  overflow: hidden;

  border-top-right-radius: $medium-radius;
  border-bottom-right-radius: $medium-radius;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 500;

  @media (max-width: 1000px) {
    width: 100%;
    height: 9rem;
    border-radius: 0;
    flex-direction: row;
    justify-content: space-between;
  }

  .logo {
    width: 100%;
    height: 9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: $color-purple;
    position: relative;
    border-bottom-right-radius: $medium-radius;

    @media (max-width: 1000px) {
      height: 100%;
      width: 9rem;
    }

    &__layer {
      position: absolute;
      width: 9rem;
      height: 50%;
      bottom: 0;
      border-top-left-radius: $medium-radius;
      border-bottom-right-radius: $medium-radius;
      background: rgba(white, 0.3);
      transition: height 0.5s ease;
    }

    &__img {
      width: 38%;
      height: 38%;
      z-index: 1;
    }
  }

  .logo:hover .logo__layer {
    height: 90%;
    transition: height 0.5s ease;
  }
  &__actions {
    display: flex;
    flex-direction: column;

    @media (max-width: 1000px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .mood {
      width: 100%;
      height: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width: 1000px) {
     
          width: 9rem;
        
      }
    }
    .logout {
      border-top: 1px solid $color-purple-light;
      width: 100%;
      height: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 1000px) {
        width: 9rem;

        border: 0;
        border-left: 1px solid $color-purple-light;
      }
      .base-icon {
        transform: rotate(-90deg);
      }

    }
    .base-icon {
      &:hover {
        background-color: $color-purple;
      }
    }
  }
}

</style>
