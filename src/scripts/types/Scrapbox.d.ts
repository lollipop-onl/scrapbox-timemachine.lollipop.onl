export interface IScrapboxCommits {
  commits: IScrapboxCommit[];
}

export interface IScrapboxCommit {
  id: string;
  kind: 'page';
  changes: TScrapboxChange[];
  parentId: string | null;
  pageId: string;
  userId: string;
  created: number;
}

type TScrapboxChange = IScrapboxChangeTitle | IScrapboxChangeLinks | IScrapboxChangeDescriptions | IScrapboxChangeUpdateLines | IScrapboxChangeInsertLines;

interface IScrapboxChangeTitle {
  title: string;
  titleLc: string;
}

interface IScrapboxChangeLinks {
  links: string[];
  linksLc: string[];
}

interface IScrapboxChangeDescriptions {
  descriptions: string[];
}

interface IScrapboxChangeUpdateLines {
  lines: {
    origText: string;
    text: string;
  };
  _update: string;
}

interface IScrapboxChangeInsertLines {
  lines: {
    id: string;
    text: string;
  };
  _insert: string;
}

interface IScrapboxChangeDeleteLines {
  lines: {
    origText: string;
  };
  _delete: string;
}
