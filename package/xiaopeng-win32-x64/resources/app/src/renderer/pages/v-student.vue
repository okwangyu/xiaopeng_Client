<template>

  <div class="student">
    <div class="you" v-if="lists.length>0">
      <audio ref="praise" src="http://www.uxuj.cn/Public/images/praise.wav" style="display:none"></audio>
    <audio ref="criticism" src="http://www.uxuj.cn/Public/images/criticism.wav" style="display:none"></audio>
    <audio ref="didi" src="http://www.uxuj.cn/Public/images/didi.wav" style="display:none"></audio>
    <v-loading v-if="spinShow"></v-loading>
    <v-header><span>{{class_name}}-{{classes.name}}({{lists.length}}名学生)</span></v-header>
    <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
    <div class="content"  @click.stop="qux" v-if="!spinShow">
    
    <div class="wrap_list" v-if="list_status.attendance_show">
    <div class="student_lists" :class="icon">
        <div class="student_icon">
            <img :src="apiurl.api+(classes.icon?classes.icon:'uploads/student/02girl.png')">
        </div>
        <div class="student_name">
            {{ classes.name }}
        </div>
    </div>
    <div class="student_lists" :class="icon" v-for="(item,index) in lists" @click.stop="add_kaoqin(item)">


        <div class="attendance">
          <span><Icon type="happy" :color="item.attendance_color"></Icon></span>
          <transition enter-active-class="animated fadeInDown">
          <div class="attendance_type" v-if="item.attendance_icon">
              <ul>
                <li v-for="(value,index) in attendance" :key="value.attendance_type" @click.stop="xialameun(item,value)"><Icon :type="value.attendance_icon" :color="value.color"></Icon>{{value.attendance_name }}</li>
              </ul>
          </div>
          </transition>
        </div>
       
        <div class="student_icon">
            <div class="add_score_bg" v-show="item.add_show">
              <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutUp">
                <div class="add_score" v-if="item.add_show">
                  <span>{{showscore}}</span>
                </div>
              </transition>
            </div>
            <img :src="item.icon_class">
        </div>
        <div class="student_name">
            {{item.name_class}}
        </div>
    </div>
    </div>
    <div class="wrap_list" v-if="list_status.select_show">
    <div class="student_lists" :class="icon" @click="allClasses_se(list_status.list_ischeck)">
        <div class="check" :class="{ zhuantai:check_cont == lists.length }">
          <span><Icon type="ios-checkmark-empty"></Icon></span>
        </div>
        <div class="student_icon">
            <img :src="apiurl.api+(classes.icon?classes.icon:'uploads/student/02girl.png')">
        </div>
        <div class="student_name">
            {{ classes.name }}
        </div>
    </div>
    <div class="student_lists" :class="icon" v-for="(item,index) in lists" @click="allbehair(item)">
        <div class="check" :class="item.check?zhuantai:''">
          <span><Icon type="ios-checkmark-empty"></Icon></span>
        </div>
        <div class="student_icon">
            <div class="add_score_bg" v-show="item.add_show">
              <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutUp">
                <div class="add_score" v-if="item.add_show">
                  <span>{{showscore}}</span>
                </div>
              </transition>
            </div>
            <img :src="item.icon_class">
        </div>
        <div class="student_name">
            {{item.name_class}}
        </div>
    </div>
    </div>
    <div class="wrap_list" v-if="list_status.list_show">
    <div class="student_lists" :class="icon"  @click="allClasses()">
        <div class="score success" :class="bgcolor">
            <span >{{ count }}</span>
        </div>
        <div class="student_icon">
            <img :src="apiurl.api+(classes.icon?classes.icon:'uploads/student/02girl.png')">
        </div>
        <div class="student_name">
            {{ classes.name }}
        </div>
    </div>
    <div class="student_lists" :class="icon" v-for="(item,index) in lists" @click="addBehair(item)">
        <div class="score" :class="item.bgcolor">
            <span>{{ item.score }}</span>
        </div>
        <div class="student_icon">
            <div class="add_score_bg" v-show="item.add_show">
              <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutUp">
                <div class="add_score" v-show="item.add_show">
                  <span>{{showscore}}</span>
                </div>
              </transition>
            </div>
            <img :src="item.icon_class">
        </div>
        <div class="student_name">
            {{item.name_class}}
        </div>
    </div>
    <div class="student_lists" :class="icon">
        <div class="addstudent" @click="modal3.show=true">
          <span>+</span>
          <p>添加学生</p>
        </div>

    </div>
    </div>

    </div>
    </transition>
    <div class="bottom_button">
      <div class="bottom_back" >
        <Button type="ghost" shape="circle" icon="chevron-left" @click="back()">返回班级</Button>
      </div>
      <div class="student-tab-btn">
      <Button-group shape="circle">
        <Button type="primary" @click="ketang()">
          课堂
        </Button>
        <Button @click="xiaozu()"> 
          小组
        </Button>
    </Button-group>
      </div>
      <div class="right_button">
      <Dropdown style="margin-left: 20px" trigger="click" placement="top-end">
            <Button type="ghost" shape="circle">
                <Icon type="happy-outline"></Icon>
                <span v-text="sort_name"></span>
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item><div @click="sort('sort','分数(默认)')">分数(默认)</div></Dropdown-item>
                <Dropdown-item><div @click="sort('sortone','分数(高-低)')">分数(高-低)</div></Dropdown-item>
                <Dropdown-item><div @click="sort('sorttwo','分数(低-高)')">分数(低-高)</div></Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        
      <Poptip placement="top-end" width="450" >
              <Button type="ghost" shape="circle">
                <Icon type="person"></Icon>
                头像大小
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <div slot="content" style="height:80px" class="change">
              <div class="change_img_x">
                <img src="../assets/nostudent.png" alt="">
              </div>
              

              <Slider v-model="value8" @on-input="gaibian" :min="1" :max="10" show-stops class="huankuai"></Slider>
              <div class="change_img_da">
                <img src="../assets/nostudent.png" alt="">
              </div>
            </div>

          </Poptip> 
      </div>
    </div>
    <v-addstudent :modal="modal3" @addstude="addstu"></v-addstudent>
    <v-bottom @suji="rand" :checkcont="check_cont" @ping="selecetAll" @chongzhi="reset" @chuqin="chuqin" @updateattend="updateattend"></v-bottom>
    <v-rand :modal="modal1" :student="rand_info" :disabled="disabled" @chongchou="rand" @addbehaier="randbehaier" ></v-rand>
    <v-model :modal="modal2" :student="student_info" :haviorlist="behaviorlist" @close="kill" @tabq="tabqiehuan" @addxing="addxw"></v-model>
    </div>
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
    
    <div class="meiyou" v-if="lists.length==0">
        <v-header><span>{{class_name}}-{{classes.name}}({{lists.length}}名学生)</span></v-header>
        <div class="nostudent">
            <div class="img_no">
              <img src="../assets/nostudent.png" alt="">
            </div>
            <div class="fanhui">
                <p>主人，您还没有添加学生</p>
                <p>用web或者app添加学生</p>
               <Button type="primary" style="width:200px;" shape="circle"><span @click="modal3.show=true">添加学生</span></Button> <br>
               <Button shape="circle" style="width:200px;"><span @click="back()">返回班级列表</span></Button>
            </div>
        </div>
        <v-nobottom></v-nobottom>
        <v-addstudent :modal="modal3" @addstude="addstu"></v-addstudent>
    </div>
  </div>

</template>

<script>
import vHeader from '@/pages/v-header'
import vBottom from '@/pages/v-bottom'
import vLoading from '@/components/loading'
import vModel from '@/components/model'
import vRand from '@/components/rand'
import vNobottom from '@/pages/v-nobottom'
import vAddstudent from '@/components/addstudent'
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
      class_id:this.$route.params.class_id,
      class_subject_id:this.$route.params.class_subject_id,
      modal2:{
        show:false,
        tabname:true,
        tselect:'ivu-btn-primary',
        oselect:''
      },
       modal1:{
        show:false
      },
      modal:{
        show:false
      },
      behaviorlist:[],
      user_info:{
           id:0,
           name:'',
           user_icon:''
      },
      student_info:[],
      showscore:'',
      rand_info:[{
        name_class:''
      }],
      bgcolor:'zero',
      disabled:false,
      zhuantai:'zhuantai',
      modal7:false,
      attendance:[
        { 
          attendance_type:1,
          attendance_icon:'happy',
          attendance_name:'出勤',
          color:'#31c27c'
        },
        { 
          attendance_type:2,
          attendance_icon:'happy',
          attendance_name:'迟到',
          color:'#faaa02'
        },
        { 
          attendance_type:3,
          attendance_icon:'happy',
          attendance_name:'缺勤',
          color:'#f25d45'
          
        },
        { 
          attendance_type:4,
          attendance_icon:'happy',
          attendance_name:'请假',
          color:'#4ec0eb'
        },
        { 
          attendance_type:5,
          attendance_icon:'happy',
          attendance_name:'早退',
          color:'#cccccc'
        },
      ],
      active:'active',
      icon:this.$localStorage.get('icon')?this.$localStorage.get('icon'):'student_lists_x1',
      value8:6,
      modal3:{
        show:false
      }
    }
  },
  computed:{
      lists:function(){
        return this.$store.getters.lists
      },
      sort_name:function(){
      	return this.$store.getters.get_sort.sort_name
      },
      count:function(){
        let score = this.$store.getters.get_student_cont
        if(score>0){
           this.bgcolor='success'
        }else if(score==0){
           this.bgcolor='zero'
        }else if(score<0){
           this.bgcolor='error'
        }
        return score
      },
      check_cont:function(){
        return this.$store.getters.get_check_cont
      },
      check_student:function(){
        return this.$store.getters.get_check_student
      },
      list_status:function(){
        return this.$store.getters.get_list_status
      },
      class_name:function(){
        return this.$store.getters.class_name
      }
  },
  watch:{
    lists:{
    	
        handler: function (val) {
        	
          val.forEach(function(v,index){
                         if(v.score>0){
                             v.bgcolor='success'
                         }else if(v.score==0){
                             v.bgcolor='zero'
                         }else if(v.score<0){
                             v.bgcolor='error'
                         }
                        
                        
          })

     
         },
         deep: true
     },
     classes:{
      handler: function(val){
          if(val.score>0){
             val.bgcolor='success'
          }else if(val.score==0){
             val.bgcolor='zero'
          }else if(val.score<0){
             val.bgcolor='error'
          }
      }
     },
     count:{
      handler:function(val){
      }
     }
  },
  methods:{
    chushiIcon(){
        let type=this.icon
        if(type=='student_lists_x1'){
          this.value8=1
        }
        if(type=='student_lists_x2'){
          this.value8=2
        }
        if(type=='student_lists_x3'){
          this.value8=3
        }
        if(type=='student_lists_x4'){
          this.value8=4
        }
        if(type=='student_lists_x5'){
          this.value8=5
        }
        if(type=='student_lists_x6'){
          this.value8=6
        }
        if(type=='student_lists_x7'){
          this.value8=7
        }
        if(type=='student_lists_x8'){
          this.value8=8
        }
        if(type=='student_lists_x9'){
          this.value8=9
        }
        if(type=='student_lists_x10'){
          this.value8=10
        }
    },
    gaibian(){
      let type=this.value8
        if(type==1){
          this.icon='student_lists_x1'
        }
        if(type==2){
          this.icon='student_lists_x2'
        }
        if(type==3){
          this.icon='student_lists_x3'
        }
        if(type==4){
          this.icon='student_lists_x4'
        }
        if(type==5){
          this.icon='student_lists_x5'
        }
        if(type==6){
          this.icon='student_lists_x6'
        }
        if(type==7){
          this.icon='student_lists_x7'
        }
        if(type==8){
          this.icon='student_lists_x8'
        }
        if(type==9){
          this.icon='student_lists_x9'
        }
        if(type==10){
          this.icon='student_lists_x10'
        }
        this.$localStorage.set('icon', this.icon)
    },
    updateattend(){
      let _this=this;
      let attendance=[];
      this.lists.forEach(function(item){
          attendance.push({
            student_id:item.student_id,
            attendance_type:item.attendance_type
          })
      })
      $.ajax({
                    url:api.api+'v3/class_attendance/update/format/json',
                    type:'POST',
                    dataType:'JSON',
                    data:{
                        class_subject_id:_this.$route.params.class_subject_id,
                        class_id:_this.$route.params.class_id,
                        attendance:attendance,
                        create_by:_this.user_info.id
                    },
                    success:function(res){
                      if(!res.error_code){
                          
                          _this.$store.commit('reset')
                          _this.kill();
                           _this.modal7=false
                          _this.$Notice.success({
                              title: '添加出勤成功',
                              desc: '如果想看出勤状态请到pc上去看',
                              duration:3
                          });
                          _this.$store.commit('changecheck',1)
                      }
                    }
        })
    },
    add_kaoqin(item){
        this.$store.commit('attendance_type',item);
    },
    xialameun(item,type){
      this.$store.commit('changeatt',{item:item,type:type})
    },
    chuqin(){
      this.$store.commit('changecheck',3)
    },
    qu(){
      this.modal7=false
    },
    reset(){
         this.modal7=true
        
  
    },
    caozuo(){
        let _this=this
        let studentIds=[]
        if( typeof _this.check_student.length == 'number' ){ 
              _this.check_student.forEach(function(item,index){
                studentIds.push({
                  student_id:item.student_id
                })
              })
        }else{ 
            studentIds.push({
                student_id:_this.check_student.student_id
            })  
        }
      $.ajax({
                    url:api.api+'v3/score/reset/format/json',
                    type:'POST',
                    dataType:'JSON',
                    data:{
                        class_subject_id:_this.$route.params.class_subject_id,
                        class_id:_this.$route.params.class_id,
                        studentIds:studentIds
                    },
                    success:function(res){
                      if(!res.error_code){
                          
                          _this.$store.commit('reset')
                          _this.kill();
                           _this.modal7=false
                          _this.$Notice.success({
                              title: '重置成功',
                              desc: '如果想看报告请到pc上去看',
                              duration:3
                          });
                          _this.$store.commit('changecheck',1)
                      }
                    }
              })
    },
    allClasses(){
        this.modal2.show=true;
        this.$store.commit('quanxuan',true)
        this.addBehair(this.lists)
    },
    allClasses_se(type){
      this.$store.commit('quanxuan',type) 
    },
    allbehair(item){
      this.$store.commit('allpush',item)
    },
  	ketang(){
       this.$store.commit('changecheck',1)
       this.$router.push({ name: 'student', params: { class_id: this.class_id,class_subject_id:this.class_subject_id }})

    },
    xiaozu(){
      this.$store.commit('changecheck',1)
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
          url:api.api+'v3/student/newList/format/json',
          dataType:'JSON',
          data:{
             class_subject_id:_this.$route.params.class_subject_id,
             class_id:_this.$route.params.class_id,
             create_by:_this.user_info.id
          },
          success:function(res){
              _this.classes=res.data.class_info

              res.data.student_list.forEach(function(v,index){
              	 v.icon_class=imgUrl(v.icon_class)
                 v.add_show=false
                 v.check=false
                 v.attendance_type=1
                 v.attendance_icon=false
                 v.attendance_color='#31c27c'
              })
              _this.$store.commit('pushList',res.data.student_list)
              _this.spinShow=false
          }        
      })

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
      back () {
          this.$localStorage.remove('jsq')
          this.$router.push('/classes');
          this.$store.commit('changecheck',1)
      },
      sort(type,name){
      	this.$store.commit('sortList',{type:type,name:name})
      },
      addBehair(item){
        this.modal2.show=true;
        this.modal2.tselect=''
        this.modal2.oselect='ivu-btn-primary'
        this.student_info=item;
        this.allbehair(item)

      },
      kill(){
        this.modal2.show=false;
        this.modal2.tabname=true;
        this.$store.commit('changecheck',1)
      },
      tabqiehuan(type){
        if(type){
          this.modal2.tabname=false;
          this.modal2.tselect=''
          this.modal2.oselect='ivu-btn-primary'
        }else{
          this.modal2.tabname=true;
          this.modal2.tselect=''
          this.modal2.oselect='ivu-btn-primary'
        }
        
      },
      addxw (type){
          let _this=this;
          let behaier=type.list
          let studentIds=[]
          if( typeof _this.student_info.length == 'number' ){ 
              _this.student_info.forEach(function(item,index){
                studentIds.push({
                  student_id:item.student_id
                })
              })
          }else{ 
            studentIds.push({
                student_id:_this.student_info.student_id
            })  
          }
           $.ajax({
                    url:api.api+'v3/class_report/createBatch/format/json',
                    type:'POST',
                    dataType:'JSON',
                    data:{
                        class_subject_id:_this.$route.params.class_subject_id,
                        create_by:_this.user_info.id,
                        class_behavior_id:behaier.class_behavior_id,
                        studentIds:studentIds
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
                          
                          _this.$store.commit('add_show_an',{type:true,score:behaier.score,leixing:type.type})
                          _this.kill();
                          setTimeout(()=>{
                            _this.$store.commit('show_an',{type:false,score:behaier.score,leixing:type.type})
                            _this.showscore='';
                          },1000)
                           _this.$store.commit('changecheck',1)
                      }
                    }
          })

      },
      rand(){
        this.modal1.show=true
        let i=0;
        var timer=setInterval(()=>{
          let su=Math.floor(Math.random()*this.lists.length)
          this.rand_info=this.lists[su]
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
        this.modal1.show=false
        this.addBehair(this.rand_info)
      },
      selecetAll(){
        this.modal2.show=true;
        this.addBehair(this.check_student)
      },
      qux(){
        this.$store.commit('quxiao')
      },
      addstu(arr){
          let studentIds=[]
          let _this=this
          arr.forEach(function(item){
              studentIds.push({
                icon_class:item.icon,
                name_class:item.name,
              })
          })
          $.ajax({
                    url:api.api+'v3/student/createBatchForPc/format/json',
                    type:'POST',
                    dataType:'JSON',
                    data:{
                        class_id:_this.class_id,
                        create_by:_this.user_info.id,
                        class_name:_this.class_name,
                        user_name:'王钰',
                        students:JSON.stringify(studentIds)
                    },
                    success:function(res){
                        if(!res.error_code){
                          _this.modal3.show=false
                          _this.$Message.success('添加成功');
                          _this.getStudent();
                        }
                    }

          })

      }
      
  },
  created(){
    this.$nextTick(function () {
      this.getUser();
      this.getStudent();
      this.behavior();
      this.check=true;
      this.chushiIcon();
    })
    
  },
  components:{
	 vHeader,vBottom,vLoading,vModel,vRand,vNobottom,vAddstudent
  },
  mounted(){
  	
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .addstudent{
      width: 100%;
      height: 100%;
      text-align: center;
      padding-top: 20px;
    }
    .addstudent span{
      line-height: 30px;
      font-size: 30px;
    }
    .addstudent p{
      line-height: 30px;
      font-size: 16px;
    } 
    .change{
      position: relative;
      z-index: 10;
      margin-top: 30px;
    }
    .change_img_x{
      position: absolute;
      top: 10px;
      left: 0px;
      width: 30px;
    }
    .change_img_da{
      position: absolute;
      top: -5px;
      right: 0px;
      width: 60px;
    }
    .change_img_x img,.change_img_da img{
      width: 100%
    }
    .iconchange{
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .iconchange ul li{
      float: left;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #e6e6e6;
      border-radius: 50%;
      margin-left: 40px;
      cursor: pointer;
    }
    .iconchange ul li.active{
      background:#2aadf1;
      
    }
    .iconchange ul li.active span{
      color: #fff
    }
    .iconchange ul li span{
      color: #999;
      font-size: 14px;
    }
    .icon-line{
      position: absolute;
      top: 25px;
      left: 80px;
      height: 1px;
      width: 200px;
      background: #e6e6e6;
    }
    .content{
      position:absolute;
      top: 52px;
      bottom: 130px;
      left: 0px;
      right: 0px;
      padding-top: 20px;
      padding-bottom: 60px;
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
  .wrap_list{
            margin-left: 8px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
  }
  .student_lists{
            width: 150px;
            height: 150px;
            background: #ffffff;
            border: 1px solid #eee;
            border-radius: 2px;
            margin: 10px;
            position: relative;
            cursor: pointer;
  }
  .score{
            position: absolute;
            top:2px;
            right: 2px;
            min-width: 30px;
            height: 30px;
            line-height: 26px;
            text-align: center;
            border-radius: 15px;
            padding: 2px
        }
        .check{
            position: absolute;
            top:2px;
            right: 2px;
            min-width: 30px;
            height: 30px;
            line-height: 26px;
            text-align: center;
            border-radius: 50%;
            padding: 2px;
            z-index: 10;
            background: #ccc;
        }
        .check span{
            color: #fff;
            font-size: 32px;
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
        .score span{
            color: #fff;
            font-size: 14px;
        }
        .student_icon{
            width: 90px;
            height: 90px;
            margin: 0px auto;
            margin-top: 10px;
            border-radius: 50%;
            overflow: hidden;
            background: #f3f3f3;
            text-align: center;
            position: relative;
        }
        .add_score_bg{
            position: absolute;
            width: 90px;
            height: 90px;
            background:rgba(25, 204, 179,.4);
            z-index: 10;
            text-align: center;
            line-height: 70px;
        }
        .add_score{
            position: absolute;
            width: 90px;
            height: 90px;
            z-index: 1000;
            text-align: center;
            line-height: 70px;
        }
        .add_score span{
            font-size: 24px;
            color: #00C4FF;
            text-shadow:#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0;
        }
        .student_icon img{
            height: 100%;
        }
        .student_name{
            margin-top: 12px;
            text-overflow:ellipsis;
            text-align: center;
            white-space:nowrap;
            overflow:hidden;
            font-size: 18px
        }
        .zhuantai{
          background: #2aadf1
        }
        .restFont{
          padding: 10px 16px;
          font-size: 16px;
        }
        .attendance{
            position: absolute;
            top:2px;
            right: 2px;
            min-width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            padding: 2px;
            font-size: 18px;
        }
        .attendance span i{
            font-size: 30px;
            color:#31c27c;
        }
        .attendance_type{
          position: absolute;
          top: 24px;
          right: 0px;
          width: 100px;
          z-index: 100;
          background: #fff;
          outline: none;
          text-align: left;
          border-radius: 6px;
          box-shadow: 0 1px 6px rgba(0,0,0,.2);
          background-clip: padding-box;
          
        }
        .attendance_type ul li{
          padding: 5px 14px;
          font-size: 14px;
          vertical-align: middle;
          display: flex;
          align-items: center;
        }
        .attendance_type ul li:hover{
          background: #eaf8fe

        }
        .attendance_type ul li i{
          font-size: 30px;
          margin-right: 10px;
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








        .student_lists_x1{
            width: 95px;
            height: 95px;
        }
        .student_lists_x1 .score{
            min-width: 20px;
            height: 20px;
            line-height: 16px;
            border-radius: 10px;
        }
        .student_lists_x1 .student_icon{
            width: 50px;
            height: 50px;
            margin-top: 10px;
        }
        .student_lists_x1 .add_score_bg{
            width: 50px;
            height: 50px;
        }
        .student_lists_x1 .add_score{
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
        }
        .student_lists_x1 .student_name{
          font-size: 16px;
          margin-top: 5px;
        }
        .student_lists_x1 .attendance{
          top:-2px;
          right: 1px;
          width: 20px;
          height: 20px;
        }
        .student_lists_x1 .attendance span i{
            font-size: 16px;
        }
        .student_lists_x1 .check{
            width: 20px;
            height: 20px;
            min-width: 20px;
            text-align: center;
            line-height: 20px;
        }
        .student_lists_x1 .check span{
          font-size: 14px;
        }

        .student_lists_x2{
            width: 100px;
            height: 100px;
        }


        .student_lists_x2 .score{
            min-width: 25px;
            height: 25px;
            line-height: 20px;
            border-radius: 13px;
        }
        .student_lists_x2 .student_icon{
            width: 55px;
            height: 55px;
            margin-top: 10px;
        }
        .student_lists_x2 .add_score_bg{
            width: 55px;
            height: 55px;
        }
        .student_lists_x2 .add_score{
            width: 55px;
            height: 55px;
            line-height: 55px;
            font-size: 20px;
        }
        .student_lists_x2 .student_name{
          font-size: 16px;
          margin-top: 7px;
        }
        .student_lists_x2 .attendance{
          top:0px;
          right: 1px;
          width: 25px;
          height: 25px;
        }
        .student_lists_x2 .attendance span i{
            font-size: 18px;
        }
        .student_lists_x2 .check{
            width: 25px;
            height: 25px;
            min-width: 25px;
            text-align: center;
            line-height: 25px;
        }
        .student_lists_x2 .check span{
          font-size: 16px;
        }



        .student_lists_x3{
            width: 105px;
            height: 105px;
        }
        .student_lists_x3 .score{
            min-width: 25px;
            height: 25px;
            line-height: 21px;
            border-radius: 15px;
        }

        .student_lists_x3 .student_icon{
            width: 58px;
            height: 58px;
            margin-top: 10px;
        }
        .student_lists_x3 .add_score_bg{
            width: 58px;
            height: 58px;
        }
        .student_lists_x3 .add_score{
            width: 58px;
            height: 58px;
            line-height: 60px;
            font-size: 22px;
        }
        .student_lists_x3 .student_name{
          font-size: 16px;
          margin-top: 7px;
        }
        .student_lists_x3 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x3 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x3 .check{
            width: 25px;
            height: 25px;
            min-width: 25px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x3 .check span{
          font-size: 18px;
        }



        .student_lists_x4{
            width: 110px;
            height: 110px;
        }
        .student_lists_x4 .score{
            min-width: 28px;
            height: 28px;
            line-height: 24px;
            border-radius: 15px;
        }

        .student_lists_x4 .student_icon{
            width: 60px;
            height: 60px;
            margin-top: 11px;
        }
        .student_lists_x4 .add_score_bg{
            width: 60px;
            height: 60px;
        }
        .student_lists_x4 .add_score{
            width: 60px;
            height: 60px;
            line-height: 60px;
            font-size: 22px;
        }
        .student_lists_x4 .student_name{
          font-size: 18px;
          margin-top: 7px;
        }
        .student_lists_x4 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x4 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x4 .check{
            width: 28px;
            height: 28px;
            min-width: 28px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x4 .check span{
          font-size: 18px;
        }
        


        .student_lists_x5{
            width: 115px;
            height: 115px;
        }
        .student_lists_x5 .score{
            min-width: 30px;
            height: 30px;
            line-height: 24px;
            border-radius: 15px;
        }

        .student_lists_x5 .student_icon{
            width: 66px;
            height: 66px;
            margin-top: 12px;
        }
        .student_lists_x5 .add_score_bg{
            width: 66px;
            height: 66px;
        }
        .student_lists_x5 .add_score{
            width: 66px;
            height: 66px;
            line-height: 66px;
            font-size: 22px;
        }
        .student_lists_x5 .student_name{
          font-size: 16px;
          margin-top: 7px;
        }
        .student_lists_x5 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x5 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x5 .check{
            width: 28px;
            height: 28px;
            min-width: 28px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x5 .check span{
          font-size: 18px;
        }




        .student_lists_x6{
            width: 120px;
            height: 120px;
        }
        .student_lists_x6 .score{
            min-width: 30px;
            height: 30px;
            line-height: 24px;
            border-radius: 15px;
        }

        .student_lists_x6 .student_icon{
            width: 70px;
            height: 70px;
            margin-top: 12px;
        }
        .student_lists_x6 .add_score_bg{
            width: 70px;
            height: 70px;
        }
        .student_lists_x6 .add_score{
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 22px;
        }
        .student_lists_x6 .student_name{
          font-size: 18px;
          margin-top: 7px;
        }
        .student_lists_x6 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x6 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x6 .check{
            width: 28px;
            height: 28px;
            min-width: 28px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x6 .check span{
          font-size: 18px;
        }
        .student_lists_x6 .addstudent{
          padding-top: 30px;
        }

        .student_lists_x7{
            width: 125px;
            height: 125px;
        }
        .student_lists_x7 .score{
            min-width: 30px;
            height: 30px;
            line-height: 24px;
            border-radius: 15px;
        }

        .student_lists_x7 .student_icon{
            width: 72px;
            height: 72px;
            margin-top: 13px;
        }
        .student_lists_x7 .add_score_bg{
            width: 72px;
            height: 72px;
        }
        .student_lists_x7 .add_score{
            width: 72px;
            height: 72px;
            line-height: 72px;
            font-size: 22px;
        }
        .student_lists_x7 .student_name{
          font-size: 18px;
          margin-top: 7px;
        }
        .student_lists_x7 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x7 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x7 .check{
            width: 28px;
            height: 28px;
            min-width: 28px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x7 .check span{
          font-size: 18px;
        }
        .student_lists_x7 .addstudent{
          padding-top: 30px;
        }

        .student_lists_x8{
            width: 130px;
            height: 130px;
        }
        .student_lists_x8 .score{
            min-width: 30px;
            height: 30px;
            line-height: 24px;
            border-radius: 15px;
        }

        .student_lists_x8 .student_icon{
            width: 75px;
            height: 75px;
            margin-top: 14px;
        }
        .student_lists_x8 .add_score_bg{
            width: 75px;
            height: 75px;
        }
        .student_lists_x8 .add_score{
            width: 75px;
            height: 75px;
            line-height: 75px;
            font-size: 22px;
        }
        .student_lists_x8 .student_name{
          font-size: 18px;
          margin-top: 7px;
        }
        .student_lists_x8 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x8 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x8 .check{
            width: 28px;
            height: 28px;
            min-width: 28px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x8 .check span{
          font-size: 18px;
        }
        .student_lists_x8 .addstudent{
          padding-top: 40px;
        }
        
        .student_lists_x9{
            width: 135px;
            height: 135px;
        }
        .student_lists_x9 .score{
            min-width: 30px;
            height: 30px;
            line-height: 24px;
            border-radius: 15px;
        }

        .student_lists_x9 .student_icon{
            width: 86px;
            height: 86px;
            margin-top: 13px;
        }
        .student_lists_x9 .add_score_bg{
            width: 86px;
            height: 86px;
        }
        .student_lists_x9 .add_score{
            width: 86px;
            height: 86px;
            line-height: 86px;
            font-size: 22px;
        }
        .student_lists_x9 .student_name{
          font-size: 18px;
          margin-top: 7px;
        }
        .student_lists_x9 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x9 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x9 .check{
            width: 28px;
            height: 28px;
            min-width: 28px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x9 .check span{
          font-size: 18px;
        }
        .student_lists_x9 .addstudent{
          padding-top: 40px;
        }



        .student_lists_x10{
            width: 155px;
            height: 155px;
        }
        .student_lists_x10 .score{
            min-width: 30px;
            height: 30px;
            line-height: 24px;
            border-radius: 15px;
        }

        .student_lists_x10 .student_icon{
            width: 95px;
            height: 95px;
            margin-top: 15px;
        }
        .student_lists_x10 .add_score_bg{
            width: 95px;
            height: 95px;
        }
        .student_lists_x10 .add_score{
            width: 95px;
            height: 95px;
            line-height: 95px;
            font-size: 22px;
        }
        .student_lists_x10 .student_name{
          font-size: 18px;
          margin-top: 7px;
        }
        .student_lists_x10 .attendance{
          top:1px;
          right: 1px;
          width: 28px;
          height: 28px;
        }
        .student_lists_x10 .attendance span i{
            font-size: 20px;
        }
        .student_lists_x10 .check{
            width: 28px;
            height: 28px;
            min-width: 28px;
            text-align: center;
            line-height: 28px;
        }
        .student_lists_x10 .check span{
          font-size: 18px;
        }

        .student_lists_x10 .addstudent{
          padding-top: 45px;
        }


















        .huankuai{
          width: 300px;
          position: absolute;
          top: 10px;
          left: 45px;
        }
</style>
