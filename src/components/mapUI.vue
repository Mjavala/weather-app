<template>
  <div id="map">
     <l-map 
          v-bind="mapConfig"
          style="height: 90%"
        >
      <l-tile-layer 
        v-bind="mapRender"
      />
      <l-marker 
        :key="`${item.data.coord.lat}-${item.data.coord.lon}`"
        v-for="(item) in info"
        :lat-lng="latLng(item.data.coord.lat, item.data.coord.lon)"
      >
        <l-popup>
        <!-- only renders 1st item for all popups? !-->
        {{ item.data.weather}}
        </l-popup>
      </l-marker>
    </l-map>
      
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet'
import { latLngBounds, latLng } from "leaflet";

export default {
  name: 'mapUI',
  components: { 
    LMap, 
    LTileLayer, 
    LMarker,
    LPopup
  },
  props: ['info'],
  data() {
    return {
      mapConfig: {
        zoom: 1,
        center: L.latLng(0, 0)
      },
      mapRender: {
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      },
      weatherDesc: [],
    }
  },
  watch: {
    info(newVal){
      this.weatherDesc = newVal
    }
  },
  methods: {
    latLng(lat,long){
      return L.latLng(lat,long)
    },
    weatherDescription(){
      this.weatherDesc.forEach(element => {
        return array.map(value => value.prop)
      });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#map{
  height: 70vh;
  width: 70vw;
}

</style>
