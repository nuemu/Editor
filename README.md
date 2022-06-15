# Editor

### 目指すところ
Notionは優れているが、
1. 使いもしないブロックで肥大しすぎている
2. 秀逸なDBがあるのに、グラフ出力できない、連携が弱い
3. サービスへの依存度が高い、データのバックアップが取りにくい

といった欠点が気になる。

そこで、
- 1,2: 最小限のブロック数、高い拡張性・カスタマイズ性を目指す
- 3: (不朽の形式であろう)TeX出力を用いたバックアップが取れるようにする
  - TeXからこのEditorへの変換は行わない(気楽に書くためのツール、TeXが書きたければOverleaf等を使う)

ことを目指す。

### 方針
- GFMをベース
  - HeadなどはNotion方式のMarkdown入力で切り替えられるように
  - Listはindexを任意に付けらる用に
- Block単位のレンダリング
  - Page > Paragraph > Blockの単位を設ける。
  - Blockごとにフォーカスが外れた時？描画する
  - 数式だけは確認しながら描画できるよう、窓を設ける？

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
      - 打ち消し線
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
  config: { indent: 0, type: Text(or List or ...)}
  data: {
      text: "- **Bold**~~Strikethrough~~$KaTeX$\n"
    },
  created_at: ?,
}
```

- [ ] Paragraph
```
{
  id: ulid,
  contents:[
    blockのulid, ...,
  ],
  created_at: ?
}
```

- [ ] Page
```
{
  id: ulid,
  type: Text(or List or ...)
  contents:[
    [Paragraphのulid, ...],
    ...
  ],
  created_at: ?,
  updated_at: ?
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
