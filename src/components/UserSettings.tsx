import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  UserPlus,
  Users,
  Bell,
  Moon,
  Database,
  Save,
  Trash2,
} from "lucide-react";

interface UserSettingsProps {
  isAdmin?: boolean;
  userData?: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}

const UserSettings = ({
  isAdmin = false,
  userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "Regular User",
  },
}: UserSettingsProps) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: userData.name,
    email: userData.email,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    taskAssigned: true,
    taskCompleted: true,
    taskDue: true,
    systemUpdates: false,
  });

  const [themeSettings, setThemeSettings] = useState({
    darkMode: false,
    colorScheme: "blue",
  });

  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncInterval: "15",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    });
  };

  const handleThemeChange = (key: string, value: any) => {
    setThemeSettings({
      ...themeSettings,
      [key]: key === "darkMode" ? value : value,
    });
  };

  const handleSyncChange = (key: string, value: any) => {
    setSyncSettings({
      ...syncSettings,
      [key]: value,
    });
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to Firebase
    console.log("Saving changes to Firebase:", {
      personalInfo,
      notificationSettings,
      themeSettings,
      syncSettings,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>
              {userData.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">{userData.role}</p>
          </div>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="sync">Sync Options</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin Settings</TabsTrigger>}
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Assigned</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when tasks are assigned to you
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.taskAssigned}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("taskAssigned", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Completed</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when your tasks are completed
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.taskCompleted}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("taskCompleted", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Due Soon</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders for upcoming task deadlines
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.taskDue}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("taskDue", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about system updates and maintenance
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("systemUpdates", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark theme
                  </p>
                </div>
                <Switch
                  checked={themeSettings.darkMode}
                  onCheckedChange={(checked) =>
                    handleThemeChange("darkMode", checked)
                  }
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <Select
                  value={themeSettings.colorScheme}
                  onValueChange={(value) =>
                    handleThemeChange("colorScheme", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Synchronization Options</CardTitle>
              <CardDescription>
                Configure how your data syncs across devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync data across devices
                  </p>
                </div>
                <Switch
                  checked={syncSettings.autoSync}
                  onCheckedChange={(checked) =>
                    handleSyncChange("autoSync", checked)
                  }
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Sync Interval (minutes)</Label>
                <Select
                  value={syncSettings.syncInterval}
                  onValueChange={(value) =>
                    handleSyncChange("syncInterval", value)
                  }
                  disabled={!syncSettings.autoSync}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Force Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Manage users and view reports.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">User Management</h3>
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      View All Users
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Reports</h3>
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start">
                      View Task Completion Report
                    </Button>
                    <Button variant="outline" className="justify-start">
                      View User Activity Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default UserSettings;
