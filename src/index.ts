const express = require('express');
const MBTiles = require('@mapbox/mbtiles');

const mbtilesPath = './tiles/sample.mbtiles';

const app = express();

type tileResData = {
  data: any;
  headers: object;
};

const tile = (z: number, x: number, y: number) => {
  return new Promise((resolve, rejects) => {
    new MBTiles(`${mbtilesPath}?mode=ro`, (err: Error, mbtiles: any) => {
      return mbtiles.getTile(z, x, y, (err: Error, data: any, headers: any) => {
        if (err) {
          console.log(`err:${err}`);
          rejects(err);
        }
        const resData: tileResData = {
          data: data,
          headers: headers,
        };
        resolve(resData);
      });
    });
  });
};

app.get('/', function (req: any, res: { send: (arg0: string) => void }) {
  res.send('Hello World!');
});

app.get('/tile/:z/:x/:y.png', async (req: any, res: any) => {
  const z = parseInt(req.params.z, 10);
  const x = parseInt(req.params.x, 10);
  const y = parseInt(req.params.y, 10);

  console.log(z, x, y);
  const resData: any = await tile(z, x, y);
  const buffer = resData.data;

  res.set('Content-Type', 'image/png');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(buffer);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
