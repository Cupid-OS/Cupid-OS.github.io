"""
Pelican plugin to list all mods from the mods folder and make them available as JSON.
"""

import os
import json
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def get_mods_list(generator):
    """
    Scan the mods folder and create a list of all mods.
    Makes the data available in templates and exports as JSON.
    """
    # Get the source path from Pelican configuration
    source_path = generator.settings.get('PATH', '.')
    mods_folder = os.path.join(source_path, 'mods')
    
    mods_list = []
    
    if not os.path.exists(mods_folder):
        logger.warning(f"Mods folder not found at {mods_folder}")
        generator.env.globals['mods_list'] = []
        generator.env.globals['mods_json'] = json.dumps([])
        return
    
    # List all directories in mods folder
    try:
        for item in os.listdir(mods_folder):
            item_path = os.path.join(mods_folder, item)
            
            if os.path.isdir(item_path):
                mod_info = {
                    'name': item,
                    'path': item,
                    'files': []
                }
                
                # List files in the mod folder
                try:
                    files = os.listdir(item_path)
                    mod_info['files'] = files
                    mod_info['file_count'] = len(files)
                    
                    # Check for metadata file (mod.json, mod.txt, etc.)
                    metadata_file = None
                    for fname in ['mod.json', 'mod.txt', 'meta.json', 'config.json']:
                        if fname in files:
                            metadata_file = os.path.join(item_path, fname)
                            break
                    
                    if metadata_file and metadata_file.endswith('.json'):
                        try:
                            with open(metadata_file, 'r', encoding='utf-8') as f:
                                metadata = json.load(f)
                                mod_info['metadata'] = metadata
                        except (json.JSONDecodeError, IOError) as e:
                            logger.warning(f"Could not read metadata for mod {item}: {e}")
                
                except PermissionError:
                    logger.warning(f"Permission denied reading mod folder: {item}")
                
                mods_list.append(mod_info)
    
    except Exception as e:
        logger.error(f"Error scanning mods folder: {e}")
    
    # Sort mods by name
    mods_list.sort(key=lambda x: x['name'].lower())
    
    # Make available to templates
    generator.env.globals['mods_list'] = mods_list
    generator.env.globals['mods_json'] = json.dumps(mods_list, indent=2)
    
    # Log results
    logger.info(f"Found {len(mods_list)} mods: {', '.join([m['name'] for m in mods_list])}")


def register():
    """Register the plugin with Pelican."""
    from pelican import signals
    signals.generator_init.connect(get_mods_list)
