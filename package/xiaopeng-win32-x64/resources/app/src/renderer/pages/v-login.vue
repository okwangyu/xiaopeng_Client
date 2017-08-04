<template>
  <div id="wrapper">
    <v-header></v-header>
    <div class="left_form">
       <Carousel autoplay v-model="value2" :autoplay-speed="sudu">
        <Carousel-item>
            <div class="demo-carousel">
              <img src="../assets/banner.png" alt="">
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">
              <img src="../assets/banner.png" alt="">
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">
              <img src="../assets/banner.png" alt="">
            </div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">
              <img src="../assets/banner.png" alt="">
            </div>
        </Carousel-item>
    </Carousel>
    </div>
    <div class="right_form">
      <div class="formtitle">校朋登录</div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60">
        <Form-item prop="name">

            <Input v-model="formValidate.name" placeholder="请输入手机号"></Input>
            <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Form-item>
        <Form-item prop="pass">
            <Input type="password" v-model="formValidate.pass" placeholder="请输入密码"></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </Form-item>
    </Form>
   
    <div class="bottom_form">

      没有账号去注册
    </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import vHeader from '@/pages/v-login-header'
  export default {
        data () {
            return {
                value2: 0,
                sudu:5000,
                formValidate: {
                    name: '',
                    pass: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min:3, message: '密码长度不能小于3位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
              var that=this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var url=api.api+"v2/user/sign_in/format/json"
                        $.post(url,{username:this.formValidate.name,password:this.formValidate.pass},function(res){
 
                            if(res.error_code=='1002'){
                               that.$Message.error('账号不存在!');
                               return false
                            }
                            if(res.error_code=='1003'){
                               that.$Message.error('密码错误!');
                               return false
                            }
                            that.$Message.success('登录成功!');
                            that.$localStorage.set('userinfo', JSON.stringify(res.data))
                            that.$router.push('classes');
                        })
                       
                    } else {
                        this.$Message.error('请填写用户名和密码!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        components:{
          vHeader
        }
    }
</script>

<style>
.bottom_form{
  position: absolute;
  bottom: 0px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #b9dbe7;
  width: 400px;
  border-radius: 0 0 6px 6px;
}
.left_form{
  width: 600px;
  height: 500px;
  position: absolute;
  top: 18%;
  left: 4%;
}
.ivu-carousel-list{
  height: 500px;
}
.ivu-carousel-list img{
  padding-left: 50px
}
.right_form{
  width: 400px;
  position: absolute;
  right: 4%;
  top: 18%;
  height: 500px;
  background: rgba(206, 240, 252, .6);
  border-radius: 6px;
  box-shadow: 2px 2px 8px rgba(55, 55, 55, .5)
}
.right_form input{
  width: 300px;
  height: 40px;
  border-radius: 2px;
}
.right_form button{
  width: 300px;
  height: 40px;
  margin-top: 10px;
  font-size: 16px;
}
.formtitle{
  margin:30px 0;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  color: #333;
  text-align: center;
}
#wrapper{
  position:relative;
  height: 100%;
  background:#2aadf1;
}

</style>
