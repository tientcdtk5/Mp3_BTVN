import React from 'react'
import ReactDOM from 'react-dom/client'
import MainApp from './MainApp.tsx'
import './index.css'
import { store } from './features/store.ts'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainApp />
    </Provider>
  </React.StrictMode>,
)
