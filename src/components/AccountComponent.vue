<template>
    <form id="accountForm" class="card card__form" @submit.prevent="onSubmit">
        <div class="avatar__input">
            <label class="avatar__label" for="avatar">
                <span>Avatar</span>
                <input id="avatar" name="image" type="file" accept="image/png, image/jpeg, image/jpg" capture="user" @change="uploadImage">
                <div class="form__error" v-if="errorMessage">
                    <ErrorMessage :error-message="errorMessage"/>
                </div>
            </label>
            <div class="avatar">
                <img id="avatarPreview" alt="User avatar" :src="previewUrl">
            </div>
        </div>

        <label for="name">Name</label> 
        <input id="name" name="name" type="text" required="true" minlength="2" maxlength="24" v-model="formProfile.name">
           
        <label for="department">Department</label>
        <input id="department" name="department" type="text" minlength="2" maxlength="24" v-model="formProfile.department">

        <label for="about">About</label>
        <input id="about" name="about" type="text" maxlength="280" v-model="formProfile.about">      

        <button id="submit" type="submit" :disabled="disableSubmit">Submit</button>
    </form>

    <div class="card card__row">
        <span>Caution! This will permanently delete all your data from Groupmania App.</span>
        <button class="button option">
            <DeleteOption class="option__delete" component="profile" :componentId="profileId" @item-deleted="deleteAccount">
                <span>
                    Delete Account
                </span>
            </DeleteOption>
        </button>
    </div>
</template>

<script>

import { useStore } from 'vuex'
import DeleteOption from '@/components/DeleteOption.vue'
import ErrorMessage from '@/components/ErrorMessageComponent.vue'

    export default {
        name: 'AccountComponent',
        components: {
            DeleteOption,
            ErrorMessage
        },
        data() {
            return {
                inicialFiels: {},
                formProfile: {},
                uploadedFile: null,
                errorMessage: '',
            }
        },
        computed: {     
            previewUrl() {
                if(this.uploadedFile) {
                    const url = URL.createObjectURL(this.uploadedFile);
                    return url
                } else {
                    if(this.formProfile.avatarUrl) {
                        return this.formProfile.avatarUrl
                    } else {
                        return '/user-default.png'
                    }
                }          
            },
            profileId() {
                return sessionStorage.getItem('profileId')
            },
            disableSubmit() {
                if(this.uploadedFile || JSON.stringify(this.inicialFiels) !== JSON.stringify(this.formProfile) ) {
                    return false
                } else {
                    return true
                }
            },
        },
        methods: {
            validFileType(file) {
                const fileTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                ];
              return fileTypes.includes(file.type);
            },
            uploadImage() {
                const fileInput = document.querySelector("#avatar");
                const file = fileInput.files[0];
                if (file && this.validFileType(file)) {
                    this.uploadedFile = file;
                    this.errorMessage = '';
                } else {
                    fileInput.value = null;
                    this.uploadedFile = null;
                    this.errorMessage = 'Invalid image type';
                }
            },
            onSubmit() {
                const url = this.$store.state.API + 'profile/' + this.profileId;
                const authTk =  window.sessionStorage.getItem('auth');
                const authorization = 'Bearer ' + authTk;
                const headers = { authorization };
                
                let profile;
                const formString = JSON.stringify(this.formProfile);

                if(this.uploadedFile) {
                    profile = new FormData();
                    profile.append('profile', formString);
                    profile.append('image', this.uploadedFile);
                } else {
                    profile = formString;
                    headers['Content-Type'] = 'application/json';
                }

                fetch(url, { 
                    method: 'PUT',
                    headers: headers,
                    body: profile
                })
                .then(res => {
                  if(res.ok) {
                    return res.json();
                  } else {
                    throw res.status;
                  }
                })
                .then(() => {
                    if(this.uploadedFile) {
                        this.$store.dispatch('setProfileAvatar', this.profileId);
                        setTimeout(() => {
                            this.$router.push({ name: 'profile', params: { id: this.profileId } });
                        }, 500);
                    } else {
                        this.$router.push({ name: 'profile', params: { id: this.profileId } });
                    }

                })
                .catch(() => {
                    throw 'Could not update profile.'
                });
            },
            deleteAccount() {
                sessionStorage.clear();
                this.$router.push({name: 'signup'});
            }
        },  
        created() {         
            const store = useStore();

            const url = store.state.API;
            const profileId = window.sessionStorage.getItem('profileId');
            const token = window.sessionStorage.getItem('auth');
            const headers = { 'authorization': 'Bearer' + ' ' + token };

            fetch( url + 'profile/' + profileId, { headers } )
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Request failed!')
                } else {
                    return res.json();
                }
            })
            .then((response) => {
                Object.assign(this.formProfile, response);
                Object.assign(this.inicialFiels, response);
                return  
            })
            .catch(() => {
                throw new Error('Profile error!')
            })

        }
    }
</script>

<style scoped lang="scss">
    .card {
        margin: auto;
        padding: 25px 0px;
        width: 70%;
        min-width: 300px;
        max-width: 700px;
        box-shadow: 0px 2px 4px var(--netral-color);
        border-radius: 15px;
        height: fit-content;
        
        &__row {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: auto;
            margin-top: 20px;
            & > * {
                padding: 20px 20px;

            }
        }
        &__form{
            margin: auto;
            & label {
                display: block;
                text-align: left;
                width: 90%;
                margin: auto;
            }
            & input, button {
                height: 30px;
                width: 90%;
                border-radius: 5px;
                margin-bottom: 15px;

                &:hover, &:focus {
                outline: var(--prim-color) solid 3px;
                }
            }
            & button {
                background-color: var(--sec-color);
                color: white;
                font-weight: bold;
                margin: 26px 0;
                font-size: 1rem;
                &:not([disabled]) {
                    opacity: 1;
                }
                &:disabled {
                    opacity: .4;
                    &:hover, &:focus {
                        outline: none;
                    }
                }

                &:hover, &:focus {
                outline: var(--prim-color) solid 3px;
                outline-offset: 3px;
                }
            }
        }
    }
    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: (var(--netral-color));
        margin: auto;
        overflow: hidden;
        flex-shrink: 0;
        & img {
            min-width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .avatar__input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        width: 90%;
        margin: auto;
        margin-top: 10px;
        & .avatar__label {
            display: flex;
            flex-direction: column;
            justify-content: baseline;

            & input {
                width: fit-content;
                height: fit-content;
                margin: 5px 0;

                &:hover, &:focus {
                    outline: var(--prim-color) solid 3px;
                    outline-offset: 3px;
                }
            }
        }
    }
    
    .button {
        border: none;
        background-color: transparent;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        display: block;
    }
    
    .option {
        &__delete {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            border-radius: 10px;
            color: white;
            padding: 8px;
            background-color: var(--prim-color);
            transition: all ease-in-out .5s;

            & > * {
                padding: 0px 5px;   
            }

            &:hover, &:focus {
                color: white;
                outline: var(--prim-color) solid 3px;
                outline-offset: .3em;
                font-weight: bold;
                transform: scale(1.1);
            }
        }
    }
</style>