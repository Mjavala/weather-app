<template>
  <div class="map">
     <l-map 
          v-bind="mapConfig"
        >
      <l-tile-layer 
        v-bind="mapRender"
      />
      <l-marker 
        :key="`${item.data.coord.lat}-${item.data.coord.lon}`"
        v-for="(item) in info"
        :lat-lng="latLng(item.data.coord.lat, item.data.coord.lon)"
      >
      <l-icon
        v-bind="iconConfig"
      >
      </l-icon>
        <l-popup>
          <div class="main-desc d-inline-flex justify-space-around align-center">
            <v-icon 
              color="blue"
              v-if="item.data.weather[0].main === 'Rain'">
                mdi-weather-pouring
              </v-icon>
              <v-icon 
              color="grey"
              v-if="item.data.weather[0].main === 'Clouds'">
                mdi-weather-cloudy
              </v-icon>
              <v-icon 
              color="yellow"
              v-if="item.data.weather[0].main === 'Clear'">
                mdi-weather-sunny
              </v-icon>
              <v-icon 
              color="white"
              v-if="item.data.weather[0].main === 'Snow'">
                mdi-weather-snowy
              </v-icon>
               <div class="white--text mx-3">
                {{ item.data.weather[0].description }}
              </div>
          </div>
          <div class="mx-1 white--text d-flex justify-center">
                {{ item.data.main.temp}} °K
          </div>
          <div class="mx-1 white--text d-flex justify-center">
                {{ 'lat:' + item.data.coord.lat}} °
                {{ 'long' + item.data.coord.lon}} °
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
//TODO: Test render of markers / popups / prop data

import {LMap, LTileLayer, LMarker, LPopup, LIcon} from 'vue2-leaflet'
import { latLngBounds, latLng } from "leaflet";
import pin from '../assets/pin.png'

export default {
  name: 'mapUI',
  components: { 
    LMap, 
    LTileLayer, 
    LMarker,
    LPopup,
    LIcon,
  },
  props: ['info'],
  data() {
    return {
      mapConfig: {
        zoom: 2,
        minZoom: 2,
        center: L.latLng(0, 0),
        Bounds: [
          [-90, -180],
          [90, 180]
        ],
        maxBounds: [
          [-90, -180],
          [90, 180]
        ],
      },
      iconConfig: {
        'icon-url': pin,
        'icon-size': [30,30],
      },
      mapRender: {
        url:'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      },
    }
  },
  methods: {
    latLng(lat,long){
      return L.latLng(lat,long)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.map{
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.leaflet-container a.leaflet-popup-close-button{
  color: #121212;
  width: 15px;
  padding: 0;
}

.leaflet-popup-content-wrapper, .leaflet-popup-tip{
  background: #121212;
}

.leaflet-control-attribution {
  position: fixed;
  top: 0;
  right: 0;
}

.leaflet-marker-icon{
  opacity: .85;
}

.leaflet-control-zoom {
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 2%;
  border: none !important;
}

.leaflet-control-zoom-in{
  background: transparent !important;
  color: #121212 !important;
}

.leaflet-control-zoom-out{
  background: transparent !important;
  color: #121212 !important;
}


</style>
