<template>
    <div>
        <div v-if="classify=='blog'">
            <BlogEdit :editData="{}"/>
        </div>
        <div v-if="classify=='question'">
            <QuestionEdit :editData="{}"/>
        </div>
    </div>
</template>
<script>
import BlogEdit from "~/components/article/BlogEdit.vue";
import QuestionEdit from "~/components/article/QuestionEdit.vue";
export default {
    components: {
        BlogEdit,
        QuestionEdit
    },

    data(){
        return{
            classify: ""
        }
    },
    mounted(){
        this.classify = this.$route.params.create;
    }
}
</script>