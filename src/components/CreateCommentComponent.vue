<template>
    <div class="comment">
        <form class="comment__form" @submit.prevent="onSubmit">
            <div class="comment__form__avatar">
                <img :src="avatarImage" alt="user avatar">
            </div>
            <div class="comment__form__text">
                <textarea rows="2" minlength="1" maxlength="255" v-model="comment.text" placeholder="Leave your comment"></textarea>
            </div>
            <button type="submit">Comment</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'CreateCommentComponent',
        props: {
            postId: {
                type: Number,
                required: true
            }
        },
        emits: [
            'comment-added'
        ],
        data() {
            return {
                comment: {
                    text: '',
                    profileId: +0,
                    postId: +0,
                }
            }
        },
        computed: {
            avatarImage() {
                const avatar = sessionStorage.getItem('avatarUrl');
                if(avatar) {
                    return avatar
                } else {
                    return '../user-default.png'
                }
            }
        },
        methods: {
            commentAdded() {
                this.comment.text = '';
                this.$emit('comment-added');
            },
            onSubmit() {
                const url = this.$store.state.API + 'comment';
                const authTk =  sessionStorage.getItem('auth');
                const headers = {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer' + ' ' + authTk
                };

                const profileId = sessionStorage.getItem('profileId');
                this.comment.profileId = Number(profileId);
                this.comment.postId = this.postId;

                const commentToString = JSON.stringify(this.comment);
                
                fetch(url, { 
                    method: 'POST',
                    headers: headers,
                    body: commentToString
                })
                .then(res => {
                  if(res.ok) {
                    return res.json();
                  } else {
                    throw res.status;
                  }
                })
                .then(() => {
                    this.commentAdded();
                })
                .catch(() => {
                    throw new Error('Could not register comment.')
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .comment {
        margin: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        box-shadow: 0px 1px 3px var(--netral-color);
        border-radius: 5px;
        & .comment__form {
            display: flex;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            margin: 15px 15px;
            width: 100%;
            &__avatar {
                display: block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: white;
                overflow: hidden;
                flex-basis: auto;
                flex-shrink: 0;
                & img {
                    width: 100%;
                    object-fit: cover;
                }
            }
            &__text {
                padding: 0 10px;
                flex-grow: 2;
                max-width: 100%;
                & textarea {
                    width: 100%;
                }
            }
        }
    }
</style>