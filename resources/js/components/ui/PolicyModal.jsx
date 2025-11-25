import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';

export default function PolicyModal({ open, onClose }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-royal-green">Politique de Confidentialité - CNDP</DialogTitle>
                    <DialogDescription className="text-zinc-600">
                        Conformément à la loi 09-08 du Maroc
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-zinc-700">
                    <div>
                        <p className="leading-relaxed">
                            Conformément à la loi n° 09-08 relative à la protection des données personnelles, nous collectons vos informations (prénom, nom, e-mail, pays, version) uniquement pour vous envoyer le résumé exécutif du livre "Le Maroc Social 2030" par e-mail.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-royal-green mb-2">Utilisation des données</h4>
                        <p className="leading-relaxed text-sm">
                            Vos données sont utilisées exclusivement pour l'envoi du résumé exécutif. Nous ne partageons pas vos données avec des tiers. Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'effacement de vos données.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-royal-green mb-2">Contact</h4>
                        <p className="leading-relaxed text-sm">
                            Pour toute question : author@ms2030.org
                        </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-200">
                        <button 
                            onClick={onClose}
                            className="w-full py-3 px-6 rounded-lg font-semibold bg-royal-green text-white hover:bg-royal-green/90 transition-colors"
                        >
                            J'ai lu et compris
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

