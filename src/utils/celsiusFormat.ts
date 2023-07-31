import Vue from 'vue'

export default Vue.filter('celsiusFormat', function (value: number) {
  return value.toString() + '℃'
})
