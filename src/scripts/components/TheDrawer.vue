<template>
  <div class="the-drawer">
    <button
      class="menu-button"
      @click="isShowDrawer = true"
    >
      <div class="bars"></div>
    </button>
    <div class="drawer-block" v-if="isShowDrawer">
      <div class="header">
        <button class="menu" @click="openModal">
            Edit Source
        </button>
        <button
          class="close"
          @click="isShowDrawer = false"
        ></button>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <div
      class="drawer-background"
      v-if="isShowDrawer"
      @click="isShowDrawer = false"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class TheDrawer extends Vue {
  isShowDrawer = false;

  @Emit()
  openModal(): void {}
}
</script>

<style lang="sass" scoped>
@import '/styles/vars.sass'

.the-drawer
  &
    @media ($pc)
      display: none

.menu-button
  &
    position: absolute
    top: 27px
    right: 20px
    width: 48px
    height: 48px
    transform: translateY(-50%)
    transition: opacity 0.12s ease

  &:hover
    opacity: 0.7

  & > .bars,
  & > .bars::before,
  & > .bars::after
    position: absolute
    z-index: 1
    display: block
    width: 28px
    height: 2px
    background: #fff
    border-radius: 2px
    left: 50%
    transform: translate(-50%, -50%)

  & > .bars::before,
  & > .bars::after
    content: ''

  & > .bars
    top: 50%

  & > .bars::before
    top: -8px

  & > .bars::after
    top: 10px

.drawer-block
  &
    position: absolute
    top: 0
    right: 0
    z-index: 1
    display: flex
    flex-direction: column
    width: 320px
    max-width: 80vw
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)
    background: #fff
    box-shadow: 0 0 40px rgba(#000, 0.12)

  & > .header
    box-sizing: border-box
    display: flex
    align-items: center
    flex-shrink: 0
    width: 100%
    height: 60px
    padding: 0 10px
    background: #313540

  & > .header > .menu
    margin-right: 12px
    font-size: 14px
    font-weight: bold
    color: #39AC86
    cursor: pointer
    background: transparent
    border: none
    outline: none
    transition: opacity 0.12s ease

  & > .header > .menu:hover
    opacity: 0.5

  & > .header > .close
    position: relative
    width: 42px
    height: 42px
    margin-left: auto
    transition: opacity 0.12s ease

  & > .header > .close:hover
    opacity: 0.7

  & > .header > .close::before,
  & > .header > .close::after
    position: absolute
    top: 50%
    left: 50%
    content: ''
    width: 24px
    height: 2px
    background: #fff
    border-radius: 2px
    transform-origin: center center

  & > .header > .close::before
    transform: translate(-50%, -50%) rotate(45deg)

  & > .header > .close::after
    transform: translate(-50%, -50%) rotate(-45deg)

  & > .content
    flex-grow: 1
    overflow-y: scroll

.drawer-background
  &
    position: absolute
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)
    background: rgba(#000, 0.12)
</style>

