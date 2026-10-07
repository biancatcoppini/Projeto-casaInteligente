# NexHome — src

Estrutura React Native/Expo Router do NexHome.

## Configurações incluídas

A tela `src/app/configuracoes.tsx` concentra as configurações necessárias para o escopo atual da casa:

- Modo claro/escuro.
- Ativação/desativação do sistema de segurança (PIR).
- Modo automático da climatização.
- Temperatura limite para ligar a climatização automaticamente, entre 15 °C e 40 °C.

As configurações ficam em memória pelo `src/context/SettingsContext.tsx`. A persistência em `AsyncStorage` pode ser adicionada depois, quando o projeto estiver conectado à central.

## Navegação

- `src/app/(tabs)/index.tsx` — início.
- `src/app/(tabs)/comodos.tsx` — resumo dos cômodos.
- `src/app/controle/[tipo].tsx` — controle de portas/luzes.
- `src/app/configuracoes.tsx` — configurações.

O botão de engrenagem no `AppHeader` abre as configurações. O menu inferior continua com apenas Início e Cômodos.

## Z-Wave e ESP32

O app não fala Z-Wave diretamente. Na integração física prevista, o ESP32 funciona como central conectada por Wi-Fi, enquanto um controlador/NCP Z-Wave fornece a comunicação Z-Wave por uma interface serial. Silicon Labs documenta a Serial API para comunicação entre um host e um chip Z-Wave, inclusive via UART/USB, e a arquitetura do Z-Wave Protocol Controller utiliza a conexão Serial API com o NCP.

O ESP32 sozinho não vira um rádio Z-Wave por usar a Arduino IDE. Para uma demonstração com Z-Wave real é necessário hardware Z-Wave compatível, como um NCP/módulo baseado na família Z-Wave 800 (por exemplo EFR32ZG23 ou ZGM230S) ou um controlador USB Z-Wave. Sem esse hardware, o ESP32 pode apenas simular os nós/mesh para a apresentação e isso deve ser identificado como simulação, não como Z-Wave real.
