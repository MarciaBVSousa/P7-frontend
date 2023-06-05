<template>
    <div class="option__delete" @click="deleteItem">
        <slot></slot>
        <i class="fa-solid fa-trash"></i>
    </div>
</template>

<script>
    export default {
        name: 'DeleteOption',
        props: {
            component: {
                type: String,
                required: true
            },
            componentId: {
                type: [ Number, String ],
                required: true
            }
        },
        emits: [
            'item-deleted'
        ],
        methods: {
            deleted() {
                this.$emit('item-deleted');
            },
            deleteItem() {
                if(this.component === 'profile' && !window.confirm('Do you really want to delete your account?')){
                    return
                }
                const url = this.$store.state.API + this.component + '/' + this.componentId;
                const headers = { 'authorization': 'Bearer' + ' ' + sessionStorage.getItem('auth') };
                fetch(url, {
                    method: 'DELETE',
                    headers: headers
                })
                .then((res) => {
                    if(res.ok) {
                        return res.json()
                    } else {
                        throw res.status
                    }
                })
                .then(() => {
                    this.deleted()
                })
                .catch(() => {
                    throw new Error('Could not delete item.')
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .option__delete {
        color: var(--prim-color);
        padding: 6px;
        transition: all ease-in-out .3s;
        margin: 10px;
    
        &:hover, &:focus {
            $ter-color: var(--prim-color);
            color: $ter-color;
            outline: $ter-color solid 3px;
            font-weight: bold;
            border-radius: 10%;
            transform: scale(1.1);
        }
    }
</style>