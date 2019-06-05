<template>
<div class="source-modal">
  <div class="modal">
    <div class="modal-header">
      <div class="title">Enter your commits</div>
      <button
        v-show="commits"
        class="close"
        @click="close"
      >
        Close
      </button>
      <p
        v-show="value && !commits"
        class="error"
      >
        Invalid Source
      </p>
      <a
        v-show="!value"
        class="link"
        href="https://scrapbox.io/help-jp/削除したページの一部を履歴から復活させる"
        target="_blank"
        rel="noopener"
      >
        How do I get commits?
      </a>
    </div>
    <div class="main">
      <textarea
        :class="{'source-field': true, '-correct': !!commits}"
        placeholder='{ "commits": [...] }'
        v-model="localValue"
      ></textareaclass="source-field">
    </div>
  </div>
  <div class="background"></div>
</div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Model, Vue } from 'vue-property-decorator';
import { IScrapboxCommit } from '../types/Scrapbox';

@Component
export default class SourceModal extends Vue {
  /**コミットのソース */
  @Model('input', { type: String, required: true })
  value: string;
  /** コミットデータ */
  @Prop({ type: Array })
  commits?: IScrapboxCommit[];

  get localValue(): string {
    return this.value;
  }

  set localValue(value: string) {
    this.input(value);
  }

  @Emit() input(value: string) {}

  @Emit() close() {}
}
</script>

<style lang="sass" scoped>
.source-modal
  & > .modal
    position: fixed
    top: 50%
    left: 50%
    z-index: 10
    box-sizing: border-box
    display: flex
    flex-direction: column
    width: 480px
    max-width: 80vw
    height: 60vh
    padding: 0 0 20px
    background: #fff
    box-shadow: 0 1px 1px rgba(#000, 0.05), 0 5px 30px rgba(#000, 0.1)
    border: 1px solid #ddd
    border-radius: 4px
    transform: translate(-50%, -50%)

  & > .modal > .main
    flex-grow: 1

  & > .background
    position: fixed
    top: 0
    left: 0
    z-index: 9
    width: 100vw
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)

.modal-header
  &
    display: flex
    align-items: center
    height: 42px

  & > .title
    margin-left: 12px
    font-size: 14px
    font-weight: bold
    color: #363c49

  & > .link
    padding: 0 1em
    margin: 0 12px 0 auto
    font-size: 12px
    color: #39AC86

  & > .link:hover
    text-decoration: none

  & > .error
    margin: 0 12px 0 auto
    font-size: 12px
    font-weight: bold
    color: #d9534f

  & > .close
    position: relative
    width: 42px
    height: 42px
    margin-left: auto
    color: transparent
    cursor: pointer
    background: transparent
    border: none
    outline: none

  & > .close::before,
  & > .close::after
    position: absolute
    top: 50%
    left: 50%
    width: 18px
    height: 2px
    content: ''
    background: #8F9899
    border-radius: 2px
    transition: background 0.12s ease

  & > .close::before
    transform: translate(-50%, -50%) rotate(45deg)

  & > .close::after
    transform: translate(-50%, -50%) rotate(-45deg)

  & > .close:hover::before,
  & > .close:hover::after
    background: #39AC86

.source-field
  &
    box-sizing: border-box
    width: 100%
    height: 100%
    padding: 1em 24px 1em 17px
    background: transparent
    border: 0
    border-left: 7px solid #8F9899
    outline: none
    resize: none
    transition: border-color 0.12s ease

  &.-correct
    border-color: #39AC86
</style>
