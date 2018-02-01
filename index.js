const RawSource = require('webpack-sources').RawSource;
const penthouse = require('penthouse');

function CriticalCssPlugin(options) {
  this.options = options || {}
}


CriticalCssPlugin.prototype.apply = function(compiler) {
  const self = this;

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('additional-assets', function(callback) {

      Promise.all(compilation.chunks.map(async(chunk) => {
        // Check for html source
        const html = self.options.criticalHTML[chunk.name];

        if (html) {
          // Get css output file to get critical parts from,
          // we only get from the first file for now
          const cssFile = chunk.files.filter(filename => filename.endsWith('.css'))[0];
          const cssSource = compilation.assets[cssFile] && compilation.assets[cssFile].source();

          if (!cssSource) return;

          try {
            // Get critical css
            const criticalCss = await penthouse({
              url: html,
              cssString: cssSource,
            });

            // Generate critical css from styles.css => styles.critical.css
            const criticalFile = cssFile.slice(0, -4) + '.critical.css';
            const criticalSource = new RawSource(criticalCss);

            // Push to assets
            compilation.assets[criticalFile] = criticalSource;
            chunk.files.push(criticalFile);

            console.log("Done get critical css!");
          } catch (e) {
            console.log("Error while get critical css:", e);
          }
        }

      })).then(() => callback()).catch(err => callback(err));

    });

  });
};

module.exports = CriticalCssPlugin;
