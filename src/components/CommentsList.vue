<template>
    <div>
        <CreateCommentComponent :post-id="postId" @comment-added="refreshComments"/>
    </div>
    <div v-if="thereIsComment">
        <div class="commentsList">
            <div v-for="comment in comments"
                :key="comment.id">
                <CommentComponent :comment="comment" @item-deleted="refreshComments"/>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script>
import { useStore } from 'vuex'
import CommentComponent from '@/components/CommentComponent.vue'
import CreateCommentComponent from '@/components/CreateCommentComponent.vue'

export default {
    name: 'CommentsList',
    components: {
        CommentComponent,
        CreateCommentComponent
    },
    emits: [
    'update-required'
    ],
    props: {
        postId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            comments: []  
        }
    },
    computed: {
        thereIsComment() {
            if(this.comments.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        refreshComments() {
            this.$emit('update-required');
        }
    },
    created() {
        const store = useStore();
        const headers = { 'authorization': 'Bearer' + ' ' + window.sessionStorage.getItem('auth') };
        fetch(store.state.API + 'comment/' + this.postId, { headers } )
        .then((res) => {
            if(!res.ok) {
                throw new Error('Request failed!')
            } else {
                return res.json();
            }
        })
        .then((data) => {
            this.comments = data;
        })
        .catch(() => { throw new Error('An error occurred!')})
    }
}
</script>

<style>
    .commentsList {
        margin: 10px 0;
    }
</style>