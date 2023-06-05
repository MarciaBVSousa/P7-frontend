<template>
    <div class="profileMenu">
        <ul>
            <li><router-link :to="'/profile/' + profileId">My Profile</router-link></li>
            <li><router-link to="/account">Account</router-link></li>
            <li @click="logout">Logout</li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'MenuProfile',
        computed: {
            profileId: () => {
                return sessionStorage.getItem('profileId')
            }

        },
        methods: {
            logout() {
                sessionStorage.clear();
                this.$router.replace({ name: 'login' });
            }
        }
    }
</script>

<style lang="scss">
    .profileMenu {
        padding: 0;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border: solid 2px var(--sec-color);
        border-top: none;
        box-shadow: 3px 3px var(--netral-color);
        background-color: white;
        width: 8rem;
        z-index: 1;
        position: fixed;
        right: 5px;
        top: 60px;


        & a, a:visited {
            text-decoration: none;
            color: inherit;
        }

        & ul {
            list-style: none;
            padding: 20px;
            margin: 0;
            font-size: 1rem;

            & li {
                padding: 5px 0px;

                &:focus, &:hover {
                    color: var(--prim-color);
                    text-decoration: underline 2px var(--sec-color);
                    font-weight: bold;
                }
            }
        }
    }
</style>