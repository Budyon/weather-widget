import Vue from 'vue'
import WeatherWidget from '@/WeatherWidget.vue'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import './assets/main.css'

Vue.config.productionTip = false

Vue.component('weather-widget', WeatherWidget)

new Vue({
  render: h => h(WeatherWidget)
}).$mount('weather-widget')
