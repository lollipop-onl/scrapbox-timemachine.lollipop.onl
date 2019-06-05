
import { IScrapboxCommit } from "./types/Scrapbox";

/**
 * CommitsをcommitIdまで復元する
 */
export const restorePost = (commits: IScrapboxCommit[], commitId?: string): string => {
  let docs: { id: string, text: string }[] = [];
  let title = '';

  for (const commit of commits) {
    const { id, changes } = commit;

    changes.forEach((change) => {
      if (!change) return;

      if ('title' in change) {
        title = change.title;

        return;
      }

      if ('_insert' in change) {
        const { _insert, lines } = change;

        if (_insert === '_end') {
          docs.push(lines);

          return;
        }

        const index = docs.findIndex((doc) => {
          return doc.id === _insert;
        });

        if (index === -1) {
          console.warn('This commit is invalid', change);

          return;
        }

        docs.splice(index, 0, lines);

        return;
      }

      if ('_update' in change) {
        const { _update, lines } = change;
        const { text } = lines;
        const index = docs.findIndex(({ id }) => id === _update);

        if (index === -1) return;

        docs[index] = {
          id: _update,
          text
        };

        return;
      }

      if ('_delete' in change) {
        const { _delete } = change;
        const index = docs.findIndex(({ id }) => id === _delete);

        if (index === -1) return;

        docs.splice(index, 1);

        return;
      }
    });

    if (commitId === id) break;
  }

  return [
    title,
    ...docs.map(({ text }) => text)
  ].join('\n');
}
