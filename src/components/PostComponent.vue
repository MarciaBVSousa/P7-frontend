<template>
    <article class="post" :id="post.id" @mouseover.once="setAsSeen" @touchstart.once.passive="setAsSeen">

        <div v-if="unseen">
            <div class="post__unseen"></div>
        </div>

        <div class="post__info">
            <RouterLink :to="'/profile/' + profileInfo.id">
                <div class="post__info__avatar">
                    <img alt="User avatar" :src="avatarImage">
                </div>
                <div class="post__info__data">
                    <span class="post__info__username">{{ profileInfo.name }}</span>
                    <span class="post__info__date">{{ date }}</span>
                </div>
            </RouterLink>
            <div v-if="isOwner">
                <DeleteOption component="post" :component-id="post.id" @item-deleted="refreshPosts"/>
            </div>
        </div>
        <div class="post__content">
            <div class="post__content__image" v-if="post.image">
                <img :src="post.image" alt="Image posted by user">
            </div>
            <div class="post__content__text" v-if="post.text">
                <p>
                    {{ post?.text }}
                </p>
            </div>
        </div>
        <div class="post__engage__comment" @click="showComments">
            <i class="fa-regular fa-comment"></i>
            <span>Comments</span>
        </div>
        <div v-if="comments" :key="listKey">
            <CommentsList :post-id="post.id" @update-required="refreshComments"></CommentsList>
        </div>
    </article>
</template>

<script>
    import DeleteOption from '@/components/DeleteOption.vue'
    import CommentsList from '@/components/CommentsList.vue'
    export default {

        name: 'PostComponent',
        components: {
            DeleteOption,
            CommentsList
        },
        props: {
            post: {
                type: Object,
                required: true
            },
            profile: { type: Object }
        },
        emits: [
            'update-required'
        ],
        data() {
            return {
                comments: false,
                listKey: +0
            }
        },
        computed: {
            profileInfo() {
                if(this.profile) {
                    return this.profile
                } else {
                    return this.post.profile
                }
            },
            date() {
                const date = new Date(this.post.createdAt);
                const now = Date.now();
                const elapsedMs = now - date;
                const formatter = new Intl.RelativeTimeFormat('en-us');
              
                let unit = '';
                let elapsed = +0;
                switch(true) {
                    //seconds
                    case (elapsedMs < 60000):
                        unit = 'seconds';
                        elapsed = Math.floor(elapsedMs / 1000);
                        break;
                    //minutes
                    case (elapsedMs > 60000 && elapsedMs < 3600000):
                        unit = 'minutes';
                        elapsed = Math.floor(elapsedMs / 60000) ;
                        break;
                    // hours
                    case (elapsedMs > 3600000 && elapsedMs < 86400000):
                        unit = 'hours';
                        elapsed = Math.floor(elapsedMs / 3600000);
                        break;
                    //days 
                    case (elapsedMs > 86400000):
                        unit = 'days'
                        elapsed = Math.floor(elapsedMs / 86400000);
                        break;
                }  
                return formatter.format(-elapsed, unit)
            },
            avatarImage() {                
                if(this.profileInfo.avatarUrl) {
                    return this.profileInfo.avatarUrl
                } else {
                    return '/user-default.png'
                }
            },
            isOwner() {
                const profile = sessionStorage.getItem('profileId')
                if(this.post.profileId === Number(profile)) {
                    return true
                } else {
                    return false
                }
            },
            unseen() {
               const allUnseen = this.$store.state.unseenPosts;
               const unseenPost = allUnseen.includes(this.post.id) ? true : false;
               return unseenPost
            }
        },
        methods: {
            showComments() {
                this.comments = !this.comments;
            },
            refreshComments() {
                this.listKey += 1;
            },
            refreshPosts() {
                this.$store.dispatch('refreshPosts');
            },
            setAsSeen(){
                if(this.unseen) {
                    setTimeout(() => {
                        this.$store.dispatch('updateUnseenPosts', this.post.id);
                    }, 1000);
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .post {
        display: flex;
        flex-direction: column;
        align-self: center;
        width: 80%;
        min-width: 240px;
        max-width: 700px;
        margin: 1.6rem auto;
        height: fit-content;
        box-shadow: 3px 2px 8px var(--netral-color);
        border-radius: 15px;
        padding: 10px 0;
        position: relative;

        &__unseen {
            position: absolute;
            top: -.3rem;
            left: 0;
            background-color: var(--prim-color);
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }

        &__info {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            & a {
                text-decoration: none;
                display: flex;
                flex-direction: row;
                color: inherit;

                &:visited {
                    color: inherit;
                }
            }
    
            &__avatar {
                border-radius: 50%;
                height: 30px;
                width: 30px;
                background-color: white;
                overflow: hidden;
                margin-left: 10px;
                & img {
                    width: 100%;
                    object-fit: cover;
                }
            }

            &__data {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                max-width: 100%;
                flex-grow: 1;
                margin-left: 5px;
            }

            &__username {
                font-weight: bold;
                padding-left: 5px;
            }

            &__date {
                font-size: .8em;
                font-style: italic;
                color: var(--netral-color);
                padding-left: 5px;
            }
        }

        &__content {
            display: block;
            margin-top: 5px;
            margin-left: 20px;
            border-left: solid 3px var(--prim-color);
            padding: 5px 10px;
            text-align: left;

            &__image {
                width: 100%;
                max-height: 400px;
                border-radius: 10px;
                overflow: hidden;
                display: flex;
                justify-content: space-around;
                
                & img {
                    object-fit: scale-down;
                    max-width: 100%;
                    background-color: white;
                    border-radius: 15px;
                }
            }

            &__text {
                margin: 5px 0;
                display: flex;
            }
        }
        &__engage__comment {
            margin: 10px;
            text-align: start;
            cursor: pointer;

            & > * {
                padding-left: 6px;
            }
        }
    }
</style>