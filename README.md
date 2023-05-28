# IA Component
IA Component (или I//AMFC) - это boilerplate для компонентов Module Federation с использованием:
- React
- TypeScript
- Vite
- SCSS
- SWC

### Создание компонента

Создать компонент можно при помощи утилиты `degit`. Запустите команду:

```shell
npx degit danyasatsuk/ia-component my-component-name
```

Где `my-component-name` название вашего компонента.

### Настройка компонента

Вы можете изменить параметры вашего модуля при помощи настройки `vite.config.ts`

```typescript
    federation({
        name: "ia-component",
        filename: "remoteEntry.js",
        exposes: {
            './App': './src/App'
        },
        shared: ['react', 'react-dom']
    })
```

В котором:

#### name: string
Имя компонента

#### filename: string
Необязательный параметр, устанавливает название файла, который будет экспортирован.
По умолчанию `remoteEntry.js`

#### exposes: object
Список объектов, которые будут экспортированы из компонента. Указываются как:
`'./ComponentName': './src/ComponentPath`

#### shared: object

Список пакетов, которые будут предоставлены проектом, использующим этот компонент.

### Использование компонента

Данный компонент используется по правилам Module Federation. Пример настройки для Vite + React + TS
1. Установите плагин `@originjs/vite-plugin-federation` при помощи пакетного менеджера:

```shell
# Yarn
yarn add -D @originjs/vite-plugin-federation
```

```shell
# NPM
npm install -D @originjs/vite-plugin-federation
```

2. Добавьте плагин в `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      svgr(),
      federation({
          name: 'app',
          remotes: {
              remoteComponent: 'http://localhost:5001/assets/remoteEntry.js',
          },
          shared: ['react','react-dom']
      })
  ],
})
```

В котором `remoteComponent` это название компонента, которое будет использоваться в проекте.
`http://localhost:5001/assets/remoteEntry.js` - это путь до файла `remoteEntry.js` компонента.

3. Добавьте компонент в проект:

```typescript jsx
import App from 'remoteComponent/App'

export default function MyObject() {
    return (
        <div>
            <App/>
        </div>
    )
}
```

Готово!

### Запуск
#### Предпросмотр
Для запуска предпросмотра, используется команда `dev`, которую можно запустить:

```shell
# Yarn
yarn dev
```

```shell
# NPM
npm run dev
```

Компонент запускается в режиме предпросмотра и доступен на порту `:9001`. В этот момент сбора компонента
как микрофронтенда не происходит.

### Dev-запуск
Для предпросмотра компонента как модуля, используется команда `hotBuild`, которую можно запустить:

```shell
# Yarn
yarn hotBuild
```

```shell
# NPM
npm run hotBuild
```

В этот момент запускается автоматическая сборка модуля и его хостинг на порту `:5001` (если он не занят). 
В случае изменения данных в одном из файлов, происходит автоматическая пересборка.

### Serving компонента

Данный этап предполагает конечную сборку компонента как микрофронтенд. Происходит сборка и хостинг на порту 
`:5001` (если он не занят). В случае изменения файлов, автоматическая пересборка происходить не будет.

Команда для запуска:

```shell
# Yarn
yarn serveComponent
```

```shell
# NPM
npm run serveComponent
```