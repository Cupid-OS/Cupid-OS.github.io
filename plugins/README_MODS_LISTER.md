# Mods Lister Plugin for Pelican

## Overview
The `mods_lister` plugin scans your mods folder and makes all mod information available to your Pelican templates as both a Python list and JSON data.

## Setup

### 1. Configuration (pelicanconf.py)
Add the plugin to your Pelican configuration file:

```python
# Add plugins directory
PLUGIN_PATHS = ['plugins']
PLUGINS = ['mods_lister']
```

### 2. Folder Structure
Your project should have a `mods` folder in the root:

```
your-project/
├── content/
├── mods/
│   ├── mod1/
│   │   ├── files...
│   │   └── mod.json (optional - metadata)
│   ├── mod2/
│   └── mod3/
├── plugins/
│   ├── __init__.py
│   └── mods_lister.py
└── pelicanconf.py
```

### 3. Mod Metadata (Optional)
Each mod folder can contain a `mod.json` file with metadata:

```json
{
  "description": "My awesome mod",
  "version": "1.0.0",
  "author": "Your Name",
  "url": "https://github.com/...",
  "dependencies": []
}
```

## Usage in Templates

### As a List
```html
{% for mod in mods_list %}
    <div class="mod">
        <h3>{{ mod.name }}</h3>
        <p>Files: {{ mod.file_count }}</p>
        {% if mod.metadata %}
            <p>{{ mod.metadata.description }}</p>
        {% endif %}
    </div>
{% endfor %}
```

### As JSON
```html
<pre>{{ mods_json }}</pre>
```

Or in a script tag:
```html
<script>
    const mods = {{ mods_json }};
    console.log(mods);
</script>
```

## Plugin Output

The plugin creates two template variables:

- **`mods_list`**: Python list of mod dictionaries with structure:
  ```python
  {
      'name': 'mod_folder_name',
      'path': 'mod_folder_name',
      'files': ['file1', 'file2', ...],
      'file_count': 3,
      'metadata': {...}  # if mod.json exists
  }
  ```

- **`mods_json`**: JSON string version of `mods_list` for use in templates

## Docker Usage

If running Pelican in Docker, mount your project root as a volume:

```bash
docker run -v /path/to/your/project:/app myimage pelican /app/content -o /app/output -s /app/pelicanconf.py
```

The mods folder will be scanned relative to your project root.

## Troubleshooting

- **No mods found**: Check that the `mods` folder exists in the correct location and contains subdirectories
- **Metadata not loading**: Ensure JSON files are valid JSON and named `mod.json`, `mod.txt`, `meta.json`, or `config.json`
- **Permission errors**: Ensure the Docker container has read permission on the mods folder
