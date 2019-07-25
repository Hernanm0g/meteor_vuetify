// Extensions
import { Service } from '../service'; // Presets

import presets from './presets';
export class Icons extends Service {
  constructor(options = {}) {
    super();
    this.iconfont = 'mdi';
    this.values = presets[this.iconfont];
    if (options.iconfont) this.iconfont = options.iconfont;
    this.values = { ...presets[this.iconfont],
      ...(options.values || {})
    };
  }

}
Icons.property = 'icons';
//# sourceMappingURL=index.js.map