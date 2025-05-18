import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  Check,
  Trash2,
  Clock,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TaskDetail from "./TaskDetail";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

interface TaskListProps {
  userRole?: "admin" | "regular";
  tasks?: Task[];
}

const TaskList = ({
  userRole = "regular",
  tasks: propTasks,
}: TaskListProps) => {
  // Mock data for tasks if none provided
  const defaultTasks: Task[] = [
    {
      id: "1",
      title: "Design new dashboard layout",
      description:
        "Create wireframes and mockups for the new admin dashboard interface",
      priority: "high",
      assignee: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      dueDate: "2023-06-15",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Implement user authentication",
      description:
        "Set up Firebase authentication for user login and registration",
      priority: "high",
      assignee: {
        name: "Sam Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      },
      dueDate: "2023-06-10",
      status: "pending",
    },
    {
      id: "3",
      title: "Create API documentation",
      description:
        "Document all API endpoints and parameters for the developer portal",
      priority: "medium",
      assignee: {
        name: "Jamie Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      },
      dueDate: "2023-06-20",
      status: "pending",
    },
    {
      id: "4",
      title: "Fix navigation bug",
      description:
        "Address the issue with navigation drawer not closing on mobile devices",
      priority: "low",
      assignee: {
        name: "Taylor Swift",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
      },
      dueDate: "2023-06-08",
      status: "completed",
    },
    {
      id: "5",
      title: "Update privacy policy",
      description:
        "Review and update the privacy policy to comply with new regulations",
      priority: "medium",
      assignee: {
        name: "Morgan Freeman",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
      },
      dueDate: "2023-06-25",
      status: "pending",
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(propTasks || defaultTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Handle task swipe actions
  const handleComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task,
      ),
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">
          {userRole === "admin" ? "All Tasks" : "My Tasks"}
        </h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Priority" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) {
                  handleComplete(task.id);
                } else if (info.offset.x < -100) {
                  handleDelete(task.id);
                }
              }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 flex items-center justify-center w-full bg-green-100 text-green-700 opacity-0 transition-opacity">
                <Check className="h-6 w-6 mr-2" /> Mark as Complete
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center justify-center w-full bg-red-100 text-red-700 opacity-0 transition-opacity">
                <Trash2 className="h-6 w-6 mr-2" /> Delete Task
              </div>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`h-3 w-3 rounded-full ${getPriorityColor(task.priority)}`}
                        />
                        <h3 className="font-medium text-lg">{task.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Avatar>
                        <AvatarImage
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                        />
                        <AvatarFallback>
                          {task.assignee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">
                        {task.assignee.name}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No tasks found matching your filters
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setPriorityFilter("all");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default TaskList;
