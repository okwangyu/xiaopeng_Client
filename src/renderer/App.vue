<template>
  <div id="app">
    	<router-view></router-view>
  </div>
</template>

<script>
  
  export default {
    name: 'xiaopeng',
    created(){
    	if (!navigator.onLine){
            this.$router.push({path: '/page'})
            return false
        }
        this.$localStorage.remove('jsq')
    }
  }
</script>

<style>
body{
	user-select: none
}
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    margin-right: -20px
}

::-webkit-scrollbar-track-piece {
    background-color: none;
    margin: -2px
}

::-webkit-scrollbar-thumb {
    background: #ccc;
    min-height: 100px;
    min-width: 100px;
    border-radius: 10px
}

::-webkit-scrollbar-thumb:horizontal:hover, ::-webkit-scrollbar-thumb:vertical:hover {
    background: #555
}
#app{
	
	border-radius: 4px;
	background: #EBF9FF;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
header{
	height: 50px;
	background: #2aadf1;
	line-height: 50px;
}
.ivu-notice{
      top: 70px!important;
}
.ivu-modal-body{
	padding:16px 0!important;
}
.ivu-modal-header{
	background: #f5f5f5;
	border-radius: 4px 4px 0 0;
	padding: 10px 16px 8px;
}
.ivu-modal-header p, .ivu-modal-header-inner{
	font-weight: normal!important;
	font-size: 16px!important;
	line-height: 22px!important;
}
.ivu-modal-header p span{
}
.ivu-modal-footer{
	border-top: none!important;
}
.ivu-modal-close .ivu-icon-ios-close-empty{
	top:-1px;
}
.ivu-modal-close{
	line-height: 1!important;
}
.iframe{
	width: 180px;
	float: right;
	color: #fff;

}
.iframe span{
	display: block;
	float: left;
	width: 55px;
	text-align: center;
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
.ivu-spin-fix{
      background: none;
}

</style>
