<template>
    <div id="coordinates-wrap">
        <WeatherData 
            :lat=lat 
            :long=long 
            :getCoordEvent=getCoordEvent
        />
        <v-btn 
            rounded 
            medium 
            class="randCount"
        >
            <v-text-field
                label="number of points"
                v-model="requestCount">
            </v-text-field>
        </v-btn>
        <v-btn class="submitButton"
            rounded 
            small 
            @click="clickBoolAndGetCoordinatesWrapper()">
            Submit
        </v-btn>
    </div>  
</template>

<script>
import WeatherData from './WeatherData';

export default {
    data () {
        return {
            info: [],
            xCoordinate: [],
            yCoordinate: [], // [-PI;PI]
            lat: [],
            long: [],
            requestCount: null,     //60req/min threshold
            getCoordEvent: false,
        }
    },
    components: {
        WeatherData,
    },
    methods: {
        getCoordinates() {
            var self = this     //set context
            const coordinatesGen = self.requestCount * 2
            self.resetData()
            this.$http
                .get(`https://www.random.org//decimal-fractions/?num=${coordinatesGen}&dec=10&col=1&format=plain&rnd=new`)
                .then(response => {
                    this.info = response.data.split('\n', coordinatesGen)

                    this.decimaltoCoordinates()
                })
                .catch(error => console.log(error))
        },
        rad2deg(arg) {
            return (360 * arg / (2 * Math.PI))
        },
        decimaltoCoordinates(){
            var mid = Math.ceil(this.info.length/2)
                    
            this.xCoordinate = this.info.slice(0, mid)
            
            this.yCoordinate = this.info.slice(mid)

            //convert array elements into lat / long coordinates

            this.xCoordinate.forEach(coordinate => {
                const currentLong = this.rad2deg(coordinate * 2 * Math.PI - Math.PI).toFixed(3)
                this.long.push(currentLong)
            })

            this.yCoordinate.forEach(coordinate => {
                var currentLat = this.rad2deg(Math.PI/2 - Math.acos(coordinate * 2 - 1)).toFixed(3)
                this.lat.push(currentLat)
            })
        },
        resetData(){        //reset coordinate arrays w each user submit
            this.info = []      
            this.xCoordinate = []
            this.yCoordinate = []
            this.lat = []
            this.long = []
        },
        clickBoolAndGetCoordinatesWrapper(){
            this.getCoordinates()
            this.getCoordEvent = !this.getCoordEvent
        }
    },
}
</script>

<style scoped>

#coordinates-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh
}

.randCount{
    margin: 2%;
}

</style>