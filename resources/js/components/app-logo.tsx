import AppLogoIcon from './app-logo-icon';
import logo from '../../../public/assets/logo.png';

export default function AppLogo({ scrolled }: { scrolled: boolean }) {
    return (
        <>

            <div className="ml-1 grid flex-1 text-left text-sm">
                <img src={logo} alt="Le Maroc Social" className={`w-18   ${scrolled ? 'invert-0' : 'invert brightness-0'}`} />
            </div>
        </>
    );
}
