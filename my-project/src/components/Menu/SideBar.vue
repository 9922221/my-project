<template>
  <div class="drawer">
    <button class="main-btn" @click.stop="showInput=true">
      Добавить закладку
    </button>
    <form name="" v-if="showInput" @submit.prevent>
      <h2><b>Добавить закладку</b></h2>
      <p><b>Название закладки:</b>
        <input v-model="newName" type="text" size="40">
      </p>
      <p><b>Ссылка:</b>
        <input v-model="newLink" type="text" size="40">
      </p>
      <p>
      <button class="form-btn" @click.stop="addBookmark" :disabled="isButtonDisabled">
        Добавить
      </button>
         <button class="form-btn" @click.stop="showInput=false" >Отмена</button>
      </p>
    </form>
  </div>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'SideBar',
  computed: {
    ...mapGetters(['getBookmarks']),
    isButtonDisabled() {
      return !!(this.newName === '' || this.newLink === '');
    },
  },
  data() {
    return {
      showInput: false,
      newName: '',
      newLink: '',
      newId: '',
    };
  },
  methods: {
    ...mapMutations(['setSelectedBookmark', 'setBookmark']),
    addBookmark() {
      const data = {
        name: this.newName,
        link: this.newLink,
        id: this.getBookmarks.length,
      };
      if (this.newName && this.newLink) {
        this.setBookmark(data);
      }
      this.newName = '';
      this.newLink = '';
    },
  },
};
</script>

<style scoped>
.drawer {
  float: left;
  width: 300px;
  background: #efefef;
  text-align: left;
  height: 100vh;
  margin-top: -60px;
}
.main-btn{
  margin: 60px 60px 90px ;
  color: #000000;
  text-decoration: none;
  user-select: none;
  background: rgb(172, 172, 172);
  padding: .7em .5em;
  outline: none;
  cursor: pointer
}
.main-btn:hover { background: rgb(141, 141, 141); }
.main-btn:active { background: rgb(134, 134, 134); }
li {
  display: block;
  margin: 10px;
}
</style>
