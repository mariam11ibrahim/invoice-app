<script>
export default {
  props: {
    type: { default: "error" },
    show: { default: true },
  },
  computed: {
    isMessageVisible() {
      return !!this.$store.getters["HTTPRequest/message"];
    },
  },
  methods: {
    closeMessage() {
      this.$store.dispatch("HTTPRequest/setRequestState", {
        showRequestStateMessage: false,
        message: null,
      });
    },
  },
  updated() {
    if (this.show)
      setTimeout(() => {
        this.closeMessage();
      }, 5000);
  },
};
</script>
<template>
  <section class="base-message" @click="closeMessage">
    <Transition name="message">
      <dialog class="dialog" :class="type" v-if="isMessageVisible && show">
        <span class="dialog__icon" v-if="type == 'success'"> 👍 </span>
        <span class="dialog__icon" v-if="type == 'error'"> 🤷‍♂️ </span>
        <div class="dialog__content">
          <p class="heading"><slot name="title"></slot></p>
          <p><slot name="message"></slot></p>
        </div>
      </dialog>
    </Transition>
  </section>
</template>
<style lang="scss" scoped>
@import "../styles/base";
.base-message {
  position: absolute;
  left: calc(100% - 31rem);
  top: 5rem;
  z-index: 100000000000;
  @extend .card-shadow;

  @media (max-width: 1270px) {
    top: 8rem;
  }
  .dialog {
    min-width: 30rem;
    @extend .card-style;
    padding: 2rem;
    border: 0px solid;
    display: flex;

    &__content {
      margin-left: 1rem;
      .heading {
        font-weight: $bold;
      }
      p {
        color: $color-dark;
        color: var(--color-secondary-2);
        font-size: $body;
        font-weight: $regular;
      }
    }
    &__icon {
      display: block;
      font-size: $header;
    }
  }
  .message-enter-from,
  .message-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .message-enter-to {
    transform: translateX(0%);
    opacity: 1;
  }
  .message-enter-active,
  .message-leave-active {
    transition: all 0.5s ease;
  }
  .error {
    border: 1px solid $color-red;
    border-left: 5px solid $color-red;
    .heading {
      color: $color-red;
    }
  }
  .success {
    border: 1px solid $color-green;
    border-left: 5px solid $color-green;

    .heading {
      color: $color-green;
    }
  }
}
</style>
