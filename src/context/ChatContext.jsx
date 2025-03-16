import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  // Cargar chats al iniciar o cuando cambia el usuario
  useEffect(() => {
    if (currentUser) {
      const userChats = JSON.parse(localStorage.getItem(`chats_${currentUser.id}`) || '[]');
      setChats(userChats);
      
      // Si hay chats, selecciona el primero, sino establece a null
      setCurrentChat(userChats.length > 0 ? userChats[0] : null);
    } else {
      setChats([]);
      setCurrentChat(null);
    }
  }, [currentUser]);

  // Guardar chats en localStorage cuando cambien
  useEffect(() => {
    if (currentUser && chats.length > 0) {
      localStorage.setItem(`chats_${currentUser.id}`, JSON.stringify(chats));
    }
  }, [chats, currentUser]);

  // Crear un nuevo chat
  const createChat = (title = 'Nuevo chat') => {
    const newChat = {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
    };
    
    setChats((prev) => [newChat, ...prev]);
    setCurrentChat(newChat);
    return newChat;
  };

  // Enviar un mensaje
  const sendMessage = (content) => {
    if (!currentChat) return false;
    
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    // Simulamos respuesta del bot después de enviar mensaje
    const botMessage = {
      id: (Date.now() + 1).toString(),
      content: 'respondiendo',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    
    setChats((prevChats) => {
      return prevChats.map((chat) => {
        if (chat.id === currentChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, userMessage, botMessage],
          };
        }
        return chat;
      });
    });
    
    setCurrentChat((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, botMessage],
    }));
    
    return true;
  };

  // Editar un mensaje
  const editMessage = (messageId, newContent) => {
    if (!currentChat) return false;
    
    setChats((prevChats) => {
      return prevChats.map((chat) => {
        if (chat.id === currentChat.id) {
          return {
            ...chat,
            messages: chat.messages.map((msg) => 
              msg.id === messageId ? { ...msg, content: newContent } : msg
            ),
          };
        }
        return chat;
      });
    });
    
    setCurrentChat((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) => 
        msg.id === messageId ? { ...msg, content: newContent } : msg
      ),
    }));
    
    return true;
  };

  // Eliminar un mensaje
  const deleteMessage = (messageId) => {
    if (!currentChat) return false;
    
    setChats((prevChats) => {
      return prevChats.map((chat) => {
        if (chat.id === currentChat.id) {
          return {
            ...chat,
            messages: chat.messages.filter((msg) => msg.id !== messageId),
          };
        }
        return chat;
      });
    });
    
    setCurrentChat((prev) => ({
      ...prev,
      messages: prev.messages.filter((msg) => msg.id !== messageId),
    }));
    
    return true;
  };

  // Eliminar un chat
  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    
    // Si el chat eliminado era el actual, seleccionar otro
    if (currentChat && currentChat.id === chatId) {
      setCurrentChat((prev) => {
        const remainingChats = chats.filter((chat) => chat.id !== chatId);
        return remainingChats.length > 0 ? remainingChats[0] : null;
      });
    }
  };

  // Seleccionar un chat
  const selectChat = (chatId) => {
    const selected = chats.find((chat) => chat.id === chatId);
    if (selected) {
      setCurrentChat(selected);
      return true;
    }
    return false;
  };

  const value = {
    chats,
    currentChat,
    createChat,
    sendMessage,
    editMessage,
    deleteMessage,
    deleteChat,
    selectChat,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};