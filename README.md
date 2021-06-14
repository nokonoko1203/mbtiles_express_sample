# mbtiles_express_sample

This is sample of express for delivering mbtiles.

## setup

- Install package in your local.

```shell
% npm install
```

- Store mbtiles in any directory.

- Overwrite your mbtiles path of `mbtilesPath` in `src/index.ts`.

```typescript
const mbtilesPath = './your/sample.mbtiles';
```

## usage

- Run express server in local.

```shell
% npm run start
```

- You can access `localhost:3000/{z}/{x}/{y}.png`.