<template>
  <div class="hello">
    {{ hello }}
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    hello: {
      query: gql`{posts}`,
      // pollInterval: 5000,
    }
  },

  data () {
    return {
      hello: '',
    }
  }
}
</script>

<style scoped>
.hello { color: green; }
</style>
