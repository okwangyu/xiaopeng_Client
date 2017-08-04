<template>
    <div >
        <Modal v-model="modal.show">
                <p slot="header">
                    <span>所有科目</span>
                </p>
                <div class="sub">
                <div v-for="(v,index) in sub">
                    
                    <div class="subject">
                   <router-link :to="{ name: 'student', params: { class_id: v.class_id,class_subject_id:v.class_subject_id }}">
                    <div class="classImg"><img :src="apiurl.api+v.icon"></div>
                    <div class="classImgR">
                        <div class="user">科目:{{v.name}}</div>
                    </div>
                    </router-link>
                </div>

                </div>
                </div>

            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    export default {
        props: ['modal','sub'],
        data () {
            return {
                apiurl:api
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