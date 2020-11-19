<template>
  <div class="home">
   <Container :title="'便签'">
    <Main slot="main"/>
   </Container>
  </div>
</template>

<script>
// @ is an alias to /src
import Container from '@/components/container/Container';
import Main from './main/Main';
import dateFormart from '@/utils/dateFormat';

export default {
  name: 'Todo',
  components: {
    Container,
    Main
  },
  methods: {
    created() {
      dateFormat();
    },
  },
}
</script>
