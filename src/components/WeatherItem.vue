<template>
  <div v-if="weather" class="item d-flex">
    <div class="d-flex justify-between w-100">
      <p class="label">{{ weather.city }}, {{ weather.code }}</p>
    </div>
    <div class="cont-icon-celsius">
      <img v-if="weather.icon" :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`"
        alt="">
      <span class="celsius">{{ celsiusFormat(weather.temp) }}</span>
    </div>
    <p class="feels-like"> Feels like {{ celsiusFormat(weather.feelsLike) }}. {{ weather.description }}. {{ weather.main }} </p>
    <div class="wind d-flex w-100">
      <div class="d-flex w-50">
        <component class="mr-5px" :is="vectorIcon"></component>
        <span>{{ weather.windSpeed }}m/s SSE</span>
      </div>
      <div class="w-50 d-flex">
        <component class="mr-5px" :is="pressureIcon"></component>
        <span>{{ weather.pressure }}hPa</span>
      </div>
    </div>
    <div class="d-flex w-100">
      <p class="w-50"> Humidity: {{ weather.humidity }}%</p>
      <p class="w-50">Dew point: {{ celsiusFormat(weather.dewPoint) }}</p>
    </div>
    <p> Visibility: {{ weather.visibility }}km</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { Weather } from '@/types'
import celsiusFormat from '@/utils/celsiusFormat'

export default Vue.extend({
  name: 'WeatherItem',
  props: {
    weather: {
      type: Object as PropType<Weather>,
      required: true
    }
  },
  data () {
    return {
      vectorIcon: require('@/assets/vector.svg'),
      pressureIcon: require('@/assets/pressure.svg')
    }
  },
  methods: {
    celsiusFormat
  }
})
</script>

<style lang="scss" scoped>
.cont-icon-celsius {
  align-self: center;
  display: flex;
  align-items: center;

  .celsius {
    font-size: 40px;
    font-weight: bold;
    font-family: sans-serif;
  }
}

.feels-like {
  font-size: 16px;
}

.wind {
  line-height: 1;
}

.label {
  margin: 0;
  font-weight: bold;
}
</style>
