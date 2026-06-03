# Pelican Mods Lister Plugin - Quick Start

## What You Created

1. **Plugin File**: `plugins/mods_lister.py` - Scans the `/mods/` folder and extracts mod information
2. **Configuration**: `pelicanconf.py` - Example Pelican configuration with the plugin enabled
3. **Example Mods**: Sample mod folders in `/mods/` directory with metadata
4. **Templates**: Sample HTML template showing how to display mods

## Quick Start

### Step 1: Install Pelican (if not already installed)
```bash
pip install pelican
```

### Step 2: Run Pelican
```bash
pelican content -o output -s pelicanconf.py
```

Or with Docker:
```bash
docker run -v $(pwd):/app myimage pelican /app/content -o /app/output -s /app/pelicanconf.py
```

### Step 3: Add Your Mods
Add folders to the `/mods/` directory:
```
/mods/
  ├── my-mod-1/
  │   ├── mod.json (metadata)
  │   └── files...
  ├── my-mod-2/
  └── my-mod-3/
```

### Step 4: Use in Templates
In your Pelican templates, access:
- `{{ mods_list }}` - Python list of mods
- `{{ mods_json }}` - JSON string for JavaScript/API

## Example Mod Structure

Create `/mods/my-mod/mod.json`:
```json
{
  "name": "My Awesome Mod",
  "version": "1.0.0",
  "description": "Does something awesome",
  "author": "Your Name",
  "dependencies": ["other-mod"]
}
```

## How It Works

1. Plugin runs when Pelican generates the site
2. Scans `/mods/` for subdirectories
3. For each mod folder:
   - Records folder name and files
   - Looks for `mod.json`, `meta.json`, etc.
   - Reads metadata if found
4. Creates two template variables:
   - `mods_list` - Python list with mod info
   - `mods_json` - JSON string version

## Troubleshooting

- **"Mods folder not found"**: Ensure `/mods/` directory exists in your project root
- **Metadata not showing**: Check that `mod.json` is valid JSON
- **Plugin not loading**: Verify `PLUGIN_PATHS` and `PLUGINS` are in `pelicanconf.py`

## Next Steps

- Customize the template in `/plugins/example_mods_template.html`
- Add more metadata fields to your `mod.json` files
- Modify `plugins/mods_lister.py` to add features like filtering, sorting by version, etc.
