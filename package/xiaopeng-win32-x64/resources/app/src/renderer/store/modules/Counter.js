const state = {
  classes_list:[],
  student_lists:[],
  group_lists:[],
  student_sort:{
    type:'sort',
    sort_name:'分数(默认)'
  },
  
  list_status:{
      list_show:true,         //全选和重置分数学生出现的状态控制(true为原始状态)
      list_bottom:false,      //全选和重置分数底部菜单的状态控制(true为显示)
      list_ischeck:false,     //班级框的状态(true为不能点击)
      bottom_show:true,       //底部原始状态显示(true为显示)
      attendance_bottom:false, //考勤底部按钮出现的状态控制(true为显示) 
      attendance_show:false,   //考勤时学生列表出现状态(true为显示)
      select_show:false,
      select_list:false
  },
  group_status:{
      list_show:true
  },
  class_name:''
}
const mutations = {
  add_class_name(state,action){
    state.class_name=action
  },
  classespush(state,action){
    state.classes_list=action
  },
  //第一次加载学生数据并且进行排序存入student_lists
  pushList(state, action) {
    state.student_lists = action 
    if(state.student_sort.type=='sort'){
        state.student_lists.sort((a , b)=>{
          return a.student_id - b.student_id
        })
    }else if(state.student_sort.type=='sortone'){
      state.student_lists.sort((a , b)=>{
          return b.score - a.score
        })
    }else{
      state.student_lists.sort((a , b)=>{
          return a.score - b.score
      })
     
    }
  },
  //第一次加载小组数据进行排序存入group_lists
  grouplist(state, action) {
    state.group_lists = action 
  },







  //给学生列表进行排序
  sortList(state, action) {
    state.student_sort.type = action.type
    if(state.student_sort.type=='sort'){
        state.student_lists.sort((a , b)=>{
          return a.student_id - b.student_id
        })
    }else if(state.student_sort.type=='sortone'){
      state.student_lists.sort((a , b)=>{
          return b.score - a.score
        })
    }else{
      state.student_lists.sort((a , b)=>{
          return a.score - b.score
      })
     
    }
    state.student_sort.sort_name=action.name
  },
  //给学生添加行为时的方法
  add_show_an(state,action){
    state.student_lists.forEach(function(item){
        if(item.check){
            item.add_show=action.type
            if(action.leixing=='praised'){
              item.score=item.score*1+action.score*1
            }else if(action.leixing=='Improvement'){
              item.score=item.score*1-action.score*1
            }
        }
    })
    
  },
  //给学生打分时动画操作的方法
  show_an(state,action){
    state.student_lists.find(function(item){
        item.add_show=action.type
        item.check=false
    })
  },
  //给学生打分时对check状态的改变
  allpush(state,action){
    state.student_lists.forEach(function(item){
        if(action.student_id==item.student_id){
          item.check=!item.check
        }
    })
  },
  //全选或者反选时对check状态的变化和对班级框的状态
  quanxuan(state,action){
    state.student_lists.forEach(function(item){
          item.check=action
    })
    state.list_status.list_ischeck=!action
  },
  //打完分或者取消打分时check状态的还原(1为最初值,2为选择,3为出勤)
  changecheck(state,action){   
     state.student_lists.forEach(function(item){
        item.check=false
        item.attendance_type=1
        item.attendance_color='#31c27c'
        item.attendance_icon=false
     })
     if(action==1){
        state.list_status.list_show=true           //原始学生列表显示(true为显示)
        state.list_status.bottom_show=true        //原始学生列表底部菜单显示(true为显示)   
        state.list_status.list_ischeck=false        //班级框是否能填写行为(true为不能点)
        state.list_status.attendance_show=false   //出勤学生列表的状态(true为显示)
        state.list_status.attendance_bottom=false //考勤底部按钮出现的状态控制(true为显示) 
        state.list_status.select_show=false
        state.list_status.select_list=false
     }else if(action==2){
        state.list_status.list_show=false          //原始学生列表显示(true为显示)
        state.list_status.bottom_show=false       //原始学生列表底部菜单显示(true为显示)   
        state.list_status.list_ischeck=true        //班级框是否能填写行为(true为不能点)
        state.list_status.attendance_show=false   //出勤学生列表的状态(true为显示)
        state.list_status.attendance_bottom=false //考勤底部按钮出现的状态控制(true为显示) 
        state.list_status.select_show=true
        state.list_status.select_list=true
     }else if(action==3){
        state.list_status.list_show=false           //原始学生列表显示(true为显示)
        state.list_status.bottom_show=false        //原始学生列表底部菜单显示(true为显示)   
        state.list_status.list_ischeck=false        //班级框是否能填写行为(true为不能点)
        state.list_status.attendance_show=true   //出勤学生列表的状态(true为显示)
        state.list_status.attendance_bottom=true //考勤底部按钮出现的状态控制(true为显示) 
        state.list_status.select_show=false
        state.list_status.select_list=false
     }
  },
  //重置分数
  reset(state){
    state.student_lists.forEach(function(item){
        if(item.check){
          item.score=0
        }
    })
  },

  attendance_type(state,action){
    state.student_lists.forEach(function(item){
        if(item.student_id==action.student_id){
            item.attendance_icon=true
        }else{
            item.attendance_icon=false
        }
    })
  },
  changeatt(state,action){
    state.student_lists.forEach(function(item){
        if(item.student_id==action.item.student_id){
            item.attendance_type=action.type.attendance_type
            item.attendance_color=action.type.color
        }
        item.attendance_icon=false
    })

  },
  quxiao(state){
    state.student_lists.forEach(function(item){
      item.attendance_icon=false
    })
  },
  allat(state,action){
    state.student_lists.forEach(function(item){
      if(action==1){
            item.attendance_type=3
            item.attendance_color='#f25d45'
      }else if(action==3){
            item.attendance_type=1
            item.attendance_color='#31c27c'
      }
    })
  },
  grouppull(state,action){
    state.group_lists.forEach(function(item){
        if(action.class_group_id==item.group_info.class_group_id){
            item.group_info.check=!item.group_info.check
        }
    })
  },
  groupqu(state){
    state.group_lists.forEach(function(item){
       item.group_info.check=false
    })
  },
   //给小组添加行为时的方法
  
  add_group(state,action){
    state.group_lists.forEach(function(item){
        if(item.group_info.check){
            item.group_info.add_show=true
            console.log(item.group_info.add_show)
            if(action.leixing=='praised'){
              item.group_info.score=item.group_info.score*1+action.score*1
              item.group_members.forEach(function(vv){
                  vv.score=vv.score*1+action.score*1
              })
            }else if(action.leixing=='Improvement'){
              item.group_info.score=item.group_info.score*1-action.score*1
              item.group_members.forEach(function(vv){
                  vv.score=vv.score*1-action.score*1
              })
            }
        }
    })
    
  },
  group_show(state){
    state.group_lists.forEach(function(item){
        item.group_info.add_show=false
        item.group_info.check=false
    })
    state.group_status.list_show=true
  },
  group_show_status(state,action){
    state.group_status.list_show=!action
  },
  group_all(state,action){
    state.group_lists.forEach(function(item){
        item.group_info.check=!action
    })
  },
  reset_group(state){
    state.group_lists.forEach(function(item){
        if(item.group_info.check){
          item.group_info.score=0
        }
    })
  }
}
const getters = {
  get_classes_list(state){
    state.classes_list.forEach(function(item,index){
        if(item.class.grade==0){
            item.class.nianji='学前班'
        }
        if(item.class.grade==1){
            item.class.nianji='一年级'
        }
        if(item.class.grade==2){
            item.class.nianji='二年级'
        }
        if(item.class.grade==3){
            item.class.nianji='三年级'
        }
        if(item.class.grade==4){
            item.class.nianji='四年级'
        }
        if(item.class.grade==5){
            item.class.nianji='五年级'
        }
        if(item.class.grade==6){
            item.class.nianji='六年级'
        }
        if(item.class.grade==7){
            item.class.nianji='初一'
        }
        if(item.class.grade==8){
            item.class.nianji='初二'
        }
        if(item.class.grade==9){
            item.class.nianji='初三'
        }
        if(item.class.grade==10){
            item.class.nianji='高一'
        }
        if(item.class.grade==11){
            item.class.nianji='高二'
        }
        if(item.class.grade==12){
            item.class.nianji='高三'
        }
        if(item.class.grade==13){
            item.class.nianji='其他'
        }
    })
    return state.classes_list
  },
  //获取学生列表
  lists(state){
     return state.student_lists;
  },
  //获取排序状态
  get_sort(state){
    return state.student_sort
  },
  //获取学生总分数
  get_student_cont(state){
    let count=0;
    state.student_lists.forEach(function(item,index){
        count+=item.score*1
    })
    return count
  },
  //获取选中学生的数量
  get_check_cont(state){
    let c=0;
     state.student_lists.forEach(function(item,index){
        if(item.check){
          c++
        }
     })
     return c
  },
  //获取选中学生的列表
  get_check_student(state){
    let c=[];
    state.student_lists.forEach(function(item,index){
      if(item.check){
        c.push(item)
      }
    })
    return c
  },
  //获取所有显示的状态
  get_list_status(){

    return state.list_status
  },
  get_grouplist(state){
    return state.group_lists
  },
  get_group_status(state){
    return state.group_status
  },
  get_group_cont(state){
    let c=[];
    state.group_lists.forEach(function(item,index){
      if(item.group_info.check){
        c.push(item)
      }
    })
    return c
  },
  class_name(state){
    return state.class_name
  }
}
export default {
  state,
  mutations,
  getters
}
