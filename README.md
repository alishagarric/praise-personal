# Temporary readme for the Shopify Praise Theme

In the root folder, using the Shopify CLI 3.0, run `shopify theme serve`. Details on Shopify CLI found here (https://shopify.dev/themes/tools/cli)[https://shopify.dev/themes/tools/cli].

In another terminal tab run `sass --watch dev/scss/theme.scss:assets/theme.css dev/scss/sections:assets dev/scss/snippets:assets`

This compiles all global style files into one theme.css file, and all the snippets and sections files into separate files
