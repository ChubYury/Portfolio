// Core module
import gulp from "gulp";
// Path config
import { path } from "./gulp/config/path.js";
// Shared plugins
import { plugins } from "./gulp/config/plugins.js";

// Expose the shared config as a global for the tasks
global.app  = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { server } from "./gulp/tasks/server.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff,fontsSttyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Watches the source files for changes
function watcher() {
    gulp.watch(path.watch.files, copy);
    // For automatic upload to the server
    // gulp.watch(path.watch.html, gulp.siries(html, ftp));
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// export { svgSprive }

// Font processing
const fonts = gulp.series(svgSprive, otfToTtf, ttfToWoff, fontsSttyle);

// Main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(html, copy, scss, js, images));

// Task run scenarios
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Scenario exports
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Default task
gulp.task('default', dev); 