"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bus,
  Clock,
  MapPin,
  Bell,
  ArrowLeft,
  User,
  Navigation,
} from "lucide-react";

export default function MyBusPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedChild, setSelectedChild] = useState(null);

  const handleChildSelect = (child) => {
    setSelectedChild(child);
    // You could also update other components or fetch new data here
  };

  // Mock data for the current bus
  const busData = {
    routeNumber: "42",
    routeName: "Morning Route",
    status: "on-time",
    currentLocation: "Oak Street & Maple Avenue",
    nextStop: "Pine Road & Cedar Lane",
    eta: "5 min",
    driverName: "Mahmoud Ali",
    stops: [
      { name: "Central Station", time: "7:00 AM", status: "completed" },
      { name: "Oak Street & Maple Avenue", time: "7:15 AM", status: "current" },
      { name: "Pine Road & Cedar Lane", time: "7:20 AM", status: "upcoming" },
      {
        name: "Elm Street & Birch Avenue",
        time: "7:25 AM",
        status: "upcoming",
      },
      { name: "Al-Azhar School", time: "7:35 AM", status: "upcoming" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">My Bus</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-medium">{busData.routeName}</h2>
                <div className="flex items-center gap-1 text-sm">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Route {busData.routeNumber}
                  </span>
                </div>
              </div>
              <Badge className="status-on-time">
                {busData.status === "on-time" ? "On Time" : "Delayed"}
              </Badge>
            </div>

            <Tabs
              defaultValue="live"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-4"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live">Live Tracking</TabsTrigger>
                <TabsTrigger value="stops">Stops</TabsTrigger>
                <TabsTrigger value="info">Bus Info</TabsTrigger>
              </TabsList>

              <TabsContent value="live" className="mt-4">
                <div className="bg-muted/30 rounded-md p-4 mb-4">
                  <div className="text-base font-medium mb-2">Bus Map View</div>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    {/* Google Maps implementation commented out until the real project */}
                    <p className="text-sm text-muted-foreground">
                      Map would be displayed here
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Current Location
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-base">
                        {busData.currentLocation}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Next Stop
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-base">{busData.nextStop}</span>
                      <Badge variant="outline" className="ml-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {busData.eta}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Estimated Arrival at School
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-base">7:35 AM</span>
                      <Badge variant="outline" className="ml-1">
                        On Time
                      </Badge>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full mt-2">
                    <Bell className="h-4 w-4 mr-2" />
                    Notify on Arrival
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="stops" className="mt-4">
                <div className="space-y-3">
                  {busData.stops.map((stop, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-3 rounded-md ${
                        stop.status === "current"
                          ? "bg-primary/10 border border-primary/30"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
                          stop.status === "completed"
                            ? "bg-green-500 text-white"
                            : stop.status === "current"
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {stop.status === "completed" ? "✓" : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-base">{stop.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {stop.time}
                        </div>
                      </div>
                      {stop.status === "current" && (
                        <Badge className="status-on-time">Current</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="info" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Driver
                    </div>
                    <div className="text-base">{busData.driverName}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Bus Number
                    </div>
                    <div className="text-base">Bus #{busData.routeNumber}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Morning Pickup
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-base">
                        7:15 AM at Oak Street & Maple Avenue
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Afternoon Dropoff
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-base">
                        3:45 PM at Oak Street & Maple Avenue
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button size="sm" variant="outline">
                      Report an Issue
                    </Button>
                    <Button size="sm">Contact Driver</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div>
          <Card className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-medium">Child Location</h2>
                <div className="flex items-center gap-1 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Ahmed Mohamed</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                On Bus
              </Badge>
            </div>

            <div className="flex items-center gap-2 mb-3 text-sm">
              <Navigation className="h-4 w-4 text-primary" />
              <span>Current: On Route 42 Bus</span>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>Last updated: 2 minutes ago</span>
            </div>

            <div className="bg-muted/30 rounded-md p-3 mb-4 text-center">
              <div className="text-sm mb-1">Location Map</div>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Map would be displayed here
                </p>
              </div>
            </div>

            <Button size="sm" className="w-full">
              View Details
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
