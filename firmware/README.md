# Projeto-Gangorra
Projeto das disciplinas de Sistamas Embarcados e Instrumentação

### embedded_software  
Branch master para armazenar o historico de versão do software embarcado 

## Documentação
https://www.notion.so/73943221b94847fca581e2f51ed079da?v=368dd51d757e429dbad238efdc53bc0f

## Programação no VSCODE
### É necessário criar uma pasta invisível .vscode/ para que a IDE encontre as bibliotecas com os seguintes arquivos:

#### c_cpp_properties.json
```json
{
    "configurations": [
        {
            "name": "ESP-IDF",
            "compilerPath": "/home/<YOUR_USER>/.espressif/tools/xtensa-esp32-elf/esp-2021r2-patch3-8.4.0/xtensa-esp32-elf/bin/xtensa-esp32-elf-gcc",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "includePath": [
                "${config:idf.espIdfPath}/components/**",
                "${config:idf.espIdfPathWin}/components/**",
                "${config:idf.espAdfPath}/components/**",
                "${config:idf.espAdfPathWin}/components/**",
                "${workspaceFolder}/**"
            ],
            "browse": {
                "path": [
                    "${config:idf.espIdfPath}/components",
                    "${config:idf.espIdfPathWin}/components",
                    "${config:idf.espAdfPath}/components/**",
                    "${config:idf.espAdfPathWin}/components/**",
                    "${workspaceFolder}"
                ],
                "limitSymbolsToIncludedHeaders": false
            }
        }
    ],
    "version": 4
}

```
#### launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "espidf",
      "name": "Launch",
      "request": "launch"
    }
  ]
}
```
#### settings.json
```json
{
    "C_Cpp.intelliSenseEngine": "Tag Parser",
    "idf.adapterTargetName": "esp32",
    "idf.customExtraPaths": "/home/<YOUR_USER>/.espressif/tools/xtensa-esp32-elf/esp-2021r2-patch3-8.4.0/xtensa-esp32-elf/bin:/home/<YOUR_USER>/.espressif/tools/xtensa-esp32s2-elf/esp-2021r2-patch3-8.4.0/xtensa-esp32s2-elf/bin:/home/<YOUR_USER>/.espressif/tools/xtensa-esp32s3-elf/esp-2021r2-patch3-8.4.0/xtensa-esp32s3-elf/bin:/home/<YOUR_USER>/.espressif/tools/riscv32-esp-elf/esp-2021r2-patch3-8.4.0/riscv32-esp-elf/bin:/home/<YOUR_USER>/.espressif/tools/esp32ulp-elf/2.28.51-esp-20191205/esp32ulp-elf-binutils/bin:/home/<YOUR_USER>/.espressif/tools/esp32s2ulp-elf/2.28.51-esp-20191205/esp32s2ulp-elf-binutils/bin:/home/<YOUR_USER>/.espressif/tools/cmake/3.23.1/bin:/home/<YOUR_USER>/.espressif/tools/openocd-esp32/v0.11.0-esp32-20220411/openocd-esp32/bin:/home/<YOUR_USER>/.espressif/tools/ninja/1.10.2",
    "idf.customExtraVars": "{\"OPENOCD_SCRIPTS\":\"/home/<YOUR_USER>/.espressif/tools/openocd-esp32/v0.11.0-esp32-20220411/openocd-esp32/share/openocd/scripts\"}",
    "idf.espIdfPath": "/home/<YOUR_USER>/esp/esp-idf",
    "idf.openOcdConfigs": [
        "interface/ftdi/esp32_devkitj_v1.cfg",
        "target/esp32.cfg"
    ],
    "idf.pythonBinPath": "/home/<YOUR_USER>/.espressif/python_env/idf4.4_py3.10_env/bin/python",
    "idf.toolsPath": "/home/<YOUR_USER>/.espressif",
    "idf.flashType": "UART",
    "idf.port": "/dev/ttyUSB0",
    "files.associations": {
        "esp_log.h": "c",
        "mcpwm.h": "c"
    }
}
```
#### tasks.json
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build - Build project",
            "type": "shell",
            "command": "${config:idf.pythonBinPath} ${config:idf.espIdfPath}/tools/idf.py build",
            "windows": {
                "command": "${config:idf.pythonBinPathWin} ${config:idf.espIdfPathWin}\\tools\\idf.py build",
                "options": {
                    "env": {
                        "PATH": "${env:PATH};${config:idf.customExtraPaths}"
                    }
                }
            },
            "options": {
                "env": {
                    "PATH": "${env:PATH}:${config:idf.customExtraPaths}"
                }
            },
            "problemMatcher": [
                {
                    "owner": "cpp",
                    "fileLocation": [
                        "relative",
                        "${workspaceFolder}"
                    ],
                    "pattern": {
                        "regexp": "^\\.\\.(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                },
                {
                    "owner": "cpp",
                    "fileLocation": "absolute",
                    "pattern": {
                        "regexp": "^[^\\.](.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                }
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "label": "Set ESP-IDF Target",
            "type": "shell",
            "command": "${command:espIdf.setTarget}",
            "problemMatcher": {
                "owner": "cpp",
                "fileLocation": "absolute",
                "pattern": {
                    "regexp": "^(.*):(//d+):(//d+)://s+(warning|error)://s+(.*)$",
                    "file": 1,
                    "line": 2,
                    "column": 3,
                    "severity": 4,
                    "message": 5
                }
            }
        },
        {
            "label": "Clean - Clean the project",
            "type": "shell",
            "command": "${config:idf.pythonBinPath} ${config:idf.espIdfPath}/tools/idf.py fullclean",
            "windows": {
                "command": "${config:idf.pythonBinPathWin} ${config:idf.espIdfPathWin}\\tools\\idf.py fullclean",
                "options": {
                    "env": {
                        "PATH": "${env:PATH};${config:idf.customExtraPaths}"
                    }
                }
            },
            "options": {
                "env": {
                    "PATH": "${env:PATH}:${config:idf.customExtraPaths}"
                }
            },
            "problemMatcher": [
                {
                    "owner": "cpp",
                    "fileLocation": [
                        "relative",
                        "${workspaceFolder}"
                    ],
                    "pattern": {
                        "regexp": "^\\.\\.(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                },
                {
                    "owner": "cpp",
                    "fileLocation": "absolute",
                    "pattern": {
                        "regexp": "^[^\\.](.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                }
            ]
        },
        {
            "label": "Flash - Flash the device",
            "type": "shell",
            "command": "${config:idf.pythonBinPath} ${config:idf.espIdfPath}/tools/idf.py -p ${config:idf.port} -b ${config:idf.flashBaudRate} flash",
            "windows": {
                "command": "${config:idf.pythonBinPathWin} ${config:idf.espIdfPathWin}\\tools\\idf.py flash -p ${config:idf.portWin} -b ${config:idf.flashBaudRate}",
                "options": {
                    "env": {
                        "PATH": "${env:PATH};${config:idf.customExtraPaths}"
                    }
                }
            },
            "options": {
                "env": {
                    "PATH": "${env:PATH}:${config:idf.customExtraPaths}"
                }
            },
            "problemMatcher": [
                {
                    "owner": "cpp",
                    "fileLocation": [
                        "relative",
                        "${workspaceFolder}"
                    ],
                    "pattern": {
                        "regexp": "^\\.\\.(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                },
                {
                    "owner": "cpp",
                    "fileLocation": "absolute",
                    "pattern": {
                        "regexp": "^[^\\.](.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                }
            ]
        },
        {
            "label": "Monitor: Start the monitor",
            "type": "shell",
            "command": "${config:idf.pythonBinPath} ${config:idf.espIdfPath}/tools/idf.py -p ${config:idf.port} monitor",
            "windows": {
                "command": "${config:idf.pythonBinPathWin} ${config:idf.espIdfPathWin}\\tools\\idf.py -p ${config:idf.portWin} monitor",
                "options": {
                    "env": {
                        "PATH": "${env:PATH};${config:idf.customExtraPaths}"
                    }
                }
            },
            "options": {
                "env": {
                    "PATH": "${env:PATH}:${config:idf.customExtraPaths}"
                }
            },
            "problemMatcher": [
                {
                    "owner": "cpp",
                    "fileLocation": [
                        "relative",
                        "${workspaceFolder}"
                    ],
                    "pattern": {
                        "regexp": "^\\.\\.(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                },
                {
                    "owner": "cpp",
                    "fileLocation": "absolute",
                    "pattern": {
                        "regexp": "^[^\\.](.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                        "file": 1,
                        "line": 2,
                        "column": 3,
                        "severity": 4,
                        "message": 5
                    }
                }
            ],
            "dependsOn": "Flash - Flash the device"
        },
        {
            "label": "OpenOCD: Start openOCD",
            "type": "shell",
            "presentation": {
                "echo": true,
                "reveal": "never",
                "focus": false,
                "panel": "new"
            },
            "command": "openocd -s ${command:espIdf.getOpenOcdScriptValue} ${command:espIdf.getOpenOcdConfigs}",
            "windows": {
                "command": "openocd.exe -s ${command:espIdf.getOpenOcdScriptValue} ${command:espIdf.getOpenOcdConfigs}",
                "options": {
                    "env": {
                        "PATH": "${env:PATH};${config:idf.customExtraPaths}"
                    }
                }
            },
            "options": {
                "env": {
                    "PATH": "${env:PATH}:${config:idf.customExtraPaths}"
                }
            },
            "problemMatcher": {
                "owner": "cpp",
                "fileLocation": "absolute",
                "pattern": {
                    "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
                    "file": 1,
                    "line": 2,
                    "column": 3,
                    "severity": 4,
                    "message": 5
                }
            }
        },
        {
            "label": "adapter",
            "type": "shell",
            "command": "${config:idf.pythonBinPath}",
            "isBackground": true,
            "options": {
                "env": {
                    "PATH": "${env:PATH}:${config:idf.customExtraPaths}",
                    "PYTHONPATH": "${command:espIdf.getExtensionPath}/esp_debug_adapter/debug_adapter"
                }
            },
            "problemMatcher": {
                "background": {
                    "beginsPattern": "\bDEBUG_ADAPTER_STARTED\b",
                    "endsPattern": "DEBUG_ADAPTER_READY2CONNECT",
                    "activeOnStart": true
                },
                "pattern": {
                    "regexp": "(\\d+)-(\\d+)-(\\d+)\\s(\\d+):(\\d+):(\\d+),(\\d+)\\s-(.+)\\s(ERROR)",
                    "file": 8,
                    "line": 2,
                    "column": 3,
                    "severity": 4,
                    "message": 9
                }
            },
            "args": [
                "${command:espIdf.getExtensionPath}/esp_debug_adapter/debug_adapter_main.py",
                "-e",
                "${workspaceFolder}/build/${command:espIdf.getProjectName}.elf",
                "-s",
                "${command:espIdf.getOpenOcdScriptValue}",
                "-ip",
                "localhost",
                "-dn",
                "${config:idf.adapterTargetName}",
                "-om",
                "connect_to_instance"
            ],
            "windows": {
                "command": "${config:idf.pythonBinPathWin}",
                "options": {
                    "env": {
                        "PATH": "${env:PATH};${config:idf.customExtraPaths}",
                        "PYTHONPATH": "${command:espIdf.getExtensionPath}/esp_debug_adapter/debug_adapter"
                    }
                }
            }
        }
    ]
}
```
###
------------
````
├── README.md          <- The top-level README for developers using this project.
│
│
├── main    <- Pasta principal do firmware
|    ├── components         <- Libs p/ integração com os componentes.
|    |   ├── delay      
|    |   └── 
|    |   └── lcd
|    |   └── mpu6050
|    |   └── ultrasonic
|    |
│    ├── inc              <- Libs do firmware.
|    |   └── bluetooth.hpp <- biblioteca bluetooth
|    |   └── display.hpp <- biblioteca display
|    |   └── motors.hpp <- biblioteca motores
|    |   └── sensores.hpp <- biblioteca sensores
|    |   └── system.hpp <- biblioteca sistema
|    |
│    ├── src              <- Código principal do firmware.
|    |   └── bluetooth.hpp <- bluetooth
|    |   └── display.hpp <- display
|    |   └── motors.hpp <- motores
|    |   └── sensores.hpp <- sensores
|    |   └── system.hpp <- sistema
|    |   
│
├── CMakeList.txt   <- CMakeList para a compilação do projeto.
|
├── docs             <- Documentação em formato PlantUML
│    ├── out              <- Código principal do firmware.
|    |    └── components <- view components da documentação
|    |    └── containers <- view containers da documentação
|    |    └── contexto   <- view contexto da documentação
````
### Estrutura 
-> **Master** => branch responsável por armazenar o versionamento dos arquivos da estrutura mecânica do projeto 

-> **embedded_software** => branch responsável por armazenar o versionamento dos arquivos do software embarcado na esp-32 

-> **app_mobile** =>  branch responsável por armazenar o versionamento dos arquivos do software mobile 

# Tutorial workflow das branchs

Digamos que vc esteja trabalhando com o software embarcado, onde há varias integrações com sensores e atuadores. Temos a branch principal para o software embarcado que é a branch **embedded_software**. Vc ficou com a tarefa de integrar o sensor ultrassônico, como prosseguir?

Crie uma branch que seja uma cópia da branch principal, isto é, inclui inclusive os commits anteriores. Para isso, digite 
```
git checkout -b feature/<nome_da_task> embedded_software
```

A nova branch será criada e a branch corrente no seu terminal será a nova branch. 

Agora faça suas implementações sem receios. Adicione modificações, commits e push a sua branch.

## Merge branchs

Quando quiser fazer o merge de duas branchs, primeiro rode o seguinte comando para a branch a qual será feito o merge da branch secundária. Suponha que temos a branch para o sensor ultrassônico, feature/ultrasonic_sensor.
```
git checkout embedded_software
git merge feature/ultrasonic_sensor
```

Isto irá fazer o merge da branch feature/ultrasonic_sensor em embedded_software. Porém, essas alterações serão realizadas apenas localmente.

Para fazer o merge no remote repository, isto é, repositório remoto do git, faça:
```
git push --set-upstream origin <branch name>
```

## Utilizar o mesmo esquema para bugfixes.