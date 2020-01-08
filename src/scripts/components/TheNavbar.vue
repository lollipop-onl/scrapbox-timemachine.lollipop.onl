<template>
  <nav class="the-navbar">
    <div class="container">
      <h1 class="logo">
        Scrapbox TimeMachine
      </h1>
      <div class="navbar-menu">
        <template v-if="!sourceEmpty">
          <button class="menu" @click="openModal">
            Edit Source
          </button>
          <button class="menu -copy" @click="copySource">
            Copy Source
          </button>
        </template>
        <div class="version">
          v{{version}}
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import packageJson from '../../../package.json';

@Component
export default class TheNavbar extends Vue {
  /** Sourceが空かどうか */
  @Prop({ type: Boolean, default: false })
  sourceEmpty: boolean;

  /** バージョン */
  get version(): string {
    return packageJson.version;
  }

  @Emit()
  openModal(): void {}

  copySource(): void {
    const $sourceField = document.getElementById('sourceField');

    if (!$sourceField || !($sourceField instanceof HTMLTextAreaElement)) {
      return;
    }

    $sourceField.select();

    document.execCommand('copy');
  }
}
</script>

<style lang="sass" scoped>
@import '/styles/vars.sass'

.the-navbar
  &
    height: 54px
    color: #fff
    background: #353b48

  & > .container
    display: flex
    align-items: center
    justify-content: space-between
    width: calc(100% - 60px)
    max-width: $container-width
    height: 100%
    margin: 0 auto

    @media ($sp)
      width: calc(100% - 40px)

  & > .container > .logo
    font-size: 15px
    font-weight: bold

.navbar-menu
  &
    display: flex
    align-items: center

    @media ($sp)
      display: none

  & > .menu
    margin-right: 16px
    font-size: 14px
    font-weight: bold
    color: #39AC86
    cursor: pointer
    background: transparent
    border: none
    outline: none
    transition: opacity 0.12s ease

  & > .menu.-copy
    color: rgba(#ffffff, 0.7)

  & > .menu:hover
    opacity: 0.5

  & > .version
    margin-left: 8px
    font-size: 12px
    opacity: 0.7
</style>
