"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Send, ArrowLeft, Plus } from "lucide-react"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("chats")
  const [message, setMessage] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([
    {
      id: "1",
      sender: "Amr Khalid",
      text: "Is the bus running late today?",
      time: "10:15 AM",
      isMe: false,
    },
    {
      id: "2",
      sender: "Me",
      text: "I was wondering the same thing. My app shows it's 5 minutes behind schedule.",
      time: "10:17 AM",
      isMe: true,
    },
    {
      id: "3",
      sender: "Fatima Ahmed",
      text: "Yes, the driver just messaged that there's traffic on Main Street.",
      time: "10:20 AM",
      isMe: false,
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data for chats
  const chats = [
    {
      id: "1",
      name: "Al-Azhar School Parents",
      lastMessage: "Is the bus running late today?",
      time: "10:15 AM",
      unread: 3,
    },
    {
      id: "2",
      name: "Cairo American School Updates",
      lastMessage: "Bus will be 5 minutes early tomorrow",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: "3",
      name: "Misr International School",
      lastMessage: "Early dismissal on Friday",
      time: "Yesterday",
      unread: 1,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add the new message to the messages array
      const newMessage = {
        id: String(messages.length + 1),
        sender: "Me",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Scroll to bottom only when user sends a message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      {!selectedChat ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="chats" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chats">Chats</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>

              <TabsContent value="chats" className="mt-4">
                <div className="space-y-3">
                  {chats.map((chat) => (
                    <Card
                      key={chat.id}
                      className="p-4 cursor-pointer hover:bg-secondary/50"
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-medium">{chat.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground">{chat.time}</span>
                          {chat.unread > 0 && (
                            <Badge className="ml-2 bg-primary text-primary-foreground text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="mt-4">
                <Card className="p-6 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">Join a Group</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other parents and stay updated on school events
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Groups
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="p-4">
              <h2 className="text-xl font-medium mb-4">Recent Contacts</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    AK
                  </div>
                  <div>
                    <div className="font-medium">Amr Khalid</div>
                    <div className="text-sm text-muted-foreground">Parent</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    FA
                  </div>
                  <div>
                    <div className="font-medium">Fatima Ahmed</div>
                    <div className="text-sm text-muted-foreground">Parent</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    MA
                  </div>
                  <div>
                    <div className="font-medium">Mahmoud Ali</div>
                    <div className="text-sm text-muted-foreground">Bus Driver</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="flex flex-col h-[calc(100vh-200px)]">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Parents Group</h2>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedChat(null)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4" id="message-container">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.isMe ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {!msg.isMe && <div className="text-sm font-medium mb-1">{msg.sender}</div>}
                      <p className="text-sm">{msg.text}</p>
                      <div
                        className={`text-xs mt-1 ${msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Reference div for scrolling */}
                <div ref={messagesEndRef} style={{ height: "1px" }} />
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button size="icon" className="h-10 w-10" onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="hidden lg:block">
            <Card className="p-4">
              <h2 className="text-xl font-medium mb-4">Group Members</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    AK
                  </div>
                  <div>
                    <div className="font-medium">Amr Khalid</div>
                    <div className="text-sm text-muted-foreground">Parent</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    FA
                  </div>
                  <div>
                    <div className="font-medium">Fatima Ahmed</div>
                    <div className="text-sm text-muted-foreground">Parent</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    MA
                  </div>
                  <div>
                    <div className="font-medium">Mahmoud Ali</div>
                    <div className="text-sm text-muted-foreground">Bus Driver</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    You
                  </div>
                  <div>
                    <div className="font-medium">You</div>
                    <div className="text-sm text-muted-foreground">Parent</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
