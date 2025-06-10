"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Users, Plus, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the chat groups with Egyptian schools
const chatGroups = [
  {
    id: "1",
    name: "Al-Azhar School Parents Group",
    members: 24,
    lastMessage: "هل سيكون هناك تأخير في الحافلة اليوم بسبب الطقس؟",
    lastMessageTime: "10:15 AM",
    unread: 3,
    description: "مجموعة لأولياء أمور طلاب مدرسة الأزهر لمناقشة الأمور المتعلقة بالنقل المدرسي والمواصلات",
  },
  {
    id: "2",
    name: "Cairo American School Parents",
    members: 18,
    lastMessage: "تذكير: غداً رحلة مدرسية، الحافلة ستغادر في الساعة 8 صباحاً",
    lastMessageTime: "Yesterday",
    unread: 0,
    description:
      "مجموعة لأولياء أمور طلاب المدرسة الأمريكية بالقاهرة لمناقشة الأمور المتعلقة بالنقل المدرسي والمواصلات",
  },
  {
    id: "3",
    name: "Maadi District Transportation",
    members: 12,
    lastMessage: "من يستطيع توصيل الأطفال غداً؟ أنا غير متاح",
    lastMessageTime: "Yesterday",
    unread: 5,
    description: "مجموعة لأولياء الأمور في حي المعادي للتنسيق حول النقل المشترك للأطفال من وإلى المدارس المختلفة",
  },
  {
    id: "4",
    name: "Misr International School Parents",
    members: 15,
    lastMessage: "هل هناك أي تغيير في مواعيد الحافلات هذا الأسبوع؟",
    lastMessageTime: "2 days ago",
    unread: 0,
    description: "مجموعة لأولياء أمور طلاب مدرسة مصر الدولية لمناقشة الأمور المتعلقة بالنقل المدرسي والمواصلات",
  },
  {
    id: "5",
    name: "Nasr City Transportation Group",
    members: 10,
    lastMessage: "سأكون متاحاً للتوصيل يومي الاثنين والأربعاء",
    lastMessageTime: "3 days ago",
    unread: 0,
    description: "مجموعة لأولياء الأمور في حي مدينة نصر للتنسيق حول النقل المشترك للأطفال من وإلى المدارس المختلفة",
  },
]

// Update the chat messages with Arabic names
const chatMessages = [
  {
    id: "1",
    sender: "Amr Khalid",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "هل سيكون هناك تأخير في الحافلة اليوم بسبب الطقس؟",
    time: "10:15 AM",
  },
  {
    id: "2",
    sender: "Fatima Ahmed",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "نعم، تم إرسال إشعار من المدرسة بأن الحافلات ستتأخر 30 دقيقة بسبب الأمطار",
    time: "10:18 AM",
  },
  {
    id: "3",
    sender: "Mohamed Ali",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "شكراً للتوضيح. هل سيؤثر هذا أيضاً على موعد العودة؟",
    time: "10:20 AM",
  },
  {
    id: "4",
    sender: "Laila Hassan",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "لم يتم ذكر أي شيء عن موعد العودة، أعتقد أنه سيكون في الوقت المعتاد",
    time: "10:22 AM",
  },
  {
    id: "5",
    sender: "Khaled Ibrahim",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "أنا سأذهب بنفسي لاصطحاب ابني اليوم، إذا كان أي شخص يريد أن أوصل ابنه أيضاً فليتواصل معي",
    time: "10:25 AM",
  },
]

export function ParentChatGroups() {
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("groups")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [localMessages, setLocalMessages] = useState([...chatMessages])

  const filteredGroups = chatGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedGroupData = chatGroups.find((group) => group.id === selectedGroup)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add new message to local messages
      const newMessage = {
        id: String(localMessages.length + 1),
        sender: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        message: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setLocalMessages([...localMessages, newMessage])
      setMessage("")

      // Scroll to bottom only when user sends a message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Chat Groups
            </CardTitle>
            <CardDescription>Join or create parent chat groups</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 h-[400px] overflow-y-auto">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className={`flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${selectedGroup === group.id ? "bg-accent" : ""}`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={group.name} />
                  <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{group.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {group.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{group.members} members</span>
                    {group.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 ml-auto">
                        {group.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Chat Group</DialogTitle>
                  <DialogDescription>
                    Create a new chat group for parents to coordinate transportation
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input id="group-name" placeholder="e.g. مجموعة أولياء أمور مدرسة النور" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group-school">School</Label>
                    <Select>
                      <SelectTrigger id="group-school">
                        <SelectValue placeholder="Select a school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مدرسة النور الدولية">مدرسة النور الدولية</SelectItem>
                        <SelectItem value="مدرسة الأندلس">مدرسة الأندلس</SelectItem>
                        <SelectItem value="مدرسة الفلاح">مدرسة الفلاح</SelectItem>
                        <SelectItem value="مدرسة المعرفة">مدرسة المعرفة</SelectItem>
                        <SelectItem value="مدرسة الرياض">مدرسة الرياض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group-description">Description</Label>
                    <Input id="group-description" placeholder="Describe the purpose of this group" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group-privacy">Privacy</Label>
                    <Select defaultValue="public">
                      <SelectTrigger id="group-privacy">
                        <SelectValue placeholder="Select privacy setting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public (Anyone can join)</SelectItem>
                        <SelectItem value="private">Private (Approval required)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Group</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="border-b">
            {selectedGroup ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={selectedGroupData?.name} />
                  <AvatarFallback>{selectedGroupData?.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedGroupData?.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{selectedGroupData?.members} members</span>
                  </CardDescription>
                </div>
              </div>
            ) : (
              <>
                <CardTitle>Select a Chat Group</CardTitle>
                <CardDescription>Choose a group from the list to start chatting</CardDescription>
              </>
            )}
          </CardHeader>

          {selectedGroup ? (
            <>
              <div className="border-b p-4">
                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
                {localMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.avatar} alt={msg.sender} />
                      <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{msg.sender}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <div className="bg-muted p-3 rounded-lg mt-1">
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Reference div for scrolling */}
                <div ref={messagesEndRef} style={{ height: "1px" }} />
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg">No Chat Selected</h3>
                <p className="text-muted-foreground">Select a chat group from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
