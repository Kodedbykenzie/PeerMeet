import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  content: string;
  timestamp: number;
  read: boolean;
}
interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: {
    content: string;
    timestamp: number;
    senderId: string;
  };
  unreadCount: number;
}
interface ChatContextType {
  conversations: Conversation[];
  currentConversation: string | null;
  messages: Message[];
  sendMessage: (recipientId: string, content: string) => void;
  setCurrentConversation: (conversationId: string | null) => void;
  markAsRead: (conversationId: string) => void;
}
const ChatContext = createContext<ChatContextType | undefined>(undefined);
export const ChatProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    currentUser
  } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  // Mock data for demonstration
  useEffect(() => {
    if (currentUser) {
      // In a real app, this would fetch from Firebase
      const mockConversations: Conversation[] = [{
        id: 'conv1',
        participants: [currentUser.id, 'user2'],
        lastMessage: {
          content: 'When can we schedule our next session?',
          timestamp: Date.now() - 3600000,
          senderId: 'user2'
        },
        unreadCount: 2
      }, {
        id: 'conv2',
        participants: [currentUser.id, 'user3'],
        lastMessage: {
          content: 'Thanks for your help today!',
          timestamp: Date.now() - 86400000,
          senderId: currentUser.id
        },
        unreadCount: 0
      }];
      setConversations(mockConversations);
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentConversation) {
      // In a real app, this would fetch from Firebase and set up a real-time listener
      const mockMessages: Message[] = [{
        id: 'msg1',
        senderId: currentUser?.id || '',
        senderName: currentUser?.name || '',
        senderAvatar: currentUser?.avatar,
        recipientId: 'user2',
        content: 'Hi, do you have time for a tutoring session this week?',
        timestamp: Date.now() - 86400000,
        read: true
      }, {
        id: 'msg2',
        senderId: 'user2',
        senderName: 'Jane Doe',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        recipientId: currentUser?.id || '',
        content: 'Sure! How about Thursday at 4pm?',
        timestamp: Date.now() - 43200000,
        read: true
      }, {
        id: 'msg3',
        senderId: currentUser?.id || '',
        senderName: currentUser?.name || '',
        senderAvatar: currentUser?.avatar,
        recipientId: 'user2',
        content: 'That works for me. What topics should we cover?',
        timestamp: Date.now() - 3600000,
        read: true
      }, {
        id: 'msg4',
        senderId: 'user2',
        senderName: 'Jane Doe',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        recipientId: currentUser?.id || '',
        content: 'When can we schedule our next session?',
        timestamp: Date.now() - 1800000,
        read: false
      }];
      setMessages(mockMessages);
      // Mark messages as read when conversation is opened
      if (currentUser) {
        markAsRead(currentConversation);
      }
    }
  }, [currentConversation, currentUser]);
  const sendMessage = (recipientId: string, content: string) => {
    if (!currentUser) return;
    // In a real app, this would send to Firebase
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      recipientId,
      content,
      timestamp: Date.now(),
      read: false
    };
    setMessages(prev => [...prev, newMessage]);
    // Update the conversation with the last message
    setConversations(prev => prev.map(conv => {
      if (conv.participants.includes(recipientId) && conv.participants.includes(currentUser.id)) {
        return {
          ...conv,
          lastMessage: {
            content,
            timestamp: Date.now(),
            senderId: currentUser.id
          }
        };
      }
      return conv;
    }));
  };
  const markAsRead = (conversationId: string) => {
    // In a real app, this would update Firebase
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0
        };
      }
      return conv;
    }));
    // Mark all messages in this conversation as read
    setMessages(prev => prev.map(msg => {
      if (msg.recipientId === currentUser?.id && !msg.read) {
        return {
          ...msg,
          read: true
        };
      }
      return msg;
    }));
  };
  return <ChatContext.Provider value={{
    conversations,
    currentConversation,
    messages,
    sendMessage,
    setCurrentConversation,
    markAsRead
  }}>
      {children}
    </ChatContext.Provider>;
};
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};