<template>
    <div id="weather-wrap">
        <mapUI 
           :info="info"
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
        'getCoordEvent'
    ],
    data () {
        return {
            info: [],
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
        getWeather() {
            const coordCount = this.lat.length
            //lat/long pair check
            if(coordCount != this.long.length){
                console.log("There are an uneven number of longitude and latitude coordinates")
            }
            // GET requests to OpenWeather API 
            this.$http.all(this.urls.map(l => this.$http.get(l)))
                .then(this.$http.spread((...res) => (this.info = res)))
                .catch(error => console.log(error))
            //Reset urls array
            this.urls = []
        },
        buildGetURLs(){
            let i
            const coordCount = this.lat.length

            for (i = 0; i < coordCount; i++){
                const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat[i]}&lon=${this.long[i]}&APPID=1d3911ed5824c410362a3ce0fb3989bb`
                this.urls.push(url)

            }

        }
    },
}
</script>

<style scoped>

#weather-wrap{
      margin: 5% 5% 0 5%;
}

</style>