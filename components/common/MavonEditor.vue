<template>
  <div class="mavonEditor">
    <no-ssr>
      <mavon-editor style="z-index:10"
        ref=md
        :toolbars="markdownOption"
        placeholder="Markdown 编写"
        :tabSize="4"
        @change="change_mavon"
        :transition="true"
        v-model="handbook"
        @imgAdd="$imgAdd"
        :boxShadow=false
      />
    </no-ssr>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        help: true, // 帮助
        // save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        preview: true // 预览
      },
      handbook: ""
    };
  },
  methods: {
    change_mavon(value, render) {
      this.$emit("change_mavon", value, render);
    },

    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      console.log("进入图片上传方法")
      var formdata = new FormData();
      formdata.append("img", $file);
      axios({
        url: "http://192.168.0.102:8081/question/img/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        console.log(res);
        this.$refs.md.$img2Url(pos, res.data.data);
      });
    }
  }
};
</script>

<style scoped>
.mavonEditor {
  margin: 0 auto;
  width: 90%;
  height: 100%;
}
</style>