import { createApp } from 'vue'
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import { firebaseApp } from './firebase'
import './style.css'
import App from './App.vue'

createApp(App)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireFirestoreOptionsAPI()],
  })
  .mount('#app')
