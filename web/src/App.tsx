import './global.css'
import './App.css'

import { ThemeProvider } from "./components/theme-provider"
import Nav from "./views/nav/Nav"
import ContentTabs from "./views/contenttabs/ContentTabs"
import WelcomePopover from './views/welcome/WelcomePopover'

function App() {
    return (
        <>
            <ThemeProvider
                defaultTheme="dark"
                storageKey="vite-ui-theme"
            >
                <Nav></Nav>
                <div className="content">
                    <ContentTabs />
                </div>
                <WelcomePopover />
            </ThemeProvider>
        </>
    )
}

export default App
