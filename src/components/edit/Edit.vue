<template>
  <div>
    <div class="errmsg">
      <div v-show="errShow">{{ msg }}</div>
    </div>
    <el-form ref="form" :model="editData" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="editData.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" v-model="editData.content"></el-input>
      </el-form-item>

      <el-form-item label="时间">
        <el-col :span="11" >
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
            v-model="date"
            style="width: 119%;margin-left:-10px; margin-right:5px"
          ></el-date-picker>
        </el-col>
        <!--<el-col class="line" :span="2">-</el-col>-->
        <el-col :span="11" style="margin-left:20px">
          <el-time-picker
            placeholder="选择时间"
            v-model="time"
            value-format="HH:mm"
            style="width: 106%;"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      time: "",
      msg: "",
      errShow: false,
      editData: {
        title: "",
        date: "",
        // time: "",
        content: "",
      },
    };
  },
  props: {
    todoData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {
    //console.log(this.todoData,"cpnedit")
    this.init();
  },
  mounted() {},
  methods: {
    onSubmit() {
      const date = this.date + " " + this.time;
      if (this.editData.content) {
        if (new Date(date).getTime() > new Date().getTime()||(this.editData.status!=0)) {
          //如果ID为空则是新建事件，创建id和初始状态为0
            if(!this.todoData.id){
                this.editData.id = Math.round(Math.random() * new Date().getTime());
                this.editData.status = 0;
                this.editData.createDate = (new Date()).format("yyyy-MM-dd hh:mm:ss");
            }
          this.editData.handleDate = date;
          console.log(this.editData)
          this.$emit("editdata", this.editData);
        } else {
          this.msg = "处理日期不能小于当前时间···"
          this.errShow = true;
          this.init();
        }
      } else {
        this.msg = "内容不能为空···";
        this.errShow = true;
        this.init();
      }
    },
    init() {
      this.editData = JSON.parse(JSON.stringify(this.todoData))
      this.date =
        (this.todoData.handleDate && this.todoData.handleDate.split(" ")[0]) || "";
      this.time =
        (this.todoData.handleDate && this.todoData.handleDate.split(" ")[1]) || "";
    },
  },
};
</script>

<style scoped>
.errmsg {
  position: absolute;
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 30px;
  color: red;
  z-index: 100;
  top: 45px;
  /*background-color: royalblue;*/
}
</style>