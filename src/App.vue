<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/global-style.scss';
html,body,#app{
  width: 100%;
  height: 100%;
}
html{
  touch-action: none;
}
*{box-sizing: border-box;}
.page{
  position: absolute;
  top: 0.94rem;
  bottom: 0;
  width: 100%;
  background: $background-color;
  overflow: hidden;
  &.subpage{
    top: 0;
  }
}
@keyframes fly-in{
  0%{
    transform-origin: right bottom;
    transform: rotate(60deg) translateX(100%);
  }
  100%{
    transform-origin: right bottom;
    transform: rotate(0deg) translateX(0);
  }
}
.fly-in{
  animation: fly-in 300ms ease-in;
}
.fly-out{
  animation: fly-in 300ms ease-in reverse;
}
</style>
