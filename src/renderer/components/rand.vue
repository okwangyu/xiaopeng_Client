<template>
	<div>
		<Modal v-model="modal.show" width="470" :styles="{top: '200px'}" @on-cancel="del">
        	<p slot="header" class="modal_header">
            	<span>随机</span>
        	</p>
        	<div class="neirongone">
        		<div class="neirongone_icon"><img :src="student.icon_class"></div>
            	<div class="neirongone_name">{{student.name_class}}</div>
        	</div>
        	<div slot="footer" style="text-align:center">
           	 	 <Button type="info" :disabled="disabled"  @click="chongxin"><span>重新抽取</span></Button><Button type="success" :disabled="disabled" @click="add">发送点评</Button>
        	</div>
    	</Modal>
	</div>
</template>
<script>
export default{
	name: 'rand',
	props:['modal','student','disabled'],
	data () {
		return {
			apiurl:api,
			tabx:true
		}
	},
	methods:{
		del(){
			this.$emit('closerand')
		},
		chongxin(){
			this.$emit('chongchou')			
		},
		add(){
			this.$emit('addbehaier')
			
		}
	}
}

</script>
<style scoped>
	
	.neirongone{
		height: 250px
	}
	.neirongone_icon{
		width: 150px;
		height: 150px;
		margin:30px auto 0px;
		text-align: center;
	}
	.neirongone_icon img{
		max-height: 150px;
	}
	.neirongone_name{
		text-align: center;
		font-size: 30px;
		margin-top:30px;
	}
	.ivu-modal-footer{
		border:none;
	}
	.ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:first-child:not(:last-child){
		background: #2aadf1;
		border-right-color: #2aadf1;
	}
	.ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary+.ivu-btn, .ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:last-child:not(:first-child){
		border-left-color: #2aadf1;
	}
	.ivu-btn-primary{
		border-color: #2aadf1;
		background: #2aadf1;
	}
	
</style>