'use client'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { PlusCircle, GripVertical, Trash2Icon } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import SchemaBuilder from './SchemaBuilder'
import AddModelModal from './AddModelModal'

const SortableItem = ({ id, name, isSelected, setSelectedModel, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group mb-2 ${isSelected ? 'bg-muted' : ''}`}
    >
      <Button
        variant="outline"
        className={`w-full justify-start relative ${isSelected && "bg-slate-200 text-current"}`}
        onClick={() => setSelectedModel(id)}
      >
        <span {...attributes} {...listeners} className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <GripVertical className={`h-4 w-4 transition-opacity ${isSelected || 'group-hover:opacity-100 opacity-0'}`} />
        </span>
        <span className="ml-8">{name}</span>
        {isSelected && (
          <Trash2Icon
            className="h-4 w-4 ml-auto cursor-pointer text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          />
        )}
      </Button>
    </div>
  )
}

export default function Settings() {
  const [models, setModels] = useState([
    { id: '1', name: 'User' },
    { id: '2', name: 'Product' },
    { id: '3', name: 'Order' },
    { id: '4', name: 'Customer' },
    { id: '5', name: 'Invoice' },
  ])
  const [selectedModel, setSelectedModel] = useState(null)
  const [newModelName, setNewModelName] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [modelToDelete, setModelToDelete] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [addModelModalOpen, setAddModelModalOpen] = useState(false)


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setModels((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleDeleteModel = (id) => {
    const modelToDelete = models.find(model => model.id === id)
    setModelToDelete(modelToDelete)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (deleteConfirmation === modelToDelete.name) {
      setModels(models.filter(model => model.id !== modelToDelete.id))
      if (selectedModel === modelToDelete.id) {
        setSelectedModel(null)
      }
      setDeleteModalOpen(false)
      setModelToDelete(null)
      setDeleteConfirmation('')
    }
  }

  const handleAddModel = (newModel) => {
    setModels([...models, { ...newModel, id: Date.now().toString() }])
    setAddModelModalOpen(false)
  }

  return (
    <div className="container mx-auto">
      <Tabs defaultValue="data-models" className="w-full">
        <TabsList>
          <TabsTrigger value="data-models">Data Models</TabsTrigger>
          <TabsTrigger value="other">Other Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="data-models">
          <Card>
            <CardHeader>
              {/* <CardTitle>Data Models</CardTitle> */}
              <CardDescription>Manage your application's data models and their schemas.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-end mb-4">
                      <Button onClick={() => setAddModelModalOpen(true)} variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Model
                      </Button>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={models}
                          strategy={verticalListSortingStrategy}
                        >
                          {models.map((model) => (
                            <SortableItem
                              key={model.id}
                              id={model.id}
                              name={model.name}
                              isSelected={selectedModel === model.id}
                              setSelectedModel={setSelectedModel}
                              onDelete={handleDeleteModel}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent>
                    {selectedModel ? (
                      <SchemaBuilder model={models.find(m => m.id === selectedModel)} />
                    ) : (
                      <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                        <p className="text-muted-foreground">Select a model to view and edit its schema</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the model
              <strong> {modelToDelete?.name}</strong> and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <p className="text-sm text-muted-foreground mb-2">
              To confirm, type the model name "{modelToDelete?.name}" below:
            </p>
            <Input
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type model name here"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteConfirmation('')
              setModelToDelete(null)
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteConfirmation !== modelToDelete?.name}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AddModelModal
        open={addModelModalOpen}
        onOpenChange={setAddModelModalOpen}
        onSave={handleAddModel}
      />
    </div>
  )
}