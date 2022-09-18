<script>
import {months} from "../config/months";
export default {
  data() {
    let date = new Date();
    return {
      now: date,
      monthsIndex: date.getMonth(),
      year: date.getFullYear(),
      isDatePickerhidden: this.hidden,
    };
  },
  props: {
    hidden: {
      type: Boolean,
      default: true,
    },

  },
  computed: {
    day() {
      return this.now.getDate();
    },

    monthName() {
      return months[this.monthsIndex];
    },

    monthDaysNumber() {
      return new Date(this.year, this.monthsIndex+1, 0).getDate();
    },
  },

  watch: {
    hidden() {
      this.isDatePickerhidden = this.hidden;
    },
  },
  emits: ["on-get-date-value"],

  methods: {
    //send the selected date to the form input
    getSelectedDate(day) {
      this.$emit("on-get-date-value", `${this.year} ${this.monthName} ${day}`);
      this.isDatePickerhidden = true;
    },
    isActiveDay(day) {
      return (
        this.day == day &&
        this.year == new Date().getFullYear() &&
        this.monthsIndex == new Date().getMonth()
      );
    },

    handleMonthNavigator(val) {
      if (
        (this.monthsIndex < 11 && this.monthsIndex > 0) ||
        (this.monthsIndex == 11 && val == -1) ||
        (this.monthsIndex == 0 && val == 1)
      )
        this.monthsIndex += val;
      else {
        this.monthsIndex = this.monthsIndex == 11 ? 0 : 11;
        this.year += val;
      }
    },
  },
  mounted() {
    this.getSelectedDate(this.day)
  },
};
</script>

<template>
  <div class="date-picker" :class="{ hidden: isDatePickerhidden }">
    <header class="date-picker__header">
      <BaseIcon name="chevron" @click="handleMonthNavigator(-1)" />
      <span>{{ monthName }} {{ year }}</span>
      <BaseIcon name="chevron" @click="handleMonthNavigator(1)" />
    </header>

    <div class="date-picker__days">
      <span
        v-for="day in monthDaysNumber"
        class="day"
        :class="{ active: isActiveDay(day) }"
        :key="day"
        @click="getSelectedDate(day)"
      >
        {{ day }}
        <br v-if="day % 7 == 0" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/base";

.date-picker {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @extend .card-style;
  @extend .card-shadow;
  font-weight: $bold;
  font-size: $caption;

  margin: 0;
  position: absolute;
  z-index: 10;
  color: var(--color-primary-2);

  &__header {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    span {
      display: inline-block;
    }
    //icon chevron
    span:first-child {
      transform: rotate(90deg);
    }
    //icon chevron
    span:last-child {
      transform: rotate(-90deg);
    }
    span:first-child:hover,
    span:last-child:hover {
      background: $color-purple;
    }
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 15px;
    width: 100%;
    @media (max-width: 769px) {
    width:auto;
  }

    .day {
      color: var(--color-primary-2);
      text-align: center;
      cursor: pointer;
      &:hover {
        color: $color-purple;
      }
    }
  }
  .active {
    color: $color-purple;
  }
}
.hidden {
  display: none;
}
</style>
