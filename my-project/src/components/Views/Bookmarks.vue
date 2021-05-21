<template>
  <div>
    <side-bar></side-bar>
    <div class="table">
      <ul id="example-1">
        <li v-for="item in getBookmarks" :key="item.name">
          <button class='btn' @click="selectBookmark(item)">{{'\u{FE19}'}}</button>
          <a :href="item.link" > {{ item.name +' link/ ' + item.link }} </a>
        </li>
      </ul>
    </div>
    <div class="back-dialog" v-if="showInput">
      <div class="form">
        <form name="" v-if="showInput" @submit.prevent>
          <h2><b>Изменить закладку</b></h2>
          <p><b>Название закладки:</b>
            <input v-model="editedName" type="text" size="40">
          </p>
          <p><b>Ссылка:</b>
            <input v-model="editedLink" type="text" size="40">
          </p>
          <p>
            <button class="form-btn" @click.stop="editBookmark" :disabled="isEditButtonDisabled" >
              Изменить
            </button>
            <button class="form-btn" @click.stop="deleteBookmark" >Удалить</button>
            <button class="form-btn" @click.stop="showInput=false" >Отмена</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex';
import SideBar from '../Menu/SideBar';

export default {
  name: 'BookMark',
  computed: {
    ...mapGetters(['getBookmarks']),
    isEditButtonDisabled() {
      return !!(this.editedName === '' || this.editedLink === '');
    },
  },
  components: {
    SideBar,
  },
  data() {
    return {
      bookmarks: [],
      showInput: false,
      editedName: '',
      editedLink: '',
      editedId: '',
    };
  },
  methods: {
    ...mapMutations(['setSelectedBookmark', 'setBookmark', 'deleteSelectedBookmark']),
    clearForm() {
      this.editedName = '';
      this.editedLink = '';
      this.editedId = '';
      this.showInput = false;
    },
    selectBookmark(item) {
      this.editedName = item.name;
      this.editedLink = item.link;
      this.editedId = item.id;
      this.showInput = true;
    },
    editBookmark() {
      const data = {
        name: this.editedName,
        link: this.editedLink,
        id: this.editedId,
      };
      if (this.editedName && this.editedLink) {
        this.setSelectedBookmark(data);
      }
      this.clearForm();
    },
    deleteBookmark() {
      const data = {
        id: this.editedId,
      };
      if (this.editedId >= 0) {
        this.deleteSelectedBookmark(data);
      }
      this.clearForm();
    },
  },
};
</script>

<style scoped>
.back-dialog{
  width:100%;
  min-height:100%;
  background-color: rgba(0,0,0,0.5);
  overflow:hidden;
  position:fixed;
  top: 8px;
  margin: -8px;
}
.form {
  color: #efefef;
  width: 300px;
  position: absolute;
  left: 50%;
  top: 30%;
  margin-left: -150px;
}
.table{
  float: left;
  width: 70%;
}
.btn {
  color: #000000;
  font-size: large;
  text-decoration: none;
  user-select: none;
  background: #efefef;
  padding: .7em .5em;
  outline: none;
  border-width: 0;
  cursor: pointer
}
.btn:hover { background: rgb(139, 139, 139); }
.btn:active { background: rgb(71, 71, 71); }
li {
  background: #efefef;
  display: block;
  margin: 10px;
}
ul {
  text-align: left;
}
</style>
