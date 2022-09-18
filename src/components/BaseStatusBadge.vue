<script>
export default {
  data() {
    return {
      statusColor: {
        paid: "green",
        pending: "orange",
        draft: "gray",
      },
    };
  },
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    color() {
      return this.statusColor[this.status];
    },
  },
};
</script>
<template>
  <div class="badge" :class="'badge--' + color">
    <BaseIcon name="circle" size="small" />
    <span>
      {{ status }}
    </span>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/base";
@mixin badgeColor($color) {
  color: $color;
  background: rgba($color, 0.09);
  .base-icon {
    background: rgba($color, 1);
  }
}
.badge {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: $caption;
  font-weight: $bold;
  
  width: 9.5rem;
  text-align: center;
  text-transform: capitalize;
  padding: 1rem;
  border-radius: $small-radius;

 .base-icon{
  margin-right:5px;
 }

  &--green {
    @include badgeColor($color-green);
  }
  &--orange {
    @include badgeColor($color-orange);
  }
  &--gray {
    @include badgeColor(var(--color-primary-2-rgb));
  }
}
</style>
