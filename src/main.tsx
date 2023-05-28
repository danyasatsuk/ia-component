import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Здесь происходит рендеринг компонента в фрейме (для более точного отображения)

ReactDOM.createRoot((document.getElementById('Frame') as HTMLIFrameElement).contentWindow!.document.getElementById("root")!).render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
)
