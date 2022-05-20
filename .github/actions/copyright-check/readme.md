## CONTRIBUTING

本フォルダを修正する場合

- `npm run build`でビルドしてから`dist`フォルダを含めてcommitおよびpushします
    - ビルド時には`@vercel/ncc`でnode_modules以下のファイルが1ファイルにコンパイルされます
    - Github Actionsで実行するときに、`npm install`がされないため
        - 参考: https://docs.github.com/ja/actions/creating-actions/creating-a-javascript-action

