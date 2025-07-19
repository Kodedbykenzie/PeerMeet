import React, { useState } from 'react';
import { SearchIcon, PlusIcon, PhoneIcon, VideoIcon, SendIcon } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
const MessagesPage: React.FC = () => {
  const {
    conversations,
    currentConversation,
    messages,
    sendMessage,
    setCurrentConversation,
    markAsRead
  } = useChat();
  const {
    currentUser
  } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentConversation) return;
    // Find recipient ID from the current conversation
    const conversation = conversations.find(c => c.id === currentConversation);
    if (!conversation) return;
    const recipientId = conversation.participants.find(id => id !== currentUser?.id) || '';
    sendMessage(recipientId, newMessage);
    setNewMessage('');
  };
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    if (searchQuery === '') return true;
    // This is simplified - in a real app you'd have user details stored
    const otherParticipantId = conversation.participants.find(id => id !== currentUser?.id);
    const otherParticipantName = otherParticipantId === 'user2' ? 'Jane Doe' : 'David Kim';
    return otherParticipantName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Messages
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversations List */}
          <div className="w-1/3 border-r dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input type="text" placeholder="Search messages" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="overflow-y-auto" style={{
            height: 'calc(600px - 73px)'
          }}>
              {filteredConversations.length === 0 ? <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No conversations found
                </div> : <ul>
                  {filteredConversations.map(conversation => {
                // Find the other participant (not current user)
                const otherParticipantId = conversation.participants.find(id => id !== currentUser?.id);
                // This is simplified - in a real app you'd fetch user details from a database
                const otherParticipantName = otherParticipantId === 'user2' ? 'Jane Doe' : 'David Kim';
                const avatar = otherParticipantId === 'user2' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
                return <li key={conversation.id}>
                        <button onClick={() => {
                    setCurrentConversation(conversation.id);
                    markAsRead(conversation.id);
                  }} className={`w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${currentConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                              <img src={avatar} alt={otherParticipantName} className="h-full w-full object-cover" />
                            </div>
                            {conversation.unreadCount > 0 && <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {conversation.unreadCount}
                              </div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {otherParticipantName}
                              </h3>
                              {conversation.lastMessage && <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                                </span>}
                            </div>
                            {conversation.lastMessage && <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {conversation.lastMessage.senderId === currentUser?.id ? 'You: ' : ''}
                                {conversation.lastMessage.content}
                              </p>}
                          </div>
                        </button>
                      </li>;
              })}
                </ul>}
            </div>
          </div>
          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {currentConversation ? <>
                {/* Chat Header */}
                <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jane Doe" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Jane Doe
                      </h3>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Online
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                      <PhoneIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                      <VideoIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{
              height: 'calc(600px - 73px - 73px)'
            }}>
                  {messages.map(message => <div key={message.id} className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                      {message.senderId !== currentUser?.id && <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                          <img src={message.senderAvatar || 'https://via.placeholder.com/150'} alt={message.senderName} className="h-full w-full object-cover" />
                        </div>}
                      <div className={`max-w-[70%] px-4 py-2 rounded-lg ${message.senderId === currentUser?.id ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'}`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                        </div>
                      </div>
                    </div>)}
                </div>
                {/* Message Input */}
                <div className="border-t dark:border-gray-700 p-4">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white" />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg">
                      <SendIcon className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </> : <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <MessageIcon />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    No conversation selected
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Select a conversation or start a new one
                  </p>
                  <div className="mt-6">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      New Message
                    </button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
// Message icon component
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>;
export default MessagesPage;