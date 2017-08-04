<template>
  <div>
    <v-loading v-if="spinShow"></v-loading>
    <Modal
        v-model="modal1"
        title="关于我们"
        style="margin-top:100px"
        >
        <p>对话框内容</p>
        <div slot="footer"></div>
    </Modal>
    <v-header><span>请选择班级</span></v-header>
    <transition enter-active-class="animated fadeInRight">
    <div class="addmyclass" v-if="!spinShow">
            <div class="myclass"><i></i><span>我创建的班级</span></div>    
            <div class="add">
                <div class="classes" v-for="(item,index) in lists">
                  <div class="title"><span>{{item.class.name}}</span><span>(ID:{{item.class_id}})</span>

                  <div class="classSet">
               <Dropdown trigger="click">
                <a href="javascript:void(0)" class="shezhi"><Icon type="gear-a"></Icon></a>
                <Dropdown-menu slot="list">
                  <Dropdown-item>班级设置</Dropdown-item>
                  <Dropdown-item><span  @click="tuichu(item)">退出班级</span></Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </div>
                  </div>
                  <div class="classcont" @click="subject(index)">
                  
                    <div class="classImg"><img :src="item.class.icon?apiurl.api+item.class.icon:apiurl.api+'uploads/subject/subject10@2x.png'" alt=""></div>
                    <div class="classImgR">
                        <div class="user">老师:{{user_info.name}}</div>
                        <div class="classesStudent">学段：{{ item.class.nianji }}</div>
                        <div class="classesStudent">学生人数：{{ item.studentNum }}人</div>
                    </div>
                </div>
                </div>
                <div class="jion" @click="addClasse.show = true">
                  <p><Icon type="plus"></Icon></p>
                  <span>创建班级</span>
                </div>
            </div>
            
     </div>
     </transition>
     <div class="footer">
        <div class="meun">
        <Poptip placement="top-start" width="180" style="margin-left:15px;">
            <p>
              <Icon type="navicon"></Icon>
              <span>菜单</span>
            </p>
            <div class="api" slot="content">
                <div class="footuser">
                  <div class="user_img"><img :src="user_info.user_icon" alt=""></div>
                  <div class="user_name">{{user_info.name}}</div>
                </div>
                <ul>
                  <li> <a href="javascript:;" @click="modal1 = true"><Icon type="ios-information-outline"></Icon>关于我们</a></li>
                  <li> <a href="javascript:;" @click="open('http://www.keji110.com')"><Icon type="ios-bell-outline"></Icon>帮助中心</a></li>
                  <li> <a href="javascript:;" @click="open('http://www.keji110.com/index.php/Home/NewLists/index/cid/10.html')"><Icon type="ios-chatboxes-outline"></Icon>使用攻略</a></li>
                  <li> <a href="javascript:;" @click="out()"><Icon type="ios-trash-outline"></Icon> 退出</a></li>
                </ul>
            </div>
        </Poptip>
        </div>
        <div class="copy">
          <p>校朋客户端 版权所有:北京中软科信信息技术有限公司</p>
          <p>更多复杂的操作请登录校朋pc进行操作</p>
        </div>
        <v-subject :modal="modal" :sub="sub"></v-subject>
        <v-addClasse :modal="addClasse" :userinfo="user_info"></v-addClasse>
        <Modal
        v-model="modal7">
         <p slot="header"> 
            <span>提示信息</span>
        </p>
        <p class="restFont">
          <Icon type="information-circled" color="#ff9900"></Icon>
          确实要退出班级么
        </p>
        <div slot="footer">
            <Button type="primary" @click="caozuo()">确认</Button>
        </div>
    </Modal>
     </div>
  </div>
</template>

<script>

   import vHeader from '@/pages/v-header'
   import VSubject from '@/components/subject'
   import vLoading from '@/components/loading'
   import vAddClasse from '@/components/addClasse'
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
    name: 'classes',
    data () {
        return {
           spinShow: true,
           user_info:{
                    id:0,
                    name:'',
                    user_icon:''
           },
           modal: {
               show: false,
               title: '',
               sid: 0
           },
           index:0,
           sub:[],
           apiurl:api,
           modal1: false,
           addClasse: {
              show:false
          },
          modal7:false,
          classes_list:''


        }
    },
    computed:{
      lists:function(){
        return this.$store.getters.get_classes_list
      }
    },
    methods: {
      getUser(){
        let userinfo=JSON.parse(this.$localStorage.get('userinfo'));
        this.user_info.user_icon=imgUrl(userinfo.avatar)
        this.user_info.name=userinfo.username
        this.user_info.id=userinfo.id
      },
      out () {
        this.$localStorage.remove('jsq')
        this.$localStorage.remove('userinfo')
        this.$Message.success('退出成功!');
        this.$router.push({path: '/login'})
      },
      getClasses () {
         let that=this;
         $.ajax({
            url:api.api+'v2/classes/list/format/json',
            type:'get',
            dataType:'JSON',
            data:{
                user_id:that.user_info.id
            },
            success:function(res){
               if(!res.error_code){
                  that.lists=res.data
                  that.$store.commit('classespush',res.data)
                  that.spinShow=false
               }
            }
          })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      subject(i) {
                this.index=i
                this.modal = {
                    show: true,
                    index: i
                }
                this.sub=this.lists[i]['subjects']
                this.$store.commit('add_class_name',this.lists[i].class.name)
      },
      caozuo(){
        let item=this.classes_list
        let that=this;
        let class_id=item.class_id
         $.ajax({
            url:api.api+'v3/classes/delete/format/json',
            type:'post',
            dataType:'JSON',
            data:{
                user_id:that.user_info.id,
                class_id:class_id
            },
            success:function(res){
               if(!res.error_code){
                  that.modal7=false
                  that.getClasses()
               }
            }
          })
      },
      tuichu(item){
        this.modal7=true
        this.classes_list=item
      }
    },
    created () {
      let userinfo = this.getUser();

      this.getClasses()
    },
    components:{
          vHeader,VSubject,vLoading,vAddClasse
    }
  }
</script>
<style scoped>
    .footer{
      position: fixed;
      bottom: 2px;
      left: 2px;
      right: 2px;
      height: 70px;
      background: #fff;
      border-radius: 0 0 6px 6px;
      border-top: 1px solid #eee;
      vertical-align: middle
    }
    .copy{
      height: 70px;
      line-height: 20px;
      float: right;
      width: 360px;
      margin-top: 15px;
    }
    .copy p{
      font-size: 14px;
      color: #999;
    }
    .meun{
      width: 300px;
      float: left;
    }
    .meun p{
      position: relative;
      width: 50px;
      font-size: 40px;
      cursor: pointer;
      color: #333;
      text-align: center;
    }
    .meun p span{
      position: absolute;
      top: 42px;
      left: -2px;
      display: block;
      clear:both;
      font-size: 14px;
      width: 50px;
    }
    .api{
      height: 280px;

    }
    .api ul{
      margin-top: 8px;
    }
    .api ul li a{
      display: block;
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      color: #333;
      text-indent: 15px;
    }
    .api ul li a i{
      margin-right: 5px;
    }
    .footuser{
      margin-top: 10px;
    }
    .user_name{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .user_img{
      height: 80px;
      width: 80px;
      margin:0 auto;
      border-radius: 50%;
      padding:2px;
      background: #ccc;
      overflow: hidden;
    }
    .user_img img{
      width: 100%;
      border-radius: 50%;
    }
    .addmyclass{
        clear: both;
        margin-top: 10px;
        max-height: 580px;
        overflow: auto;
    }
    .myclass{
        height: 35px;
        line-height: 35px;
        margin-left: 10px;
        font-size: 14px;
        font-weight: bold;
        padding-left: 10px;
    }
    .myclass i{
        display: inline-block;
        width: 3px;
        height: 18px;
        margin-top:8px;
        background: #0099e8;
        float: left;
    }
    .myclass span{
        font-weight:normal;
        height: 35px;
        line-height: 35px;
        display: inline-block;
        float: left;
        margin-left: 10px;
        font-size: 16px;
    }
    .add{
      margin-left: 28px;
    }
    .classes{
        background: #fff;
        float: left;
        width: 300px;
        height: 150px;
        margin: 4px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    .title{
        line-height: 35px;
        padding: 0 15px;
        border-radius: 8px 8px 0 0;
        border-bottom: 1px solid #eee;
        background: #fff;
        font-size: 16px;
        color: #333
    }
    .classcont {
        padding: 5px 5px 0 15px;
        margin-top: 10px;
        overflow: hidden;
        color: #666;
        font-size: 13px;
        cursor: pointer;
    }
    .classcont a{
        color: #666;
    }
    .classcont .classImg {
        width: 85px;
        height: 85px;
        float: left;
        border-radius: 50%;
        overflow: hidden;
        transition: all .5s;
        display: inline-block;
        border: 1px solid #f2f2f2;
    }

    .classcont .classImg img {
        width: 100%;
        height: 100%;
    }
    .classImgR {
        width: 159px;
        float: left;
        margin-left: 8px;
        margin-top: 5px;
    }
    .user{
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        color: #333
    }
    .classesSet{
        position: relative;
        float: right;
        font-size: 18px;
        color: #666;
        cursor:pointer;
    }
    .jion{
        background: #fff;
        float: left;
        width: 300px;
        height: 150px;
        margin: 4px;
        border: 1px solid #ddd;
        border-radius: 8px;
        cursor: pointer;
    }
    .jion p{
        text-align: center;
        margin-top:40px;
        font-size: 30px;
    }
    .jion span{
        font-size: 16px;
        text-align: center;
        display: inline-block;
        width: 280px;
    }
    .classSet{
      float: right;
      padding-top: 1px;
    }
    .shezhi{
      width: 30px;
      line-height: 30px;
      display: inline-block;
      text-align: center;
      
    }
    .shezhi i{
      font-size: 20px;
      color: #666
    }
    .restFont{
          padding: 10px 16px;
          font-size: 16px;
        }
</style>