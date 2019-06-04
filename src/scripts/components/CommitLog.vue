<template>
  <div class="commit-log">
    <div class="header">{{commits.length}} commits</div>
    <div class="list">
      <template v-for="({ date, commits }, i) in groupedCommits">
        <ul :key="date.unix()">
          <li
            class="commit-date"
          >{{date.format('YYYY/MM/DD')}}</li>
          <li
            v-for="(commit, j) in commits"
            :class="{
              'commit-item': true,
              '-active': localCommitId ? localCommitId === commit.id : i === 0 && j === 0
            }"
            :key="commit.id"
            @click="localCommitId = commit.id"
          >
            <div class="id">{{commit.id}}</div>
            <div class="timestamp">at {{ commit.created | dayjs }}</div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from 'vue-property-decorator';
import dayjs from 'dayjs';
import { IScrapboxCommit } from '../types/Scrapbox';

@Component({
  filters: {
    dayjs(value): string {
      return dayjs(value * 1000).format('HH:mm:ss')
    }
  }
})
export default class  extends Vue {
  /** コミット一覧 */
  @Prop({ type: Array, required: true })
  commits: IScrapboxCommit[];
  /**選択中のCommitId */
  @Model('change', { type: String })
  commitId: string | void;

  get localCommitId(): string | void {
    return this.commitId;
  }

  set localCommitId(commitId: string | void) {
    this.$emit('change', commitId);
  }

  get groupedCommits() {
    let groupedCommits: { date: dayjs.Dayjs, commits: IScrapboxCommit[] }[] = [];
    let currentDate: dayjs.Dayjs | null = null;

    this.commits.slice().reverse().forEach((commit) => {
      const { created } = commit;
      const d = dayjs(created * 1000);

      if (!currentDate || !currentDate.isSame(d, 'date')) {
        currentDate = d;

        groupedCommits.push({
          date: d,
          commits: [commit]
        });

        return;
      }

      groupedCommits = groupedCommits.map(({ date, commits }) => {
        if (!date.isSame(d, 'date')) return { date, commits };

        return {
          date,
          commits: commits.concat(commit)
        };
      });
    });

    return groupedCommits;
  }
}
</script>

<style lang="sass" scoped>
.commit-log
  &
    box-sizing: border-box
    display: flex
    flex-direction: column
    background: #fff
    border-top-right-radius: 4px
    border-top-left-radius: 4px

  & > .header
    padding: 20px 0 12px
    margin: 0 12px
    font-size: 12px
    text-align: right
    border-bottom: 1px solid #eee

  & > .list
    flex-grow: 1
    padding: 0 12px 50%
    overflow-y: scroll

.commit-date
  &
    position: relative
    padding: 8px 0 8px 18px
    margin-top: 8px
    font-size: 11px

  &::before
    position: absolute
    top: 50%
    left: 6px
    width: 6px
    height: 2px
    content: ''
    background: #309E73
    transition: all .12s ease
    transform: translate(-50%, -50%)

  &::after
    position: absolute
    top: 50%
    left: 6px
    width: 2px
    height: 150%
    content: ''
    background: #309E73
    transform: translateX(-50%)

.commit-item
  &
    position: relative
    padding: 8px 0 8px 18px
    color: #666
    cursor: pointer

  &.-active,
  &:hover
    color: #333

  &::before
    position: absolute
    top: 50%
    left: 6px
    width: 6px
    height: 6px
    content: ''
    background: #309E73
    transition: all .12s ease
    transform: translate(-50%, -50%) rotate(45deg)

  &:hover::before
    width: 8px
    height: 8px
    border-radius: 50%

  &.-active::before
    width: 12px
    height: 12px
    border-radius: 50%

  &:not(:last-child)::after
    position: absolute
    top: 50%
    left: 6px
    width: 2px
    height: 100%
    content: ''
    background: #309E73
    transform: translateX(-50%)

  & > .id
    margin-bottom: 8px
    overflow: hidden
    font-size: 16px
    white-space: nowrap
    text-overflow: ellipsis

  &.-active > .id
    font-weight: bold

  & > .timestamp
    font-size: 10px
    opacity: 0.7
</style>
