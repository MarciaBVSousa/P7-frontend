<template>
    <div class="profile">
        <div class="profile__info">
            <div class="profile__info__wrapper">
                <div class="profile__info__avatar">
                    <img :src="avatarImage" alt="user avatar">
                </div>
                <div class="profile__info__employee">
                    <span class="profile__info__employee__username">
                             {{ profile.name }} 
                        </span>
                    <span class="profile__info__employee__department">
                        {{ profile?.department }}
                    </span>
                </div>
            </div>
            <div v-if="isOwner" class="profile__edit">
                <RouterLink to="/account">
                    <i class="fa-solid fa-user-pen"></i>
                </RouterLink>
            </div>
        </div>
        <div class="profile__about">
            <p>
                {{ profile?.about }}
            </p>
        </div>
        <div>
            <PostsList :profile-id="profileId" :profile="profileInfo" :key="postsKey" />
        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import PostsList from '@/components/PostsList.vue'

    export default {
        name: 'ProfileComponent',
        components: {
            PostsList
        },

        data() {
            return {
                profile: {}
            }
        },
        computed: {
            avatarImage() {
                if(this.profile.avatarUrl) {
                    return this.profile.avatarUrl
                } else {
                    return '/user-default.png'
                }
            },
            profileId() {
                const profileId = this.$route.params.id;
                return profileId
            },
            profileInfo() {
                return {
                    id: this.profile.id,
                    name: this.profile.name,
                    avatarUrl: this.profile.avatarUrl
                }
            },
            postsKey() {
                return this.$store.state.postsKey;
            },
            isOwner() {
                const profile = sessionStorage.getItem('profileId');
                if(this.profile.id === Number(profile)) {
                    return true
                } else {
                    return false
                }
            }
        },

        created() {
            const store = useStore();
            const url = store.state.API;
            const token = sessionStorage.getItem('auth');
            const headers = { 'authorization': 'Bearer ' + token };
            
            fetch( url + 'profile/' + this.profileId, { headers } )
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Request failed!')
                } else {
                    return res.json();
                }
            })
            .then((response) => {
                return Object.assign(this.profile, response);
            })
            .catch(() => {
                throw new Error('Profile error!')
            })
        }
    }
</script>

<style scoped lang="scss">
    .profile {
        margin: auto;
        width: 80%;
        max-width: 800px;

        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 3px 6px var(--netral-color);
        border-radius: 15px;
        
        &__info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 15px 15px 0px;

            &__wrapper {
               display: flex;
               flex-direction: row;
               justify-content: left; 
            }

            &__avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: var(--netral-color);
                flex-shrink: 0;
                overflow: hidden;

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
                justify-content: center;

                &__username {
                    font-weight: bold;
                    font-size: 1.2em;
                    max-width: 100%;
                }

                &__department {
                    font-size: .9em;
                    font-style: italic;
                }
            }
        }
        &__about {
            text-align: left;
            padding-left: 40px;
            padding-bottom: 10px;
            box-shadow: 0px 3px 3px var(--netral-color);
            & p {
                padding-left: 20px;
                padding-right: 5px;
                font-style: italic;
                border-left: 3px solid #4294ff;
            }
        }
 
        &__edit {
            $ter-color: #4294ff;
            color: $ter-color;
            align-self: flex-start;
            top: 15px;
            right: 15px;
            font-size: 1.4em;
            padding: .1em;
            cursor: pointer;

            outline: 2px rgba(65, 184, 131, 0);
            transition: all ease-in-out .3s;

            &:hover, &:focus, &:active {
                $ter-color: #41b883;
                color: $ter-color;
                outline: $ter-color solid 3px;
                outline-offset: 2px;
                font-weight: bold;
                border-radius: 10%;
                transform: scale(1.1);
            }

            & i:hover {
                color: #41b883;
            }

            & a:visited {
                $ter-color: #4294ff;
                color: $ter-color;
            } 
        }
    }
</style>
