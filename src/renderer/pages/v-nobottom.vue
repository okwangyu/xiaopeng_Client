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
        <div class="student_btn">
            
        </div>
        <div class="right_btn">
          
          22
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
    export default {
        data () {
            return {
                apiurl:api,
                user_info:{
                    id:0,
                    name:'',
                    user_icon:''
                },
                modal1:false
            }
        },
        methods:{
                getUser(){
                    let userinfo=JSON.parse(this.$localStorage.get('userinfo'));
                    this.user_info.user_icon=imgUrl(userinfo.avatar)
                    this.user_info.name=userinfo.username
                    this.user_info.id=userinfo.id
                },
                out () {
                 this.$localStorage.remove('userinfo')
                 this.$Message.success('退出成功!');
                 this.$router.push({path: '/login'})
                },
                suiji(){
                  this.$emit('suji')
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
      width: 15%;
      text-align: right;
      height: 70px;
      line-height: 70px;
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

</style>