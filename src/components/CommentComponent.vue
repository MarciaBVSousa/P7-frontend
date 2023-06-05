<template>
    <div class="container">
        <div class="comment">
            <div class="profile__info">
                <RouterLink :to="'/profile/' + profileInfo.id">
                    <div class="profile__info__avatar">
                        <img :src="avatarImage" alt="user avatar">
                    </div>
                    <div class="profile__info__employee">
                        <span class="profile__info__employee__username">
                            {{ profileInfo.name }} 
                        </span>
                        <span class="profile__info__employee__department">
                            {{ profileInfo?.department }}
                        </span>
                    </div>
                </RouterLink>
            </div>
            <div class="comment__text">
                <p>
                    {{ comment.text }}
                </p>
            </div>
        </div>
        <div v-if="isOwner" class="comment__edit">
            <DeleteOption component="comment" :component-id="comment.id" @item-deleted="refreshComments"/>
        </div>
    </div>
</template>

<script>
    import DeleteOption from '@/components/DeleteOption.vue'
    export default {
        name: 'CommentComponent',
        props: {
            comment: {
                type: Object,
                required: true
            }
        },
        emits: [
            'item-deleted'  
        ],
        components: {
            DeleteOption
        },

        data() {
            return {
                profileInfo: this.comment.profile,
            }
        },
        computed: {
            avatarImage() {
                if(this.profileInfo.avatarUrl) {
                    return this.profileInfo.avatarUrl
                } else {
                    return '../user-default.png'
                }
            },
            isOwner() {
                const profile = sessionStorage.getItem('profileId');
                if(this.comment.profileId === Number(profile)) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            refreshComments() {
                this.$emit('item-deleted');
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        flex-direction: row;
    }
    .comment {
        margin: auto;
        width: 100%;
        height: fit-content;
        padding: 5px 0;
        border-radius: 5px;

        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;

            & .comment__text {
                margin-left: 20px;
            }   
        }

        & .profile__info {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 15px 15px;
            
            & a {
                text-decoration: none;
                display: flex;
                flex-direction: row;

                &:visited {
                    color: inherit;
                }
            }

            &__avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: var(--netral-color);
                overflow: hidden;
                flex-shrink: 0;

                & img {
                    width: 100%;
                    object-fit: cover;
                }
            }
            &__employee {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                &__username {
                    font-weight: bold;
                    font-size: 1.1em;
                }

                &__department {
                    font-size: .8em;
                    font-style: italic;
                }
            }
        }
        &__text {
            display: block;
            flex-grow: 1;
            text-align: left;
            border-left: 3px solid var(--netral-color);
            border-radius: 5px;
            padding: 5px 10px;
            margin: 5px;
 
        }
    }
</style>
