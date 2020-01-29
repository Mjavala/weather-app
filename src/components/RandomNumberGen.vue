<template>
    <div id="coordinates-wrap">
        <WeatherData 
            v-bind="latLong"
        />
    </div>  
</template>

<script>
import WeatherData from './WeatherData';

export default {
    data () {
        return {
            info: [],
            xCoordinate: [],
            yCoordinate: [],         // [-PI;PI]
            requestCount: null,     //  TODO: 60req/min threshold
            latWithoutBounds: [],
            longWithoutBounds: [],
            latLong: {
                lat: [],
                long: [],
            }           
        }
    },
    props: [
        'locations',
        'renderMap'
    ],
    components: {
        WeatherData,
    },
    watch: {
        locations(newVal){
            this.requestCount = newVal
            this.getCoordinates()
        },
        latWithoutBounds(){
            this.coordinateBounds()
        }
    },
    methods: {
        getCoordinates() {
            let self = this     //set context
            const coordinatesGen = self.requestCount * 2
            self.resetData()
            // TODO: Try Except error handling
            this.$http
                .get(`https://www.random.org//decimal-fractions/?num=${coordinatesGen}&dec=10&col=1&format=plain&rnd=new`)
                .then(response => {
                    this.info = response.data.split('\n', coordinatesGen)

                    this.decimaltoCoordinates()
                })
                .catch(error => {
                    console.warn('Could not generate random numbers, error:' + error )  //TODO: more discriptive error reporting, axios intercepter error handling
                })
        },
        rad2deg(arg) {
            return (360 * arg / (2 * Math.PI))
        },
        decimaltoCoordinates(){
            const mid = Math.ceil(this.info.length/2)
                    
            this.xCoordinate = this.info.slice(0, mid)
            
            this.yCoordinate = this.info.slice(mid)

            //convert array of random points into lat & long coordinates 

            this.xCoordinate.forEach(coordinate => {
                const currentLong = this.rad2deg(coordinate * 2 * Math.PI - Math.PI).toFixed(3)
                this.longWithoutBounds.push(currentLong)
            })

            this.yCoordinate.forEach(coordinate => {
                const currentLat = this.rad2deg(Math.PI/2 - Math.acos(coordinate * 2 - 1)).toFixed(3)
                this.latWithoutBounds.push(currentLat)
            })
            console.log(this.latLong)
        },
        coordinateBounds() {
            let self = this                                     //keep popup + marker within bounds of the map
            const arrayLat = self.latWithoutBounds.map(Number)
            const arrayLong = self.longWithoutBounds.map(Number)
            const arrayLengthLat = arrayLat.length;

            for (let i = 0; i < arrayLengthLat; i++) {
                if(arrayLat[i] > 75) {
                    arrayLat[i] = arrayLat[i] - 15
                    self.latLong.lat.push(arrayLat[i])

                } else if(arrayLat[i] < -70) {
                    arrayLat[i] = arrayLat[i] + 15
                    self.latLong.lat.push(arrayLat[i])
                } else {
                    self.latLong.lat.push(arrayLat[i])
                }
            }
            for (let i = 0; i < arrayLengthLat; i++) {
                if(arrayLong[i] > 145) {
                    arrayLong[i] = arrayLong[i] - 40
                    self.latLong.long.push(arrayLong[i])

                } else if(arrayLong[i] < -146) {
                    arrayLong[i] = arrayLong[i] + 40
                    self.latLong.long.push(arrayLong[i])
                } else {
                    self.latLong.long.push(arrayLong[i])
                }
            }


        },
        resetData(){        //reset coordinate arrays w each user submit
            this.info = []      
            this.xCoordinate = []
            this.yCoordinate = []
            this.latLong.lat = []
            this.latLong.long = []
            this.latWithoutBounds = []
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
}

.input-wrap{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    bottom: 0;
}


.randCount{
    margin: 2%;
}

</style>