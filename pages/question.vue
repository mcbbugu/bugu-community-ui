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
          <v-select style="margin:0 auto; width:90%;"
            v-model="value"
            :items="items"
            chips
            label="标签"
            multiple
            outlined
            dense
            deletable-chips
          ></v-select>

          <!-- <v-textarea style="margin:0 auto; width:90%;"
          outlined
          name="input-7-4"
          label="请使用markdown编写"
          value=""
        ></v-textarea> -->
        <editor/>
        <v-btn style="margin: 30px 0 10px 41px" depressed color="primary"><v-icon>mdi-cloud-upload</v-icon>&nbsp;发布</v-btn>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" outlined>.col-6 .col-md-4</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import editor from '~/components/common/QuillEditor.vue'
export default {
    components: {
        editor
    },
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
}
</script>