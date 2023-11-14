<template>
  <div class="control" :class="{ error: hasErrors() }">
    <div class="control__label">
      <label for="">{{ label }}</label>
    </div>
    <div class="control__group">
      <input type="text" class="control__field" :value="modelValue" @input="onChange">
    </div>
    <div class="input-errors" v-for="error of getErrors()" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: {
    label: { type: String, required: true },
    modelValue: { required: true },
    name: { type: String, required: true },
    vulidate: { type: Object, required: true },
  },
  methods: {
    onChange($event: Event) {
      this.$emit('update:modelValue', (($event?.target) as any).value);
    },
    hasErrors() {
      return this.getErrors().length
    },
    getErrors() {  
      return this.getObject().$errors || [];
    },
    getObject() {
      const path = this.name.split(".");
      let object = this.vulidate[path[0]];
      let index = 1;
      while(index < path.length) {
        object = object[path[index]];
        index++;
      }
      return object;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.error label {
  color: red;
  font-weight: 500;
}
.error input {
  border: 2px solid red;
}
</style>
  