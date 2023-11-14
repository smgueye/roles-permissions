<template>
  <div>
    <div v-if="check()">
      <slot></slot>
    </div>
</div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { searchAbility } from '@/services/abilities'

export default defineComponent({
  name: 'TextInput',
  props: {
    I: { type: String, required: true }, // Action
    a: { type: String, required: true },
    withStatus: { type: String, required: false }
  },
  methods: {
    getUser() {
      return {
        roles: {
          subscriptions: 'L3',
          payments: 'L1',
          agreements: 'L2'
        }
      }
    },
    check() {
      const action = this.I;
      const module = this.a;
      const user = this.getUser();
      const item: any = {}
      if (this.withStatus)
        item.status = this.withStatus;
      return searchAbility(user, module, action, item);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
  