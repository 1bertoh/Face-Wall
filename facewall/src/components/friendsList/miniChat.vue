<template>
    <div id="chatWindow">
        <v-toolbar dense color="primary">
            <v-toolbar-title>
                Fulano
            </v-toolbar-title>
            </v-toolbar>
        <v-container  >
            <div id="chatbox">

            </div>
        </v-container>
            
    </div>
</template>

<script>

export default {
    name: 'miniChat',
    props: ['oi'],
    data() { },
    methods: {
        
    }
}
</script>
<style lang="">
    #chatWindow {

right: 1em;
position: relative ;
border: 1px solid black;
height: 22em;
width:15.5em ;
background-color: hotpink;
}
#chatbox{
    
    border: 1px solid black;
    height: 40vh;

}
</style>
