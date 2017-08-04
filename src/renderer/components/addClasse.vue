<template>
  <div>
    <Modal
    v-model="modal.show"
    title="创建班级"
    @on-cancel="cancel">
    <div>
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="学校" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入学校名称..." style="width: 350px"></Input>
        </Form-item>
        <Form-item label="昵称" prop="nikename">
          <Input v-model="formValidate.nikename" placeholder="请输入学校名称..." style="width: 350px"></Input>
        </Form-item>
        <Form-item label="年级" prop="grade" >
            <Select v-model="formValidate.grade" placeholder="请选择所年级" style="width:350px">
                <Option v-for="(item,index) in List" :value="item.number" :key="index">{{item.label}}</Option>
            </Select>
        </Form-item>
        <Form-item label="科目" prop="model2">
          <Select v-model="formValidate.model2" filterable multiple style="width:350px" >
            <Option v-for="(item,index) in subject" :value="item.value" :key="index">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item>
            <div style="float:right;margin-right:60px">
              <Button type="ghost" @click="out()">取消</Button>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            </div>
        </Form-item>
    </Form>

  </div>
  <div slot="footer"></div>
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
        modal1: false,
        modal_loading: true,
        List: [
        {
          number: '0',
          label: '学前班'
        },
        {
          number: '1',
          label: '一年级'
        },
        {
          number: '2',
          label: '二年级'
        },
        {
          number: '3',
          label: '三年级'
        },
        {
          number: '4',
          label: '四年级'
        },
        {
          number: '5',
          label: '五年级'
        },
        {
          number: '6',
          label: '六年级'
        },
        {
          number: '7',
          label: '七年级'
        },
        {
          number: '8',
          label: '八年级'
        },
        {
          number: '9',
          label: '九年级'
        },
        {
          number: '10',
          label: '高一'
        },
        {
          number: '11',
          label: '高二'
        },
        {
          number: '12',
          label: '高三'
        },
        {
          number: '13',
          label: '其他'
        }
        ],
        subject: [
        {
          value: '语文',
          label: '语文'
        },
        {
          value: '数学',
          label: '数学'
        },
        {
          value: '英语',
          label: '英语'
        },
        {
          value: '物理',
          label: '物理'
        },
        {
          value: '化学',
          label: '化学'
        },
        {
          value: '历史',
          label: '历史'
        },
        {
          value: '地理',
          label: '地理'
        },
        {
          value: '生物',
          label: '生物'
        },
        {
          value: '政治',
          label: '政治'
        },
        {
          value: '美术',
          label: '美术'
        },
        {
          value: '高一',
          label: '高一'
        },
        {
          value: '音乐',
          label: '音乐'
        },
        {
          value: '信息技术',
          label: '信息技术'
        },
        {
          value: '体育健康',
          label: '体育健康'
        },
        {
          value: '品德生活',
          label: '品德生活'
        },
        {
          value: '综合实践',
          label: '综合实践'
        }
        ],
        formValidate: {
                    name: '',
                    nikename: '',
                    grade: '',
                    model2: []
        },
        ruleValidate: {
                    name: [
                        { required: true, message: '学校不能为空', trigger: 'blur' }
                    ],
                    nikename: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' }
                    ],
                    grade: [
                        { required: true, message: '请选择年级', trigger: 'change' }
                    ],
                    model2: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个科目', trigger: 'change' },
                        { type: 'array', max: 5, message: '最多选择5个科目', trigger: 'change' }
                    ]
                }    
      }
    },
    methods: {
      out(){
        this.modal.show=false;
      },
      cancel(){
          this.$refs['formValidate'].resetFields();
      },
      handleSubmit (name) {
                let _this=this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(_this.formValidate);
                        
                        
                        
                        let subjects=[];
                        _this.formValidate.model2.forEach(function(item){
                          subjects.push({
                              name:item
                          })
                        })
                       $.ajax({
                            url:api.api+'v3/classes/createNewSubject/format/json',
                            type:'post',
                            dataType:'JSON',
                            data:{  
                                    school_name:_this.formValidate.name,
                                    grade :_this.formValidate.grade,
                                    name :_this.formValidate.nikename ,
                                    create_by:_this.userinfo.id,
                                    subjects:subjects
                            },
                            success:function(res){
                              console.log(res)
                              if(!res.error_code){
                                    $.ajax({
                                        url:api.api+'v2/classes/list/format/json',
                                        type:'get',
                                        dataType:'JSON',
                                        data:{
                                            user_id:_this.userinfo.id
                                        },
                                        success:function(res){
                                          if(!res.error_code){
                                            _this.$store.commit('classespush',res.data)
                                          }
                                        }
                                    })
                              }
                              _this.modal.show=false;
                              _this.formValidate.name='';
                              _this.formValidate.nikename='';
                              _this.formValidate.grade='';
                              _this.formValidate.model2=[];
                              _this.$Message.success('添加成功!');
                            }
                      })

                       













                       
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
