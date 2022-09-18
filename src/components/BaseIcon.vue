<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: "medium",
    },
  },
  computed: {
    icon() {
      return `base-icon--${this.name}`;
    },
  },
};
</script>

<template>
  <span class="base-icon" :class="[icon, size]">icon</span>
</template>

<style lang="scss" scoped>
@import "./../styles/base";

.base-icon {
  display: inline-block;
  color: transparent;
  background-color: $color-purple-light;
  
  margin:0;

  cursor: pointer;
  transition:all .3s ease;


  @mixin iconMask($iconPath) {
    mask: url($iconPath) no-repeat center;
    -webkit-mask: url($iconPath) no-repeat center;
  }

  &--sun {
    @include iconMask("./../assets/sunny.svg");
  }
  &--moon {
    @include iconMask("./../assets/moon.svg");
  }
  &--chevron {
    @include iconMask("./../assets/chevron.svg");
  }
  &--add {
    background-color: white;
    @include iconMask("./../assets/add.svg");
  }
  &--circle {
    @include iconMask("./../assets/circle.svg");
  }
  &--calendar {
    @include iconMask("./../assets/calendar.svg");
  }
  &--plus {
    @include iconMask("./../assets/plus.svg");
  }
  &--delete {
    @include iconMask("./../assets/delete.svg");
  }
  &--check {
    background-color: white;
    @include iconMask("./../assets/check.svg");
  }
  &--logout {
    @include iconMask("./../assets/logout.svg");
  }
}
.small {
  width:1rem;
  height:1rem;
}
.medium {
  width:2.5rem;
  height:2.5rem;
}
.big {
  width:4rem;
  height:4rem;
}
</style>
