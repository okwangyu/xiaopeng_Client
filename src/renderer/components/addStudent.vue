<template>
  <div class="addstudent">
    <Modal v-model="modal.show" title="添加学生" @on-cancel="cancel">
    <div class="addbody">
         <div class="shu">
           <Input v-model="value" autofocus placeholder="请输入学生姓名" style="width: 420px" @on-enter="add"></Input>
           <Button type="primary" @click="add">确定</Button>
         </div>
         <div class="stunumber">您已经输入了 <span class="num">{{list.length}}</span> 个学生 <div class="noice">您输入学生姓名后也可直接回车进行添加</div></div>
         <div class="student_l">
           <ul>
             <li v-for="(item,index) in list">
                <div class="showstuimg"><img :src="apiurl.api+item.icon"></div>
                <div class="showstuname">{{item.name}}</div>
                <div class="showstuclose" @click="del(item,index)">x</div>
             </li>
           </ul>
         </div>
    </div>
    <div slot="footer">
      <Button @click="out">取消</Button><Button type="primary" :class="list.length==0?disabled:''" @click="daoru()">添加</Button>
    </div>
    </Modal>
</div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'hello',
    props:['modal','userinfo'],
    data () {
      return {
        apiurl:api,
        modal1: false,
        value:'',
        list:[],
        disabled:'disabled'
      }
    },
    methods: {
      cancel(){
        this.modal.show=false;
        this.list=[]
        this.value=''
      },
      out(){
        this.modal.show=false;
        this.list=[]
        this.value=''
      },
      add(){

        let num=0
        let shuju=this.value.replace(/(^\s*)|(\s*$)/g, "");
        if(!shuju){
            this.$Message.error('必须填写学生姓名');
            return false
        }
        if(shuju.length>10 || shuju.length<2){
            this.$Message.error('学生姓名太短或者太长,建议您设置到2-10个字符');
            return false
        }
        var iconStr=['01girl.png', '02girl.png', '03girl.png', '04girl.png', '05girl.png', '06girl.png', '07girl.png', '08girl.png', '09girl.png', '10girl.png', '11girl.png',
          '12girl.png', '13girl.png', '14girl.png', '15girl.png', '16girl.png', '17girl.png', '18girl.png', '19girl.png', '01boy.png', '02boy.png', '03boy.png',
          '04boy.png', '05boy.png', '06boy.png', '07boy.png', '08boy.png', '09boy.png', '10boy.png', '11boy.png', '12boy.png', '13boy.png', '14boy.png',
          '15boy.png', '16boy.png', '17boy.png', '18boy.png', '19boy.png', '20boy.png', '21boy.png', '22boy.png', '23boy.png', '24boy.png',
          '25boy.png', '26boy.png', '27boy.png', '28boy.png', '29boy.png', '30boy.png', '31boy.png'];
        var icon=iconStr[Math.floor(Math.random()*iconStr.length)];
        this.list.unshift({
            id:this.list.length+1,
            name:shuju,
            icon:'/uploads/student/'+icon
        })
        this.value=''
      },
      del(item,index){
         
         this.list.splice(index, 1);
      },
      daoru(){
          this.$emit('addstude',this.list)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addbody{
     padding: 10px 20px 0;
  }
  .input-text,.btn,.input-text.size-M,.btn.size-M{ 
    font-size:14px; 
    height:31px;
    height:auto;
    line-height:1.42857;
    padding:4px
  }
  .stunumber{
    height: 50px;
    line-height: 50px;
  }
  .noice{
    float: right;
    color: #ccc;
  }
  .student_l{
    height: 250px;
    overflow: auto;
    background: #f9f9f9
  }
  .student_l ul li{
    height: 50px;
    background: #fff;
    margin: 1px;
  }
  .showstuimg{
    width: 50px;
    height: 50px;
    display: block;
    float: left;
    padding-left: 4px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    background: #fff;
  }
  .showstuimg img{
    height: 100%;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    background: #fff;
  }
  .showstuname{
    width: 300px;
    height: 50px;
    line-height: 50px;
    display: block;
    float: left;
  }
  .showstuclose{
    width: 50px;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
    float: right;
    font-size: 20px;
    color: #ddd;
    cursor: pointer;
  }
  .num{
    color: #2aadf1
  }
</style>
