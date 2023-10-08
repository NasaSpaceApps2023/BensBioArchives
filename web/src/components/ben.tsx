import lightBen from '@/assets/ben_light.svg'
import darkBen from '@/assets/ben_dark.svg'
import { observer } from 'mobx-react-lite'
import themeStore from '@/store/themeStore'

const Ben = observer(() => {
    return (
        <>
            {themeStore.theme === 'light' ? <img className="ben" src={lightBen} alt="Logo" /> : <img className="ben" src={darkBen} alt="Logo" />}
        </>
    )
})

export default Ben