<template>
    <article class="post">
        <h2>What would you like to share?</h2>
        <form class="post__content" @submit.prevent="onSubmit">
            <label for="image">
                <div v-if="uploadedFile" class="post__content__image">
                    <img class="post__content__img" :src="previewUrl" alt="Image posted by user">
                </div>
                <div v-else class="post__content__noImage">
                    <i class="fa-solid fa-image"></i>
                </div>
            </label>
            <div class="form__error" v-if="errorMessage">
                    <ErrorMessage :error-message="errorMessage"/>
                </div>
            <div>
                <input id="image" type="file" name="image" @change="uploadImage">
            </div>
            <div class="post__content__text">
                <textarea name="text" rows="5" placeholder="What would you like to share?" v-model="post.text"></textarea>
            </div>
            <button type="submit">Post</button>
        </form>

    </article>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessageComponent.vue'
    export default {
        name: 'CreatePost',
        components: {
            ErrorMessage
        },
        data() {
            return {
                uploadedFile: null,
                post: {
                    text: '',
                    profileId: ''
                },
                isOwner: false,
                errorMessage: ''
            }
        },
        computed: {
            previewUrl() {
                if(this.uploadedFile) {
                    const url = URL.createObjectURL(this.uploadedFile);
                    return url
                } else {
                    return null
                }
            }
        },
        methods: {
            validFileType(file) {
                const fileTypes = [
                  "image/gif",
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                ];
              return fileTypes.includes(file.type);
            },
            uploadImage() {
                const fileInput = document.querySelector("#image");
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
                const url = this.$store.state.API + 'post';
                const authTk =  sessionStorage.getItem('auth');
                const authorization = 'Bearer' + ' ' + authTk;
                const headers = { authorization };

                const profileId = sessionStorage.getItem('profileId');
                this.post.profileId = Number(profileId);
                const postString = JSON.stringify(this.post);

                let post;
                if(this.uploadedFile) {
                    post = new FormData();
                    post.append('post', postString);
                    post.append('image', this.uploadedFile);
                } else {
                    post = postString;
                    headers['Content-Type'] = 'application/json';
                }

                fetch(url, { 
                    method: 'POST',
                    headers: headers,
                    body: post
                })
                .then(res => {
                  if(res.ok) {
                    return res.json();
                  } else {
                    throw res.status;
                  }
                })
                .then(() => {
                    this.$router.push({ name: 'home'});
                })
                .catch(() => {
                    throw new Error('Could not create post.')
                });
            },
        },  
    }
</script>

<style scoped lang="scss">
    .post {
        margin: auto;
        display: flex;
        flex-direction: column;
        width: 70%;
        min-width: 280px;
        box-shadow: 2px 3px 8px var(--netral-color);
        border-radius: 15px;
        padding: 10px;
        max-width: 600px;

        &__content {
            border: none;
            padding: 5px 10px;
            text-align: left;
            & > * {
                margin: 10px 0px;
            }
            &__image {
                height: 250px;
                width: 100%;
                background-color: white;
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
            & input {
                opacity: 0;
                height: 0;
            }
            &__noImage {
                background-color: var(--netral-color);
                border-radius: 10px;
                height: 250px;
                font-size: 60px;
                color: var(--sec-color);
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all ease-in-out .2s;
                
                &:hover, &:focus {
                    outline: var(--prim-color) solid 3px;
                    outline-offset: .2rem;
                    font-weight: bold;
                    color: var(--prim-color);
                    background-color: lighten(#AEAEAE, 10%);
                }
            }
            &__text {
                border-radius: 10px;
            }
            &__text textarea {
                width: 98%;
                height: 100px;
                border-radius: 10px;
                transition: all ease-in-out .2s;
                &:hover, &:focus {
                    outline: var(--prim-color) solid 3px;
                    outline-offset: .2em;
                    font-weight: bold;
                }
            }
            & button {
                display: block;
                background-color: var(--sec-color);
                color: white;
                padding: 5px 10px;
                width: 40%;
                min-width: 100px;
                border-radius: 10px;
                margin-left: auto;
                margin-right: auto;
                transition: all ease-in-out .2s;

                &:hover, &:focus {
                    outline: var(--prim-color) solid 3px;
                    outline-offset: .2em;
                    font-weight: bold;
                }
            }
        }
    }
</style>