"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Bus,
  MapPin,
  Clock,
  Bell,
  MessageSquare,
  User,
  Star,
  BookOpen,
  Users,
  Camera,
  Music,
  Gamepad2,
  Heart,
  Zap,
  Sparkles,
  Navigation,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function ChildDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("home")

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Complete! 🎉",
      description: `${action} - Great job!`,
      variant: "default",
    })
  }

  const busInfo = {
    route: "Route 42",
    currentLocation: "Oak Street & Maple Avenue",
    eta: "5 minutes",
    status: "on-time",
    nextStop: "School Main Entrance",
    driverName: "Mr. Johnson",
  }

  const todaySchedule = [
    { time: "7:15 AM", event: "Bus Pickup 🚌", status: "completed", icon: Bus, points: 10 },
    { time: "8:00 AM", event: "Math Class 📚", status: "completed", icon: BookOpen, points: 15 },
    { time: "9:30 AM", event: "Science Lab 🔬", status: "current", icon: Star, points: 20 },
    { time: "11:00 AM", event: "Lunch Break 🍕", status: "upcoming", icon: Users, points: 5 },
    { time: "3:15 PM", event: "Bus Home 🏠", status: "upcoming", icon: Bus, points: 10 },
  ]

  const friends = [
    { name: "Sarah Ahmed", status: "On Bus", route: "Route 42", avatar: "👧", mood: "happy", level: 5 },
    { name: "Yusuf Ali", status: "At School", route: "Route 15", avatar: "👦", mood: "excited", level: 7 },
    { name: "Layla Mohamed", status: "On Bus", route: "Route 42", avatar: "👧", mood: "sleepy", level: 4 },
    { name: "Omar Hassan", status: "At Home", route: "Route 42", avatar: "👦", mood: "happy", level: 6 },
  ]

  const achievements = [
    { title: "Perfect Week! 🏆", description: "No missed days this week!", icon: "🏆", unlocked: true, points: 100 },
    { title: "Bus Safety Star ⭐", description: "Always follows bus rules", icon: "⭐", unlocked: true, points: 50 },
    { title: "Helpful Friend 🤝", description: "Helped a new student", icon: "🤝", unlocked: true, points: 75 },
    { title: "Early Bird 🐦", description: "Never late to bus stop", icon: "🐦", unlocked: false, points: 25 },
    { title: "Study Champion 📚", description: "Complete homework streak", icon: "📚", unlocked: false, points: 150 },
    { title: "Kindness Hero 💝", description: "Acts of kindness", icon: "💝", unlocked: true, points: 200 },
  ]

  const dailyQuests = [
    { task: "Say good morning to the bus driver", completed: true, points: 5, icon: "👋" },
    { task: "Help a friend with their backpack", completed: false, points: 10, icon: "🎒" },
    { task: "Keep your seat clean", completed: true, points: 5, icon: "✨" },
    { task: "Share a snack with a friend", completed: false, points: 15, icon: "🍪" },
    { task: "Learn a new fun fact", completed: false, points: 20, icon: "🧠" },
  ]

  const totalPoints =
    achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0) +
    dailyQuests.filter((q) => q.completed).reduce((sum, q) => sum + q.points, 0)

  const level = Math.floor(totalPoints / 100) + 1
  const nextLevelPoints = level * 100
  const progressToNextLevel = ((totalPoints % 100) / 100) * 100

  const games = [
    { name: "Bus Route Memory", description: "Remember all the stops!", icon: "🧠", difficulty: "Easy", points: 25 },
    { name: "Safety Quiz", description: "Test your safety knowledge", icon: "🛡️", difficulty: "Medium", points: 50 },
    { name: "Friend Finder", description: "Find friends on the map", icon: "🗺️", difficulty: "Easy", points: 30 },
    { name: "Time Challenge", description: "Get ready for school on time", icon: "⏰", difficulty: "Hard", points: 75 },
    { name: "Kindness Quest", description: "Complete acts of kindness", icon: "💖", difficulty: "Medium", points: 60 },
    {
      name: "Math Adventure",
      description: "Solve math puzzles on the bus",
      icon: "🔢",
      difficulty: "Hard",
      points: 80,
    },
  ]

  const specialPowers = [
    { name: "Super Sight", description: "Spot all bus stops", icon: "👁️", unlocked: level >= 3 },
    { name: "Friend Magnet", description: "Make friends easily", icon: "🧲", unlocked: level >= 5 },
    { name: "Time Master", description: "Never be late", icon: "⏰", unlocked: level >= 7 },
    { name: "Safety Shield", description: "Ultimate protection", icon: "🛡️", unlocked: level >= 10 },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hi {user?.name?.split(" ")[0]}! 👋</h1>
          <p className="text-muted-foreground">
            {user?.school} - {user?.grade} | Level {level} Explorer ⭐
          </p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 mb-2">
            <Star className="h-4 w-4 mr-1" />
            {totalPoints} Points
          </Badge>
          <div className="text-sm text-muted-foreground">
            {nextLevelPoints - totalPoints} points to Level {level + 1}
          </div>
          <Progress value={progressToNextLevel} className="w-32 h-2 mt-1" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="home">🏠 Home</TabsTrigger>
          <TabsTrigger value="bus">🚌 My Bus</TabsTrigger>
          <TabsTrigger value="friends">👫 Friends</TabsTrigger>
          <TabsTrigger value="achievements">🏆 Rewards</TabsTrigger>
          <TabsTrigger value="games">🎮 Games</TabsTrigger>
          <TabsTrigger value="powers">⚡ Powers</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Adventure */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Adventure 📅</h3>
                <div className="space-y-4">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : item.status === "current"
                              ? "bg-blue-100 text-blue-600 animate-pulse"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.event}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{item.time}</span>
                            {item.status === "completed" && (
                              <Badge className="bg-green-500 text-xs">+{item.points} pts</Badge>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "completed"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : item.status === "current"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {item.status === "completed" ? "Done ✓" : item.status === "current" ? "Now!" : "Coming Up"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Daily Quests */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Daily Quests 🎯</h3>
                <div className="space-y-3">
                  {dailyQuests.map((quest, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="text-2xl">{quest.icon}</div>
                      <div className="flex-1">
                        <p className={`font-medium ${quest.completed ? "line-through text-muted-foreground" : ""}`}>
                          {quest.task}
                        </p>
                        <p className="text-sm text-muted-foreground">+{quest.points} points</p>
                      </div>
                      {quest.completed ? (
                        <Badge className="bg-green-500">Complete! ✓</Badge>
                      ) : (
                        <Button size="sm" onClick={() => handleQuickAction(`Complete: ${quest.task}`)}>
                          Do It! 🚀
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">My Super Stats 📊</h3>
                <div className="space-y-3">
                  <div className="text-center p-3 bg-blue-50 rounded-md">
                    <p className="text-2xl font-bold text-blue-600">15</p>
                    <p className="text-sm text-blue-700">Days on time 🕐</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-md">
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-sm text-green-700">New friends 👫</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-md">
                    <p className="text-2xl font-bold text-purple-600">42</p>
                    <p className="text-sm text-purple-700">Bus rides 🚌</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-md">
                    <p className="text-2xl font-bold text-orange-600">
                      {achievements.filter((a) => a.unlocked).length}
                    </p>
                    <p className="text-sm text-orange-700">Achievements 🏆</p>
                  </div>
                </div>
              </Card>

              {/* Magic Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Magic Actions ✨</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("Send Magic Message")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Magic Message 💬
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("Take Super Photo")}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Super Photo 📸
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("Play Happy Music")}
                  >
                    <Music className="h-4 w-4 mr-2" />
                    Happy Music 🎵
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("Call for Help")}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Need Help 🆘
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bus" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">My Magic Bus 🚌</h3>
              <Badge className="bg-green-500">On Time! ⏰</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bus className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">{busInfo.route}</p>
                    <p className="text-sm text-muted-foreground">My awesome school bus! 🌟</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Current Location</p>
                    <p className="text-sm text-muted-foreground">{busInfo.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Arrives in {busInfo.eta}</p>
                    <p className="text-sm text-muted-foreground">Almost here! 🎉</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Driver: {busInfo.driverName}</p>
                    <p className="text-sm text-muted-foreground">Super nice driver! 😊</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-md p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Bus Location 🗺️</p>
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <Bus className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground">Live magic map coming soon! ✨</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="h-16 flex-col gap-1" onClick={() => handleQuickAction("Track My Magic Bus")}>
                <Navigation className="h-5 w-5" />
                <span className="text-xs">Track Bus 🔍</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-1"
                onClick={() => handleQuickAction("Send Message to Driver")}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs">Message Driver 💬</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col gap-1"
                onClick={() => handleQuickAction("Play Bus Games")}
              >
                <Gamepad2 className="h-5 w-5" />
                <span className="text-xs">Bus Games 🎮</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleQuickAction("Emergency")}>
                <Bell className="h-5 w-5" />
                <span className="text-xs">Emergency 🚨</span>
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">My Super Friends 👫</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 border rounded-md bg-gradient-to-r from-blue-50 to-purple-50"
                >
                  <div className="text-3xl">{friend.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm text-muted-foreground">{friend.route}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">Mood:</span>
                      <span className="text-xs">
                        {friend.mood === "happy" ? "😊" : friend.mood === "excited" ? "🤩" : "😴"}
                      </span>
                      <span className="text-xs">Level {friend.level}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        friend.status === "On Bus"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : friend.status === "At School"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {friend.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2 w-full"
                      onClick={() => handleQuickAction(`Send magic message to ${friend.name}`)}
                    >
                      Say Hi! 👋
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button onClick={() => handleQuickAction("Find New Friends")}>
                <Users className="h-4 w-4 mr-2" />
                Find Friends 🔍
              </Button>
              <Button variant="outline" onClick={() => handleQuickAction("Create Friend Group")}>
                <Heart className="h-4 w-4 mr-2" />
                Create Group 👥
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">My Super Achievements 🏆</h3>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Total Points ⭐</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`text-center p-4 border rounded-md ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h4 className="font-medium mb-1">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs font-bold">{achievement.points} pts</span>
                  </div>
                  {achievement.unlocked && <Badge className="mt-2 bg-green-500 text-xs">Unlocked! ✓</Badge>}
                  {!achievement.unlocked && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      Locked 🔒
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Super Fun Games 🎮</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{game.icon}</div>
                    <div>
                      <h4 className="font-medium">{game.name}</h4>
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          game.difficulty === "Easy"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : game.difficulty === "Medium"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {game.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">+{game.points} pts</span>
                    </div>
                    <Button size="sm" onClick={() => handleQuickAction(`Play ${game.name}`)}>
                      Play Now! 🎯
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="powers" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">My Super Powers ⚡</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialPowers.map((power, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-md text-center ${
                    power.unlocked
                      ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-4xl mb-2">{power.icon}</div>
                  <h4 className="font-medium mb-1">{power.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{power.description}</p>
                  {power.unlocked ? (
                    <Badge className="bg-purple-500">
                      <Zap className="h-3 w-3 mr-1" />
                      Activated!
                    </Badge>
                  ) : (
                    <Badge variant="outline">Unlock at Level {index * 2 + 3}</Badge>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button onClick={() => handleQuickAction("Discover New Powers")}>
                <Sparkles className="h-4 w-4 mr-2" />
                Discover New Powers! ✨
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
