<template>
    <div class="form-container">
      <form @submit.prevent="onSubmit">
        <!-- TODO: Put v$ in context -->
        <fieldset>
          <text-input label="Prenom & Nom" name="name" :vulidate="v$" v-model="v$.name.$model" />
          <text-input label="Email" name="email" :vulidate="v$" v-model="v$.email.$model" />
        </fieldset>
        <fieldset>
          <text-input label="Street" name="address.street" :vulidate="v$" v-model="v$.address.street.$model" />
          <text-input label="Suite" name="address.suite" :vulidate="v$" v-model="v$.address.suite.$model" />
          <text-input label="City" name="address.city" :vulidate="v$" v-model="v$.address.city.$model" />
          <text-input label="Zip code" name="address.zipcode" :vulidate="v$" v-model="v$.address.zipcode.$model" />
          <br>
          <div class="align">
            <text-input label="Lat." name="address.geo.lat" :vulidate="v$" v-model="v$.address.geo.lat.$model" />
            <text-input label="Long." name="address.geo.lng" :vulidate="v$" v-model="v$.address.geo.lng.$model" />
          </div>
        </fieldset>

        <pre>{{ agreement }}</pre>
        <Can I="verify" a="subscriptions" :with-status="'SUBMITTED'">
          <button type="submit">Enregistrer</button>
        </Can>
        <Can I="validate" a="subscriptions" :with-status="'CREATED'">
          <button type="submit">Enregistrer</button>
        </Can>
      </form>
    </div>
  </template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

import TextInput from '@/components/text-input.vue';
import Can from '@/components/can.vue';
  
export default defineComponent({
  name: 'UserForm',
  components: {
    TextInput,
    Can
  },
  props: {
    user: Object
  },
  setup(props, ctx) {
    const form = reactive({
      name: props.user?.name,
      email: props.user?.email,
      address: {
        street: props.user?.address?.street,
        suite: props.user?.address?.suite,
        city: props.user?.address?.city,
        zipcode: props.user?.address?.zipcode,
        geo: {
          lat: props.user?.address?.geo.lat,
          lng: props.user?.address?.geo.lng
        }
      }
    });

    const rules = {
      name: { required },
      email: { email, required },
      address: {
        street: { required },
        suite: { required },
        city: { required },
        zipcode: { required },
        geo: { 
          lat: { required },
          lng: { required }
        },
      }
    }

    const v$ = useVuelidate(rules, form);

    const onSubmit = async () => {
      const result = await v$.value.$validate();
      if (!result) {
        console.log("Form not valid: ", result)
        return
      }
      console.log({values: form})
    }

    const agreement = {id: 1, status: 'SUBMITTED'}

    return { form, v$, onSubmit, agreement };
  }
});
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
  