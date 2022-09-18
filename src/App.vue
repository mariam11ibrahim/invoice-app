<script>
import TheSidebar from "./components/TheSidebar.vue";
import FormInvoice from "./components/FormInvoice.vue";
import TheBackdrop from "./components/TheBackdrop.vue";
export default {
  components: {
    TheSidebar,
    FormInvoice,
    TheBackdrop,
  },
  date() {
    return {
      openFormInvoice: false,
      closeFilterList: false,
    };
  },
  provide: ["closeFilterList"],
  computed: {
    themeId() {
      return this.$store.getters.theme;
    },
    isLandingPage() {
      return this.$route.path == "/";
    },
    showRequestStateMessage() {
      return this.$store.getters["HTTPRequest/showRequestStateMessage"];
    },
    message() {
      return this.$store.getters["HTTPRequest/message"];
    },
    messageType() {
      return this.$store.getters["HTTPRequest/requestStateMessageType"];
    },
    isFormInvoiceOpen() {
      return this.$store.getters.isFormInvoiceOpen;
    },
    isBaseDialogClosed() {
      return this.$store.getters.isBaseDialogClosed;
    },
    showBackdrop() {
      return !this.isBaseDialogClosed || this.isFormInvoiceOpen;
    },
    isLoading() {
      return this.$store.getters["HTTPRequest/isLoading"];
    },
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated && this.$route.fullPath !== "/")
        this.$router.replace("/");
    },
  },
  methods: {
    handleMainClick(e) {
      if (e.target.closest(".filter")) return;
      this.$store.dispatch("closeFilterList", {
        isClosed: true,
        dialogRole: null,
      });
    },
  },

  mounted() {
    this.$store.dispatch("auth/tryLogin");
  },

};
</script>
<template>
  <div :id="themeId" class="app-body">
    <Transition name="fade">
      <TheSidebar v-if="!isLandingPage" />
    </Transition>
    <teleport to="body">
      <transition name="backdrop">
        <TheBackdrop v-if="showBackdrop" />
      </transition>
      <BaseLoader v-if="isLoading" />
    </teleport>
    <transition name="form">
      <FormInvoice v-if="isFormInvoiceOpen" />
    </transition>

    <BaseMessage :type="messageType" :show="showRequestStateMessage">
      <template #title> {{ messageType.toUpperCase() }} </template>
      <template #message> {{ message.toLowerCase() }} </template>
    </BaseMessage>

    <main :id="themeId" @click="handleMainClick">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss">
@import "./styles/base";
#app {
  position: relative;
  height: 100%;
}
.app-body {
  height: 100%;
  display: flex;
  background-color: var(--color-primary);
  position: relative;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
}
main {
  flex: 1;
 
  overflow-y: scroll;
  overflow-x: hidden;

  @extend .custom-scroll;

  &::-webkit-scrollbar {
    width: 6.5px;
  }
}

#dark {
  @extend .dark;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
.backdrop-leave-from,
.backdrop-enter-to {
  opacity: 1;
}
.backdrop-leave-active,
.backdrop-enter-active {
  transition: all 0.3s ease-in-out;
}

.form-enter-active {
  animation: bounce 0.5s ease;
}

.form-leave-from {
  transform: translateX(0%);
}
.form-leave-active {
  transition: all 0.5s ease-in-out;
}
.form-enter-from,
.form-leave-to {
  transform: translateX(-100%);
}
@keyframes bounce {
  0% {
    transform: translateX(-100%);
  }

  80% {
    transform: translateX(2%);
  }
  100% {
    transform: translateX(0%);
  }
}
.slide-right-leave-to {
  transform: translateX(70%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-70%);
  opacity: 0;
}
.slide-right-enter-from,
.slide-left-enter-from {
  transform: translateX(0%);
  opacity: 0;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-form {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 1.2s ease;
}
.fade-leave-active {
  transition: opacity 0.01s ease;
}
</style>
