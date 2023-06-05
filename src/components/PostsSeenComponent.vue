<template>
    <div class="unseen__container">
        <span class="unseen__counter">
            {{ customCounter }}
        </span>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'PostsSeenComponent',
        computed: {
            ...mapGetters([
                'unseenPostsCounter'
            ]),
            customCounter() {
                if(this.unseenPostsCounter >= 10) {
                    return '9+'
                } else {
                    return this.unseenPostsCounter
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .unseen {
        &__container {
            border-radius: 10px;
            background-color: var(--prim-color);
            color: white;

            box-sizing: border-box;
            min-width: 2rem;
            width: fit-content;
            line-height: 1.1rem;
            height: 1.1rem;
            
            position: absolute;
            bottom: 0px;
            left: 0;

            display: flex;
            justify-content: center;

            @media (min-width: 380px) {
                bottom: -10px;
            }
        }

        &__counter {
            font-size: .8rem;
        }
    }
</style>