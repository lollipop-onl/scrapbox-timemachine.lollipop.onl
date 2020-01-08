<template>
  <div class="page-app">
    <TheNavbar
      :source-empty="!commits"
      @open-modal="isShowSourceModal = true"
    ></TheNavbar>
    <div class="container" :class="{ '-inactive': isShowSourceModal }">
      <CommitLog
        class="log"
        v-if="commits"
        v-model="currentCommit"
        :commits="commits"
      ></CommitLog>
      <div
        class="scrapbox-preview"
        v-if="commits"
      >
        <textarea
          readonly
          id="sourceField"
          class="field"
          :value="docs"
        ></textareareadonly>
      </div>
    </div>
    <TheDrawer
      @open-modal="isShowSourceModal = true"
    >
      <CommitLog
        class="log"
        v-if="commits"
        v-model="currentCommit"
        :commits="commits"
      ></CommitLog>
    </TheDrawer>
    <transition name="modal">
      <SourceModal
        v-if="isShowSourceModal"
        v-model="sourceCommits"
        :commits="commits"
        @close="closeSourceModal"
      ></SourceModal>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import TheNavbar from './components/TheNavbar.vue';
import TheDrawer from './components/TheDrawer.vue';
import CommitLog from './components/CommitLog.vue';
import SourceModal from './components/SouceModal.vue';
import { IScrapboxCommit } from './types/Scrapbox';
import { restorePost } from './utils';

const STORAGE_KEY = 'sbtm_source';

@Component({
  components: {
    TheNavbar,
    TheDrawer,
    CommitLog,
    SourceModal
  }
})
export default class App extends Vue {
  isShowSourceModal = true;
  sourceCommits = localStorage.getItem(STORAGE_KEY) || '';
  currentCommit = '';

  get commits(): IScrapboxCommit[] | void {
    try {
      const parsedCommts = JSON.parse(this.sourceCommits);

      if (typeof parsedCommts !== 'object') return;
      if (!Array.isArray(parsedCommts.commits)) return;

      return parsedCommts.commits
    } catch (err) {
      return;
    }
  }

  get docs(): string {
    if (!this.commits) return '';

    let texts: {id:string,text:string}[] = [];

    return restorePost(this.commits, this.currentCommit);
  }

  @Watch('sourceCommits')
  onChangeSourceCommits(): void {
    this.currentCommit = '';
    localStorage.setItem(STORAGE_KEY, this.sourceCommits);
  }

  created(): void {
    this.closeSourceModal();
  }

  mounted(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize(): void {
    const vh = window.innerHeight * 0.01;
    const { documentElement } = document;

    if (documentElement instanceof HTMLElement) {
      documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }

  closeSourceModal(): void {
    if (!this.commits) return;

    this.isShowSourceModal = false
  }
}
</script>

<style lang="sass" scoped>
@import '/styles/vars.sass'

.page-app
  &
    display: flex
    flex-direction: column
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)

  & > .container
    display: flex
    align-items: stretch
    flex-grow: 1
    width: calc(100% - 60px)
    max-width: $container-width
    height: 100%
    margin: 20px auto 0

    @media ($sp)
      width: calc(100% - 40px)

  & > .container.-inactive
    opacity: 0.5
    transition: opacity 0.12s ease

  & > .container > .log
    flex-shrink: 0
    width: 280px
    height: 100%

    @media ($sp)
      display: none

.scrapbox-preview
  &
    position: relative
    flex-grow: 1
    margin: 0 0 20px 20px
    background: #fff
    box-shadow: 0 4px 0 rgba(#000, 0.16)
    border-top-left-radius: 4px
    border-top-right-radius: 4px
    border-bottom-left-radius: 3px
    border-bottom-right-radius: 3px

    @media ($sp)
      margin-left: 0

  &::before
    position: absolute
    top: 42px
    bottom: 42px
    left: 0
    width: 7px
    content: ''
    background: #8f9899

  & > .field
    box-sizing: border-box
    width: 100%
    height: 100%
    padding: 42px 49px
    font-size: 15px
    line-height: 28px
    color: #4a4a4a
    resize: none
    background: transparent
    border: none
    outline: none

.modal-enter-active,
.modal-leave-active
  &
    z-index: 10
    transition: opacity 0.12s ease

.modal-enter,
.modal-leave-to
  &
    opacity: 0
</style>
