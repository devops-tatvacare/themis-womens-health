"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  Calendar,
  BarChart3,
  HelpCircle,
  AlertTriangle,
  Video,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScreenLayout } from "@/components/layouts/screen-layout"
import { BaseModal } from "@/components/ui/base-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CommunitiesScreenProps {
  onBack: () => void
}

interface Post {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  timestamp: string
  category: string
  likes: number
  comments: number
  isLiked: boolean
  commentsList?: Comment[]
}

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

interface LiveSession {
  id: string
  title: string
  host: string
  date: string
  time: string
  participants: number
  isLive: boolean
}

interface Poll {
  id: string
  question: string
  options: string[]
  votes: number[]
  totalVotes: number
  hasVoted: boolean
  votedOption?: number
  timestamp: string
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  attendees: number
  isRegistered: boolean
}

interface ExpertQA {
  id: string
  expert: string
  specialty: string
  avatar: string
  nextSession: string
  isActive: boolean
}

export function CommunitiesScreen({ onBack }: CommunitiesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [activeTab, setActiveTab] = useState<"posts" | "live" | "polls" | "events" | "experts">("posts")
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "experience",
  })
  const [newComment, setNewComment] = useState("")

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Positive Changes",
      content:
        "I've been on this therapy for 3 months now, and I'm starting to see some positive changes in my energy levels.",
      author: "Sophia Clark",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "2 hours ago",
      category: "experience",
      likes: 12,
      comments: 5,
      isLiked: false,
      commentsList: [
        {
          id: "c1",
          author: "Dr. Martinez",
          avatar: "/placeholder.svg?height=32&width=32",
          content: "That's wonderful to hear! Improved energy levels are often one of the first positive signs.",
          timestamp: "1 hour ago",
          likes: 3,
          isLiked: false,
        },
      ],
    },
    {
      id: "2",
      title: "Managing Side Effects",
      content: "I'm having some side effects, mainly fatigue. How are others managing this?",
      author: "Ethan Bennett",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "5 hours ago",
      category: "support",
      likes: 8,
      comments: 12,
      isLiked: true,
      commentsList: [],
    },
  ])

  const [liveSessions] = useState<LiveSession[]>([
    {
      id: "1",
      title: "Managing Treatment Side Effects",
      host: "Dr. Sarah Wilson",
      date: "Today",
      time: "3:00 PM",
      participants: 127,
      isLive: true,
    },
    {
      id: "2",
      title: "Nutrition for Liver Health",
      host: "Lisa Chen",
      date: "Tomorrow",
      time: "2:00 PM",
      participants: 89,
      isLive: false,
    },
  ])

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      question: "What's your biggest challenge with treatment?",
      options: ["Remembering medication", "Managing side effects", "Cost concerns", "Time constraints"],
      votes: [45, 67, 23, 31],
      totalVotes: 166,
      hasVoted: false,
      timestamp: "2 days ago",
    },
  ])

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Liver Health Awareness Week",
      date: "March 15-22",
      time: "Various times",
      attendees: 234,
      isRegistered: false,
    },
    {
      id: "2",
      title: "Virtual Support Group Meetup",
      date: "March 28",
      time: "7:00 PM",
      attendees: 67,
      isRegistered: true,
    },
  ])

  const [expertQAs] = useState<ExpertQA[]>([
    {
      id: "1",
      expert: "Dr. Sarah Wilson",
      specialty: "Liver Diseases",
      avatar: "/placeholder.svg?height=48&width=48",
      nextSession: "Today at 3:00 PM",
      isActive: true,
    },
    {
      id: "2",
      expert: "Lisa Chen",
      specialty: "Clinical Nutrition",
      avatar: "/placeholder.svg?height=48&width=48",
      nextSession: "Tomorrow at 2:00 PM",
      isActive: false,
    },
  ])

  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        timestamp: "Just now",
        category: newPost.category,
        likes: 0,
        comments: 0,
        isLiked: false,
        commentsList: [],
      }
      setPosts([post, ...posts])
      setNewPost({ title: "", content: "", category: "experience" })
      setShowCreatePost(false)
    }
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleVotePoll = (pollId: string, optionIndex: number) => {
    setPolls(
      polls.map((poll) =>
        poll.id === pollId && !poll.hasVoted
          ? {
              ...poll,
              hasVoted: true,
              votedOption: optionIndex,
              votes: poll.votes.map((vote, index) => (index === optionIndex ? vote + 1 : vote)),
              totalVotes: poll.totalVotes + 1,
            }
          : poll,
      ),
    )
  }

  const handleAddComment = () => {
    if (newComment.trim() && selectedPost) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        isLiked: false,
      }

      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, commentsList: [...(post.commentsList || []), comment], comments: post.comments + 1 }
            : post,
        ),
      )

      setSelectedPost({
        ...selectedPost,
        commentsList: [...(selectedPost.commentsList || []), comment],
        comments: selectedPost.comments + 1,
      })

      setNewComment("")
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Post Detail View
  if (selectedPost) {
    return (
      <div className="flex flex-col h-full bg-[var(--bg-primary)]">
        {/* Header */}
        <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] px-4 py-4 flex-shrink-0">
          <div className="flex items-center justify-between relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="p-1 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Post Details</h1>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Original Post */}
          <div className="p-4 border-b border-[var(--border-color)]">
            <div className="flex items-start gap-3 mb-4">
              <img
                src={selectedPost.avatar || "/placeholder.svg"}
                alt={selectedPost.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[var(--text-primary)]">{selectedPost.author}</span>
                  <span className="text-xs text-[var(--text-muted)]">•</span>
                  <span className="text-xs text-[var(--text-muted)]">{selectedPost.timestamp}</span>
                </div>
                <h2 className="font-semibold text-[var(--text-primary)] text-lg mb-2">{selectedPost.title}</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">{selectedPost.content}</p>
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-[var(--border-color)]">
              <button
                onClick={() => handleLikePost(selectedPost.id)}
                className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <Heart className={`w-4 h-4 ${selectedPost.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                <span>{selectedPost.likes}</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <MessageCircle className="w-4 h-4" />
                <span>{selectedPost.comments}</span>
              </div>
              <button className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="p-4">
            <h3 className="font-medium text-[var(--text-primary)] mb-4">Comments ({selectedPost.comments})</h3>
            <div className="space-y-4">
              {selectedPost.commentsList?.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[var(--text-primary)] text-sm">{comment.author}</span>
                      <span className="text-xs text-[var(--text-muted)]">•</span>
                      <span className="text-xs text-[var(--text-muted)]">{comment.timestamp}</span>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="border-t border-[var(--border-color)] p-4 flex-shrink-0">
          <div className="flex gap-3">
            <img src="/placeholder.svg?height=32&width=32" alt="You" className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Communities View
  return (
    <ScreenLayout title="Community Hub">
      <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)] relative">
        {/* Medical Disclaimer */}
        <div className="bg-[var(--status-warning)]/10 border-l-4 border-[var(--status-warning)] p-3 mx-4 mt-4 rounded-r-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[var(--status-warning)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[var(--text-primary)] font-medium">Medical Disclaimer</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Information shared is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <Input
              placeholder="Search topics, posts, or members"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[var(--bg-secondary)] border-0 rounded-xl"
            />
          </div>
        </div>

        {/* Tab Navigation - Fixed height matching */}
        <div className="bg-white border-b border-gray-100">
          <div className="px-4 py-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100 rounded-lg p-1 h-16">
                <TabsTrigger
                  value="posts"
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--app-primary)] text-gray-600 h-14 rounded-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Posts</span>
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--app-primary)] text-gray-600 h-14 rounded-md"
                >
                  <Video className="w-4 h-4" />
                  <span>Live</span>
                </TabsTrigger>
                <TabsTrigger
                  value="polls"
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--app-primary)] text-gray-600 h-14 rounded-md"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Polls</span>
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--app-primary)] text-gray-600 h-14 rounded-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Events</span>
                </TabsTrigger>
                <TabsTrigger
                  value="experts"
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-[var(--app-primary)] text-gray-600 h-14 rounded-md"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Experts</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <div className="mt-4">
                <TabsContent value="posts" className="mt-0 space-y-1">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start gap-3 p-4 hover:bg-[var(--bg-secondary)] cursor-pointer border-b border-[var(--border-color)] transition-colors"
                      onClick={() => setSelectedPost(post)}
                    >
                      <img
                        src={post.avatar || "/placeholder.svg"}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[var(--text-primary)] text-sm">{post.author}</span>
                            <span className="text-xs text-[var(--text-muted)]">•</span>
                            <span className="text-xs text-[var(--text-muted)]">{post.timestamp}</span>
                          </div>
                          <button className="p-1 hover:bg-[var(--bg-secondary)] rounded-full transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-[var(--text-muted)]" />
                          </button>
                        </div>
                        <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{post.title}</h3>
                        <p className="text-[var(--text-secondary)] text-sm line-clamp-1 mb-2">{post.content}</p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLikePost(post.id)
                            }}
                            className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                          >
                            <Heart className={`w-3 h-3 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                            <span>{post.likes}</span>
                          </button>
                          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.comments}</span>
                          </div>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                          >
                            <Share2 className="w-3 h-3" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="live" className="mt-0 space-y-3">
                  {liveSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-start gap-3 p-4 hover:bg-[var(--bg-secondary)] cursor-pointer border-b border-[var(--border-color)] transition-colors"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${session.isLive ? "bg-[var(--status-error)]/10" : "bg-[var(--bg-secondary)]"}`}
                      >
                        <Video
                          className={`w-5 h-5 ${session.isLive ? "text-[var(--status-error)]" : "text-[var(--text-muted)]"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-[var(--text-primary)] text-sm">{session.title}</h3>
                          {session.isLive && (
                            <span className="bg-[var(--status-error)] text-white text-xs px-2 py-0.5 rounded-full">
                              LIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mb-1">{session.host}</p>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                          <span>
                            {session.date} at {session.time}
                          </span>
                          <span>{session.participants} joined</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="polls" className="mt-0 space-y-4">
                  {polls.map((poll) => (
                    <div key={poll.id} className="p-4 border-b border-[var(--border-color)]">
                      <div className="mb-3">
                        <h3 className="font-medium text-[var(--text-primary)] text-sm mb-1">{poll.question}</h3>
                        <p className="text-xs text-[var(--text-muted)]">
                          {poll.timestamp} • {poll.totalVotes} votes
                        </p>
                      </div>
                      <div className="space-y-2">
                        {poll.options.map((option, index) => {
                          const percentage =
                            poll.totalVotes > 0 ? Math.round((poll.votes[index] / poll.totalVotes) * 100) : 0
                          const isSelected = poll.hasVoted && poll.votedOption === index
                          return (
                            <button
                              key={index}
                              onClick={() => handleVotePoll(poll.id, index)}
                              disabled={poll.hasVoted}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                poll.hasVoted
                                  ? isSelected
                                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10"
                                    : "border-[var(--border-color)] bg-[var(--bg-secondary)]"
                                  : "border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-secondary)]"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-[var(--text-primary)]">{option}</span>
                                {poll.hasVoted && (
                                  <span className="text-sm font-medium text-[var(--text-primary)]">{percentage}%</span>
                                )}
                              </div>
                              {poll.hasVoted && (
                                <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
                                  <div
                                    className="bg-[var(--accent-primary)] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="events" className="mt-0 space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-4 hover:bg-[var(--bg-secondary)] cursor-pointer border-b border-[var(--border-color)] transition-colors"
                    >
                      <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[var(--text-muted)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[var(--text-primary)] text-sm mb-1">{event.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-2">
                          <span>
                            {event.date} at {event.time}
                          </span>
                          <span>{event.attendees} attending</span>
                        </div>
                        <Button
                          variant={event.isRegistered ? "outline" : "default"}
                          size="sm"
                          className={event.isRegistered ? "text-[var(--text-secondary)]" : ""}
                        >
                          {event.isRegistered ? "Registered" : "Register"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="experts" className="mt-0 space-y-3">
                  {expertQAs.map((expert) => (
                    <div
                      key={expert.id}
                      className="flex items-start gap-3 p-4 hover:bg-[var(--bg-secondary)] cursor-pointer border-b border-[var(--border-color)] transition-colors"
                    >
                      <img
                        src={expert.avatar || "/placeholder.svg"}
                        alt={expert.expert}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-[var(--text-primary)] text-sm">{expert.expert}</h3>
                          {expert.isActive && (
                            <span className="bg-[var(--status-success)]/10 text-[var(--status-success)] text-xs px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mb-1">{expert.specialty}</p>
                        <p className="text-xs text-[var(--text-muted)] mb-2">Next: {expert.nextSession}</p>
                        <Button
                          size="sm"
                          className={
                            expert.isActive
                              ? "bg-[var(--status-success)] hover:bg-[var(--status-success)]/90 text-white"
                              : ""
                          }
                        >
                          {expert.isActive ? "Ask Now" : "Submit Question"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Floating Action Button - Only show on posts tab */}
        {activeTab === "posts" && (
          <button
            onClick={() => setShowCreatePost(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-10"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}

        {/* Create Post Modal */}
        <BaseModal isOpen={showCreatePost} onClose={() => setShowCreatePost(false)}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Create New Post</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full p-3 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]"
                >
                  <option value="experience">Treatment Experience</option>
                  <option value="support">Support & Advice</option>
                  <option value="wellness">Wellness Tips</option>
                  <option value="milestone">Milestone</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Title</label>
                <Input
                  placeholder="What's your post about?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Content</label>
                <textarea
                  placeholder="Share your thoughts, experiences, or questions..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreatePost} className="flex-1">
                  Post
                </Button>
                <Button onClick={() => setShowCreatePost(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </BaseModal>
      </div>
    </ScreenLayout>
  )
}
