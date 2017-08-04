<template>
	<div class="addBe">
		<Modal v-model="modal.show" width="470" :styles="{top: '150px'}">
        	<p slot="header" class="modal_header">
            	<span>给 {{modal.name}} 小组添加行为</span>
        	</p>
        	<div class="neirong">
                    <div class="student_group_list" v-for="(item,index) in student">
                        <div class="studentLiconScore">{{item.score}}</div>
                        <div class="studentLiconImg"><img :src="item.student_icon" alt=""></div>
                        <div class="studentLiconName">{{item.student_name}}</div>
                    </div>
        	</div>
        	<div slot="footer" class="model_footer">
           	 	 <Button type="primary" long style="height:40px;font-size:16px;" @click="randbehaier()">点评本组</Button>
        	</div>
    	</Modal>
	</div>
</template>
<script>
export default{
	name: 'group',
	props:['modal','student'],
	data () {
		return {
			apiurl:api
		}
	},
	methods:{
		randbehaier(){
            this.$emit('addGroupxw')
        }
	}
}

</script>
<style scoped>
	.neirong{
		height: 350px;
        margin-left: 20px;
        overflow: auto;
	}
    .student_group_list{
        font-size: 18px;
        background: #fff;
        float: left;
        width: 100px;
        height: 100px;
        margin: 2px 3px;
        border: 1px solid #eee;
        border-radius: 2px;
        text-align: center;
        position: relative;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .06);
    }
    .studentLiconScore{
        position: absolute;
        top: 3px;
        right: 3px;
        background: #0bb634;
        min-width: 22px;
        width: auto;
        height: 22px;
        border-radius: 11px;
        display: block;
        line-height: 22px;
        color: #fff;
        font-size: 12px;
    }
    .studentLiconImg{
        margin-top: 15px;
        width: 100%;
        height: 55px;
        position: relative;
        overflow: hidden;
    }
    .studentLiconName{
        text-overflow:ellipsis;
        text-align: center;
        white-space:nowrap;
        overflow:hidden;
    }
    .studentLiconImg img{
        height: 100%;
        border-radius: 50%;
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