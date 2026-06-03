# Pelican Configuration Example
# This is a minimal example configuration for using the mods_lister plugin

import os

# Site information
AUTHOR = 'Your Name'
SITENAME = 'Your Site'
SITEURL = ''
TIMEZONE = 'UTC'
DEFAULT_LANG = 'en'

# Paths
PATH = '.'
ARTICLE_PATHS = ['articles']
ARTICLE_EXCLUDES = ['pages']
PAGE_PATHS = ['pages']
PAGE_EXCLUDES = ['articles']

# Plugins
PLUGIN_PATHS = ['plugins']
PLUGINS = ['mods_lister']

# Theme and output
OUTPUT_PATH = 'output'
THEME = 'theme'  # or use a Pelican theme

# Feed settings (optional)
FEED_ALL_ATOM = 'feeds/all.atom.xml'

# Pagination
DEFAULT_PAGINATION = 10
DISPLAY_PAGES_ON_MENU = True
DISPLAY_CATEGORIES_ON_MENU = True
