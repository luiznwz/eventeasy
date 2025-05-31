import { Check, Copy } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';

interface ShareModalProps {
    setShowShareModal: (shareModal: boolean) => void;
    eventId: string 
}

export default function ShareModal({ setShowShareModal, eventId }: ShareModalProps) {

    const [copied, setCopied] = useState(false)
    
    useEffect(() => {
        if (copied) {
          const timer = setTimeout(() => setCopied(false), 2000)
          return () => clearTimeout(timer)
        }
      }, [copied])
    
    const eventUrl =
    typeof window !== "undefined" ? `${window.location.origin}/eventos/${eventId}` : `/eventos/${eventId}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(eventUrl).then(() => {
            setCopied(true)
        })
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                setShowShareModal(false)
                }
            }}
            >
            <div className="bg-background rounded-lg shadow-lg max-w-md w-full overflow-hidden">
                <div className="p-6 border-b border-gray-300">
                    <h3 className="text-lg font-semibold">Compartilhar Evento</h3>
                    <p className="text-sm text-gray-500">Compartilhe este evento com seus convidados</p>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Link do Evento</label>
                        <div className="flex">
                        <input
                            type="text"
                            value={eventUrl}
                            readOnly
                            className="flex-1 px-3 py-2 border rounded-l-md bg-muted text-sm"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="cursor-pointer inline-flex items-center justify-center rounded-r-md border border-l-0 border-input bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                        </div>
                        {copied && <p className="text-xs text-green-600 mt-1">Link copiado para a área de transferência!</p>}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-300 flex justify-end">
                    <Button
                        className="bg-blue-500 hover:bg-blue-500/80 cursor-pointer"
                        onClick={() => setShowShareModal(false)}
                    >
                        Fechar
                    </Button>
                </div>
            </div>
        </div>
    )
}
