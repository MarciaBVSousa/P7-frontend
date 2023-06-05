<template>
    <div class="message__container">
        <p>{{ errorMessage }}</p>
    </div>
</template>

<script>
export default {
    name: 'ErrorMessage',
    props: {
        errorMessage: {
            type: String
        }
    }
}
</script>

<style scoped lang="scss">
    .message__container {
        padding: 0;
        margin: 0;
        
        & p {
            color: var(--prim-color);
            margin: 0;
            padding: 0;
            font-size: .9rem;
        }
    }
</style>