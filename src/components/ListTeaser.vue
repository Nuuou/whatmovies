<template>
    <div class="teaser" v-bind:data-id="id">
        <span class="name">{{ name }}</span>
    </div>
</template>

<script>
export default {
    name: 'ListTeaser',
    data () {
        return {
        }
    },
    props: ['id', 'name', 'timestamp']
}
</script>