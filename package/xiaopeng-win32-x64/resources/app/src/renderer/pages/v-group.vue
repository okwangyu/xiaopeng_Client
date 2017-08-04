<template>
  <div class="student">
    <audio ref="praise" src="http://www.uxuj.cn/Public/images/praise.wav" style="display:none"></audio>
    <audio ref="criticism" src="http://www.uxuj.cn/Public/images/criticism.wav" style="display:none"></audio>
    <audio ref="didi" src="http://www.uxuj.cn/Public/images/didi.wav" style="display:none"></audio>
    <div v-if="grouplist.length>0">
      <v-loading v-if="spinShow"></v-loading>
      <v-header><span>{{class_name}}({{grouplist.length}}小组)</span></v-header>
      <transition enter-active-class="animated fadeInRight">
    <div class="group" v-if="!spinShow">
      <div class="group" v-if="group_status.list_show">
        <div class="groupList" v-for="(item,index) in grouplist" :key="index" @click="addGroup(item)">
          <div class="groupScore" :class="item.group_info.bgcolor">{{item.group_info.score}}</div>
          <div class="listImg">
            <div class="add_score_bg" v-show="item.group_info.add_show">
              <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutUp">
                <div class="add_score" v-show="item.group_info.add_show">
                  <span>{{showscore}}</span>
                </div>
              </transition>
            </div>
            <img :src="item.group_info.class_group_icon">
          </div>
          <div class="groupCardList">{{item.group_info.class_group_name}}({{item.group_members.length}})</div>
      </div>
      </div>

      <div class="group" v-if="!group_status.list_show">
        <div class="groupList" v-for="(item,index) in grouplist" :key="index" @click="pushgroup(item)">
          <div class="groupCheck" :class="item.group_info.check?zhuantai:''">
              <Icon type="ios-checkmark-empty"></Icon>
          </div>
          <div class="listImg">
            <img :src="item.group_info.class_group_icon">
          </div>
          <div class="groupCardList">{{item.group_info.class_group_name}}({{item.group_members.length}})</div>
      </div>
      </div>

    </div>
    </transition>
    </div>
    <div class="meiyou" v-if="grouplist.length==0">
        <v-loading v-if="spinShow"></v-loading>
        <v-header><span>{{classes.name}}</span></v-header>
        <div class="nostudent" v-if="!spinShow">
            <div class="img_no">
              <img src="../assets/nostudent.png" alt="">
            </div>
            <div class="fanhui">
                <p>主人，您还没有添加小组</p>
                <p>用web或者app添加小组</p>
               <Button type="primary" shape="circle" @click="back()">返回班级</Button>
            </div>
        </div>

    </div>
    <div class="bottom_button">
      <div class="bottom_back" >
        <Button type="ghost" shape="circle" icon="chevron-left" @click="back()">返回班级</Button>
      </div>
      <div class="student-tab-btn">
        <Button-group shape="circle">
        <Button @click="ketang()">
          课堂
        </Button>
        <Button type="primary" @click="xiaozu()"> 
          小组
        </Button>
    </Button-group>
      </div>
      <div class="right_button"></div>
    </div>
    <v-bottom  @suji="rand" @chongzhi="reset" @ping="selecetAll"></v-bottom>
    <v-grouprand :modal="modal2" :student="group" :disabled="disabled" @chongchou="rand" @addbehaier="randbehaier" ></v-grouprand>
    <v-group :modal="modal" :student="student" @addGroupxw="add"></v-group>
    <v-groupmodel :modal="modal1" :haviorlist="behaviorlist"  @close="kill" @tabq="tabqiehuan" @addxing="addxw"></v-groupmodel>
    <Modal
        v-model="modal7">
         <p slot="header"> 
            <span>提示信息</span>
        </p>
        <p class="restFont">
          <Icon type="information-circled" color="#ff9900"></Icon>
          显示的分数将被重置为0，报告的记录不会被删除
        </p>
        <div slot="footer">
            <Button  @click="qu()">取消</Button>
            <Button type="primary" @click="caozuo()">确认重置</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import vHeader from '@/pages/v-header'
import vBottom from '@/pages/v-group-bottom'
import vLoading from '@/components/loading'
import vGroup from '@/components/group'
import vGroupmodel from '@/components/groupmodel'
import vGrouprand from '@/components/grouprand'
import $ from 'jquery'
function imgUrl(url){
        let str=url;
        let istrue=str.indexOf('/uploads');
        if(!istrue){
            return api.api+url;
        }else{
            return api.url+url;
        }
}
export default {
  name: 'student',
  data () {
    return {
      apiurl:api,
      spinShow: true,
      classes:[],
      add_show:false,
      sort_name:'',
      bgcolor:'zero',
      class_id:this.$route.params.class_id,
      class_subject_id:this.$route.params.class_subject_id,
      modal:{
        show:false,
        name:''
      },
      modal1:{
        show:false,
        tabname:true,
        tselect:'ivu-btn-primary',
        oselect:''
      },
      modal2:{
        show:false
      },
      rand_info:[{
        name_class:''
      }],
      student:[],
      behaviorlist:[],
      group:[],
      user_info:{
           id:0,
           name:'',
           user_icon:''
      },
      showscore:'',
      disabled:false,
      zhuantai:'zhuantai',
      modal7:false
    }
  },
  computed:{
      grouplist:function(){
        return this.$store.getters.get_grouplist
      },
      group_status:function(){
        return this.$store.getters.get_group_status
      },
      group_cont:function(){
        return this.$store.getters.get_group_cont
      },
      class_name:function(){
        return this.$store.getters.class_name
      }
  },
  watch:{
    grouplist:{
        handler: function (val) {
          if(val.length){
            val.forEach(function(v,index){
                         if(v.group_info.score>0){
                             v.group_info.bgcolor='success'
                         }else if(v.group_info.score==0){
                             v.group_info.bgcolor='zero'
                         }else if(v.group_info.score<0){
                             v.group_info.bgcolor='error'
                         }
                        
                        
          })
          }
     
         },
         deep: true
     }
  },
  methods:{
    ketang(){
       this.$router.push({ name: 'student', params: { class_id: this.class_id,class_subject_id:this.class_subject_id }})
    },
    xiaozu(){
      this.$router.push({ name: 'group', params: {class_id: this.class_id,class_subject_id:this.class_subject_id }})
    },
    getUser(){
        let userinfo=JSON.parse(this.$localStorage.get('userinfo'));
        this.user_info.user_icon=imgUrl(userinfo.avatar)
        this.user_info.name=userinfo.username
        this.user_info.id=userinfo.id
      },
    getStudent () {
      let _this=this;
                //获取信息请求
      $.ajax({
          type:'get',
          url:api.api+'v3/class_group/list/format/json',
          dataType:'JSON',
          data:{
             class_subject_id:_this.$route.params.class_subject_id
          },
          success:function(res){
            if(!res.error_code){
                if(res.num_row>0){
                  res.data.forEach(function(v,index){
                  v.group_info.class_group_icon=imgUrl(v.group_info.class_group_icon)
                  v.group_info.add_show=false
                  v.group_info.check=false
                  v.group_members.forEach(function(vv,index){
                    vv.student_icon=imgUrl(vv.student_icon)
                  })
                })
                _this.$store.commit('grouplist',res.data)
                _this.spinShow=false
                }else{
                  res.data=new Array()
                  _this.$store.commit('grouplist',res.data)
                  _this.spinShow=false
                  return false
                }
            }else{
              
            }
            
              
          }        
      })

     },
     back () {
          this.$localStorage.remove('jsq')
          this.$router.push('/classes');
     },
     kill(){
        this.modal1.show=false;
        this.modal1.tabname=true;
        this.$store.commit('group_show')
     },
     tabqiehuan(type){
        if(type){
          this.modal1.tabname=false;
          this.modal1.tselect=''
          this.modal1.oselect='ivu-btn-primary'
        }else{
          this.modal1.tabname=true;
          this.modal1.tselect=''
          this.modal1.oselect='ivu-btn-primary'
        }
        
      },
     behavior () {
        let _this=this;
        $.ajax({
          type:'get',
          url:api.api+'v3/behavior/listClass/format/json',
          dataType:'JSON',data:{
             class_id:_this.$route.params.class_id,
             create_by:_this.user_info.id
          },
          success:function(res){
              _this.behaviorlist=res.data
          }
        })
     },
     add () {
          this.modal.show=false
          this.modal2.show=false
          this.modal1.show=true;
          this.modal1.tselect=''
          this.modal1.oselect='ivu-btn-primary'
          this.$store.commit('grouppull',this.group)
     },
     addxw(type){
          let _this=this;
          let behaier=type.list
          let class_group_ids=[]
          if( typeof _this.group.length == 'number' ){ 
              _this.group.forEach(function(item,index){
                class_group_ids.push({
                  class_group_id:item.class_group_id
                })
              })
          }else{ 
            class_group_ids.push({
                class_group_id:_this.group.class_group_id
            })  
          }
          $.ajax({
                    url:api.api+'v3/class_report/createBatchGroup/format/json',
                    type:'POST',
                    dataType:'JSON',
                    data:{
                        class_subject_id:_this.$route.params.class_subject_id,
                        create_by:_this.user_info.id,
                        class_behavior_id:behaier.class_behavior_id,
                        class_group_ids:class_group_ids
                    },
                    success:function(res){
                        if(!res.error_code){
                            if(type.type=='praised'){
                                _this.showscore='+'+behaier.score;
                                _this.$refs.praise.play()
                            }else{
                                _this.showscore='-'+behaier.score;
                                _this.$refs.criticism.play()
                            }
                            _this.modal1.show=false
                            _this.$store.commit('add_group',{type:true,score:behaier.score,leixing:type.type})
                           
                            setTimeout(()=>{
                                _this.showscore='';
                                _this.kill();
                            },1500)
                             
                           
                        }
                    }
          })  

     },
     addGroup (item) {
        this.modal.show=true
        this.modal.name=item.group_info.class_group_name
        this.student=item.group_members
        this.group=item.group_info
     },
     rand(){
        this.modal2.show=true
        let i=0;
        var timer=setInterval(()=>{
          let su=Math.floor(Math.random()*this.grouplist.length)
          this.group=this.grouplist[su].group_info
          this.$refs.didi.play()

           if(i>9){
              this.$refs.didi.pause()
              this.disabled=false
              clearInterval(timer)
           }
           i++

        },100)
        this.disabled=true
      },
      randbehaier(){
        this.modal.show=false
        this.add()
      },
      reset(){
        this.modal7=true
      },
      caozuo(){
          let that=this
          let class_group_ids=[];
          that.grouplist.forEach(function(item,index){
                if(item.group_info.check){
                  class_group_ids.push({
                    class_group_id:item.group_info.class_group_id
                  })
                }
            })
          $.ajax({
                    url:api.api+'v3/score/resetGroup/format/json',
                    type:'POST',
                    dataType:'JSON',
                    data:{
                        class_group_ids:class_group_ids
                    },
                    success:function(res){
                      if(!res.error_code){
                          that.$store.commit('reset_group')
                          that.kill();
                          that.modal7=false
                          that.$Notice.success({
                              title: '重置成功',
                              desc: '如果想看报告请到pc上去看',
                              duration:3
                          });
                          that.$store.commit('group_show')
                      }
                    }
          })
      },
      qu(){
        this.modal7=false
      },
      pushgroup(item){
        this.$store.commit('grouppull',item.group_info)
      },
      selecetAll(){
        this.group=[]
        let that=this
        this.modal.show=false
        this.grouplist.forEach(function(item){
            if(item.group_info.check){
              that.group.push(item.group_info)
            }
        })

        this.add()
      }
  },
  created(){
		this.getStudent();
    this.getUser();
    this.behavior();
  },
  components:{
	 vHeader,vBottom,vLoading,vGroup,vGroupmodel,vGrouprand
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
      position:absolute;
      top: 52px;
      bottom: 130px;
      left: 0px;
      right: 0px;
      padding-top: 20px;
      overflow: auto;
    }
    .right_button{
      position: absolute;
      right: 20px;
      top: 0px;
      width: 250px;
      z-index: 1000;
    }
    .center-right{
        float: right;
    }
    .right_button button{
    background: #fff
    }
  .bottom_button{
    position: fixed;
    bottom: 70px;
    left: 1px;
    right: 1px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-top: 1px solid #eaeaea;
    background: #fff;
  }
  .bottom_back{
    position: absolute;
    left: 10px;
    top: 0px;
    width: 100px;
  }
  .bottom_back button{
    background:#fff;
  }
  .ivu-btn-group button{
    padding:6px 30px;
  }
  .group{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 20px;
    margin-top: 20px;
  }
  .groupList{
    background: #fff;
    width: 220px;
    height: 135px;
    margin: 10px;
    border: 1px solid #eee;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .06);
  }
  .groupScore{
    position: absolute;
    top: 5px;
    right: 5px;
    background: #0bb634;
    min-width: 30px;
    width: auto;
    height: 30px;
    border-radius: 18px;
    display: block;
    line-height: 30px;
    color: #fff;
    font-size: 18px;
    z-index: 1000;
  }
  .groupCheck{
    position: absolute;
    top: 5px;
    right: 5px;
    background: #ccc;
    min-width: 30px;
    width: auto;
    height: 30px;
    border-radius: 18px;
    display: block;
    line-height: 30px;
    color: #fff;
    font-size: 18px;
    z-index: 1000;
  }
  .zhuantai{
          background: #2aadf1
   }
  .listImg{
    width: 100%;
    height: 60px;
    margin:10px auto;
    text-align: center;
  }
  .add_score_bg{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 135px;
    background:rgba(25, 204, 179,.4);
    z-index: 10;
    text-align: center;
    line-height: 135px;
    overflow: hidden;
  }
  .add_score{
    
    
  }
  .add_score span{
    font-size: 28px;
    color: #00C4FF;
    text-shadow:#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0;
  }
  .listImg img{
    height: 60px;
  }
  .groupCardList{
    font-size: 22px;
    font-family: 微软雅黑;
  }
  .success{
      background: #0bb634;
  }
  .error{
      background: #f92c4d;
  }
  .zero{
     background: #9c9c9c;
  }
  .nostudent{
          text-align: center;
          margin-top: 10%;
        }
        .img_no{
          width: 200px;
          margin:0 auto;
        }
        .img_no img{
          width: 100%
        }
        .fanhui button{
          margin-top: 20px;
          padding:8px 50px;
          font-size: 16px;
        }
        .fanhui p{
          font-size: 16px;
          line-height: 30px;
          color:#ccc;
        }
    .restFont{
          padding: 10px 16px;
          font-size: 16px;
        }
</style>
