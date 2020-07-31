<template>
 <div>
 <div>
      <div class="leisure">
        <div class="leisure1" v-if="floorName==='休闲食品'">1F</div>
        <div class="leisure1" v-if="floorName==='新鲜水果'">2F</div>
        <div class="leisure1" v-if="floorName==='营养奶品'">3F</div>
        <div class="leisure2">{{floorName}}</div>
      </div>
      <div>
          <div v-for="(item,index) in floor" :key="index" >
          <img :src="item.image" class="floor1" @click="$Todetails(item.goodsId)">
      </div>
      </div>
 </div>
 </div>
</template>

<script>
 export default {
   name: '',
 //接收父组件传递过来的参数
   props: {
       floor:{
           type:Array
       },
       floorName:{
           type:String
       }
   },
 //注册组件
   components: {

   },
  // 定义变量
   data () {
     return {

     }
   },
 //事件方法执行
   methods: {

   },
 //页面初始化方法
   mounted() {

   },
//监听方法  click事件等，执行drawFeatures方法
  //监听值变化
   watch: {

   },
//计算
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.leisure {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 10px 0;
  float:left;
  background-color: #f3f3f3;
}
.leisure1 {
  background-color: #ff1600;
  color: #fff;
  border-radius: 50%;
  padding: 3px;
}
.leisure2 {
  color: #ff1600;
}
.floor1{
    width: 186px;
    float:left;
}

</style>