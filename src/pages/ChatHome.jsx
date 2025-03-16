import { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/chatHome.css';

const ChatHome = () => {
  const { currentUser, logout } = useAuth();
  const { 
    chats, 
    currentChat, 
    createChat, 
    sendMessage, 
    editMessage, 
    deleteMessage, 
    deleteChat, 
    selectChat 
  } = useChat();
  
  const [message, setMessage] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (editingMessage) {
      editMessage(editingMessage.id, message);
      setEditingMessage(null);
    } else {
      sendMessage(message);
    }
    setMessage('');
  };

  const handleEditMessage = (msg) => {
    setEditingMessage(msg);
    setMessage(msg.content);
  };

  return (
    <div className="chat-container">
      {/* Sidebar - Lista de chats */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>Mis Chats</h3>
          <button className="btn btn-primary" onClick={() => createChat()}>
            Nuevo Chat
          </button>
        </div>
        
        <div className="chat-list">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              className={`chat-item ${currentChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => selectChat(chat.id)}
            >
              <div className="chat-title">{chat.title}</div>
              <button 
                className="chat-delete-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer">
          <div className="user-info">
            {currentUser?.name || 'Usuario'}
          </div>
          <button className="btn btn-secondary" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
      
      {/* Área de chat principal */}
      <div className="chat-main">
        {currentChat ? (
          <>
            <div className="chat-header">
              <h3>{currentChat.title}</h3>
            </div>
            
            <div className="chat-messages">
              {currentChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className="message-content">{msg.content}</div>
                  
                  {msg.sender === 'user' && (
                    <div className="message-actions">
                      <button 
                        onClick={() => handleEditMessage(msg)}
                        className="message-btn"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="message-btn"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <form className="chat-input-form" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                className="chat-input" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder={editingMessage ? "Editar mensaje..." : "Escribe un mensaje..."}
              />
              <button type="submit" className="btn btn-primary">
                {editingMessage ? "Guardar" : "Enviar"}
              </button>
              {editingMessage && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingMessage(null);
                    setMessage('');
                  }}
                >
                  Cancelar
                </button>
              )}
            </form>
          </>
        ) : (
          <div className="chat-placeholder">
            <h3>Selecciona un chat o crea uno nuevo</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHome;