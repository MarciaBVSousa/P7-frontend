<template>
    <div class="mainHeader">
        <RouterLink class="mainHeader__logoIcon" to="/">
            <div class="mainHeader__logoIcon__wrapper">
                <picture>
                    <source media="(max-width: 380px)" srcset="../assets/icon.svg">
                    <img src="../assets/groupmania-white.svg" alt="Groupmania logo icon">
                </picture>
                <PostsSeenComponent v-if="unseen"/>
            </div>
        </RouterLink>
        <div class="mainHeader__post">
            <RouterLink to="/post">
                <span>Post</span>
                <i class="fa-solid fa-pen-to-square"></i>
            </RouterLink>
        </div>
        <div @click="profileMenu" class="mainHeader__avatar">
            <img alt="User avatar" :src="avatarImage"/>
        </div>
    </div>
    <MenuProfile v-show="this.profileMenuShow"></MenuProfile>
</template>

<script>
    import MenuProfile from '@/components/MenuProfile.vue'
    import PostsSeenComponent from '@/components/PostsSeenComponent.vue';

    export default {
        name: 'HomeHeader',
        
        components: {
            MenuProfile,
            PostsSeenComponent
        },
        data() {
            return {
                profileMenuShow: false,
                avatarImage: ''
            }
        },
        computed: {
            unseen() {
               return this.$store.getters.unseenPostsCounter
            }
        },
        methods: {
            profileMenu() {
                this.profileMenuShow = !this.profileMenuShow;
            }
        },
        beforeMount() {
            const avatar = sessionStorage.getItem('avatarUrl');
            if(avatar) {
                this.avatarImage = avatar;
            } else {
                this.avatarImage = '/user-default.png';
            }
        }
    }
</script>


<style scoped lang="scss">
    .mainHeader {
        position: fixed;
        top: 0;

        display: flex;;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #0F2140;
        color: white;
        height: 60px;
        width: 100%;
        z-index: 1;

        &__menu-bar {
            margin-left: 15px;
            font-size: 1.3rem;
            &:hover, &:focus {
                color: #D14C56;
                outline: #D14C56 solid 3px;
                outline-offset: 3px;
            }
        }

        &__logoIcon {
            height: 30px;
            color: white;
            width: 100%;
            
            &__wrapper {
                position: relative;
                max-width: fit-content;
                margin: auto;
                height: 100%;
            }

            & img {
                height: 30px;
                padding: 0 10px;

                &:hover, &:focus {
                    outline: #D14C56 solid 3px;
                    outline-offset: 3px;
                    border-radius: 5px;
                }
            }

            @media (max-width: 380px) {
                height: 50px;
                width: 50px;
                padding: 10px;

                & img {
                    margin: 5px;
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                }
            }
        }

        &__post {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            height: 25px;
            min-width: 70px;
            background-color: #4294ff;
            margin: 0 5px;
            cursor: pointer;

            & span {
                margin: 6px 3px 6px 6px;
            }

            & i {
                display: inline-block;
                margin: 6px 6px 6px 3px;
            }

            & a {
                color: white;
                text-decoration: none;
                &:hover, &:focus {
                    color: #0F2140;
                }
            }

            &:hover, &:focus {
                outline: #D14C56 solid 3px;
                outline-offset: 3px;
            }
        }

        &__avatar {
            height: 35px;
            width: 35px;
            border-radius: 50%;
            margin-right: 15px;
            margin-left: 5px;
            background-color: white;
            overflow: hidden;
            flex-shrink: 0;
            cursor: pointer;

            & img {
                width: 100%;
                object-fit: cover;
            }

            &:hover, &:focus {
                outline: #D14C56 solid 3px;
                outline-offset: 3px;
            }
        }
    }
    .bodyDiv {
        display: flex;
        flex-direction: row;
        height: fit-content;
    }
</style>