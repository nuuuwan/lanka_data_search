import json
from utils import WWW, File, Log
log = Log('generate_raw_config_list.py')

URL = 'https://raw.githubusercontent.com'+'/nuuuwan/cbsl/data/edl_summary.json'

def main():
    data = WWW(URL).readJSON()
    n_data = len(data)
    content = f'''// Auto-generated by scripts_py/generate_raw_config_list.py
// RAW_CONFIG_LIST.length = {n_data}

export const RAW_CONFIG_LIST = {json.dumps(data, indent=2)};


    '''

    file_path = 'src/nonview/core/RAW_CONFIG_LIST.js'
    File(file_path).write(content)
    log.info(f'Wrote {n_data} configs to {file_path}')

if __name__ == '__main__':
    main()