<template>
  <div id="head-tab">
    <div class="other"></div>
    <tab-bar>
      <tar-bar-item path="/home">
        <img slot="item-icon" src="~@/assets/img/home.png" alt="" />
        <img
          slot="item-icon-active"
          src="~@/assets/img/home_active.png"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tar-bar-item>
      <tar-bar-item path="/chatroom">
        <img slot="item-icon" src="~@/assets/img/chat.png" alt="" />
        <img
          slot="item-icon-active"
          src="~@/assets/img/chat_active.png"
          alt=""
        />
        <div slot="item-text">聊天室</div>
      </tar-bar-item>
      <!-- <tar-bar-item path="/container/board">
        <img slot="item-icon" src="~@/assets/img/board.png" alt="" />
        <img
          slot="item-icon-active"
          src="~@/assets/img/board_active.png"
          alt=""
        />
        <div slot="item-text">留言板</div>
      </tar-bar-item> -->
      <tar-bar-item path="/music">
        <img slot="item-icon" src="~@/assets/img/music.png" alt="" />
        <img
          slot="item-icon-active"
          src="~@/assets/img/music_active.png"
          alt=""
        />
        <div slot="item-text">Music</div>
      </tar-bar-item>
    </tab-bar>
    <div class="personal1" v-if="!isLogin">
      <div class="btn1">
        <button class="btn" @click="login">请先登录</button>
      </div>
    </div>
    <div class="personal" v-else>
      <div class="avator">
        <img :src="imgAddress" alt="" />
      </div>
      <div class="userInfo">
        <ul>
          <li>
            当前登录用户: <br />
            {{ username }}
          </li>
          <!-- <li><img src="~@/assets/img/info.png" alt="" /> 个人资料</li>
          <li><img src="~@/assets/img/safe.png" alt="" />账号安全</li>
          <li><img src="~@/assets/img/message.png" alt="" />我的消息</li> -->
          <li @click="loginout" class="btn"><img src="~@/assets/img/out.png" alt="" />退出登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "./tabbar/tabBar.vue";
import TarBarItem from "./tabbar/tarBarItem.vue";
export default {
  name: "HeadTab",
  data() {
    return {
      avator: 'avator.png',
      username: '',
      isLogin: false
    };
  },
  computed: {
    imgAddress() {
      return require(`@/assets/img/${this.avator}`);
    },
  },
  created() {
    this.loginWithToken();
  },
  components: {
    TabBar,
    TarBarItem,
  },
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login")
    },
    login() {
      this.$router.push("/login")
    },
    loginWithToken() {
      const tokenStr = window.sessionStorage.getItem("token");
      if (tokenStr) {
        this.isLogin = true;
        let userInfo = window.sessionStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
        this.username = userInfo.username;
      }
    }
  }
};
</script>

<style scoped lang="less">
#head-tab {
  display: flex;
  // background: url("../../assets/img/bg3.jpg");
  // background-size: 100%;  
  box-shadow: 0 0 10px 0 hsl(0deg 6% 58% / 60%);
  color: aliceblue;
}
.other {
  flex: 1;
}
.personal1 {
  flex: 1;
  height: 5rem;
  .btn1 {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .btn {
      cursor:pointer;
    }
  }
}
//个人认为最难的css来了，下拉动画annimation的实现
.personal {
  flex: 1;
  position: relative;
  height: 5rem;

  .avator {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    border: 0.066667rem solid rgba(255, 255, 255, 0.2);
    border-radius: 4.33333rem;
    overflow: hidden;
    img {
      width: 4rem;
      height: 4rem;
    }
  }
  .userInfo {
    height: 0;
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translate(-50%);
    overflow: hidden;
    z-index: 10;
    ul {
      width: 10rem;
      background-color: rgba(255, 230, 230, 0.705);
      color: var(--color-text);
      list-style: none;
      border-radius: 0.666667rem;
      overflow: hidden;
      li {
        padding: 1rem;
        font-size: 1.2rem;
        text-align: center;
        border-bottom: 0.066667rem solid #ccc;
        .btn {
          cursor: pointer;
        }
        img {
          width: 1rem;
          height: 1rem;
          vertical-align: middle;
        }
      }
      li:last-child {
        border-bottom: none;
      }
      li:hover {
        background-color: rgb(77, 69, 69);
      }
    }
  }
  .avator:hover + .userInfo {
    animation: down 1s forwards;
  }
  @keyframes down {
    0% {
      height: 0;
    }
    100% {
      height: 20rem;
    }
  }
  .userInfo:hover {
    height: 20rem;
  }
}
</style>