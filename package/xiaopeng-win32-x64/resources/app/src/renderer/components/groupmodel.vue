<template>
	<div class="addBe">
		<Modal v-model="modal.show" width="570" :styles="{top: '150px'}" @on-cancel="del">
        	<p slot="header" class="modal_header">
            	<span>添加行为</span>
        	</p>
        	<div class="neirong">
            	<p class="neirong_btn">
            		<Button-group shape="circle">
        				<Button :class="modal.tabname?modal.oselect:modal.tselect" @click="tabSelect(false)">
            				<div style="font-size:15px;">受表扬</div>
        				</Button>
        				<Button :class="modal.tabname?modal.tselect:modal.oselect" @click="tabSelect(true)">
            				<div style="font-size:15px;">待改进</div>
            			
        			</Button>
    				</Button-group>
    			</p>
            	<div class="behaier">
            		<div class="xingwei">
            		<transition-group enter-active-class="animated fadeInLeft" >
					<div class="behav" v-for="(list,index) in haviorlist.positive" v-if="modal.tabname" :key="index" @click="add('praised',list)">
					 	<div class="behaier_icon"><img :src="apiurl.api+list.icon" width="100%" height="100%"></div>
						<span class="behaier_score">{{list.score}}</span>
						<h3 class="behav_name">{{list.name}}</h3>
					</div>
					</transition-group>
				</div>
				<div class="xingwei">
					<transition-group enter-active-class="animated fadeInRight">
					<div class="behav" v-for="(list,index) in haviorlist.negativ" v-if="!modal.tabname" :key="index" @click="add('Improvement',list)">
						<div class="behaier_icon"><img :src="apiurl.api+list.icon" width="100%" height="100%"></div>
						<span class="behaier_score error">{{list.score}}</span>
						<h3 class="behav_name">{{list.name}}</h3>
					</div>
					</transition-group>
            	</div>
            	</div>
        	</div>
        	<div slot="footer" class="model_footer">
           	 	
        	</div>
    	</Modal>
	</div>
</template>
<script>
export default{
	name: 'behair',
	props:['modal','haviorlist','student'],
	data () {
		return {
			apiurl:api,
			tabx:true
		}
	},
	watch:{
		tab:{
			handler: function (val) {
			},
			deep:true
		}
	},
	methods:{
		del(){
			this.$emit('close')
			this.$store.commit('changecheck',true)
		},
		tabSelect(type){
			if(type){
				this.$emit('tabq',type)
			}else{
				this.$emit('tabq',type)
			}
		},
		add (type,list) {
			this.$emit('addxing',{type:type,list:list})
		}
	}
}

</script>
<style scoped>
	.neirong{
		height: 350px
	}
	.neirong_btn{
		text-align: center;
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
	.behaier{
		margin-top: 10px;
    	height: 330px;
		overflow: auto;
	}
	.xingwei{
		margin-left: 16px;
	}
	 .behav {
        text-align: center;
        width: 90px;
        height: 120px;
        float: left;
        margin: 16px 20px 5px;
        position: relative;

    }
    .behaier_icon{
    	border-radius: 50%;
    	width: 80px;
        height: 80px;
        margin: 0 auto;
        cursor: pointer;       
        background: #f5f5f5;
    }
    .behaier_icon img{
    	height: 100%;
    	padding: 10px;
    	vertical-align: middle;
    }
    .behaier_score{
    	position: absolute;
    	top: 0;
    	right: 0px;
    	width: 25px;
    	height: 25px;
    	line-height: 22px;
    	border-radius: 50%;
    	background:#0bb634;
    	color: #fff;
    	border:2px solid #fff;
    	box-shadow: 1px 1px 2px #ccc;
    }
    .behaier_score.error{
    	background: red;
    }
    .behav_icon span {
        position: absolute;
        color: #fff;
        border: 2px solid #fff;
        display: inline-block;
        width: 25px; height: 25px;
        border-radius: 25px;
        font-weight: bold;
        text-align: center;
        background: #5cadff;
        font-size: 16px;
        top: -3px; right: -2px;
    }
    
    .behav_name {
        font-size: 16px;
        font-weight: normal;
        margin-top: 10px;
    }
</style>