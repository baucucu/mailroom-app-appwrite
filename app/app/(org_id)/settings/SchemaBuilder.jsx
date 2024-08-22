'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2, Save, GripVertical } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SortableField = ({ field, isSelected, onSelect, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group mb-2 ${isSelected ? 'bg-slate-200 text-current' : ''} hover:bg-muted`}
        >
            <Button
                variant="ghost"
                className="w-full justify-start relative"
                onClick={() => onSelect(field)}
            >
                <span {...attributes} {...listeners} className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <GripVertical className={`h-4 w-4 transition-opacity ${isSelected || 'group-hover:opacity-100 opacity-0'}`} />
                </span>
                <span className="ml-8">{field.label || 'Unnamed Field'}</span>
                <span className="ml-2 text-sm text-gray-500">{field.type}</span>
                {isSelected && (
                    <Trash2
                        className="h-4 w-4 ml-auto cursor-pointer text-red-600"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(field.id);
                        }}
                    />
                )}
            </Button>
        </div>
    )
}

export default function Component() {
    const [fields, setFields] = useState([])
    const [selectedField, setSelectedField] = useState(null)
    const [jsonOutput, setJsonOutput] = useState('')

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const addField = () => {
        const newField = {
            id: Date.now().toString(),
            label: '',
            name: '',
            type: 'string',
            isRequired: true,
            defaultValue: '',
            arrayType: 'string',
            allowMultiple: false,
            enumValues: [{ label: '', value: '' }]
        }
        setFields([...fields, newField])
        setSelectedField(newField)
    }

    const updateField = (updatedField) => {
        setFields(fields.map(field => field.id === updatedField.id ? updatedField : field))
        setSelectedField(updatedField)
    }

    const removeField = (fieldId) => {
        setFields(fields.filter(field => field.id !== fieldId))
        if (selectedField && selectedField.id === fieldId) {
            setSelectedField(null)
        }
    }

    const addEnumValue = () => {
        if (selectedField) {
            const updatedField = {
                ...selectedField,
                enumValues: [...selectedField.enumValues, { label: '', value: '' }]
            }
            updateField(updatedField)
        }
    }

    const updateEnumValue = (index, key, value) => {
        if (selectedField) {
            const updatedEnumValues = [...selectedField.enumValues]
            updatedEnumValues[index][key] = value
            const updatedField = {
                ...selectedField,
                enumValues: updatedEnumValues
            }
            updateField(updatedField)
        }
    }

    const removeEnumValue = (index) => {
        if (selectedField && selectedField.enumValues.length > 1) {
            const updatedEnumValues = selectedField.enumValues.filter((_, i) => i !== index)
            const updatedField = {
                ...selectedField,
                enumValues: updatedEnumValues
            }
            updateField(updatedField)
        }
    }

    const generateJsonOutput = () => {
        const schemaFields = fields.reduce((acc, field) => {
            let fieldSchema = `z.${field.type}()`
            if (!field.isRequired) {
                fieldSchema += '.optional()'
            }
            if (field.defaultValue && field.type !== 'array') {
                if (field.type === 'boolean') {
                    fieldSchema += `.default(${field.defaultValue})`
                } else {
                    fieldSchema += `.default('${field.defaultValue}')`
                }
            }
            if (field.type === 'enum') {
                const enumValues = field.enumValues
                    .filter(v => v.value !== '')
                    .map(v => `'${v.value}'`)
                    .join(', ')
                fieldSchema = `z.enum([${enumValues}])`
                if (field.allowMultiple) {
                    fieldSchema = `z.array(${fieldSchema})`
                }
                if (field.defaultValue) {
                    fieldSchema += `.default('${field.defaultValue}')`
                }
            }
            acc[field.name] = fieldSchema
            return acc
        }, {})

        const schemaString = `const schema = z.object(${JSON.stringify(schemaFields, null, 2)})`
        setJsonOutput(schemaString)
    }

    useEffect(() => {
        generateJsonOutput()
    }, [fields])

    const saveSchema = () => {
        console.log('Saving schema:', jsonOutput)
    }

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id !== over.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-end mb-4">
                {/* <h2 className="text-lg font-semibold">{model.name} Schema</h2> */}
                <Button onClick={saveSchema} variant="outline">
                    <Save className="mr-2 h-4 w-4" /> Save Schema
                </Button>
            </div>
            <div className="flex w-full">
                <div className="w-1/2 pr-4">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2 mb-4">
                                {fields.map((field) => (
                                    <SortableField
                                        key={field.id}
                                        field={field}
                                        isSelected={selectedField && selectedField.id === field.id}
                                        onSelect={setSelectedField}
                                        onRemove={removeField}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                    <Button onClick={addField} className="mb-4" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Field
                    </Button>
                </div>
                <div className="w-1/2 pl-4">
                    {selectedField && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={selectedField.label}
                                    onChange={(e) => updateField({ ...selectedField, label: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="name">Name/ID</Label>
                                <Input
                                    id="name"
                                    value={selectedField.name}
                                    onChange={(e) => updateField({ ...selectedField, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={selectedField.type}
                                    onValueChange={(value) => updateField({ ...selectedField, type: value, defaultValue: '' })}
                                >
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="string">String</SelectItem>
                                        <SelectItem value="number">Number</SelectItem>
                                        <SelectItem value="boolean">Boolean</SelectItem>
                                        <SelectItem value="enum">Enum</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="required"
                                    checked={selectedField.isRequired}
                                    onCheckedChange={(checked) => updateField({ ...selectedField, isRequired: checked })}
                                />
                                <Label htmlFor="required">Required</Label>
                            </div>
                            {selectedField.type !== 'enum' && (
                                <div>
                                    <Label htmlFor="defaultValue">Default Value</Label>
                                    {selectedField.type === 'boolean' ? (
                                        <Select
                                            value={selectedField.defaultValue}
                                            onValueChange={(value) => updateField({ ...selectedField, defaultValue: value })}
                                        >
                                            <SelectTrigger id="defaultValue">
                                                <SelectValue placeholder="Select default value" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">True</SelectItem>
                                                <SelectItem value="false">False</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            id="defaultValue"
                                            value={selectedField.defaultValue}
                                            onChange={(e) => updateField({ ...selectedField, defaultValue: e.target.value })}
                                        />
                                    )}
                                </div>
                            )}
                            {selectedField.type === 'enum' && (
                                <div>
                                    <Label className="mb-2 block">Enum Options</Label>
                                    <div className="grid grid-cols-[1fr,1fr,auto] gap-2 mb-2">
                                        <div>Label</div>
                                        <div>Value</div>
                                        <div></div>
                                    </div>
                                    <div className="space-y-2">
                                        {selectedField.enumValues.map((enumValue, index) => (
                                            <div key={index} className="grid grid-cols-[1fr,1fr,auto] gap-2">
                                                <Input
                                                    placeholder="Label"
                                                    value={enumValue.label}
                                                    onChange={(e) => updateEnumValue(index, 'label', e.target.value)}
                                                />
                                                <Input
                                                    placeholder="Value"
                                                    value={enumValue.value}
                                                    onChange={(e) => updateEnumValue(index, 'value', e.target.value)}
                                                />
                                                <Button variant="ghost" size="sm" onClick={() => removeEnumValue(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button onClick={addEnumValue} className="mt-2" variant="outline">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Enum Option
                                    </Button>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Switch
                                            id="allowMultiple"
                                            checked={selectedField.allowMultiple}
                                            onCheckedChange={(checked) => updateField({ ...selectedField, allowMultiple: checked })}
                                        />
                                        <Label htmlFor="allowMultiple">Allow Multiple Values</Label>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}