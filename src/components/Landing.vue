<template>
    <div 
        class="landing-page d-flex justify-center flex-column my-5 mx-auto"
    >
        <RandomNumberGen
            v-show="showMap"
            :locations="locationsFinal"     
        />
        <div class="landing-content">
            <h1 class="mx-auto"> Random Weather </h1>
            <h1 class="generator mx-auto"> GENERATOR </h1>
            <v-card
                class="location-prompt mx-auto"
                max-width="600"
                width="300"
            >
                <v-toolbar flat dense>
                    <v-toolbar-title>
                        <span class="subheading">GET WEATHER</span>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon class="weather-icon">mdi-white-balance-sunny</v-icon>
                        <v-icon class="weather-icon">mdi-cloud-outline</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-card-text>
                <v-row
                    class="mb-4"
                    justify="space-between"
                >
                    <v-col class="text-left">
                        <span
                            class="display-3 font-weight-light"
                            v-text="locations"
                        />
                        <span class="subheading font-weight-light mr-1">locations</span>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn
                            :color="color"
                            dark
                            depressed
                            fab
                            class="submitButton"
                            @click="renderMap()"
                        >
                            <v-icon large>
                                mdi-play
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                    <v-slider
                        v-model="locations"
                        :color="color"
                        track-color="grey"
                        always-dirty
                        min="0"
                        max="60"
                    >
                        <template v-slot:prepend>
                            <v-icon
                                :color="color"
                                @click="decrement"
                            >
                                mdi-minus
                            </v-icon>
                        </template>

                        <template v-slot:append>
                            <v-icon
                                :color="color"
                                @click="increment"
                            >
                                mdi-plus
                            </v-icon>
                        </template>
                    </v-slider>
                </v-card-text>
            </v-card>
        </div>
        <div class="return">
            <v-btn 
                class="mx-2" 
                fab 
                dark 
                @click="returnToLanding()"
                color="#121212"
            >
                <v-icon dark>mdi-keyboard-return</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import RandomNumberGen from '../components/RandomNumberGen'

  export default {
    data: () => ({
      locations: 0,
      locationsFinal: null,
      showMap: true,

    }),
    components: { RandomNumberGen },
    computed: {
      color () {
            if (this.locations < 20) return 'indigo'
            if (this.locations < 30) return 'teal'
            if (this.locations < 40) return 'green'
            if (this.locations < 50) return 'orange'
        return 'red'
      }
    },
    methods: {
      decrement () {
        this.locations--
      },
      increment () {
        this.locations++
      },
      renderMap () {
            this.locationsWrap()
            const map = document.querySelector('.map')
            const returns = document.querySelector('.return')
            const location = document.querySelector('.landing-content')
            map.classList.remove('fadeOut')
            map.classList.add('fadeIn')
            returns.classList.remove('fadeOut')
            returns.classList.add('fadeIn')
            location.classList.add('fadeOut')
            location.classList.remove('fadeIn')
            location.style.display = "none"
            },
        returnToLanding () {
            const map = document.querySelector('.map')
            const location = document.querySelector('.landing-content')
            const returns = document.querySelector('.return')
            location.style.display = "flex"
            map.classList.remove('fadeIn')
            map.classList.add('fadeOut')
            location.classList.remove('fadeOut')
            location.classList.add('fadeIn')
            returns.classList.add('fadeOut')
        },
        locationsWrap(){
            this.locationsFinal =  this.locations
        }
    },
  }
</script>

<style>

.map{
    opacity: 0;
}

.return{
    opacity: 0;
    position: fixed;
    bottom: 0;
    left:0;
    padding: 2%;
}

.generator{
    letter-spacing: 5px;
}

.landing-page{
    align-content: center;
    height: 100vh;
}

.location-prompt{
    margin-top: 10%;
}

.landing-content{
    display: flex;
    flex-direction: column;
    padding: 0 1% 55% 0;
}

.weather-icon{
    position: absolute;
}
.weather-icon:nth-child(1) { 
  animation: 5s alternate-reverse infinite both fade;
  -webkit-animation: 5s alternate-reverse infinite both fade;
  -moz-animation: 5s alternate-reverse infinite both fade;

}

.fadeIn{
    animation: 1s both 1s fade;
    -webkit-animation: 1s both 1s fade;
    -moz-animation: 1s both 1s fade;

}

.fadeOut{
    animation: 1s fadeOut both;
    -webkit-animation: 1s fadeOut both;
    -moz-animation: 1s fadeOut both;

}

.weather-icon:nth-child(2){
  animation: 5s alternate both infinite fade;
  -webkit-animation: 5s alternate both infinite fade;
  -moz-animation: 5s alternate both infinite fade;
}

@keyframes fade{
    0%, 50%{
      opacity: 0;
}
    100%{
      opacity: 1;
  }
}

@-webkit-keyframes fade{
    0%, 50%{
      opacity: 0;
}
    100%{
      opacity: 1;
  }
}

@-moz-keyframes fade{
    0%, 50%{
      opacity: 0;
}
    100%{
      opacity: 1;
  }
}

@keyframes fadeOut{
    0%{
      opacity: 1;
}
    100%{
      opacity: 0;
  }
}

@-webkit-keyframes fadeOut{
    0%{
      opacity: 1;
}
    100%{
      opacity: 0;
  }
}

@-moz-keyframes fadeOut{
    0%{
      opacity: 1;
}
    100%{
      opacity: 0;
  }
}
</style>