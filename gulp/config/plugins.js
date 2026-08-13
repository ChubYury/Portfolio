import replace from 'gulp-replace' // Search and replace
import plumber from 'gulp-plumber'// Error handling
import notify from 'gulp-notify'// Notifications
import browsersync from "browser-sync" // Local server
import newer from "gulp-newer" // Passes through only updated files
import ifPlugin from "gulp-if" // Conditional branching

// Export the plugin bundle
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}