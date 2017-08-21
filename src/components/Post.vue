<template>
    <section class="main-content main-content--post">
        <h1>{{ title }}</h1>
        <div>{{ teaser }}</div>
    </section>
</template>

<script>
export default {
    name: 'post',
    data () {
        return {
        }
    },
    props: ['id', 'title', 'body', 'teaser']
}
</script>