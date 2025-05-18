import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Edit,
  Save,
  Trash2,
  X,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: Date;
}

interface TaskDetailProps {
  isOpen?: boolean;
  onClose?: () => void;
  task?: {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "pending" | "in-progress" | "completed";
    assignees: string[];
    dueDate: Date;
    comments: Comment[];
    createdBy: string;
    createdAt: Date;
  };
  userRole?: "admin" | "regular";
  onSave?: (task: any) => void;
  onDelete?: (taskId: string) => void;
}

const TaskDetail = ({
  isOpen = true,
  onClose = () => {},
  task = {
    id: "1",
    title: "Implement user authentication",
    description:
      "Add Firebase authentication to the mobile app with email and social login options.",
    priority: "high" as const,
    status: "in-progress" as const,
    assignees: ["John Doe", "Jane Smith"],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    comments: [
      {
        id: "1",
        author: "John Doe",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        content: "I've started working on the Google authentication part.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        author: "Jane Smith",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        content: "I'll handle the email authentication flow.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
    createdBy: "Admin User",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  userRole = "admin",
  onSave = () => {},
  onDelete = () => {},
}: TaskDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [newComment, setNewComment] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Current User", // In a real app, this would be the logged-in user
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
      content: newComment,
      timestamp: new Date(),
    };

    setEditedTask((prev) => ({
      ...prev,
      comments: [...prev.comments, comment],
    }));

    setNewComment("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? (
              <Input
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
                className="text-xl font-bold"
              />
            ) : (
              task.title
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Description
              </h3>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  className="min-h-[120px] w-full"
                />
              ) : (
                <p className="text-sm text-gray-700">{task.description}</p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Comments
              </h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {task.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-md"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.authorAvatar}
                        alt={comment.author}
                      />
                      <AvatarFallback>
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{comment.author}</p>
                        <p className="text-xs text-gray-500">
                          {format(comment.timestamp, "MMM d, yyyy h:mm a")}
                        </p>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddComment} size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar with task details */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-md">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              {isEditing ? (
                <Select
                  value={editedTask.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <span className="capitalize">
                    {task.status.replace("-", " ")}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Priority
              </h3>
              {isEditing ? (
                <Select
                  value={editedTask.priority}
                  onValueChange={(value) =>
                    handleSelectChange(
                      "priority",
                      value as "low" | "medium" | "high",
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge
                  variant={getPriorityColor(task.priority)}
                  className="capitalize"
                >
                  {task.priority}
                </Badge>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Due Date
              </h3>
              {isEditing ? (
                <Input
                  type="date"
                  name="dueDate"
                  value={format(new Date(editedTask.dueDate), "yyyy-MM-dd")}
                  onChange={(e) =>
                    setEditedTask((prev) => ({
                      ...prev,
                      dueDate: new Date(e.target.value),
                    }))
                  }
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{format(task.dueDate, "MMM d, yyyy")}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Assignees
              </h3>
              <div className="flex flex-wrap gap-2">
                {task.assignees.map((assignee, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee}`}
                        alt={assignee}
                      />
                      <AvatarFallback>{assignee.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{assignee}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Created By
              </h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.createdBy}`}
                    alt={task.createdBy}
                  />
                  <AvatarFallback>{task.createdBy.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.createdBy}</span>
                <span className="text-xs text-gray-500">
                  on {format(task.createdAt, "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center mt-6">
          <div>
            {userRole === "admin" && !isEditing && (
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetail;
