<template>

  <div class="student">
    <v-loading v-if="spinShow"></v-loading>
    <v-header><span>网络无法连接</span></v-header>
    <div><Button @click="reload()">重新加载</Button> </div>
  </div>

</template>

<script>
import vHeader from '@/pages/v-header'
import vBottom from '@/pages/v-bottom'
import vLoading from '@/components/loading'
var ipcRenderer=require('electron').ipcRenderer;
const {app,BrowserWindow,ipcMain} = require('electron')
export default {
  name: 'student',
  data () {
    return {
      spinShow: true
    }
  },
  methods:{
    reload(){
      ipcRenderer.send('reload');
    }
  },
  created(){

    if (navigator.onLine){
        this.$router.push({path: '/classes'})
    }else{
      this.spinShow=false
    }
  },
  components:{
	 vHeader,vBottom,vLoading
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
