'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function AddModelModal({ open, onOpenChange, onSave }) {
    const [modelName, setModelName] = useState('')
    const [pluralName, setPluralName] = useState('')

    const handleSave = () => {
        if (modelName && pluralName) {
            onSave({ name: modelName, plural: pluralName })
            setModelName('')
            setPluralName('')
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Model</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new model.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="modelName" className="text-right">
                            Model Name (Singular)
                        </Label>
                        <Input
                            id="modelName"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="pluralName" className="text-right">
                            Plural Name
                        </Label>
                        <Input
                            id="pluralName"
                            value={pluralName}
                            onChange={(e) => setPluralName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save Model</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}