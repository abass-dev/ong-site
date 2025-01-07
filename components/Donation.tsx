'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'

export default function Donation() {
    const t = useTranslations('donation')
    const [amount, setAmount] = useState('')
    const [customAmount, setCustomAmount] = useState('')

    const handleAmountChange = (value: string) => {
        setAmount(value)
        setCustomAmount('')
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value)
        setAmount('custom')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically handle the donation submission
        console.log('Donation submitted:', amount === 'custom' ? customAmount : amount)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <RadioGroup value={amount} onValueChange={handleAmountChange} className="grid grid-cols-3 gap-4 mb-4">
                            {['10', '25', '50', '100', '250', '500'].map((value) => (
                                <Label
                                    key={value}
                                    className={`flex items-center justify-center p-4 border rounded-md cursor-pointer ${amount === value ? 'bg-primary text-primary-foreground' : 'bg-background'
                                        }`}
                                >
                                    <RadioGroupItem value={value} className="sr-only" />
                                    {value}€
                                </Label>
                            ))}
                        </RadioGroup>
                        <div className="space-y-2">
                            <Label htmlFor="custom-amount">{t('customAmount')}</Label>
                            <Input
                                id="custom-amount"
                                type="number"
                                placeholder={t('customAmountPlaceholder')}
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                onClick={() => setAmount('custom')}
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">{t('donate')}</Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

