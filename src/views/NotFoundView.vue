<template>
    <div class="notFound__bg">
        <div class="notFound">
            <div class="notFound__image">
                <img alt="Page not found" src="../assets/erro-404.png">
            </div>
            <div class="notFound__text">
                <h1>Page not found!</h1>
                <p>We're sorry!</p>
                <p>The page you requested could not be found.</p>
            </div>
            <RouterLink to="/">
                Take me out of here!
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss">
.notFound {
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    max-width: 600px;
    margin: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 3px 3px var(--netral-color);
    opacity: 1;

    &__text {
        & h1 {
            color:var(--sec-color);
        }

        & p {
            color: var(--netral-color);
        }
    }

    &__image {
        width: 30%;
        min-width: 240px;
        height: fit-content;
        max-height: 300px;
        
        & img {
            max-width: 100%;
            object-fit: scale-down;
        }
    }

    & a {
        font-size: 1.1rem;
        text-decoration: none;
        width: 40%;
        min-width: 120px;
        background-color: var(--sec-color);
        color: white;
        margin: 20px;
        padding: 10px;
        border-radius: 15px;
        cursor: pointer;
    }

    &__bg {
        $neutral-color: #AEAEAE;
        background-color: lighten($neutral-color, 20%);
        background-image: url('@/assets/ghost-404.png');
        background-repeat: repeat;
        background-blend-mode: luminosity;
        background-size: 14%;
    }
}

</style>