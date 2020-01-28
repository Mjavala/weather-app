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
            yCoordinate: [], // [-PI;PI]
            requestCount: null,     //60req/min threshold
            latWithoutBounds: [],
            lonWithoutBounds: [],
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
                .catch(error => console.log(error))
        },
        rad2deg(arg) {
            return (360 * arg / (2 * Math.PI))
        },
        decimaltoCoordinates(){
            const mid = Math.ceil(this.info.length/2)
                    
            this.xCoordinate = this.info.slice(0, mid)
            
            this.yCoordinate = this.info.slice(mid)

            //convert array elements into lat / long coordinates / conditionals are for points to stay within the map bounds

            this.xCoordinate.forEach(coordinate => {
                const currentLong = this.rad2deg(coordinate * 2 * Math.PI - Math.PI).toFixed(3)
                this.latLong.long.push(currentLong)
            })

            this.yCoordinate.forEach(coordinate => {
                const currentLat = this.rad2deg(Math.PI/2 - Math.acos(coordinate * 2 - 1)).toFixed(3)
                this.latLong.lat.push(currentLat)
            })
        },
        coordinateBounds() {
            this.latLong.lat.forEach(function(coordinate,index){
                if(coordinate > 75){
                    console.log('this coordinate was above bounds' + coordinate)
                    this.latLong.lat[index] = coordinate - 10
                }
                if(coordinate < 70){
                    console.log('this coordinate was below bounds' + coordinate)
                    this.latLong.lat[index] = coordinate + 10
                }
            })
            console.log(this.latLong.long)

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