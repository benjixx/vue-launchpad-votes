// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://89zqrj1qq.lp.gql.zone/graphql',
    // uri: 'https://j13xk458p.lp.gql.zone/graphql',  // Hello World
    transportBatching: true,
  }),
  connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  template: '<App/>',
  components: { App }
})
