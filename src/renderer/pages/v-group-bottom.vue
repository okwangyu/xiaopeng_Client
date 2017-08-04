<template>
    <div >
        <div class="footer">
        <div class="meun">
            
          <Poptip placement="top-start" width="180" style="margin-left:15px;">
            <p class="nav">
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
        <div class="student_btn" v-if="group_status.list_show">
            <div class="btn_wrap">
            
              <div class="chuqin"  @click="allCheck()">
                <Icon type="ios-checkmark"></Icon><span>多选</span>
              </div>
              <div class="line"></div>
              <div class="chuqin" @click="suiji()">
                  <Icon type="shuffle"></Icon><span >随机</span>
              </div>
              <div class="line"></div>
              <div class="chuqin" @click="chongzhi()">
                <Icon type="trash-a"></Icon><span>重置</span>
              </div>
              <div class="line"></div>
              <div class="chuqin" @click="jishi()">
                <Icon type="clock"></Icon><span>计时</span>
              </div>
            </div>
        </div>
        <div class="student_btn" v-if="!group_status.list_show">
         
          <Row class="smain">
            <Col span="24">
                <div class="handle">
                    <div class="status" :class="{ active:group_cont.length == grouplist.length }" @click="quanbu(ischeck)">
                           <Icon type="ios-checkmark-empty"></Icon>
                    </div>
                    <div class="statusfont">选择全部</div>
                    <Button type="ghost" disabled shape="circle" v-if="group_cont.length==0">{{status.name}}(0个学生)</Button>
                    <Button  type="primary" shape="circle" v-if="group_cont.length!=0 && status.type==2" @click="piliang()">{{status.name}}({{group_cont.length}}个学生)</Button>
                    <Button type="primary" shape="circle" v-if="group_cont.length!=0 && status.type==1" @click="chong()">{{status.name}}({{group_cont.length}}个学生)</Button>
                    <Button type="ghost" shape="circle" @click="quxiao()">取消</Button>
                </div>
            </Col>
        </Row>


        </div>
        <div class="right_btn">
          
          <Button shape="circle">光荣榜</Button>
        </div>
     </div>
    </div>
</template>
<script>
    function imgUrl(url){
        let str=url;
        let istrue=str.indexOf('/uploads');
        if(!istrue){
            return api.api+url;
        }else{
            return api.url+url;
        }
    }
    var ipcRenderer=require('electron').ipcRenderer;
    const BrowserWindow= require('electron').remote.BrowserWindow
    const path = require('path')
    export default {
        data () {
            return {
                apiurl:api,
                user_info:{
                    id:0,
                    name:'',
                    user_icon:''
                },
                modal1:false,
                status:{
                  type:1,
                  name:'重置分数'
                },
                active:'active',
                ischeck:false
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
          }
        },
        props:['checkcont'],
        methods:{
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
                suiji(){
                  this.$emit('suji')
                },
                allCheck(){
                  this.status.name='进行点评'
                  this.status.type=2
                  this.$store.commit('group_show_status',true)
                },
                quanbu(){
                  if(this.group_cont.length == this.grouplist.length){
                     this.ischeck=false
                  }else{
                     this.ischeck=true
                  }

                  if(this.ischeck==true){
                      this.$store.commit('group_all',false)
                      this.ischeck=false
                  }else if(this.ischeck==false){
                      this.$store.commit('group_all',true)
                      this.ischeck=true
                  }
                  
                  
                },
                quxiao(){
                  this.$store.commit('group_show')
                },
                piliang(){
                  this.$emit('ping')
                },
                chongzhi(){
                  this.status.name='重置分数'
                  this.status.type=1
                  this.$store.commit('group_show_status',true)
                },
                chong(){
                  this.$emit('chongzhi')
                },
                jishi(){
                  console.log(window)
                  if(win){
                    return false
                  }
                  this.$localStorage.set('jsq', 'jsq')  
                      const modelURL = process.env.NODE_ENV === 'development'? `http://localhost:9080`: `file://${__dirname}/index.html`
                      const win = new BrowserWindow({
                          height: 400,
                          useContentSize: false,
                          width: 490,
                          alwaysOnTop:true,
                          transparent: true,
                          frame:false,
                          alwaysOnTop:true
                      })
                      win.loadURL(modelURL)
                      win.show()
                },
                open (link) {
                  this.$electron.shell.openExternal(link)
                }
        },
        created () {
            this.getUser()
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
      vertical-align: middle;
      z-index: 1000;
    }
    .line{
      display: inline-block;
      height: 20px;
      width: 1px;
      background: #ddd;
      vertical-align: middle;
    }
    .student_btn{
      float: left;
      width: 70%;
      text-align: left;
      height: 70px;
      margin: 0 auto;
      line-height: 70px;
    }
    .btn_wrap{
      text-align: center;
      width: 100%;
      height: 70px;
      margin: 0 auto;
      line-height: 70px;
    }
    .chuqin{
      display: inline-block;
      width: 90px;
      font-size: 18px;
      cursor: pointer;

      position:relative;
    }
    .chuqin span{
      position: absolute;
      width: 50px;
      height: 70px;
      top: 0px;
    }
    .chuqin i{
      margin-left: -35px;
      height: 70px;
      line-height: 70px;
      vertical-align:middle;
      font-size: 20px;
    }
    .right_btn{
      float: right;
      width: 10%;
      text-align: right;
      height: 70px;
      line-height: 70px;
      margin-right: 30px;
    }
    .ivu-poptip{
      float: left;
    }
    .meun{
      width: 15%;
      float: left;
      height: 70px;
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
    .back {
      float:left;
      position: relative;
      width: 50px;
      font-size: 40px;
      cursor: pointer;
      color: #333;
      text-align: center;
      margin-left: 50px;
    }
    .back span{
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


    .student_btn{
      height: 70px;
      text-align: center;
    }
    .student_btn .handle {
        height: inherit;
    }
    .student_btn .smain {
        line-height: 70px;
    }
    .student_btn .handle-tiem {
        /*width: 120px;*/
        cursor: pointer;
        float: left;
        text-align: center;
        margin-right: 40px;
    }
    .student_btn .handle-tiem img {
        display: inline;
        vertical-align: middle;
        margin-right: 3px;
        width: 28px;
    }
    .student_btn .handle-tiem span {
        font-weight: normal;
        font-size: 16px;
        vertical-align: middle;
    }
    .student_btn .handle button{
        margin:0 10px;
    }
    .student_btn .status{
        cursor: pointer;
        vertical-align:middle;
        background: #e2e2e2;
        width: 25px;
        height: 25px;
        border-radius:50%;
        display: inline-block;
        line-height: 25px;
        color: #fff;
        font-size: 22px;
        text-align: center;
    }
    .student_btn .status i{
        font-size: 20px;
    }
    .student_btn .status.active{
        background: #0097eb;
    }
    .student_btn .statusfont{
        font-size: 16px;
        display: inline-block;
        vertical-align:middle;
        padding: 0 10px;
    }

</style>