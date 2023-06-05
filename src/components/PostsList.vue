<template>
    <div class="postsList" v-if="thereIsPosts">
        <div v-for="post in posts" :key="posts.indexOf(post)" >
            <PostComponent :post="post" :profile="profile"
            />
        </div>
    </div>
    <div v-else>
        <div class="posts">
            <div class="posts__noposts">
                <p>No posts</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import PostComponent from '@/components/PostComponent.vue'
export default {
    name: 'PostsList',
    props: {
        profileId: String,
        profile: Object
    },
    emits: [
        'update-required'
    ],
    components: {
        PostComponent
    },
    data() {
        return {
            posts: [],
            listKey: +0
        }
    },
    computed: {
        thereIsPosts() {
            if(this.posts.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
    created() {
        const store = useStore();
        const headers = { 'authorization': 'Bearer' + ' ' + sessionStorage.getItem('auth') };
        const userPosts = this.profileId ? '/' + this.profileId: '';
 
        fetch(store.state.API + 'post' + userPosts, { headers } )
        .then((res) => {
            if(!res.ok) {
                throw new Error('Request failed!')
            } else {
                return res.json();
            }
        })
        .then((data) => {
            this.posts = data.sort(function(a,b){
              return new Date(b.createdAt) - new Date(a.createdAt);
            });

            if(!this.profileId) {
                this.$store.dispatch('setUnseenPosts', data);
            }
        })
        .catch(() => { throw new Error('An error occurred.') })
    }
}
</script>

<style scoped lang="scss">
    .postsList {
        margin-bottom: 20px;
    }
    .posts__noposts {
        width: 90%;
        margin: auto;
        background-color: var(--netral-color);
        border-radius: 15px;
        min-height: 60px;
        line-height: 60px;

        & p {
            color: white;
            font-weight: bold;
        }
    }
</style>