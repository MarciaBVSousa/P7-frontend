<template>
    <h1> Signup </h1>
    <form class="form" id="form" @submit.prevent="onSubmit">
       <label for="user">Username</label>
       <input id="user" name="user" type="email" required="true" v-model="email">

       <label for="pw">Password</label>
       <input id="pw" name="user" type="password" required="true" v-model="password">

       <label for="confirm-pw">Confirm Password</label>
       <input id="confirm-pw" name="user" type="password" required="true" v-model="confirmPw">
       
       <button type="submit">Submit</button>
       <div class="form__error" v-if="errorMessage">
            <ErrorMessage :error-message="errorMessage"/>
        </div>
    </form>

    <div class="form-link">
        <span>Already have an account?</span>
        <router-link to="/login">Login here</router-link>
    </div>
</template>

<script>
    import ErrorMessage from '@/components/ErrorMessageComponent.vue'
    export default {
        name: 'SignupForm',
        components: {
            ErrorMessage
        },
        data() {
            return {
                email: '',
                password: '',
                confirmPw:'',
                errorMessage: ''
            }
        },
        methods: {
            onSubmit() {
                if(!this.password || this.password !== this.confirmPw ) {
                    this.errorMessage = 'Invalid passwords';
                    return
                }

                let user = {
                    email: this.email,
                    password: this.password
                };
                const url = this.$store.state.API + 'auth/signup';

                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user), 
                })
                .then(res => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            throw data;
                        })
                    }
                })
                .then(() => {
                    this.$router.push({ name: 'login' });
                })
                .catch(err => {
                    this.errorMessage = err.error;
                });
                
            }
        },
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