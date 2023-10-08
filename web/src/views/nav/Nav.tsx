import { ModeToggle } from '@/components/theme-toggle';
import "./Nav.scss"
import Ben from '@/components/ben';

const Nav = () => {
    return (
        <nav className="flex items-center justify-between align-center p-4">
            <div className="flex items-center">
                <div className="logo">
                    <Ben />
                </div>
                <h3 className='m-0 pl-2'>Ben's BioArchives</h3>
            </div>
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Nav;