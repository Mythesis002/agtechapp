"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Trash2, Plus } from "lucide-react"

// Sample payment methods
const paymentMethods = [
  {
    id: "card1",
    type: "card",
    cardNumber: "•••• •••• •••• 4242",
    cardHolder: "Rajesh Kumar",
    expiryDate: "12/25",
    isDefault: true,
  },
  {
    id: "card2",
    type: "card",
    cardNumber: "•••• •••• •••• 5678",
    cardHolder: "Rajesh Kumar",
    expiryDate: "09/24",
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Payment Method
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-8 border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
            <PaymentMethodForm
              onCancel={() => setIsAdding(false)}
              onSave={() => {
                // Here you would save the new payment method
                setIsAdding(false)
              }}
            />
          </div>
        )}

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 relative ${method.isDefault ? "border-primary" : ""}`}
            >
              {method.isDefault && (
                <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                  Default
                </span>
              )}

              <div className="flex items-center mb-3">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <h3 className="font-semibold">{method.cardNumber}</h3>
                  <p className="text-sm text-muted-foreground">
                    {method.cardHolder} • Expires {method.expiryDate}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                {!method.isDefault && (
                  <Button variant="outline" size="sm">
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface PaymentMethodFormProps {
  onCancel: () => void
  onSave: () => void
}

function PaymentMethodForm({ onCancel, onSave }: PaymentMethodFormProps) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardHolder">Cardholder Name</Label>
        <Input id="cardHolder" placeholder="Name as it appears on card" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input id="expiryDate" placeholder="MM/YY" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="defaultPayment" />
        <Label htmlFor="defaultPayment">Set as default payment method</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSave}>
          Save Card
        </Button>
      </div>
    </form>
  )
}

