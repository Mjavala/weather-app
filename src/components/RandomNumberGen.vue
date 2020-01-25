<template>
    <div id="coordinates-wrap">
        <WeatherData 
            v-bind="latLong"
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
            @click="getCoordinates()">
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
            requestCount: null,     //60req/min threshold
            latLong: {
                lat: [],
                long: [],
            }
            

        }
    },
    components: {
        WeatherData,
    },
    methods: {
        getCoordinates() {
            let self = this     //set context
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
            const mid = Math.ceil(this.info.length/2)
                    
            this.xCoordinate = this.info.slice(0, mid)
            
            this.yCoordinate = this.info.slice(mid)

            //convert array elements into lat / long coordinates

            this.xCoordinate.forEach(coordinate => {
                const currentLong = this.rad2deg(coordinate * 2 * Math.PI - Math.PI).toFixed(3)
                this.latLong.long.push(currentLong)
            })

            this.yCoordinate.forEach(coordinate => {
                const currentLat = this.rad2deg(Math.PI/2 - Math.acos(coordinate * 2 - 1)).toFixed(3)
                this.latLong.lat.push(currentLat)
            })
        },
        resetData(){        //reset coordinate arrays w each user submit
            this.info = []      
            this.xCoordinate = []
            this.yCoordinate = []
            this.latLong.lat = []
            this.latLong.long = []
        },
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