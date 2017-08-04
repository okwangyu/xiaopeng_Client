<template>
  	<header @dblclick="max(type)">
  		<div class="logo" @click="back()">
  			<img src="../assets/logo.png" alt="">
  		</div>
  		<div class="toptitle">
  			<slot></slot>
			<div class="iframe" >				
  				<span class="minus" @click="mini()"><Icon type="ios-minus-empty"></Icon></span>
  				<span class="browsers" @click="max(type)"><Icon type="ios-browsers-outline"></Icon></span>
  				<span class="close" @click="out()"><Icon type="ios-close-empty"></Icon></span>
  			</div>
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
				this.$localStorage.remove('jsq')
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
	position: absolute;
	z-index: 2;
	float: left;
	height: 50px;
	width: 200px;
	-webkit-app-region: no-drag;
}
.logo img{
	margin-left: 10px;
	height: 70%;
	vertical-align: middle;
}
.iframe{
	position: absolute;
	z-index: 2;
	right: 0;
	top: 0px;
	color: #fff;
	text-align: right;
	-webkit-app-region: no-drag;

}
.iframe span{
	display: block;
	width: 55px;
	text-align: center;
	cursor: pointer;
}
.iframe span.browsers{
	float: left;
	font-size: 20px;

}
.iframe span.minus{
	float: left;
	font-size: 38px;

}
.iframe span.close{
	float: left;
	font-size: 38px;

}
.toptitle{
	position: relative;
	text-align: center;
	color: #fff;
	font-size: 18px;
}
</style>
