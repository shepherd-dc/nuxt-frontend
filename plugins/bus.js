import Vue from 'vue'
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  // inject('hello', msg => console.log(`Hello ${msg}!`))
  const bus = new Vue()
  inject('bus', bus)
}
