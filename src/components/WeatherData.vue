<template>
    <div id="weather-wrap">
        <mapUI 
           v-bind="weatherInfo"
        />
    </div>  
</template>

<script>
import mapUI from './mapUI'

export default {
    name: 'WeatherData',
    components: {
        mapUI
    },
    props: [
        'lat', 
        'long', 
    ],
    data () {
        return {
            weatherInfo: {
                info: [],
            },
            count: null,
            urls: [],
        }
    },
    watch: {                 //initial condition of null for lat & long causes 400 http error, 
        lat(){               //watch fires getWeather() based on lat/long change in value
            this.buildGetURLs()
            this.getWeather()
        },
    },
    methods: {
        buildGetURLs(){
            let i
            const coordCount = this.lat.length

            for (i = 0; i < coordCount; i++){
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat[i]}&lon=${this.long[i]}&APPID=1d3911ed5824c410362a3ce0fb3989bb`
                this.urls.push(url)

            }
        },
        getWeather() {
            const coordCount = this.lat.length
            //lat/long pair check
            if(coordCount != this.long.length){
                console.log("There are an uneven number of longitude and latitude coordinates")
            }
            // req OpenWeather API 

            this.$http.all(this.urls.map(l => this.$http.get(l)))
                .then(this.$http.spread((...res) => (this.weatherInfo.info = res)))
                .catch(error => {
                    console.warn('Could not get weather data, error:' + error )      //TODO: more discriptive error reporting, axios intercepter error handling
                })
            //Reset urls array
            this.urls = []
        }
    },
}
</script>

<style scoped>

#weather-wrap{
      margin: 5% 5% 0 5%;
}

</style>