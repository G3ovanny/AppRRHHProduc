import { Provider } from 'react-redux'
import { AppRouter } from './router'
import { store } from './store'
import { AppTheme } from './theme'



export const App = () => {
  return (
    <Provider store={store}>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </Provider>
  )
}


