import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/_base.scss'
import BaseIcon from './components/BaseIcon.vue'
import BaseInput from './components/BaseInput.vue'
import BaseButton from './components/BaseButton.vue'
import BaseList from './components/BaseList.vue'
import BaseStatusBadge from './components/BaseStatusBadge.vue'
import BaseSelectInput from './components/BaseSelectInput.vue'
import BaseMessage from './components/BaseMessage.vue'
import BaseDialog from './components/BaseDialog.vue'
import BaseLoader from './components/BaseLoader.vue'

const app = createApp(App);

app.component('BaseIcon', BaseIcon);
app.component('BaseInput', BaseInput);
app.component('BaseSelectInput', BaseSelectInput);
app.component('BaseButton', BaseButton);
app.component('BaseList', BaseList);
app.component('BaseStatusBadge', BaseStatusBadge);
app.component('BaseMessage', BaseMessage);
app.component('BaseDialog', BaseDialog);
app.component('BaseLoader', BaseLoader);

app.use(store).use(router).mount('#app')
