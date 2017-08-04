<template>
    <div >
        <Modal v-model="modal.show">
                <p slot="header">
                    <span>所有科目</span>
                </p>
                <div class="sub">
                <div v-for="(v,index) in sub">
                    
                    <div class="subject" @click="gostudent(v)">
                    <div class="classImg"><img :src="apiurl.api+v.icon"></div>
                    <div class="classImgR">
                        <div class="user">科目:{{v.name}}</div>
                    </div>
                </div>

                </div>
                </div>

            <div slot="footer"></div>
        </Modal>
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
    import $ from 'jquery'
    export default {
        props: ['modal','sub'],
        data () {
            return {
                apiurl:api,
                user_info:{
                        id:0,
                        name:'',
                        user_icon:''
                }
            }
        },
        methods:{
            getUser(){
                let userinfo=JSON.parse(this.$localStorage.get('userinfo'));
                this.user_info.user_icon=imgUrl(userinfo.avatar)
                this.user_info.name=userinfo.username
                this.user_info.id=userinfo.id
            },
            getStudent (item) {
                 let _this=this;
                //获取信息请求
                $.ajax({
                        type:'get',
                        url:api.api+'v3/student/newList/format/json',
                        dataType:'JSON',
                        data:{
                            class_subject_id:item.class_subject_id,
                            class_id:item.class_id,
                            create_by:_this.user_info.id
                        },
                        success:function(res){
                            _this.classes=res.data.class_info
                            _this.$store.commit('add_current_subject',res.data.class_info)    
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
            getGroup (item) {
                    let _this=this;
                    $.ajax({
                            type:'get',
                            url:api.api+'v3/class_group/list/format/json',
                            dataType:'JSON',
                            data:{
                                class_subject_id:item.class_subject_id
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
            gostudent (item) {
                this.getUser()
                this.getStudent(item)
                this.getGroup(item)
                this.$router.push({ 
                    name: 'student', params: { class_id: item.class_id,class_subject_id:item.class_subject_id }
                })
            }
        }
    }
</script>
<style scoped>
   
    .sub{
        overflow: hidden;
        padding:10px 16px;
    }
    .subject{
        cursor: pointer;
        width: 110px;
        height:125px;
        float: left;
        margin:5px;
        padding: 5px;
        border:1px solid #ddd;
        text-align: center;
    }
    .subject .classImg{
        width: 90px;
        height: 90px;
        margin:0 auto;
    }
    .subject .classImg img{
        width: 100%
    }
    .classImgR{
        text-align: center;
        color: #333
    }
    .user{
        height: 25px;
        line-height: 25px;
    }

</style>