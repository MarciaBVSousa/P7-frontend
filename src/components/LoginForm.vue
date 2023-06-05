<template>
    <h1> Login </h1>
    <form class="form" id="form" @submit.prevent="onSubmit">
        <label for="user">Email</label> 
        <input id="user" name="user" type="email" required="true" v-model="email">
           
        <label for="pw">Password</label>
        <input id="pw" name="user" type="password" required="true" v-model="password">

        <button class="form__btn" type="submit">Submit</button>
        <div class="form__error" v-if="errorMessage">
            <ErrorMessage :error-message="errorMessage"/>
        </div>
    </form>

    <div class="form-link">
        <span>Don't have an account?</span>
        <router-link to="/signup">Sign up here</router-link>
    </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessageComponent.vue'
export default {
    name: 'LoginForm',
    components: {
        ErrorMessage
    },
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        onSubmit() {
            let user = {
                email: this.email,
                password: this.password
            };
            const url = this.$store.state.API + 'auth/login';
            
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user), 
            })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        throw data;
                    })
                }
            })
            .then((data) => { 
                sessionStorage.setItem('auth', data.token);
                sessionStorage.setItem('profileId', data.profileId);
                this.$store.dispatch('setProfileAvatar', data.profileId);
            
            })
            .then(() => {
                setTimeout(() => {
                    this.$router.push({ name: 'home' });
                }, 500);
            })
            .catch(err => {
                this.errorMessage = err.error;
            });
            
        }
    }
}
</script>

<style scoped lang="scss">
    .form {
        margin: auto;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        max-width: 600px;
        width: 100%;
        background-color: white;

        & button {
            background-color: var(--sec-color);
            color: white;
            font-weight: bold;
            margin: 20px 0;
            width: 50%;
            font-size: 1rem;

            &:hover, &:focus {
                outline: var(--prim-color) solid 3px;
                outline-offset: 3px;
            }
        }
        & input, button {
            height: 30px;
            width: 90%;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        &__error {
            margin-bottom: 15px;
        }
    }
    .form-link {
        display: flex;
        flex-direction: column;

        & a {
            color: var(--ter-color);
            &:visited {
                color: var(--ter-color);
            }
        }
    }
</style>