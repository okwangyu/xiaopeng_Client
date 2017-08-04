<template>
  <div id="timercon">
    
    <audio ref="jsq" src="http://www.uxuj.cn/Public/images/jsq.wav" style="display:none"></audio>
    <div class="t_header"><span class="t_title">计时器</span><span class="t_close" @click="close()"><Icon type="close"></Icon></span></div>
    <div class="t_btn">
        <Button-group shape="circle">
                <Button :class="tab==1?primary:''" style="width:100px" @click="tab=1">
                    <div style="font-size:15px;">秒表</div>
                </Button>
                <Button :class="tab==2?primary:''" style="width:100px" @click="tab=2">
                    <div style="font-size:15px;">倒计时</div>
                  
              </Button>
      </Button-group>
    </div>
    <div class="t_content" v-if="tab==1">
        <div class="t_miao">
            <div class="numer">{{hour}}</div>
            <div class="dian">:</div>
            <div class="numer">{{minutes}}</div>
            <div class="dian">:</div>
            <div class="numer">{{seconds}}</div>
        </div>
        <div class="t_bottom">
            <div class="bot_btn" @click="play()"><span class="icon" :class="timer!=''?active:''"><Icon type="play"></Icon></span><span class="font">开始</span></div>
            <div class="bot_btn" @click="pause()"><span class="icon" :class="timer==''?active:''"><Icon type="pause"></Icon></span><span class="font">暂停</span></div>
            <div class="bot_btn" @click="rest()"><span class="icon" :class="timer=='' && seconds=='00'?active:''"><Icon type="refresh"></Icon></span><span class="font">重置</span></div>
        </div>
    </div>
    <div class="t_content" v-if="tab==2">
        <div class="t_dao">
            <div class="numer">
              <span class="add" :class="pull==1?on:''" @click="addtimer_hour(true)">+</span>
                {{d_hour}}
              <span class="jian" :class="pull==1?on:''" @click="addtimer_hour(false)">-</span>
            </div>
            <div class="dian">:</div>
            <div class="numer">
            <span class="add" :class="pull==1?on:''"  @click="addtimer_minutes(true)">+</span>
            {{d_minutes}}
            <span class="jian" :class="pull==1?on:''" @click="addtimer_minutes(false)">-</span>
            </div>
            <div class="dian">:</div>
            <div class="numer">
            <span class="add" :class="pull==1?on:''"  @click="addtimer_seconds(true)">+</span>
            {{d_seconds}}
            <span class="jian" :class="pull==1?on:''" @click="addtimer_seconds(false)">-</span>
            </div>
        </div>
        <div class="t_bottom">
            <div class="bot_btn" @click="d_play()"><span class="icon" :class="d_timer!=''?active:''"><Icon type="play"></Icon></span><span class="font">开始</span></div>
            <div class="bot_btn" @click="d_pause()"><span class="icon" :class="d_timer==''?active:''"><Icon type="pause"></Icon></span><span class="font">暂停</span></div>
            <div class="bot_btn" @click="d_rest()"><span class="icon" :class="d_timer!=''?active:''"><Icon type="refresh"></Icon></span><span class="font">重置</span></div>
        </div>
    </div>
  </div>
</template>

<script>
  var ipcRenderer=require('electron').ipcRenderer;
  const {app,BrowserWindow,ipcMain} = require('electron')
   export default {
    name: 'classes',
    data () {
            return {
                hour:'00',
                minutes:'00',
                seconds:'00',
                timer:'',
                d_hour:'00',
                d_minutes:'05',
                d_seconds:'00',
                d_timer:'',
                active:'active',
                tab:'1',
                primary:'ivu-btn-primary',
                on:'on',
                pull:0
            }
    },
    methods: {
      close () {
         this.$localStorage.remove('jsq')
         window.close()
      },
      play () {
        if(this.timer==''){
            this.timer = setInterval(()=>{
              this.seconds++
              if(this.seconds < 10){
                this.seconds="0"+this.seconds
              }
              if(this.seconds > 59){
                this.minutes++
                if(this.minutes < 10){
                  this.minutes="0"+this.minutes
                }
                if(this.minutes > 59){
                  this.hour++
                  if(this.hour < 10){
                    this.hour="0"+this.hour
                  }
                  this.minutes='00'
                }
                this.seconds='00'
              }
          },1000)
        }
        
      },
      pause () {
          clearInterval(this.timer)
          this.timer=''
      },
      rest () {
        if(this.timer==''){
          this.hour='00'
          this.minutes='00'
          this.seconds='00'
        }
      },
      d_play () {
          this.pull=1
          if(this.d_timer==''){
            this.d_timer=setInterval(()=>{
            
            if(this.d_seconds==0){
              if(this.d_minutes==0){
                if(this.d_hour==0){
                    
                    this.d_hour='00'
                    this.d_seconds='00'
                    this.d_minutes='00'
                    this.$refs.jsq.play()
                    this.pull=0
                    clearInterval(this.d_timer)
                    this.d_timer=''
                    return false
                }else if(this.d_hour!=0){
                      this.d_hour--
                      this.d_minutes=59
                      this.d_seconds=59
                      if(this.d_hour < 10){
                          this.d_hour="0"+this.d_hour
                      }
                }
                
              }else if(this.d_minutes!=0){
                this.d_minutes--
                this.d_seconds=59
                if(this.d_minutes < 10){
                  this.d_minutes="0"+this.d_minutes
                }
              } 
          }else if(this.d_seconds!=0){
            this.d_seconds--
            if(this.d_seconds < 10){
              this.d_seconds="0"+this.d_seconds
            }
          }

        },1000)
        

        }else{
          return false
        }
      },
      d_pause () {
          clearInterval(this.d_timer)
          this.d_timer=''
          this.pull=0
      },
      d_rest () {
        clearInterval(this.d_timer)
        if(this.pull==0){
          this.d_hour='00'
          this.d_minutes='05'
          this.d_seconds='00'
        }
        this.d_timer=''
      },
      addtimer_hour (type) {
        
        if(type){
          this.d_hour++
          if(this.d_hour > 59){
                this.d_hour="0"
          }
          
          if(this.d_hour < 10){
                this.d_hour="0"+this.d_hour
          }
        }else if(!type){
          
          
          this.d_hour--
          if(this.d_hour < 1){
                  this.d_hour="00"
                  return false
          }
          if(this.d_hour < 10){
                this.d_hour="0"+this.d_hour
          }
          
        }
      },
      addtimer_minutes(type){
        if(type){
          this.d_minutes++
          if(this.d_minutes > 59){
                this.d_minutes="0"
          }
          
          if(this.d_minutes < 10){
                this.d_minutes="0"+this.d_minutes
          }
        }else if(!type){
          
          
          this.d_minutes--
          if(this.d_minutes < 1){
                  this.d_minutes="00"
                  return false
          }
          if(this.d_minutes < 10){
                this.d_minutes="0"+this.d_minutes
          }
          
        }
      },
      addtimer_seconds(type){
        if(type){
          this.d_seconds++
          if(this.d_seconds > 59){
                this.d_seconds="0"
          }
          
          if(this.d_seconds < 10){
                this.d_seconds="0"+this.d_seconds
          }
        }else if(!type){
          
          
          this.d_seconds--
          if(this.d_seconds < 1){
                  this.d_seconds="00"
                  return false
          }
          if(this.d_seconds < 10){
                this.d_seconds="0"+this.d_seconds
          }
          
        }
      }
    }
  }
</script>

<style scoped>
  .t_header{
    height: 50px;
    line-height: 50px;
    background:#2aadf1;
    -webkit-app-region: drag;
  }
  .t_title{
    float: left;
    width: 100px;
    font-size: 16px;
    color: #fff;
    padding-left: 20px;
  }
  .t_close{
    float: right;
    font-size: 18px;
    color: #fff;
    display: block;
    width: 60px;
    text-align: center;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
  .t_btn{
    text-align: center;
    line-height: 90px;
  }
  .t_content{
    width: 490px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .t_miao{
    margin:0 auto;
    height: 110px;
    text-align: center;
    margin-top: 30px;
    
  }
  .t_miao .numer{
    float: left;
    line-height: 60px;
    color: rgb(16,172,244);
    font-size: 75px;
    text-align: center;
    margin-top: 10px;
    padding:0 10px;
    width: 120px;
  }

  .t_miao .dian{
    float: left;
    line-height: 70px;
    font-size: 60px;
    color: rgb(16,172,244);
  }

  .t_dao{
    margin:0 auto;
    height: 110px;
    text-align: center;
    margin-top: 30px;
    
  }
  .t_dao .numer{
    position:relative;
    float: left;
    line-height: 20px;
    line-height: 60px;
    color: rgb(16,172,244);
    font-size: 75px;
    text-align: center;
    margin-top: 10px;
    padding:0 10px;
    width: 120px;
  }
  .t_dao .numer span.add{
    position: absolute;
    top: -40px;
    font-size: 58px;
    left: 30px;
    color: #ccc;
    cursor: pointer;
    width: 60px;
    height: 30px;
    line-height: 30px;
  }
  .t_dao .numer span.jian{
    position: absolute;
    top: 60px;
    font-size: 78px;
    left: 30px;
    color: #ccc;
    cursor: pointer;
    width: 60px;
    height: 30px;
    line-height: 30px;
  }
  .t_dao .dian{
    float: left;
    line-height: 70px;
    font-size: 60px;
    color: rgb(16,172,244);
  }

















  .t_bottom{
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin:0 auto;
    margin-top: 20px;
  }
  .t_bottom .bot_btn{
    width: 120px;
    height: 100px;
    margin:0 auto;
    text-align: center;
  }
  .t_bottom .bot_btn span{
    display: block;
    margin:0 auto;

  }
  .t_bottom .bot_btn span.icon{
    padding: 4px 4px 4px 6px;
    display: block;
    height: 50px;
    line-height: 44px;
    text-align: center;
    width: 50px;
    border-radius: 50%;
    background: rgb(16,172,244);
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
  .t_bottom .bot_btn span.font{
     display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 40px;
    font-size: 18px;
  }
  .t_bottom .bot_btn span.active{
    background: #ccc
  }
  .ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:first-child:not(:last-child){
    background: #2aadf1;
    border-color:#2aadf1;
  }
  .ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary+.ivu-btn, .ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:last-child:not(:first-child){
        border-left-color:#2aadf1;
  }
  .ivu-btn-primary{
    background: #2aadf1;
  }
  .on{
    display: none
  }
</style>
