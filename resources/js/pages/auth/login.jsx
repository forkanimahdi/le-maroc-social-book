import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
// import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';



export default function Login({ status, canResetPassword }) {
    return (
        <AuthLayout title="Connexion" description="Accédez à votre espace administrateur pour gérer le contenu du site.">
            <Head title="Connexion" />
                    {/* <h1>hjgj</h1> */}

            <div className="w-full">
                <Form {...AuthenticatedSessionController.store.form()} resetOnSuccess={['password']} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">E‑mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="admin@maroc-social.test"
                                        className="w-full p-4 rounded-lg border border-royal-red-soft focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all duration-300 bg-white"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        {/* <Label htmlFor="password" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Mot de passe</Label>
                                        {canResetPassword && (
                                            <Link href={request()} className="text-sm text-royal-red hover:text-royal-red/80 transition-colors" tabIndex={5}>
                                                Mot de passe oublié ?
                                            </Link>
                                        )} */}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="w-full p-4 rounded-lg border border-royal-red-soft focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all duration-300 bg-white"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox id="remember" name="remember" tabIndex={3} className="border-royal-red-soft" />
                                    <Label htmlFor="remember" className="text-sm text-zinc-700">Se souvenir de moi</Label>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full py-4 px-8 rounded-lg font-semibold text-lg bg-royal-red text-white hover:bg-royal-red/90 transition-colors duration-300" 
                                    tabIndex={4} 
                                    disabled={processing} 
                                    data-test="login-button"
                                >
                                    {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-2" />}
                                    Se connecter
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                {status && (
                    <div className="mt-6 p-4 bg-royal-green-soft rounded-lg border border-royal-green-soft">
                        <div className="flex items-center justify-center gap-2 text-royal-green">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">{status}</span>
                        </div>
                    </div>
                )}

            
            </div>
        </AuthLayout>
    );
}
