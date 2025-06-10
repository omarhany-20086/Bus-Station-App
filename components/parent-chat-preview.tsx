"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Users, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Update the chat groups with Egyptian schools
const chatGroups = [
  {
    id: "1",
    name: "Al-Azhar School Parents Group",
    members: 24,
    lastMessage: "هل سيكون هناك تأخير في الحافلة اليوم بسبب الطقس؟",
    lastMessageTime: "10:15 AM",
    unread: 3,
  },
  {
    id: "2",
    name: "Cairo American School Parents",
    members: 18,
    lastMessage: "تذكير: غداً رحلة مدرسية، الحافلة ستغادر في الساعة 8 صباحاً",
    lastMessageTime: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    name: "Maadi District Transportation",
    members: 12,
    lastMessage: "من يستطيع توصيل الأطفال غداً؟ أنا غير متاح",
    lastMessageTime: "Yesterday",
    unread: 5,
  },
]

// Update the recent messages with Arabic names
const recentMessages = [
  {
    id: "1",
    sender: "Amr Khalid",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "هل سيكون هناك تأخير في الحافلة اليوم بسبب الطقس؟",
    time: "10:15 AM",
    group: "Al-Azhar School Parents Group",
  },
  {
    id: "2",
    sender: "Fatima Ahmed",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "تذكير: غداً رحلة مدرسية، الحافلة ستغادر في الساعة 8 صباحاً",
    time: "Yesterday",
    group: "Cairo American School Parents",
  },
  {
    id: "3",
    sender: "Mohamed Ali",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "من يستطيع توصيل الأطفال غداً؟ أنا غير متاح",
    time: "Yesterday",
    group: "Maadi District Transportation",
  },
]

export function ParentChatPreview() {
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("groups")

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Parent Chat Groups
        </CardTitle>
        <CardDescription>Connect with other parents for coordination and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-b p-4 mb-4">
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

        <Tabs defaultValue="groups" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="groups">
              <Users className="h-4 w-4 mr-2" />
              Chat Groups
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Recent Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            {chatGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
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

            <Link href="/school-routes?tab=chat">
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Join or Create Group
              </Button>
            </Link>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={msg.avatar} alt={msg.sender} />
                  <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{msg.sender}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{msg.time}</span>
                  </div>
                  <p className="text-sm truncate">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{msg.group}</p>
                </div>
              </div>
            ))}

            <Link href="/school-routes?tab=chat">
              <Button className="w-full">View All Messages</Button>
            </Link>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
