# Editor

### 目指すところ
Notionは優れているが、
1. あくまでもKanbanツール、書き味や汎用性活かしてブログを書きたい
2. 使いもしないブロックで肥大しすぎている
3. 秀逸なDBがあるのに、グラフ出力できない、連携が弱い
4. サービスへの依存度が高い、データのバックアップが取りにくい

といった欠点が気になる。

そこで、
- 1: これは、WordPress拡張なり、Editor.jsを利用すれば良いが、サイドバーやヘッダーもブロックとしてカスタムできるようにする
- 2,3: 最小限のブロック数、高い拡張性・カスタマイズ性を目指す
- 4: (不朽の形式であろう)TeX出力を用いたバックアップが取れるようにする
  - TeXからこのEditorへの変換は行わない(体裁を整えたければTeXで行えば良い、推敲で利用できれば十分だと考える)
  - DBはCSV出力にも対応させる

ことを目指す。

### 開発計画
- [ ] 基幹部
  - [ ] データ設計
    - [ ] ブロック
    - [ ] ページ
    - [ ] データリスト
    - [ ] FrontDB(利用者が触れるDB)
    - [ ] BackDB
  - [ ] 実装
    - [ ] Textブロックの実装
    - [ ] ページ
    - [ ] ブロックメニュー
    - [ ] ページリストの実装
    - [ ] FrontDBの実装
    - [ ] BackDBの実装・連携
- [ ] ブロックの実装
  - [ ] Textブロック
    - [ ] 行頭のMarkdown(もしくはそれに類するコマンド)で以下のブロックに変換
      - H*ブロック
      - Listブロック
      - コードブロック
      - 数式ブロック(display mode)
    - [ ] 行中のMarkdown(もしくはそれに類するコマンド)で以下のブロックに変換
      - 太字
      - 斜体
      - 数式(inline)
  - [ ] DBブロック

- [ ] ページの実装
  - [ ] ページ
    - [ ] 要素設定
      - ブロックの並列配置
      - 並列配置したブロックに対して、従属するブロック配置？
  - [ ] フルページDB
    - [ ] 必要？

### データ設計
- [ ] Block
```
{
  id: ulid,
  type: Text(or List or ...),
  config: { indent: 0, type: こっち?}
  contents:[
    { text: "あれこれ", type: 'plain' },
    { text: "色々", type: 'bold' },
    { text: "\sum", type: 'tex' },
  ],
  created_at: ?,
}
```
- (Textブロックにおいて)上のように、要素を分割することで、良い塩梅にWYSIWYGで書けそうだし、拡張性も高まるか
  - 太字、打ち消し線がnestしている場合はどうする？
  - ListやHeaderとはどこまで分割する？文章のParagraphとは？ => Pageの設計次第か
- [ ] Page
```
{
  id: ulid,
  type: Text(or List or ...)
  contents:[
    [blockのulid, ...],
    ...
  ],
  created_at: ?,
  updated_at: ?
}
```
- 並行においたブロックの下に何か付け加えたいとなった時この形式では...
- Paragraphの区別がつかないParagraphを追加するか？
- ページもブロックも表示が異なるだけで同じデータ形式にするか？

- [ ] Paragraph
```
{
  id: ulid,
  contents:[
    [blockのulid, ...],
    ...
  ],
  created_at: ?
}
```

- [ ] DataList
```
[
  {
    id: ulid,
    config: {type: Page( or Table or Graph or ...)}
    list: []
  }
]
```

### 利用(予定)
- Solidjs: 軽量
- KaTeX: 数式表示用
- D3: SVGをTikZに出力の予定

### 欲しいBlock
- [ ] 縦書きTextブロック
  - [ ] 青空文庫スタイルで、送りやルビを振る
