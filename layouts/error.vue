<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex class="text-xs-center">
        <h1 class="display-2 primary--text">
          Whoops, {{ error.statusCode }}
        </h1>
        <p class="subtitle my-4">
          {{ error.message }}
        </p>
        <v-btn outline color="accent" to="/" replace>
          Get me out of here!
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['error'],
};
</script>
