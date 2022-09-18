<script>
export default {
    emits:["loggedout"],
  computed: {
    isBaseDialogClosed() {
      return this.$store.getters.isBaseDialogClosed;
    },
    baseDialogRole() {
      return this.$store.getters.baseDialogRole;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("closeBaseDialog", {
        isClosed: true,
        dialogRole: null,
      });
      this.$store.dispatch("auth/logout");
      this.$emit("loggedout")
    },
    
  },
};
</script>
<template>
  <teleport to="body">
    <BaseDialog
      key="logout"
      title="Confirm Logout"
      message="Are you sure you want to logout?"
      v-if="baseDialogRole == 'logout'"
    >
      <template #action>
        <BaseButton name="Logout" color="red" @click="logout" />
      </template>
    </BaseDialog>
  </teleport>
</template>
