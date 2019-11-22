<template>
  <v-container class="grey lighten-5">
    <!-- no-gutters 无间隔 -->
    <v-row justify="end">
      <v-col cols="12" sm="6" md="9">
        <v-card class="pa-2" outlined>
          <h3 style="text-align:center; margin:40px; font-size:1.2em; color:#636b6f;">
            编辑问题
            <v-icon size="20">mdi-pencil</v-icon>
          </h3>
          <v-text-field style="margin:0 auto; width:90%;"
            label="标题"
            outlined
            height="2"
            clearable
            dense
          ></v-text-field>
          <!-- dense 变小 -->
          <v-select style="margin:0 auto; width:90%; z-index: 10000"
            v-model="value"
            :items="items"
            label="标签"
            multiple
            outlined
            small-chips
            dense
            deletable-chips
          ></v-select>

          <!-- <v-textarea style="margin:0 auto; width:90%;"
          outlined
          name="input-7-4"
          label="请使用markdown编写"
          value=""
        ></v-textarea> -->
        <!-- <QuillEditor/> -->
        <MavonEditor/>
        <v-btn style="margin: 30px 0 10px 43px" depressed color="primary"><v-icon>mdi-cloud-upload</v-icon>&nbsp;立即发布</v-btn>
        <v-btn style="margin: 30px 0 10px 0" depressed>存为草稿</v-btn>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" outlined>
          <a target="_blank" href="https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/master/README-zh_CN.md">提问的智慧</a></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import QuillEditor from '~/components/common/QuillEditor.vue'
import MavonEditor from '~/components/common/MavonEditor.vue'
export default {
    components: {
        QuillEditor,
        MavonEditor
    },
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
}
</script>