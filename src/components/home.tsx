import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut, Settings, Plus, Filter } from "lucide-react";
import TaskList from "./TaskList";
import TaskCreation from "./TaskCreation";
import UserSettings from "./UserSettings";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "regular";
  avatar?: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showTaskCreation, setShowTaskCreation] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock authenticated user - in a real app, this would come from authentication context
  const [currentUser, setCurrentUser] = useState<User>({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin", // Change to 'regular' to test different user roles
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  });

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Task Manager</h1>
            <Badge variant="secondary">
              {currentUser.role === "admin" ? "Admin" : "User"}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>

            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>

            <Avatar>
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {currentUser.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
          </h2>

          <Button onClick={() => setShowTaskCreation(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        <Tabs
          defaultValue="tasks"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            {currentUser.role === "admin" && (
              <TabsTrigger value="reports">Reports</TabsTrigger>
            )}
            {currentUser.role === "admin" && (
              <TabsTrigger value="users">Users</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="mr-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <TaskList userRole={currentUser.role} userId={currentUser.id} />
          </TabsContent>

          {currentUser.role === "admin" && (
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Report</CardTitle>
                  <CardDescription>
                    Overview of task completion rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">
                      Report charts would appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {currentUser.role === "admin" && (
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage team members and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">
                      User management interface would appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Task Creation Modal */}
      {showTaskCreation && (
        <TaskCreation
          onClose={() => setShowTaskCreation(false)}
          userRole={currentUser.role}
          userId={currentUser.id}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <UserSettings
          onClose={() => setShowSettings(false)}
          user={currentUser}
          onUpdateUser={(updatedUser) => setCurrentUser(updatedUser)}
        />
      )}
    </div>
  );
};

export default HomePage;
