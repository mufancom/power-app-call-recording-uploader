import {PowerApp} from '@makeflow/power-app';
import Koa from 'koa';
import {port, powerAppConfig, version} from './config';
import controllers from './controller';
import {globalState, response} from './middleware';
import {powerItems, powerNodes} from './power-app';

const powerApp = new PowerApp(powerAppConfig);

powerApp.version(version, {
  contributions: {
    powerNodes,
    powerItems,
  },
});

const app = new Koa();

app
  .use(response)
  .use(globalState({powerApp}))
  .use(controllers)
  .use(powerApp.koa());

app.listen({port});
