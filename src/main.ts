import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const storage = persistState();

const providers = [{ provide: 'persistStorage', useValue: storage }];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
