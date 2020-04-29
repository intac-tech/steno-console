import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    light: {
      primary: '#0160C2',
      accent: '#01204E',
      secondary: '#F6FAFD',
      info: '#0160C2',
      warning: colors.amber.base,
      error: '#D42E35',
      success: '#515459'
    }
  }
});
