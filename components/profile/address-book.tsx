"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Home, Building, Plus, Pencil, Trash2 } from "lucide-react"

// Sample address data
const addresses = [
  {
    id: "addr1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    street: "123 Farm Road",
    city: "Amritsar",
    state: "Punjab",
    pincode: "143001",
    type: "home",
    isDefault: true,
  },
  {
    id: "addr2",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    street: "456 Market Street",
    city: "Ludhiana",
    state: "Punjab",
    pincode: "141001",
    type: "work",
    isDefault: false,
  },
]

export function AddressBook() {
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Address Book</CardTitle>
          <CardDescription>Manage your delivery addresses</CardDescription>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-8 border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
            <AddressForm
              onCancel={() => setIsAdding(false)}
              onSave={() => {
                // Here you would save the new address
                setIsAdding(false)
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-4 relative ${address.isDefault ? "border-primary" : ""}`}
            >
              {address.isDefault && <Badge className="absolute top-2 right-2 bg-primary">Default</Badge>}

              {isEditing === address.id ? (
                <AddressForm
                  address={address}
                  onCancel={() => setIsEditing(null)}
                  onSave={() => {
                    // Here you would save the edited address
                    setIsEditing(null)
                  }}
                />
              ) : (
                <>
                  <div className="flex items-start mb-3">
                    {address.type === "home" ? (
                      <Home className="h-5 w-5 mr-2 text-primary" />
                    ) : (
                      <Building className="h-5 w-5 mr-2 text-primary" />
                    )}
                    <div>
                      <h3 className="font-semibold">{address.name}</h3>
                      <p className="text-sm">{address.phone}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.pincode}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(address.id)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    {!address.isDefault && (
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>{children}</span>
}

interface AddressFormProps {
  address?: (typeof addresses)[0]
  onCancel: () => void
  onSave: () => void
}

function AddressForm({ address, onCancel, onSave }: AddressFormProps) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue={address?.name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" defaultValue={address?.phone} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="street">Street Address</Label>
          <Input id="street" defaultValue={address?.street} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" defaultValue={address?.city} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select defaultValue={address?.state}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Punjab">Punjab</SelectItem>
              <SelectItem value="Haryana">Haryana</SelectItem>
              <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
              <SelectItem value="Gujarat">Gujarat</SelectItem>
              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
              {/* Add more states as needed */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">PIN Code</Label>
          <Input id="pincode" defaultValue={address?.pincode} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Address Type</Label>
          <Select defaultValue={address?.type}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="farm">Farm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="default" defaultChecked={address?.isDefault} />
        <Label htmlFor="default">Set as default address</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onSave}>
          Save Address
        </Button>
      </div>
    </form>
  )
}

