import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const googleLogo = "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"

export default function LoginPage() {

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google"
    }

    return (
        <>
            <Navbar />
            <main className="page login-page">
                <section className="login-section">
                    <div className="login-card">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to continue to your account</p>

                        <button
                            className="login-btn login-btn-google"
                            onClick={handleGoogleLogin}
                        >
                            <img src={googleLogo} alt="Google Logo" className="login-btn-icon" />
                            Sign in with Google
                        </button>

                        <p className="login-note">
                            By signing in, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}