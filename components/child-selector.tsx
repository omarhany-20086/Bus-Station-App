"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

// Define the child type
interface Child {
  id: string
  name: string
  school: string
  grade: string
  avatarUrl?: string
}

interface ChildSelectorProps {
  onChildSelect?: (child: Child) => void
}

export function ChildSelector({ onChildSelect }: ChildSelectorProps) {
  const { toast } = useToast()
  // Mock data for children - in a real app, this would come from a database or API
  const [children, setChildren] = useState<Child[]>([
    {
      id: "1",
      name: "Fatima Mohamed",
      school: "Al-Azhar School",
      grade: "Grade 5",
      avatarUrl: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "Omar Mohamed",
      school: "Al-Azhar School",
      grade: "Grade 3",
      avatarUrl: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Layla Mohamed",
      school: "Cairo International School",
      grade: "Grade 1",
      avatarUrl: "/placeholder.svg?height=32&width=32",
    },
  ])

  const [selectedChild, setSelectedChild] = useState<Child | null>(null)

  // Set the first child as default on component mount
  useEffect(() => {
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0])
      if (onChildSelect) {
        onChildSelect(children[0])
      }
    }
  }, [children, selectedChild, onChildSelect])

  const handleSelectChild = (child: Child) => {
    setSelectedChild(child)
    if (onChildSelect) {
      onChildSelect(child)
    }

    toast({
      title: "Child Selected",
      description: `Now tracking ${child.name}`,
      variant: "success",
    })
  }

  if (!selectedChild) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-9 px-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={selectedChild.avatarUrl} alt={selectedChild.name} />
            <AvatarFallback>
              {selectedChild.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{selectedChild.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuLabel>Select Child</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {children.map((child) => (
            <DropdownMenuItem key={child.id} className="cursor-pointer" onClick={() => handleSelectChild(child)}>
              <div className="flex items-center gap-2 flex-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={child.avatarUrl} alt={child.name} />
                  <AvatarFallback>
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{child.name}</span>
                  <span className="text-xs text-muted-foreground">{child.school}</span>
                </div>
              </div>
              {selectedChild.id === child.id && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            toast({
              title: "Add Child",
              description: "This feature will be available soon.",
              variant: "default",
            })
          }}
        >
          <User className="h-4 w-4 mr-2" />
          <span>Add Child</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
