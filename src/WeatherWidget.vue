<template>
  <div>
    <div class="container">
      <div v-if="isSettings" class="settings item d-flex">
        <div class="d-flex justify-between w-100">
          <p>Settings</p>
          <component class="pointer" @click="toggleSettings" :is="closeIcon"></component>
        </div>
        <div class="w-100">
          <draggable v-model="selectedCities">
            <transition-group>
              <SettingsItem v-for="(city, i) in selectedCities" :key="city.code" :city="city" @ondelete="deleteCity(i)" @close="toggleSettings"/>
            </transition-group>
          </draggable>
        </div>
        <div class="w-100">
          <label class="typo__label">Add Location:</label>
          <div class="d-flex select-wrapper">
            <multiselect aria-errormessage="saddas" v-model="value" :custom-label="cityNameWithCode" track-by="name" label="name"
              placeholder="Select one" :options="filteredCities" searchable :show-labels="false" :allow-empty="false">
              <template slot="noResult">
                No results found.
              </template>
            </multiselect>
            <component @click="markCityAsSelected()" :is="enterIcon" />
          </div>
        </div>
      </div>
      <div v-else>
        <component class="settings-btn pointer" @click="toggleSettings" :is="settingsIcon"></component>
        <template  v-for="selectedCity in selectedCities">
          <WeatherItem
            v-if="selectedCity.weather"
            :weather="selectedCity.weather"
            :key="selectedCity.name"
          />
        </template>
        <div v-if="isLoading">
          Loading...
        </div>
        <span v-if="hasError">Sorry, something went wrong!</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { WeatherResponse, City, Weather } from '@/types'
import { cities } from '@/utils/cities'
import Multiselect from 'vue-multiselect'
import draggable from 'vuedraggable'
import SettingsItem from '@/components/SettingsItem.vue'
import WeatherItem from '@/components/WeatherItem.vue'
export default Vue.extend({
  name: 'weather-widget',
  components: {
    SettingsItem,
    WeatherItem,
    Multiselect,
    draggable
  },
  data () {
    return {
      cities,
      selectedCities: [] as City[],
      isSettings: false,
      value: null as City | null,
      isLoading: false,
      hasError: false,
      settingsIcon: require('@/assets/settings.svg'),
      enterIcon: require('@/assets/enter.svg'),
      closeIcon: require('@/assets/close.svg')
    }
  },
  watch: {
    selectedCities (updatedCities: City[]) {
      if (!updatedCities.length) {
        this.removeCitiesFromLocalStorage()
      } else {
        this.storeToLocalStorage(updatedCities)
      }
    }
  },
  computed: {
    filteredCities (): City[] {
      const selectedCitiesNames = this.selectedCities.map(c => c.name)
      return this.cities.filter((city) => {
        return !selectedCitiesNames.includes(city.name)
      })
    }
  },
  methods: {
    cityNameWithCode ({ name, code, flag }: City) {
      return `${name} ${code} ${flag.toString()}`
    },
    toggleSettings () {
      if (this.selectedCities.length) {
        this.isSettings = !this.isSettings
      }
    },
    markCityAsSelected (city?: City) {
      if (this.value || city) {
        const cityToAdd = this.value || city as City
        this.selectedCities.push(cityToAdd)
        this.getData(cityToAdd)
        this.value = null
      }
    },
    getData (city: City) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.code}&appid=${'0ac3b5de9b1c8abf582d50e3fe582f18'}&units=metric`)
        .then(response => response.json())
        .then((response: WeatherResponse) => {
          const cityWeather: Weather = {
            city: response.name,
            code: response.sys.country,
            feelsLike: Math.round(response.main.feels_like),
            humidity: response.main.humidity,
            visibility: (response.visibility / 1000).toFixed(1),
            icon: response.weather[0].icon,
            temp: Math.round(response.main.temp),
            description: response.weather[0].description,
            main: response.weather[0].main,
            pressure: response.main.pressure,
            windSpeed: response.wind.speed.toFixed(1),
            dewPoint: 0
          }

          const city = this.selectedCities.find(city => city.name === cityWeather.city)
          if (city) {
            city.weather = cityWeather
          }
        })
    },
    storeToLocalStorage (updatedCities: City[]) : void{
      localStorage.setItem('cities', JSON.stringify(updatedCities.map((city) => ({ ...city, weather: null }))))
    },
    removeCitiesFromLocalStorage () {
      localStorage.removeItem('cities')
    },
    getCitiesFromLocalStorage () : City[] {
      return JSON.parse(localStorage.getItem('cities') || '[]')
    },
    deleteCity (index: number) {
      this.selectedCities.splice(index, 1)
    }
  },
  mounted () {
    this.selectedCities = this.getCitiesFromLocalStorage()
    if (!this.selectedCities.length) {
      this.isSettings = true
    }
    this.isLoading = true
    Promise.all(this.selectedCities.map(this.getData))
      .catch(() => { this.hasError = true })
      .finally(() => { this.isLoading = false })
  }
})
</script>

<style lang="scss" scoped>
.multiselect,
.multiselect__tags {
  width: 220px;
}
.item {
  padding: 20px 10px;
  gap: 20px;
  align-items: start;
  flex-direction: column;
}
.settings-btn{
  position: absolute;
  right: 10px;
  top: 20px
}
.select-wrapper {
  gap: 20px;
}
.container {
  font-family: sans-serif;
  width: 280px;
  margin: auto;
  position: relative;
}

</style>
