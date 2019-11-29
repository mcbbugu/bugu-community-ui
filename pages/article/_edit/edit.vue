<template>
  <div>{{editById}}</div>
</template>
<script>
export default {
  data() {
    return {
      editById: 0
    };
  },
  mounted() {
     this.editById = this.$route.params.edit;
  }
};
</script>