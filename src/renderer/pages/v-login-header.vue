<template>
  	<header @dblclick="max(type)">
  		<div class="logo" @click="back()">
  			<img src="../assets/logo.png" alt="">
  		</div>
  		<div class="toptitle"><slot></slot></div>
  		<div class="iframe" >
  			<span class="close" @click="out()"><Icon type="ios-close-empty"></Icon></span>
  			<span class="minus" @click="mini()"><Icon type="ios-minus-empty"></Icon></span>
  			
  		</div>
  	</header>
</template>
<script>
	var ipcRenderer=require('electron').ipcRenderer;
    const {app,BrowserWindow,ipcMain} = require('electron')
	export default {
		data(){
			return {
				type:1
			}
		},
		methods:{
			mini () {
       			ipcRenderer.send('hide-window');
     		},
     		max (type){
     			if(type){
     				ipcRenderer.send('show-window');
     				this.type=0
     				
     			}else{
     				ipcRenderer.send('orignal-window');
     				this.type=1
     				
     			}
				
     		},

     		out (){
     			this.$localStorage.remove('jsq')
      			ipcRenderer.send('window-all-closed');
    		},
    		back(){
    			this.$localStorage.remove('jsq')
          		this.$router.push('/classes');
    		}
    	}
	}
</script>
<style scoped>
header{
	height: 50px;
	background: #2aadf1;
	line-height: 50px;
	-webkit-app-region: drag;
	position: relative;
	cursor: move;
}
.logo{
	float: left;
	height: 50px;
	-webkit-app-region: no-drag;
}
.logo img{
	margin-left: 10px;
	height: 70%;
	vertical-align: middle;
}
.iframe{
	width: 180px;
	float: right;
	color: #fff;
	-webkit-app-region: no-drag;

}
.iframe span{
	display: block;
	float: right;
	width: 55px;
	text-align: center;
	cursor: pointer;
}
.iframe span.browsers{
	font-size: 20px;

}
.iframe span.minus{
	font-size: 38px;

}
.iframe span.close{
	font-size: 38px;

}
.toptitle{
	position: absolute;
	left: 48%;
	text-align: center;
	float: left;
	color: #fff;
	font-size: 18px;
}
</style>
